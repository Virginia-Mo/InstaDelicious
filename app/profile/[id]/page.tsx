'use client'

import React, { use, useEffect } from 'react'
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/types/reduxTypes'
import { Post, UserDB } from '@/types/models'
import { getFollowers, getFollowing } from '@/redux/reducers/users'
import { AddFollowing, MinusFollowing } from '@/async_calls/follower';
import { getConnectedUser, getUsers } from '@/async_calls/user/getUser';
import { useSession } from 'next-auth/react'
import Navbar from '@/components/navBar/Navbar'
import BigAvatars from '@/components/avatar/bigavatar'
import { useRouter } from 'next/navigation'

import  Dialog  from '@mui/material/Dialog'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import BadgeAvatars from '@/components/avatar/avatar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { deletePost, getPosts } from '@/async_calls/posts';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import styles from './profile.module.css'
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CardActions from '@mui/material/CardActions';
import { AddLikes, MinusLikes } from '@/async_calls/likes';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { pink } from '@mui/material/colors';
import { set } from 'react-hook-form';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24
};


export default function Profile ({ params }: { params: { id: number } }) {
  const { data: session, status } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const users = useAppSelector((state) => state.persistedReducer.user.users)
  const followers = useAppSelector((state) => state.persistedReducer.user.followers)
  const following = useAppSelector((state) => state.persistedReducer.user.following)
  const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  const onlineUserFollowing  = useAppSelector((state) => state.persistedReducer.user.onlineUserFollowing)
  const message = useAppSelector((state) => state.persistedReducer.message.message)
  
  const [open, setOpen] = React.useState(false);
  const [selectedPost, setselectedPost] = React.useState('' as any)
  const [selectedImg, setSelectedImg] = React.useState('')
  const [followings, setFollowing] = React.useState(true);
  const [openFollowBox, setOpenFollowBox] = React.useState(false)
  const [openFollowBox2, setOpenFollowBox2] = React.useState(false)
  const [deletedpost, setPost] = React.useState(false)
  const [like, setLike] = React.useState(false);
  const [likesAmount, setLikesAmount] = React.useState(0)


  const handleLike = () => {
    console.log(selectedPost.like.userslikes)
    AddLikes(selectedPost.id, user.id)
    setLike(true)
    setLikesAmount(likesAmount + 1)
  }
  const handleMinusLike = () => {
    MinusLikes(selectedPost.id, user.id)
    setLike(false)
    setLikesAmount(likesAmount - 1)
  }
  const id = +params.id
  let foundUser  = users.find((user) => user.id === id)

  
  function getUserFollower (userInf : UserDB)  {
        let followerArray : UserDB[] = []
        let followingArray : UserDB[] = []
        if (userInf !== undefined) {
          if (userInf.follow.length === 0) {
            dispatch(getFollowers())
            dispatch(getFollowing())
          } else {
        let followerInfo : number[] = userInf.follow[0].follower_user_id  
        let followingInfo : number[] = userInf.follow[0].following_user_id

        if (userInf.follow[0].follower_user_id.length > 0) {
          userInf.follow[0].follower_user_id.forEach((element : number) => {
            let foundPeople =  users.find((user) => user.id === element)
            
            if (foundPeople){
              followerArray.push(foundPeople)
            }
          })
          dispatch(getFollowers(followerArray))
        } else {
          dispatch(getFollowers())
        }
        if (userInf.follow[0].following_user_id.length > 0) {
          userInf.follow[0].following_user_id.forEach((element : number) => {
          let foundPeople2 =  users.find((user) => user.id === element)
          if (foundPeople2){
                followingArray.push(foundPeople2)
              }
            })
            dispatch(getFollowing(followingArray))
          } else {
            dispatch(getFollowing())
             }
          }}
        }

useEffect(() => {
let foundFollower = onlineUserFollowing.some((item)=> item.id === foundUser?.id)

  if (foundFollower){
    setFollowing(true)
  } else {
    setFollowing(false)
  }
  if (selectedPost){
    const likes = selectedPost.like.amount
    setLikesAmount(likes)
  }
    if (selectedPost.like && selectedPost.like.userslikes.includes(foundUser?.id)) {
      setLike(true)
    }
},[selectedPost.like])

  useEffect(() => {
  if (foundUser){
    getUserFollower(foundUser)
  }
  }, [user])

useEffect(() => {
  if (message){
    setTimeout(() => {
      handleClose()
    }, 1000)
  }
}, [message])

const handleOpen = (post : Post) => {
  console.log("post ici");
  setSelectedImg('')
  setselectedPost('')
  setSelectedImg(post.url)
  setselectedPost(post)
  setOpen(true)
  console.log("post", selectedPost);}

const handleClose = () => {
  setSelectedImg('')
  setselectedPost('')
  setOpen(false);
};

const handleOpenFollow = () => {
  setOpenFollowBox(true)
}
const handleCloseFollow = () => {
  setOpenFollowBox(false)
}
const handleOpenFollow2 = () => {
  setOpenFollowBox2(true)
}
const handleCloseFollow2 = () => {
  setOpenFollowBox2(false)
}


const editFollow = async(bool : boolean, res : Response) => {
  if (res.status === 200){
    setFollowing(bool)
     const usersCall  = await getUsers()
     if (usersCall.length >0 ){
       foundUser = usersCall.find((user : UserDB) => user.id === id)
        getUserFollower(foundUser)
     }
   } }

const addOneFollower = async(userPage : UserDB, userOnline : UserDB) => {
  const response : Response  =  await AddFollowing(userPage?.id, userOnline.id)
  editFollow(true, response)
}
const removeFollow = async(userPage : UserDB, userOnline : UserDB) => {
  const response : Response  =  await MinusFollowing(userPage?.id, userOnline.id)
    editFollow(false, response)
}

const handleDelete = async (id : number) => {
  const datas = {
    id: id,
    token: session?.user.accessToken as string,
  }
  const res : Response = await deletePost(datas)
  if (res.status === 200) {
    setPost(true)
    setTimeout(() => {
   router.push(`/home`)
   setPost(false)
    }, 1500)
  }
  }
 
if (status === "loading"){
  return <p>loading</p>
}
if (status === "unauthenticated") {
  return <p>Access Denied</p>
} 
console.log(followers)
  return (
  
    <div className='flex h-screen'>
     <Navbar />
    <div className='flex justify-center mt-10  overflow-auto section-scroll grow'>
    <main className='pd-6 w-7/12'>
      <section className='flex text-2xl gap-32 pb-8 border border-transparent border-b-red-300 mb-2'>
        <div>
          <BigAvatars user={foundUser} />
        </div> 
        <div>
        <div className='flex flex-col justify-evenly'>
          <div className='flex gap-8 mb-3'>
          <p> <span className='font-bold text-3xl'> {foundUser?.username}</span></p>
          { (foundUser?.id === user.id) &&
          <div>
            <Link href={`/edit/profile`}>
         <Button variant="outlined" startIcon={<PersonIcon />}>Edit profile</Button>
          </Link>
          </div>
          }
          {
        (foundUser?.id !== user.id) && <div>
                  {
            followings && 
            <Button variant="contained" startIcon={<PersonRemoveIcon />} onClick={() => removeFollow(foundUser, user)}>UnFollow</Button>
          }
          { 
           !followings &&
            <Button variant="contained" onClick={() => addOneFollower(foundUser, user)} startIcon={<AddIcon />}>Follow</Button>
            }
    </div>
}

            </div>
          <div className='flex gap-5 mb-2'>
            <p> <span className='font-bold'>{foundUser?.posts.length} </span> posts</p>
            {
              followers !== undefined && 
              <>
{   (followers.length > 1)    &&  
     <p onClick={handleOpenFollow}> <span className='font-bold'> {followers.length}</span> followers</p>
}
{   (followers.length === 1)    &&  
     <p onClick={handleOpenFollow}> <span className='font-bold'> {followers.length}</span> follower</p>
}
                  
                    <Dialog
                      open={openFollowBox}
                      onClose={handleCloseFollow}
                       >
                    <DialogTitle> {foundUser?.username}'s Followers</DialogTitle>
                    <List sx={{ pt: 0 }}>
                    <Fade in={openFollowBox}>

                      <Box>
                        {followers.map((foundFollow) => (
                          <ListItem key={foundFollow.id}>
                          <><div className='flex justify-between items-center w-80'>
                              <BadgeAvatars user={foundFollow} /> 
                            <Link href={`/profile/${foundFollow.id}`} key={foundFollow.id}>
                              <Button size="small" variant="contained">See profile</Button>
                              </Link>
                            
                          </div>
                          </>
                          </ListItem>))}
                      </Box>
                    </Fade>
                    </List>
                  </Dialog>
                  </>
            }
           {
            followers === undefined &&
            <p> <span className='font-bold'> 0</span> follower</p>
           }
            {
              following !== undefined && 
              <><p onClick={handleOpenFollow2}> <span className='font-bold'> {following.length}</span> following</p>
                    <Dialog
                      open={openFollowBox2}
                      onClose={handleCloseFollow2} >
                    <DialogTitle> {foundUser?.username}'s Following</DialogTitle>
                    <List sx={{ pt: 0 }}>
                    <Fade in={openFollowBox2}>
                        <Box>
                          {following.map((foundFollow) => (
                            <ListItem key={foundFollow.id}>
                            <><div className='flex justify-between items-center w-80'>
                                <BadgeAvatars user={foundFollow} />
                            <Link href={`/profile/${foundFollow.id}`} key={foundFollow.id}>
                              <Button size="small" variant="contained">See profile</Button>
                              </Link>
                                </div>
                            </>
                            </ListItem>))}
                        </Box>
                      </Fade>
                      </List>
                  </Dialog></>
            }
           {
            following === undefined &&
            <p> <span className='font-bold'> 0</span> following</p>
           }
          </div>
          </div>
        <div className='text-xl'>{foundUser?.bio}</div>
        </div>
          </section>
      <section className='flex flex-wrap gap-2 '>
      {foundUser?.posts.map((post) => (
        <div key={post.id}><article  className='relative w-80 h-80' onClick={() => handleOpen(post)}>
          <img src={post.url} alt="" className=' h-full w-full' />
           
       </article>
</div>))}       <Modal
          open={open}
          onClose={handleClose} 
          // aria-labelledby="modal-modal-title"
          // aria-describedby="modal-modal-description"
        >
      <Box sx={style}>
        {!deletedpost &&
        <div className={styles.box_profile} >
            <div className='w-8/12 flex'>
              <img src={selectedImg} alt="" className='w-full' />
              </div>
              <div className='text-white bg-gray-800 relative w-4/12 p-2 flex justify-between flex-col'>
                <div>
                <div className='flex pt-2'>
              <Avatar alt={foundUser?.username} src={foundUser?.picture} sx={{ width: 45, height: 45}} />
              <p className='font-semibold flex items-center ml-2'>{foundUser?.username}</p>
              </div>
              {/* <BadgeAvatars user={foundUser} /> */}
              <div className='border-t-red-100 border-t my-4 pt-4'>
              <div className='flex items-center'>
              <Avatar alt={foundUser?.username} src={foundUser?.picture} sx={{ width: 45, height: 45}} />
              <p className='font-semibold flex ml-2'>{foundUser?.username}</p>
             
              <p className='py-3 px-2 '>{selectedPost.title}</p> </div>
             { (foundUser?.id === user.id) && 
                <DeleteIcon color="primary" fontSize="large" className='absolute top-2 right-2' onClick={() => handleDelete(selectedPost.id)}/>
             }
             </div>
</div>
             <div className='border-t-red-100 border-t my-2'>
              <div className='flex items-center'>
              <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {(like) && 
          <FavoriteIcon sx={{ color: pink[500] }} fontSize='large' onClick={handleMinusLike}/> }
          {(!like) &&
          <FavoriteBorderOutlinedIcon fontSize='large' onClick={handleLike}/>
          }
        </IconButton>
        <BookmarkIcon color="disabled" fontSize='large'aria-label="bookmark">
          <ShareIcon />
        </BookmarkIcon>

      </CardActions>
      <Typography className='px-4'>

{(likesAmount === 0 ) &&
<span>Be the first to like this</span>
}
{(likesAmount === 1 && !like) && 
<span>{likesAmount} person likes this post</span>
}
{(likesAmount === 1 && like) && 
<span>You like this post</span>
}
{(likesAmount > 1 && !like) &&
<span>{likesAmount} people like this post</span>
}
{(likesAmount > 1 && like) && 
<span>You and {likesAmount} like this post</span>
}

</Typography>
</div>
             </div>
              </div>
              </div>
        }
          
    {(message && deletedpost) &&
      <div className='w-full'>
      <Alert severity="success" variant='filled' className='flex justify-center items-center w-full'>
       {message}
      </Alert></div>
      }
            </Box>
          </Modal> 
      </section>
    </main>
    </div>
  </div>
  )
}
