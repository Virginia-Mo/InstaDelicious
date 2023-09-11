import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'
import { handleToken } from '../../helpers/jwt'
const bcrypt = require('bcrypt')

interface RequestData {
    token: string,
    password: string
}

export async function POST( req : Request, { params }: { params: { id: string }}) {

    const body : RequestData = await req.json()
    const response = await handleToken(req)
    
    const checkedToken = response
    if (checkedToken !== null) {
    try {

    let user  = await prisma.user.findUnique({
        where: {
            id: +params.id
        }
    })

    const checkPassword : string = await bcrypt.compare(body.password, user?.password)

    if (user && checkPassword){
   
            const deletedUser = await prisma.user.delete({
                where: {
                    id: user.id
                }
            })
            if (!deletedUser ) {
                throw new Error('Unable to delete user')
            } else {
                return NextResponse.json({message : 'Your account has been deleted. We are sorry to see you go !'})
            }
    } else {
        return NextResponse.json({message: 'Invalid password'})
    }
      
    } catch (error){
        console.log(error)
        return NextResponse.json({message: 'Unable to delete user'})
}

}    else {
    console.log("Access denied")
    return NextResponse.json({message: 'Access denied'})
}
}