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

  callbacks: {
<<<<<<< HEAD
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },

=======
    
>>>>>>> afa583aeba446c7d5ccc9e2fe538d3fae75934d6
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.sub;
      console.log("session", session);
      return session;
    },
    
    async jwt({ token }: { token: JWT; user: any }) {
      console.log("token", token);
      
      return token;
    },
  },

  // JWT'nin nasıl işleneceğini belirleyen seçenekler
  session: {
    strategy: "jwt",
  },

  // JWT'nin şifrelenmesi için bir gizli anahtar (Bu anahtarı güvenli bir şekilde saklayın)
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
