import { describe, expect, test } from "bun:test";

describe("GET /health", () => {
  test("responds with 200", async () => {
    const res = await fetch("http://localhost:3000/health", {
      method: "GET",
    });
    expect(res.status).toBe(200);
  });
});
