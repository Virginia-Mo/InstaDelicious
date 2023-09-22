'use client'

import React, { ReactEventHandler, use, useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/types/reduxTypes';
import {getUser, removeCurrentUser, setOnline} from '@/redux/reducers/users';
import { redirect } from 'next/navigation'
import Link from 'next/link';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PostForm from '../forms/postForm';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import styles from './navbar.module.css'
import List from '@mui/material/List';
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { grey } from '@mui/material/colors';
import 'animate.css';
const Navbar = () => {
  const dispatch = useAppDispatch()
  const handleLogOut = () => {
    dispatch(setOnline(false))
    signOut({ callbackUrl: '/'})
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();


  const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  const users = useAppSelector((state) => state.persistedReducer.user.users)
  const [openModal, setOpenModal] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [randomUsers, setRandomUsers] = React.useState([])

useEffect(() => {
  setRandomUsers(users)
}, [users])

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleSearch = () => {
    setOpenSearch(!openSearch);
  } 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  bgcolor: 'background.paper',
  p: 2,
};
const handleUsers = (id : number) => {
  const newUsersArray = randomUsers.filter((user) => user.id !== id)
 setRandomUsers(newUsersArray)
}
const [inputValue, setInputValue] = React.useState("");

const handleChange = (e : Event) => {
  console.log(e.target?.value)
  if (e.target?.value === "") {
    setInputValue("")
    setRandomUsers(users)
    console.log(randomUsers)
 } else {
  setInputValue(e.target.value.toLowerCase());
  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(inputValue))
  setRandomUsers(filteredUsers)
 }
}


  return (
    <><aside className='sticky top-0 left-0'>
      <nav className='border-r-stone-500 h-full flex flex-col'>
        <h2 className='font-sans text-4xl py-6 px-4'> <Link href='/'>InstaDelicious</Link></h2>
        {
          !openSearch &&
          <div className='flex flex-col gap-4 px-4 animate__animated animate__slideInLeft'>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <HomeIcon fontSize="large" sx={{ color: "#000000" }} />
              </ListItemIcon>
              <Link href={`/`}>
              <ListItemText primary="Home" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSearch}>
              <ListItemIcon>
           
              <SearchIcon fontSize="large" sx={{ color: "#000000" }} />
          
              </ListItemIcon>
              
              <ListItemText primary="Search" />
             
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#000000" }} >
              <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              <Link href={`/profile/${user.id}`}>
              <ListItemText primary="Profile" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className='cursor-pointer' onClick={handleOpen}>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#000000" }} >
              <AddAPhotoIcon fontSize="large"  />
              </ListItemIcon>
              <Link href={`/profile/${user.id}`}>
              <ListItemText primary="Add a post" />
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
</div>
        }
{
  openSearch && 
<div className='flex flex-col gap-4 px-4 animate__animated animate__slideInLeft'>
  <p className='text-center font-bold text-lg'>Search for content</p>
  <div className='flex flex-row-reverse'>
    <div>
  <Controller
            name="Search"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }  }) => (
              <TextField
                onChange={handleChange}
                value={inputValue}
                id="search"
                type="text"
                variant="standard"
                label="Search"
                placeholder="Enter your search"
              />
            )}
          />

  {
    randomUsers.map((user) => (
       
      <div className='flex gap-4 mt-4 animate__animated animate__slideInLeft' key={user.id}>
 <Link href={`/profile/${user.id}`}>
  <Avatar alt={user.username} src={user.picture} sx={{ width: 45, height: 45}} /></Link>
<div className='flex flex-col grow'>
  <div className='flex justify-between '>
  <Link href={`/profile/${user.id}`}>
<p className='font-bold'>{user.username}</p>
</Link>
  <button onClick={() => handleUsers(user.id)}><ClearIcon /></button>
</div>
 <Link href={`/profile/${user.id}`}>
{
 ( user.follow[0].follower_user_id.length === 0 || user.follow[0].follower_user_id.length === 1)  && 
  <p>{user.follow[0].follower_user_id.length} follower</p>
}

{
  user.follow[0].follower_user_id.length > 1 && 
    <p>{user.follow[0].follower_user_id.length} followers</p>
}
</Link>
</div>
      </div>

    ))
  }
          </div>
  <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Link href={`/`}>
              <ListItemIcon>
              <HomeIcon fontSize="large" sx={{ color: "#000000" }} />
              </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSearch}>
              <ListItemIcon>
           
              <SearchIcon fontSize="large" sx={{ color: "#000000" }} />
          
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link href={`/profile/${user.id}`}>
              <ListItemIcon sx={{ color: "#000000" }} >
              <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className='cursor-pointer' onClick={handleOpen}>
            <ListItemButton>
              <Link href={`/profile/${user.id}`}>
              <ListItemIcon sx={{ color: "#000000" }} >
              <AddAPhotoIcon fontSize="large"  />
              </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
        </List>


        </div>
        <div>
       
        </div>
  </div>  
}
        <p className='absolute left-0 bottom-0 px-4 hover:bg-pink-200 rounded-lg' onClick={handleLogOut}><LogoutIcon fontSize='large' /> Log Out </p>
      </nav>
    </aside>
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={styles.boxPost}>
      <PostForm />
      </Box>
      </Modal></>
  )
}

export default Navbar