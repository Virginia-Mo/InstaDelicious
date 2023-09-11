'use client'

import { UserDB } from '@/types/models'
import Navbar from '@/components/navBar/Navbar'
import React, {use, useEffect } from "react"
import { useAppSelector, useAppDispatch } from '@/types/reduxTypes'
import CardPost from '@/components/cardPost/cardPost'
import BadgeAvatars from '@/components/avatar/avatar'
import { useSession } from 'next-auth/react'
import { getConnectedUser, getUsers} from '@/async_calls/user/getUser'
import { getOnlineUserFollower, getOnlineUserFollowing, removeCurrentUser } from '@/redux/reducers/users'
import Link from 'next/link'
import { GetFollow } from '@/components/utils/follow'
import { get } from 'http'


export default function Home() {

  const { data: session, status, update } = useSession()

  const dispatch = useAppDispatch()
  const id  = session?.user.userData.id as number

  const user  = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  const users  = useAppSelector((state) => state.persistedReducer.user.users)
  const followers  = useAppSelector((state) => state.persistedReducer.user.onlineUserFollower)
  const following  = useAppSelector((state) => state.persistedReducer.user.onlineUserFollowing)

  const shuffle = users.filter((removeOne) => removeOne.id !== user.id)
  const shuffleUser = [...shuffle]
  const shuffleUsers = shuffleUser.sort(() => Math.random() - 0.5)
  const shuffleUsersSlice = shuffleUsers.slice(0, 4)
  
   const followingPost = following?.map((user) => user.posts)
   const fArray = followingPost?.flat()
   const sortedArray = fArray?.sort((a, b) => b.id - a.id) 


   useEffect(() => {
    dispatch(removeCurrentUser())
     getConnectedUser(id)
     getUsers()
   }, [id])

   useEffect(() => {
    console.log("heeee")
if (user && users) {
    const follows = GetFollow(user, users)
    if (follows){
      dispatch(getOnlineUserFollower(follows.followerUser))
      dispatch(getOnlineUserFollowing(follows.followingUser))
    }}
   }, [user, users])

  if (status === "loading") {     
    getConnectedUser(id)
    getUsers()
console.log("user", user.id)
    
    return <p>Loading...</p>
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }    
  return (
    <div>
  { (user && following) &&   
    <div className='text-black flex w-full gap-10 h-screen justify-between'>
        <Navbar />
        {user !== null && Object.keys(user).length > 0 &&
        <><section className=' overflow-auto section-scroll grow'>
          <div className='flex flex-col gap-6 justify-center items-center'>
            { sortedArray?.length === 0 && <h1 className='text-2xl font-bold mt-8'>Follow someone to see their posts</h1>}
            {sortedArray.map((post) => (
              <article key={post.id} className='w-full'>
                <CardPost post={post}/>
              </article>
            ))}
          </div>
        </section>
        <section className='grow'>
        <Link href={`/profile/${user.id}`} className='text-xl'>
            <BadgeAvatars user={user} />
        </Link>
            <h1 className='text-2xl font-bold mt-6 mb-4'>Check those users </h1>
            {
              shuffleUsersSlice.map((user) => (
                <div className='mb-5 text-base' key={user.id}>
                <Link href={`/profile/${user.id}`}>
                <BadgeAvatars user={user}/>
                </Link>
                </div>))
            }
          </section></>
        } 
    </div>}</div>
  )
}