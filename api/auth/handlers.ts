import type { Request, ResponseToolkit } from "@hapi/hapi";

import { User } from "@/models/user.js";

export async function login(request: Request, h: ResponseToolkit) {
  const { email, password } = request.payload as {
    email: string;
    password: string;
  };

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return h.response({ success: false }).code(401);
  }

  const success = await Bun.password.verify(password, user.hash);
  if (!success) {
    return h.response({ success: false }).code(401);
  }

  console.log(`User ${user._id} authenticated via email/password`);

  // set cookie
  request.cookieAuth.set({
    id: user._id.toString(),
  });

  return h.response(user.getSafeData()).code(200);
}

export async function logout(request: Request, h: ResponseToolkit) {
  request.cookieAuth.clear();
  return h.response({ success: true }).code(200);
}
