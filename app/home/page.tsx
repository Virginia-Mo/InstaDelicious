'use client'

import { UserDB } from '@/Types/models'
import Navbar from '@/components/navBar/Navbar'
import React, {use, useEffect } from "react"
import { useAppSelector, useAppDispatch } from '@/Types/reduxTypes'
import CardPost from '@/components/cardPost/cardPost'
import BadgeAvatars from '@/components/avatar/avatar'
import { useSession } from 'next-auth/react'
import { getConnectedUser, getUsers} from '@/async_calls/user/getUser'
import { getOnlineUserFollower, getOnlineUserFollowing } from '@/redux/reducers/users'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const id  = session?.user.userData.id

  const user  = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  
  const users  = useAppSelector((state) => state.persistedReducer.user.users)
  
  const followers  = useAppSelector((state) => state.persistedReducer.user.onlineUserFollower)
  const following  = useAppSelector((state) => state.persistedReducer.user.onlineUserFollowing)


  const getFollow = (onlineUser : UserDB) => {
    let followerArray : UserDB[] = []
    let followingArray : UserDB[] = []

    if (onlineUser !== undefined && Object.keys(onlineUser).length > 0) {
    let followerInfo : number[] = onlineUser.follow[0].follower_user_id  
    let followingInfo : number[] = onlineUser.follow[0].following_user_id  

    if (followerInfo.length > 0) {
      followerInfo.forEach((element : number) => {
        let foundPeople =  users.find((user) => user.id === element)

        if (foundPeople){
          followerArray.push(foundPeople)
        }
      })
      dispatch(getOnlineUserFollower(followerArray))
        }

        if (followingInfo.length > 0) {
          console.log("followingInfo", followingInfo)
          followingInfo.forEach((element : number) => {
            let foundPeople2 =  users.find((user) => user.id === element)
    
            if (foundPeople2){
              followingArray.push(foundPeople2)
            }
          })
          dispatch(getOnlineUserFollowing(followingArray))
            }
      }
    }

  useEffect(() => {
    getUsers()
    getConnectedUser(id)
    console.log("user", user)
    getFollow(user)
  }, [])


  const followingPost = following?.map((user) => user.posts)
  const fArray = followingPost?.flat()
  const sortedArray = fArray?.sort((a, b) => b.id - a.id) 
  console.log("sortedArray", sortedArray)
      // let Following = user.follow[0].following_user_id
      
  return (
    <div>
{  (user && following) &&   
    <div className='text-black flex w-full gap-10 h-screen justify-between mt-4'>
        <Navbar />
        {user !== null && Object.keys(user).length > 0 &&
        <><section className=' overflow-auto section-scroll grow'>
          <div className='flex flex-col gap-10 justify-center items-center'>
            {sortedArray.map((post) => (
              <article key={post.id} className='w-full'>
                <CardPost post={post} />
              </article>
            ))}
          </div>
        </section>
        <section className='grow'>
        <Link href={`/profile`}>
            <BadgeAvatars user={user} />
        </Link>
            <h1 className='text-2xl font-bold text-center mt-8'>Your followers</h1>
            {
              followers.map((user) => (
                <>
                <Link href={`/profile/${user.id}`}>
                <BadgeAvatars user={user} />
                <p key={user.id}>{user.username}</p>
                </Link>
                </>))
            }
          </section></>
        } 
    </div>}</div>
  )
}