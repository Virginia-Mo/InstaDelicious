// 'use client'

// import React, { useEffect } from 'react'
// import Navbar from '@/components/navBar/Navbar'
// import { useAppSelector, useAppDispatch } from '@/types/reduxTypes'
// import BadgeAvatars from '@/components/avatar/avatar'
// import CardPost from '@/components/cardPost/cardPost'
// import BigAvatars from '@/components/avatar/bigavatar'
// import Popper from '@mui/material/Popper';
// import Fade from '@mui/material/Fade';
// import Link from 'next/link';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { GetFollow } from '@/components/utils/follow'
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import AddIcon from '@mui/icons-material/Add';
// import PersonIcon from '@mui/icons-material/Person';


// export default function Profile ({ params }: { params: { id: number } }) {

//   let foundUser = useAppSelector((state) => state.persistedReducer.user.onlineUser)
//   const followers  = useAppSelector((state) => state.persistedReducer.user.onlineUserFollower)
//   const following  = useAppSelector((state) => state.persistedReducer.user.onlineUserFollowing)
 

//   const users  = useAppSelector((state) => state.persistedReducer.user.users)
//   const [openFollow, setOpenFollow] = React.useState(false);
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const [openFollow2, setOpenFollow2] = React.useState(false);
//   const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

// const [followings, setFollowing] = React.useState(true);

//   const dispatch = useAppDispatch()

//     useEffect(() => {
//       const follow =  GetFollow(foundUser, users)
//       if (follow){
//       console.log("folllll", follow)
//       }

//       }, [foundUser])
//   const addOneFollower = async() => {
//     const response : Response  =  await AddFollowing(foundUser?.id, user.id)
//     if (response.status === 200){
//       setFollowing(true)
//       const usersCall = await getUsers()
//       console.log("CALL", usersCall)
//       if (usersCall.length > 0){
//        let foundUser2 = usersCall.find((user) => user.id === id)
//         console.log("ééééééé", foundUser)
//          getUserFollower(foundUser2)
//          console.log("its followers", followers)
//       }
//     //     const rep = GetFollow(user, users)
//     //     if (rep){
//     //       console.log("rep", rep.followerUser)
//     //       dispatch(getOnlineUserFollower(rep.followerUser))
//     //       dispatch(getOnlineUserFollowing(rep.followingUser))

//     // }
//     // if (response.status === 200) {
//     //   }}
//   }
// }
// const removeFollow = async() => {
//   const response : Response  =  await MinusFollowing(foundUser?.id, user.id)
//   if (response.status === 200){
//     setFollowing(false)
//      const usersCall  = await getUsers()
//      console.log("CALL2", usersCall)
//      if (usersCall.length >0 ){
//        foundUser = usersCall.find((user) => user.id === id)
//        console.log("newuser", foundUser)
//        GetFollow(foundUser, users)
//      }
//   //     const rep = GetFollow(user, users)
//   //     if (rep){
//   //       console.log("rep", rep.followerUser)
//   //       dispatch(getOnlineUserFollower(rep.followerUser))
//   //       dispatch(getOnlineUserFollowing(rep.followingUser))

//   // }
// }
// }

// const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//   setAnchorEl(event.currentTarget);
//   setOpenFollow((previousOpenFollow) => !previousOpenFollow);
// };
// const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
//   setAnchorEl2(event.currentTarget);
//   setOpenFollow2((previousOpenFollow) => !previousOpenFollow);
// };
// const canBeOpenFollow = openFollow && Boolean(anchorEl) && !openFollow2;
// const id2 = canBeOpenFollow ? 'transition-popper' : undefined;

// const canBeOpenFollow2 = openFollow2 && Boolean(anchorEl2) && !openFollow;
// const id22 = canBeOpenFollow2 ? 'transition-popper' : undefined;



//   return (
//     <div className='flex h-screen'>
//      <Navbar />
//     <div className='grow flex justify-center mt-10'>
//     <main >
//       <section className='flex text-2xl gap-32 pb-16 border border-transparent border-b-red-300 mb-2'>
//         <div>
//             <BigAvatars user={foundUser} />
//         </div> 
//         <div className='flex flex-col justify-evenly'>
//           <div className='flex gap-8'>
//           <p> <span className='font-bold'> {foundUser?.username}</span></p>
//           <Button variant="outlined" startIcon={<PersonIcon />}>Edit profile</Button>
//           </div>
//           <div className='flex gap-5 mb-10'>
//             <p> <span className='font-bold'>{foundUser?.posts.length} </span> posts</p>
//             {
//               followers !== undefined && 
//               <><p aria-describedby={id2} onClick={handleClick}> <span className='font-bold'> {followers.length}</span> followers</p>
//               <Popper id={foundUser.id} open={openFollow} anchorEl={anchorEl} transition>
//                     {({ TransitionProps }) => (
//                       <Fade {...TransitionProps} timeout={350}>
//                         <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
//                         <h2>Following</h2>
//                           {followers.map((foundFollow) => (
//                             <>
//                               <Link href={`/profile/${foundFollow.id}`} key={foundFollow.id}>
//                                 <BadgeAvatars user={foundFollow} />
//                                 <p >{foundFollow.username}</p>  </Link>
//                                 {
//                                   (!followers.includes(foundFollow?.id)) &&
//                                   <Button variant="contained" startIcon={<PersonRemoveIcon />} onClick={removeFollow}>UnFollow</Button>
//                                 }
//                                 {(followers.includes(foundFollow?.id)) && 
//                                 <Button variant="contained" onClick={addOneFollower} startIcon={<AddIcon />}>Follow</Button>
//                                 }
                            
//                             </>))}
//                         </Box>
//                       </Fade>
//                     )}
//                   </Popper></>
//             }
//            {
//             followers === undefined &&
//             <p> <span className='font-bold'> 0</span> follower</p>
//            }
//  {
//               following !== undefined && 
//               <><p aria-describedby={id22} onClick={handleClick2}> <span className='font-bold'> {following.length}</span> following</p>
//               <Popper id={foundUser.id} open={openFollow2} anchorEl={anchorEl2} transition>
//                     {({ TransitionProps }) => (
//                       <Fade {...TransitionProps} timeout={350}>
//                         <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
//                         <h2>Following</h2>
//                           {following.map((foundFollow) => (
//                             <>
//                               <Link href={`/profile/${foundFollow.id}`} key={foundFollow.id}>
//                                 <BadgeAvatars user={foundFollow} />
//                                 <p >{foundFollow.username}</p>  </Link>
//                                 {
//                                   (!following.includes(foundFollow?.id)) &&
//                                   <Button variant="contained" startIcon={<PersonRemoveIcon />} onClick={removeFollow}>UnFollow</Button>
//                                 }
//                                 {(following.includes(foundFollow?.id)) && 
//                                 <Button variant="contained" onClick={addOneFollower} startIcon={<AddIcon />}>Follow</Button>
//                                 }
                            
//                             </>))}
//                         </Box>
//                       </Fade>
//                     )}
//                   </Popper></>
//             }
//            {
//             following === undefined &&
//             <p> <span className='font-bold'> 0</span> following</p>
//            }
//           </div>
//           </div>
//           </section>
//       <section className='flex flex-wrap gap-2 '>
//       {foundUser?.posts.map((post) => (
//         <article key={post.id} className='w-80 h-80'>
//                <img src={post.url} alt="" className='h-full w-full'/>
//               </article>
//             ))}
//       </section>
//     </main>
      
          
//     </div>
//   </div>
//   )
// }
