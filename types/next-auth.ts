import NextAuth from "next-auth/next";
import {Follow, Post} from "./models"

declare module 'next-auth'{
    interface Session { 
        user : {
        userData: {
            createdAt: Date,
            email: string,    
            follow: Follow,
            id: number,
            posts: Post[],
            username: string,
            }
            accessToken: string,
        }
}
}