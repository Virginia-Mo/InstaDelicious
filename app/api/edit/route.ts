import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'
import { handleToken } from '../helpers/jwt'

const bcrypt = require('bcrypt')
const secret = process.env.NEXTAUTH_SECRET
interface RequestData {
    email: string,
    password: string,
    username: string,
    confirmPassword: string,
    picture: string,
    bio: string,
}

export async function PATCH(req: Request) {
    const body: RequestData = await req.json()
    const bodyErrors: string[] = []

    const response = await handleToken(req)
    const checkedToken = response
    console.log("body", checkedToken)

    if (checkedToken !== null) {
    try {
        if (body.password !== body.confirmPassword) {
            throw new Error('Error : Passwords do not match')
        } 
        if (bodyErrors.length > 0) {
            throw new Error('Error : ' + bodyErrors.join(', '))
        }
        
        console.log("body2", body)
        const hashedPassword : string =  await bcrypt.hash(body.password, 10)
        const user = await prisma.user.update({
            where: {
                email: body.email
            },
            data: {
                email : body.email,
                password : hashedPassword,
                username : body.username,
        }
        })
        if (!user) {
            throw new Error('Unable to update user')
        }  
        return NextResponse.json({message : 'Your account has been updated successfully ! '})
    }
    catch (error){
        console.log(error)
        return NextResponse.json({message: 'Unable to create user'})
    } } else {
        console.log("Access denied")
        return NextResponse.json({message: 'Access denied'})
    }
}

export async function PUT(req: Request) {
    const body: RequestData = await req.json()
    const bodyErrors: string[] = []

    const response = await handleToken(req)
    const checkedToken = response
    if (checkedToken !== null) {
    try {
        const user = await prisma.user.update({
            where: {
                email: body.email
            },
            data: {
                picture : body.picture,
                bio : body.bio,
        }
        })
        if (!user) {
            throw new Error('Unable to update user')
        }  
        return NextResponse.json({message : 'Your account has been updated successfully ! '})
    }
    catch (error){
        console.log(error)
        return NextResponse.json({message: 'Unable to create user'})
    }
} else {
    console.log("Access denied")
    return NextResponse.json({message: 'Access denied'})
}
}