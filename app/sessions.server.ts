import { createCookieSessionStorage } from "remix";

export const unencryptedSession = createCookieSessionStorage({
  cookie: {
    path: "/",
    sameSite: "lax",
  },
});
