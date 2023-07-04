import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'


export async function GET( 
    req : NextApiRequest,
    res : NextApiResponse) {
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
           return NextResponse.json(users)
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No users found'})

         }
    }


