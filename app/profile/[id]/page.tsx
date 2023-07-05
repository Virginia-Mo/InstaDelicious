'use client'


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  // bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,

};


import React, { useEffect } from 'react'
import Navbar from '@/components/navBar/Navbar'
import { useAppSelector, useAppDispatch } from '@/Types/reduxTypes'
import BadgeAvatars from '@/components/avatar/avatar'
import CardPost from '@/components/cardPost/cardPost'
import { UserDB } from '@/Types/models'
import BigAvatars from '@/components/avatar/bigavatar'
import { getFollowers, getFollowing } from '@/redux/reducers/users'
import { set } from 'react-hook-form';
export default function Profile ({ params }: { params: { id: number } }) {

  const users = useAppSelector((state) => state.persistedReducer.user.users)
  const followers = useAppSelector((state) => state.persistedReducer.user.followers)
  const following = useAppSelector((state) => state.persistedReducer.user.following)
  const id = +params.id
  const foundUser = users.find((user) => user.id === id)

  const dispatch = useAppDispatch()

  function getUserFollower (userInf : UserDB)  {
    console.log("GO", userInf)
        let followerArray : UserDB[] = []
        let followingArray : UserDB[] = []

        if (userInf !== undefined) {
          if (userInf.follow.length === 0) {
            console.log("empty")
            dispatch(getFollowers())
            dispatch(getFollowing())
          } else {
console.log("not empty")
        let followerInfo : number[] = userInf.follow[0].follower_user_id  
        let followingInfo : number[] = userInf.follow[0].following_user_id
    
        if (followingInfo.length > 0) {
          followerInfo.forEach((element : number) => {
            let foundPeople =  users.find((user) => user.id === element)
    
            if (foundPeople){
              followerArray.push(foundPeople)
            }
          })
          console.log("ARRAY", followerArray)
          dispatch(getFollowers(followerArray))

        } else {
          dispatch(getFollowers())
        }

        if (followingInfo.length > 0) {
            console.log("followingInfo", followingInfo)
            followingInfo.forEach((element : number) => {
          let foundPeople2 =  users.find((user) => user.id === element)
      
          if (foundPeople2){
                followingArray.push(foundPeople2)
              }
            })
            console.log("ARRAY", followingArray)
            dispatch(getFollowing(followingArray))
  
          } else {
            dispatch(getFollowing())
             }
          }}
        }
useEffect(() => {
if (foundUser){
   console.log("foundUser", foundUser)
  getUserFollower(foundUser)
  console.log("followers2", followers)
}
}, [])
const [open, setOpen] = React.useState(false);
const [selectedPost, setselectedPost] = React.useState('' as any)
const [selectedImg, setSelectedImg] = React.useState('')
const handleOpen = (post) => {
  setSelectedImg('')
  setselectedPost('')
  console.log("open", post)
  setSelectedImg(post.url)
  setselectedPost(post)
  setOpen(true);}
const handleClose = () => {
  setSelectedImg('')
  setselectedPost('')
  setOpen(false);

};

  return (
    <div className='flex h-screen'>
     <Navbar />
    <div className='grow flex justify-center mt-10'>
    <main className='pd-6 w-7/12'>
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
            {
              following !== undefined && 
              <p> <span className='font-bold'> {following.length}</span> following</p>
            }
           {
            followers === undefined &&
            <p> <span className='font-bold'> 0</span> following</p>
           }
          </div>
          </div>
          </section>
      <section className='flex flex-wrap gap-2 '>
      {foundUser?.posts.map((post) => (
        <><article key={post.id} className='w-80 h-80' onClick={() => handleOpen(post)}>
          <img src={post.url} alt="" className='h-full w-full' />
       </article>
</>))}       <Modal
          open={open}
          onClose={handleClose}
          // aria-labelledby="modal-modal-title"
          // aria-describedby="modal-modal-description"
        ><Box sx={style} className="flex">
              <img src={selectedImg} alt="" className='h-full w-full' />
              <p className='text-white'>{selectedPost.details}</p>
            </Box>
          </Modal> 
      </section>
    </main>
    </div>
  </div>
  )
}
