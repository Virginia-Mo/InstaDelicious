import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'


export async function GET( request : Request, { params }: {params : { id : number}}) {
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
           return new Response(JSON.stringify(user))
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No user found'})

         }
    }