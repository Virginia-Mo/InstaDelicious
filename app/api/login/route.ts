import { signJwtAccess } from '@/lib/jwt'
import prisma from '@/prisma/client'
const bcrypt = require('bcrypt')


interface RequestData {
    email: string,
    password: string
}

export async function POST( request : Request) {
    
    const body : RequestData = await request.json()
    
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })
    const checkPassword = await bcrypt.compare(body.password, user?.password)
    if (user && checkPassword){
       const {password, ...userData} = user
       const accessToken = signJwtAccess(userData)
       const result = {
              ...userData,
                accessToken
       }
       return new Response(JSON.stringify(result))

    } else return new Response (JSON.stringify({message: 'Invalid email or password'}))
}