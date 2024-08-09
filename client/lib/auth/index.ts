import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { JWT } from "next-auth/jwt";
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    
    async session({ session, token }: { session: any; token: JWT }) {
      console.log("session", session);
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

  ...authConfig,
});
