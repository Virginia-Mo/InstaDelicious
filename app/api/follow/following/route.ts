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
          if (response){
            const response2 = await prisma.follower.update({
              where : {
                userId: +body.superId
              },
              data : {
                follower_user_id : {
                  push : +body.userId
                }
          }
        })
          }
          
           return NextResponse.json({message : "Following completed"})
         
        }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'Unable to create post'})
  
         }
    }

export async function PATCH(request : Request) {
      const body = await request.json()
      console.log("PAAAATCHHHH")
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
          }
          const followArray2 = await prisma.follower.findUnique({
            where : {
              userId :  +body.superId
          }})

          let followingArray2 : number[] = followArray2?.follower_user_id

          if (followingArray2.length > 0 && followingArray2.includes(+body.userId)) {
            followingArray2 = followingArray2.filter((id) => id !== +body.userId)

            const response2 = await prisma.follower.update({
              where : {
                userId: +body.superId
              },
              data : {
                follower_user_id : {
                  set : followingArray2
                }
              }
          })
          }

          return NextResponse.json({message : "task completed"}) 
          } catch (error) {
              console.log(error)
             return  NextResponse.json({message: 'Unable to create follow'})
    
           }
      }