import prisma from '@/prisma/client'
import { data } from 'autoprefixer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function POST(request : Request) {
    const body = await request.json()
        try {
            const response = await prisma.follower.update({
                where : {
                  userId: +body.userId
                },
                data : {
                  following_user_id : {
                    push : +body.superId
                  }
            }
          })
          
           return NextResponse.json(response)
         
        }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'Unable to create post'})
  
         }
    }