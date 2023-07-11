import prisma from '@/prisma/client'
import {
    NextResponse
} from 'next/server'

const bcrypt = require('bcrypt')

interface RequestData {
    email: string,
    password: string,
    username: string,
    picture: string
}

export async function POST(req: Request) {
    const body: RequestData = await req.json()

    const bodyErrors: string[] = []

    if (!body.email) {
        bodyErrors.push('Email is required')
    }
    if (!body.password) {
        bodyErrors.push('Password is required')
    }
    if (!body.username) {
        bodyErrors.push('Username is required')
    }
    if (bodyErrors.length > 0) {
        throw new Error('Error : ' + bodyErrors.join(', '))
    }

    try {
        const hashedPassword : string =  await bcrypt.hash(body.password, 10)
        const user = await prisma.user.create({
            data: {
                email : body.email,
                password : hashedPassword,
                username : body.username,
                picture : body.picture
        }
        })
        if (!user) {
            throw new Error('Unable to create user')
        }  

        const newUser = await prisma.user.findUnique({
            where : {
                email : body.email
            }
        })

        if (newUser){
            const followTable = await prisma.follower.create({
                data: {
                    userId : newUser.id
            }
            })

        }

        if (!user) {
            throw new Error('Unable to create user')
        }  
        return NextResponse.json({message : 'Your account has been created successfully, you can now login ! '})
    }
    catch (error){
        console.log(error)
        return NextResponse.json({message: 'Unable to create user'})
    }
}