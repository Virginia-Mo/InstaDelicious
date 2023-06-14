import NextAuth, { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"


interface Credentials {
  email: string
  password: string
}

const handler = NextAuth ({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials: Credentials, req : RequestInternal) {
        const res = await axios.post("http://localhost:3000/api/login", {
          email: credentials.email,
          password: credentials.password,
        })
        const user = await res.data
        console.log("HEY", user)
        if (user){
          return user
        } else {
          return null
        }
  }
    })
  ],
   callbacks: {
    async jwt({token, user}) {
      return {...token, ...user}
    },
    async session({session, token}) {
    session.user = token as any
    return session
    }}
//  pages: {
//     signIn: "/signin",
//  }

})

export { handler as GET, handler as POST }