import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/schemas";
import { instance } from "../utils";
import { JWT } from "next-auth/jwt";

export default {
  providers: [
    Credentials({

      async authorize(credentials) {
        console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
        console.log("authorize calisti", credentials);
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const user = await instance
            .post("/auth/login", credentials)
            .then((res) => res.data)
            .catch((error) => { 
              throw new Error(error.response.data.message);
            });

            console.log("user", user);

          if (user) {
            return user;
          }
        }
      },
    }),
  ],

  
} satisfies NextAuthConfig;
