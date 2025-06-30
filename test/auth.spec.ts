import { afterAll, beforeAll, describe, expect, test } from "bun:test";

import { User } from "@/models/user";

beforeAll(async () => {
  const user = new User({
    email: "valid@example.com",
    firstName: "Valid",
    lastName: "User",
    hash: Bun.password.hashSync("validPassword123"),
  });

  await user.save();
});

afterAll(async () => {
  await User.deleteMany({
    email: { $in: ["valid@example.com"] },
  });
});

describe("POST /api/auth/login", () => {
  test("responds with 401 for unknown email", async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "unknown@example.com",
        password: "password123",
      }),
    });

    expect(res.status).toBe(401);

    const data = await res.json();
    expect(data).toEqual({
      success: false,
    });
  });

  test("responds with 401 for incorrect credentials", async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "valid@example.com",
        password: "badPassword123",
      }),
    });

    expect(res.status).toBe(401);

    const data = await res.json();
    expect(data).toEqual({
      success: false,
    });
  });

  test("responds with 200 and a cookie for correct credentials", async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "valid@example.com",
        password: "validPassword123",
      }),
    });

    expect(res.status).toBe(200);

    const data = (await res.json()) as any;
    expect(data.email).toEqual("valid@example.com");
  });
});

describe("POST /api/auth/logout", () => {
  test("responds with 200 and a cookie for correct credentials", async () => {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(res.status).toBe(200);

    const data = (await res.json()) as any;
    expect(data).toEqual({ success: true });
  });
});
