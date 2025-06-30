import { createService } from "./lib/service.js";

const service = await createService();

await service.start();
console.log(`Server running at: ${service.info.uri}`);

process.on("SIGTERM", () => {
  service.stop().catch((err) => {
    console.error(err);
    process.exit(1);
  });
});
