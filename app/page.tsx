'use client'

import React, {useEffect } from "react"
import LoginForm from '@/components/forms/loginForm'
import { useSession } from "next-auth/react"
import Home from './home/page'
import { useAppDispatch, useAppSelector } from '@/types/reduxTypes'
import { getConnectedUser } from "@/async_calls/user/getUser"
import { red } from "@mui/material/colors"
import { redirect } from "next/navigation"
import { getMessage } from "@/redux/reducers/message"

export default function FirstPage() {
const dispatch = useAppDispatch()
    const { data: session } = useSession()
    // const user = useAppSelector((state) => state.persistedReducer.user.user)
    const id = session?.user.userData.id as number
if (session?.user.userData) {
    redirect('/home')
}
dispatch(getMessage(''))
    // useEffect(() => {
    //     if (session?.user.userData) {
    //       console.log("session", session?.user.userData.id)
    //       getConnectedUser(id)
    //     }
    // }, [id])


  return (
  <>
      {<main className='flex h-full'>
        {/* { session?.user.userData &&
        <div className='w-full'>
       <Home/>
       </div>
       } */}
        {!session?.user  && 
        <div className='flex p-40 max-w-full gap-2'>
          <section className='w-1/2'>
        <img src="/assets/bowl.jpg" alt="breakfast bowl" className='rounded-lg max-w-full h-full w-5/6 my-0 mx-auto'/>
        </section>
        <section className='text-center w-1/3'>

        <LoginForm />
        
        </section>
          </div>} 
       
        </main>
         }

      </>
  )
}