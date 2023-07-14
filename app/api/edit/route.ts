import prisma from '@/prisma/client'
import {
    NextResponse
} from 'next/server'

const bcrypt = require('bcrypt')

interface RequestData {
    email: string,
    password: string,
    username: string,
    confirmPassword: string,
}

export async function PATCH(req: Request) {
    const body: RequestData = await req.json()
    const bodyErrors: string[] = []
console.log("body", body)

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
    }
}