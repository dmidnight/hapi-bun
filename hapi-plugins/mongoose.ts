import mongoose from "mongoose";
import { Server } from "@hapi/hapi";

export const plugin = {
  name: "hapi-mongoose",
  register: async function (server: Server, options: any) {
    server.ext({
      type: "onPreStart",
      method: async () => {
        await mongoose.connect(options.uri, options.options);
      },
    });

    server.ext({
      type: "onPostStop",
      method: async () => {
        await mongoose.disconnect();
      },
    });
  },
};
