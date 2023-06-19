import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'


export async function GET(request : Request) {
        try {
            const response = await prisma.tag.findMany()
           return NextResponse.json(response)
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No tags found'})

         }
    }

interface RequestData {
    name: string
}

export async function POST(request : Request) {

        const body : RequestData = await request.json()

        try {
            const response = await prisma.tag.create({
                data: {
                    name: body.name
        }
    })
           return NextResponse.json(response)
         }
         catch (error){
        console.log(error)
           return  NextResponse.json({message: 'No tags found'})

         }
    }


