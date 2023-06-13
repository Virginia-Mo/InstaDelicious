import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function GET (
    req : NextApiRequest,
    res : NextApiResponse){
        try {
            const users = await prisma.user.findMany()    
           return res.status(200).json(users)
         }
         catch (error){
            console.log(error)
           return  res.status(404).json({message: 'No users found'})

         }
    }