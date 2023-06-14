import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET( 
    req : NextApiRequest,
    res : NextApiResponse) {
        try {
            const users = await prisma.user.findMany()    
           return NextResponse.json(users)
         }
         catch (error){
            console.log(error)
           return  NextResponse.json({message: 'No users found'})

         }
        // } else if (req.method === 'POST'){
        //     const { email ,  password, username}  = req.body

        //     const bodyErrors : string[] = []
        //     if (!email){
        //         bodyErrors.push('Email is required')
        //     }
        //     if (!password){
        //         bodyErrors.push('Password is required')
        //     }
        //     if (!username){
        //         bodyErrors.push('Username is required')
        //     }
        //     if (bodyErrors.length > 0){
        //         throw new Error('Error : ' + bodyErrors.join(', '))
        //     } 
            
        //     try {
        //         const hashedPassword : string =  await bcrypt.hash(password, 10)
        //         const user = await prisma.user.create({
        //             data: {
        //                 email,
        //                 password : hashedPassword,
        //                 username,
        //         }
        //         })
        //         return res.status(200).json(user)
        //     }
        //     catch (error){
        //         console.log(error)
        //         return res.status(400).json({message: 'Unable to create user'})
        //     }
            
         
    }
