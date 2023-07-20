import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET( request : Request, { params }: {params : { id : number}}) {
    const session = await getServerSession(authOptions)
    if (session) {
        try {
            
            const user = await prisma.user.findUnique(
                { where : {
                    id : +params.id
                },
                include: {
                    posts: {
                        include: {
                            comments: true,
                            like: true
                        }
                    },
                    follow: true,
                }
                }
            )   
            let {password,  ...userWithoutPassword} = user
           return new Response(JSON.stringify(userWithoutPassword))
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No user found'})
         } 
        } else {
            return NextResponse.json("Access denied")
         }
    }