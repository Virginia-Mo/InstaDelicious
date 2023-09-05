'use client'

import React, {useEffect } from "react"
import LoginForm from '@/components/forms/loginForm'
import { useSession } from "next-auth/react"
import Home from './home/page'
import { useAppDispatch, useAppSelector } from '@/types/reduxTypes'

export default function FirstPage() {
const dispatch = useAppDispatch()
    const { data: session } = useSession()
    console.log(session)
  
    const user = useAppSelector((state) => state.persistedReducer.user.user)
  return (
  <>
      {<main className='flex h-full'>
        { session?.user.userData &&
        <div className='w-full'>
       <Home/>
       </div>
       }
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
