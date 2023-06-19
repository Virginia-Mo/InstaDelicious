import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'


export async function GET(request : Request) {
        try {
            const response = await prisma.comment.findMany()
           return NextResponse.json(response)
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No comments found'})

         }
    }

interface RequestData {
      text: string,
      authorId: number,
      postId: number
  }
export async function POST(request : Request) {
  const body : RequestData = await request.json()

      try {
          const response = await prisma.comment.create({
              data : {
                text: body.text,
                authorId: body.authorId,
                postId: body.postId
              }
          })
         return NextResponse.json(response)
       }
       catch (error){
          console.log(error)
         return  NextResponse.json({message: 'Unable to create comment'})

       }
  }
  export async function DELETE(request : Request,  { params }: { params: { id: string }}) {
    const {query} = request
    console.log(query)
        // try {
        //     const response = await prisma.comment.delete({
        //         where : {
        //           id: body
        //         }
        //     })
        //    return NextResponse.json({message: 'Comment deleted'})
        //  }
        //  catch (error){
        //     console.log(error)
        //    return  NextResponse.json({message: 'Unable to create comment'})
  
        //  }
    }
 