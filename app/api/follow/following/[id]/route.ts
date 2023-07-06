import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

interface RequestData {
  id: number
}
export async function GET(request : Request,  { params }: { params: { id: string }}) {
        try {
            const following = await prisma.follower.findUnique({
              where : {
                userId :  +params.id
            }})
          
           return NextResponse.json(following)
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No following found'})

         }
    }
