'use client'

import React, { useEffect } from 'react'
import Navbar from '@/components/navBar/Navbar'
import { useAppSelector, useAppDispatch } from '@/Types/reduxTypes'
import BadgeAvatars from '@/components/avatar/avatar'
import CardPost from '@/components/cardPost/cardPost'
import BigAvatars from '@/components/avatar/bigavatar'
import { getFollowers, getFollowing } from '@/redux/reducers/users'
export default function Profile ({ params }: { params: { id: number } }) {

  const users = useAppSelector((state) => state.persistedReducer.user.users)
  const followers = useAppSelector((state) => state.persistedReducer.user.followers)
  const id = +params.id
  const foundUser = users.find((user) => user.id === id)

  const dispatch = useAppDispatch()

  function getUserFollower (userInf : UserDB)  {
    console.log("GO", userInf)
         
    
        let followerArray : UserDB[] = []
        if (userInf !== undefined && Object.keys(userInf).length > 0) {
                if (userInf.follow[0] !== undefined) {
        let followerInfo : number[] = userInf.follow[0].follower_user_id  
    
        if (followerInfo.length > 0) {
          followerInfo.forEach((element : number) => {
            let foundPeople =  users.find((user) => user.id === element)
    
            if (foundPeople){
              followerArray.push(foundPeople)
            }
          })
          dispatch(getFollowers(followerArray))
            }
        } else {
            return []
        }
          }
        }

if (foundUser){
   console.log("foundUser", foundUser)
  getUserFollower(foundUser)
  console.log("followers", followers)
}


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
            <p> <span className='font-bold'> {followers.length}</span> followers</p>
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
