import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'


export async function GET(request : Request) {
        try {
            const response = await prisma.post.findMany()
           return NextResponse.json(response)
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No comments found'})

         }
    }

interface RequestData {
    title: string,
    authorId: number,
    description: string,
    details: string,
    ingredients: string,
    url: string
  }
export async function POST(request : Request) {
  const body : RequestData = await request.json()
      try {
          const response = await prisma.post.create({
              data : {
                title: body.title,
                authorId: body.authorId,
                description: body.description,
                details: body.details,
                ingredients: body.ingredients,
                url: body.url
              }
          })
          if (response){
            const addLike = await prisma.likes.create({
                data: {
                    amount: 0,
                    postId: response.id
          }})
         return NextResponse.json(addLike)
       }
      }
       catch (error){
          console.log(error)
         return  NextResponse.json({message: 'Unable to create post'})

       }
  }