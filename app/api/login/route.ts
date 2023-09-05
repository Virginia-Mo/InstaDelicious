import { signJwtAccess } from '@/lib/jwt'
import prisma from '@/prisma/client'
const bcrypt = require('bcrypt')


interface RequestData {
    email: string,
    password: string
}

export async function POST( request : Request) {
    
    const body : RequestData = await request.json()
    
    let user = await prisma.user.findUnique({
        where: {
            email: body.email
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
    })
    const checkPassword : string = await bcrypt.compare(body.password, user?.password)
    console.log(checkPassword)
    if (user && checkPassword){
        const {password, ...userData} = user
        
    const accessToken = signJwtAccess(userData)
    const result = {
            userData,
            accessToken
    }
       return new Response(JSON.stringify(result))

    } 
    // return new Response (JSON.stringify({message: 'Invalid email or password'}))
}
//try catch