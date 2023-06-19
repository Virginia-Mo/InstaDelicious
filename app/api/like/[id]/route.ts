import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function PATCH(request : Request,  { params }: { params: { id: string }}) {

        try {
            const foundPost = await prisma.likes.findUnique({
                where: {
                    postId: +params.id
                }
            })
            if (foundPost){
            const response = await prisma.likes.update({
                where: {
                    postId: +params.id
                },
                data: {
                amount : foundPost.amount + 1
                }
        })
        
        return NextResponse.json(response)
        }  else return NextResponse.json({message: 'No Post found'})
         }
         catch (error){
        console.log(error)
           return  NextResponse.json({message: 'Could not add like'})

         }
    }
export async function PUT(request : Request,  { params }: { params: { id: string }}) {

        try {
            const foundPost = await prisma.likes.findUnique({
                where: {
                    postId: +params.id
                }
            })
            if (foundPost){
            const minusLike = await prisma.likes.update({
                where: {
                    postId: +params.id
                },
                data: {
                amount : foundPost.amount -1
                }
        })
        return NextResponse.json(minusLike)
}
         }
         catch (error){
        console.log(error)
           return  NextResponse.json({message: 'Could not add like'})

         }
    }