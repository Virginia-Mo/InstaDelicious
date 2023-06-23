'use client'

import { UserDB } from '@/Types/models'
import Navbar from '@/components/navBar/Navbar'
import React, {useEffect } from "react"
import { useAppSelector, useAppDispatch } from '@/Types/reduxTypes'
import CardPost from '@/components/cardPost/cardPost'
import BadgeAvatars from '@/components/avatar/avatar'
import { useSession } from 'next-auth/react'
import { getConnectedUser } from '@/async_calls/user/getUser'
import { setOnline } from '@/redux/reducers/users'
import { fetchUser } from '@/redux/middlewares/users'

export default function  Profile() {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  console.log(session)
  const id  = session?.user.userData.id

  useEffect(() => {
  getConnectedUser(id)
  }, [id])
  const user : UserDB = useAppSelector((state) => state.persistedReducer.user.user)
  
  const online = useAppSelector((state) => state.persistedReducer.user.online)
  return (
    <div className='text-black flex w-full gap-20'>
        <Navbar />
        {user !== null && Object.keys(user).length > 0 &&
        <><section className='flex flex-col gap-10 justify-center items-center'>
          <div>
            {user.posts.map((post) => (
              <article key={post.id}>
                <CardPost post={post} />
              </article>
            ))}
          </div>
        </section><section>
            <BadgeAvatars user={user} />
          </section></>
        }
    </div>
  )
}