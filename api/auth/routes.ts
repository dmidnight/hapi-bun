import type { RouteDefMethods } from "@hapi/hapi";

import {
  emailAndPasswordModel,
  successModel,
  userModel,
} from "@/lib/joi-models.js";

import { login, logout } from "./handlers.js";

export const routes = [
  {
    method: "POST" as RouteDefMethods,
    path: "/api/auth/login",
    options: {
      tags: ["api", "auth"],
      description: "Login with email and password",
      validate: {
        payload: emailAndPasswordModel,
      },
      response: { schema: userModel },
    },
    handler: login,
  },
  {
    method: "POST" as RouteDefMethods,
    path: "/api/auth/logout",
    options: {
      tags: ["api", "auth"],
      description: "Logout the current user",
      response: { schema: successModel },
    },
    handler: logout,
  },
];
