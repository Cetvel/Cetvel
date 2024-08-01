import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/schemas";
import { instance } from "../utils";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const user = await instance
            .post("/auth/login", credentials)
            .then((res) => res.data)
            .catch((error) => {
              throw new Error(error.response.data.message);
            });

          if (user) {
            return user;
          }
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
