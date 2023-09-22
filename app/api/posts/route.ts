import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'
import { handleToken } from '../helpers/jwt'

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
    url: string,
    tags : string[]
  }
export async function POST(request : Request) {
  const body : RequestData = await request.json()
  const response = await handleToken(request)
  const checkedToken = response
  if (checkedToken !== null) {
      try {   
        const tags = await prisma.tag.findMany()

        const tagNames = tags.map((tag) => tag.name)

        const hashtags = body.tags.filter((hashtag) => {
            return (!tagNames.includes(hashtag))
        }
        )

        if (hashtags.length > 0) {
          try {
           const newTags = await prisma.tag.createMany({
                data: hashtags.map((hashtag) => {
                    return {
                        name: hashtag
                    }
                })
            })
          const newTagsArray = await prisma.tag.findMany()
            console.log(newTagsArray)
          } catch (error) {
              console.log(error)
        }
      }

          const response = await prisma.post.create({
              data : {
                title: body.title,
                authorId: body.authorId,
                description: body.description,
                details: body.details,
                ingredients: body.ingredients,
                url: body.url,
                tags : {
                  connect: body.tags.map((tag) => {
                    return {
                      name: tag
                    }   
                  })
                  }
                }
                })
                console.log(response)
      //     if (response){
      //       const addLike = await prisma.likes.create({
      //           data: {
      //               amount: 0,
      //               postId: response.id
      //     }})
      //     return NextResponse.json({message : 'Your post has been created successfully ! '})
      //  }
      }
       catch (error){
          console.log(error)
          return error
       }
        }  else {
        console.log("Access denied")
        return NextResponse.json({message: 'Access denied'})
    }
    }

export async function PUT(request : Request) {
  const body = await request.json()
  const response = await handleToken(request)
    console.log(response)
  const checkedToken = response
  if (checkedToken !== null) {
  try {
    const response = await prisma.post.delete({
        where : {
            id : body.id
        },
    })
    if (response){
        return NextResponse.json({message : 'Your post has been deleted successfully ! '})
    }
  } catch (error){
      console.log(error)
      return error
  }
}  else {
  console.log("Access denied")
  return NextResponse.json({message: 'Access denied'})
}
}