import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function PATCH(request : Request,  { params }: { params: { id: string }}) {
    const body = await request.json()
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
                amount : foundPost.amount + 1,
                userslikes: {
                    push : +body.userId
                }
        }})
        
        return NextResponse.json(response)
        }  else return NextResponse.json({message: 'No Post found'})
         }
         catch (error){
        console.log(error)
           return  NextResponse.json({message: 'Could not add like'})

         }
    }
export async function PUT(request : Request,  { params }: { params: { id: string }}) {
    const body = await request.json()
        try {
            const foundPost = await prisma.likes.findUnique({
                where: {
                    postId: +params.id
                }
            })
            if (foundPost){
            let likeArray : number[] = foundPost.userslikes
            const newArray = likeArray.filter((user) => user !== body.userId)
            const minusLike = await prisma.likes.update({
                where: {
                    postId: +params.id
                },
                data: {
                amount : foundPost.amount - 1,
                userslikes : {
                    set : newArray
                }}
        })
        return NextResponse.json(minusLike)
}
         }
         catch (error){
        console.log(error)
           return  NextResponse.json({message: 'Could not add like'})

         }
    }
export async function GET(request : Request,  { params }: { params: { id: string }}) {
        try {
            const response = await prisma.likes.findUnique({
                where: {
                    postId: +params.id
                }
            })
           return NextResponse.json(response)
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No likes found'})

         }
    }