'use client'

import React, { useEffect } from 'react'
import Navbar from '@/components/navBar/Navbar'
import { useAppSelector, useAppDispatch } from '@/Types/reduxTypes'
import BadgeAvatars from '@/components/avatar/avatar'
import CardPost from '@/components/cardPost/cardPost'
import BigAvatars from '@/components/avatar/bigavatar'
import { getOnlineUserFollower } from '@/redux/reducers/users'
export default function Profile ({ params }: { params: { id: number } }) {

  const foundUser = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  const followers = useAppSelector((state) => state.persistedReducer.user.userFollower)
  
  const users  = useAppSelector((state) => state.persistedReducer.user.users)
  

  const dispatch = useAppDispatch()

  const getFollower = (user) => {
    let followerArray : UserDB[] = []
    if (user !== undefined && Object.keys(user).length > 0) {
    let followerInfo : number[] = user.follow[0].follower_user_id  

    if (followerInfo.length > 0) {
      followerInfo.forEach((element : number) => {
        let foundPeople =  users.find((user) => user.id === element)

        if (foundPeople){
          followerArray.push(foundPeople)
        }
      })
      console.log("followerArray", followerArray)
      dispatch(getOnlineUserFollower(followerArray))
        }
      }
    }

    useEffect(() => {
        getFollower(foundUser)
      }, [foundUser])


  return (
    <div className='flex h-screen'>
     <Navbar />
    <div className='grow flex justify-center mt-10'>
    <main >
      <section className='flex text-2xl gap-32 pb-16 border border-transparent border-b-red-300 mb-2'>
        <div>
            <BigAvatars user={foundUser} />
        </div> 
        <div className='flex flex-col justify-evenly'>
          <p> <span className='font-bold'> {foundUser?.username}</span></p>
          <div className='flex gap-5 mb-10'>
            <p> <span className='font-bold'>{foundUser?.posts.length} </span> posts</p>
            {
              followers !== undefined && 
              <p> <span className='font-bold'> {followers.length}</span> followers</p>
            }
           {
            followers === undefined &&
            <p> <span className='font-bold'> 0</span> follower</p>
           }
            <p>1022 following</p> 
          </div>
          </div>
          </section>
      <section className='flex flex-wrap gap-2 '>
      {foundUser?.posts.map((post) => (
        <article key={post.id} className='w-80 h-80'>
               <img src={post.url} alt="" className='h-full w-full'/>
              </article>
            ))}
      </section>
    </main>
      
          
    </div>
  </div>
  )
}
