import prisma from '@/prisma/client'
import { Follow } from '@/Types/models'
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

export async function PATCH(request : Request) {
      const body = await request.json()
          try {

            const followArray = await prisma.follower.findUnique({
              where : {
                userId :  +body.userId
            }})

            let followingArray : number[] = followArray?.following_user_id

            if (followingArray.length > 0 && followingArray.includes(+body.superId)) {
              followingArray = followingArray.filter((id) => id !== +body.superId)

              const response = await prisma.follower.update({
                where : {
                  userId: +body.userId
                },
                data : {
                  following_user_id : {
                    set : followingArray
                  }
            }
          })
          return NextResponse.json(response) }
          } catch (error) {
              console.log(error)
             return  NextResponse.json({message: 'Unable to create post'})
    
           }
      }