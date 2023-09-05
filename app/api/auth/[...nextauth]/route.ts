import NextAuth, { RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { User } from "@/types/models";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "",
      credentials: {},
      async authorize(credentials: Credentials, req: RequestInternal) {
        const res = await axios.post("http://localhost:3000/api/login", {
          email: credentials.email,
          password: credentials.password,
        });
        const user: User = await res.data;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
