import { server } from "@hapi/hapi";

import { config } from "@/config/index.js";

import HapiCookie from "@hapi/cookie";
import HapiSwagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";

import cookieAuthHandler from "./cookie-auth-handler.js";

import { plugin as hapiMongoose } from "@/hapi-plugins/mongoose.js";

import { badRequest } from "@hapi/boom";

import { routes as authRoutes } from "@/api/auth/routes.js";

export async function createService() {
  const service = server({
    port: config.port,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: [
          "http://localhost:3000",
          `${config.external.scheme}://${config.external.hostname}`,
        ],
        credentials: true,
      },
      validate: {
        failAction: async (request, h, err) => {
          // In prod, log a limited error message and throw the default Bad Request error.
          console.error(
            `${request.method.toUpperCase()} ${request.path} ValidationError:`,
            err?.message
          ); // Better to use an actual logger here.
          throw badRequest(`Invalid request payload input`);
        },
      },
    },
  });

  // healthcheck route
  service.route({
    method: "GET",
    path: "/health",
    handler: () => {
      return "Ok";
    },
  });

  await service.register([
    { plugin: HapiCookie },
    { plugin: hapiMongoose, options: config.mongo },
    { plugin: Inert },
    { plugin: Vision },
    { plugin: HapiSwagger, options: config.swagger },
  ]);

  service.auth.strategy("session", "cookie", cookieAuthHandler);

  service.route([...authRoutes]);

  return service;
}
