'use client'

import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/Types/reduxTypes'
import { UserDB } from '@/Types/models'
import { getFollowers, getFollowing } from '@/redux/reducers/users'
import { AddFollower, AddFollowing, MinusFollowing } from '@/async_calls/follower';
import { getConnectedUser } from '@/async_calls/user/getUser';

import Navbar from '@/components/navBar/Navbar'
import CardPost from '@/components/cardPost/cardPost'
import BigAvatars from '@/components/avatar/bigavatar'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Modal from '@mui/material/Modal';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Link from 'next/link';
import BadgeAvatars from '@/components/avatar/avatar';
import AddIcon from '@mui/icons-material/Add';

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


export default function Profile ({ params }: { params: { id: number } }) {
  
  const dispatch = useAppDispatch()
  
  const users = useAppSelector((state) => state.persistedReducer.user.users)
  const followers = useAppSelector((state) => state.persistedReducer.user.followers)
  const following = useAppSelector((state) => state.persistedReducer.user.following)
  const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  const onlineUserfollowing  = useAppSelector((state) => state.persistedReducer.user.onlineUserFollowing)
  
  const [open, setOpen] = React.useState(false);
  const [selectedPost, setselectedPost] = React.useState('' as any)
  const [selectedImg, setSelectedImg] = React.useState('')
  const [openFollow, setOpenFollow] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openFollow2, setOpenFollow2] = React.useState(false);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const userFollowing = user.follow[0].following_user_id
  const id = +params.id
  const foundUser = users.find((user) => user.id === id)
console.log("foundUser", followers)

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
  }, [user])

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

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
  setOpenFollow((previousOpenFollow) => !previousOpenFollow);
};
const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl2(event.currentTarget);
  setOpenFollow2((previousOpenFollow) => !previousOpenFollow);
};
const canBeOpenFollow = openFollow && Boolean(anchorEl);
const id2 = canBeOpenFollow ? 'transition-popper' : undefined;

const canBeOpenFollow2 = openFollow2 && Boolean(anchorEl2);
const id22 = canBeOpenFollow2 ? 'transition-popper' : undefined;


const addOneFollower = async() => {
 const response : Response  =  await AddFollowing(foundUser?.id, user.id)
 if (response.status === 200) {
  getUserFollower(foundUser)
  console.log("response", user)
  }
}
const removeFollow = () => {
  MinusFollowing(foundUser?.id, user.id)
  console.log("unfollow", user)
}
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
          <div className='flex gap-8'>
          <p> <span className='font-bold'> {foundUser?.username}</span></p>
          {
            (onlineUserfollowing.includes(foundUser?.id)) && 
            <Button variant="contained" startIcon={<PersonRemoveIcon />} onClick={removeFollow}>UnFollow</Button>
          }
          { 
           (!onlineUserfollowing.includes(foundUser?.id)) &&
            <Button variant="contained" onClick={addOneFollower} startIcon={<AddIcon />}>Follow</Button>}
            </div>
          <div className='flex gap-5 mb-10'>
            <p> <span className='font-bold'>{foundUser?.posts.length} </span> posts</p>
            {
              followers !== undefined && 
              <><p aria-describedby={id2} onClick={handleClick}> <span className='font-bold'> {followers.length}</span> followers</p>
              <Popper id={id} open={openFollow} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                        <h2>Following</h2>
                          {followers.map((foundFollow) => (
                            <>
                              <Link href={`/profile/${foundFollow.id}`} key={foundFollow.id}>
                                <BadgeAvatars user={foundFollow} />
                                <p >{foundFollow.username}</p>  </Link>
                                {
                                  (!onlineUserfollowing.includes(foundFollow?.id)) &&
                                  <Button variant="contained" startIcon={<PersonRemoveIcon />} onClick={removeFollow}>UnFollow</Button>
                                }
                                {(onlineUserfollowing.includes(foundFollow?.id)&& 
                                <Button variant="contained" onClick={addOneFollower} startIcon={<AddIcon />}>Follow</Button>
                                )}
                            
                            </>))}
                        </Box>
                      </Fade>
                    )}
                  </Popper></>
            }
           {
            followers === undefined &&
            <p> <span className='font-bold'> 0</span> follower</p>
           }
            {
              following !== undefined && 
              <><p aria-describedby={id22} onClick={handleClick2}> <span className='font-bold'> {following.length}</span> following</p>
              <Popper id={id22} open={openFollow2} anchorEl={anchorEl2} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                          <h2>Following</h2>
                          {following.map((foundFollow) => (
                            <>
                              <Link href={`/profile/${foundFollow.id}`} key={foundFollow.id}>
                                <BadgeAvatars user={foundFollow} />
                                <p >{foundFollow.username}</p>
                                {(!onlineUserfollowing.includes(foundFollow?.id)) &&
                                  <Button variant="contained" startIcon={<PersonRemoveIcon />} onClick={removeFollow}>UnFollow</Button>
                                  }
{                                (onlineUserfollowing.includes(foundFollow?.id)&&
                                <Button variant="contained" onClick={addOneFollower} startIcon={<AddIcon />}>Follow</Button>
                                )}
                                
                              </Link>
                            </>))}
                        </Box>
                      </Fade>
                    )}
                  </Popper></>
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
