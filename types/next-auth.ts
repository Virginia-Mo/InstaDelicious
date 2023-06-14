import NextAuth from "next-auth/next";

declare module 'next-auth'{
    interface Session { 
    user: {
        id: number,
        username: string,
        email: string,
        accessToken: string,
    }
}
}