import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'


export async function DELETE(request : Request,  { params }: { params: { id: string }}) {

        try {
            const response = await prisma.comment.delete({
                where : {
                  id: +params.id
                }
            })
           return NextResponse.json({message: 'Comment deleted'})
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'Unable to create comment'})
  
         }
    }
 