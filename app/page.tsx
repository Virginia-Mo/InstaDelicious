'use client'

import Link from 'next/link'
import React, {useEffect } from "react"
import LoginForm from '@/components/forms/loginForm'
import ButtonSign from '@/components/profile/buttonCompo'
import { useSession, signIn, signOut } from "next-auth/react"
import Home from './home/page'
import { useAppDispatch, useAppSelector } from '@/Types/reduxTypes'
import { setOnline } from '@/redux/reducers/users'
import { fetchUser } from '@/redux/middlewares/users'
// import React, {useEffect } from "react"

export default function FirstPage() {
const dispatch = useAppDispatch()
    const { data: session } = useSession()
    // if (session) {
    //   dispatch(setOnline(true))
    //   dispatch(fetchUser(session.user.userData.id))
    // }
  
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
