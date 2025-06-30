import type { Request } from "@hapi/hapi";
import { config } from "@/config/index.js";
import { User } from "@/models/user.js";

export type Credentials = {
  userId?: string;
  type?: string;
  role: string;
};

export default {
  cookie: {
    name: "session-cookie",
    password: config.cookie.secret,
    isSecure: true,
    isSameSite: "None",
    ttl: 1000 * 60 * 60, // 60 minutes
    path: "/",
  },
  keepAlive: true,
  validate: async (_: Request, session: { id: any; requires2fa?: boolean }) => {
    let isValid = false;
    const credentials: Credentials = { role: "" };

    const user = await User.findOne({
      _id: session.id,
    });

    if (user) {
      user.active = new Date();
      await user.save();

      isValid = true;
      credentials.userId = user._id.toString();
      credentials.type = "cookie";

      // only set roles if fully authenticated
      if (!user.requiresPasswordReset) {
        credentials.role = user.role;
      }
    }

    return {
      isValid,
      credentials,
    };
  },
};
