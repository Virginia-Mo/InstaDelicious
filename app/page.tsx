'use client'

import Link from 'next/link'
import LoginForm from '@/components/forms/loginForm'
import ButtonSign from '@/components/profile/buttonCompo'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
// useEffect(()=> {
//   dispatch(fetchComments())
//   console.log("comments",users)
// }, [dispatch])

    const { data: session } = useSession()

  return (<>
      <main className="bg-slate-50 h-screen">
        {session?.user  &&
        <div>Profile<ButtonSign /></div>}
        {!session?.user  && 
        <div className='flex p-40 max-w-full gap-2'>
          <section className='w-1/2'>
        <img src="/assets/bowl.jpg" alt="breakfast bowl" className='rounded-lg max-w-full h-full w-5/6 myt-0 mx-auto'/>
        </section>
        <section className='text-center w-1/3'>

        <LoginForm />
        
        </section>
          </div>}
        <p className='text-center text-black'>CopyRights @ Virginia Mo</p>
        </main>
        

      </>
  )
}
