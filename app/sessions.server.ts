import { createCookieSessionStorage } from "@remix-run/node";

export const unencryptedSession = createCookieSessionStorage({
  cookie: {
    path: "/",
    sameSite: "lax",
  },
});
