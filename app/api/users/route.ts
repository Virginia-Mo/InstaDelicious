import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET( 
    req : NextApiRequest,
    res : NextApiResponse) {
      const session = await getServerSession(authOptions)
      if (session) {
        try {
            const users = await prisma.user.findMany(
              {include: {
                posts: {
                    include: {
                        comments: true,
                        like: true
                    }
                },
                follow: true,
            }}
            )    
            const filteredUsers =  users.map(({email, password, ...filterUser}) => filterUser)
           return NextResponse.json(filteredUsers)
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No users found'})

         }  
        } else {
            return NextResponse.json("Access denied")
         }
    }  
    
  

