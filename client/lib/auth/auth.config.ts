import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/schemas";
import { instance } from "../utils";
import { JWT } from "next-auth/jwt";

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

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },

  // JWT'nin nasıl işleneceğini belirleyen seçenekler
  session: {
    strategy: "jwt",
  },

  // JWT'nin şifrelenmesi için bir gizli anahtar (Bu anahtarı güvenli bir şekilde saklayın)
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
