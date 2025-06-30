import type { Server } from "@hapi/hapi";

import { beforeAll, afterAll } from "bun:test";
import { createService } from "@/lib/service.js";

export let service: Server;

beforeAll(async () => {
  service = await createService();
  await service.start();
});

afterAll(async () => {
  await service.stop();
});
