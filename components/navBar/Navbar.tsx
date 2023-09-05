'use client'

import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/types/reduxTypes';
import {getUser, setOnline} from '@/redux/reducers/users';
import { redirect } from 'next/navigation'
import Link from 'next/link';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PostForm from '../forms/postForm';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const Navbar = () => {
  const dispatch = useAppDispatch()
  const handleLogOut = () => {
    dispatch(setOnline(false))
    dispatch(getUser())
    signOut()
    redirect('/')
  }
  const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
console.log(openModal)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
  return (
    <><aside className='sticky top-0 left-0'>
      <nav className='border-r-stone-500 h-full flex flex-col'>
        <h2 className='font-sans text-4xl py-6 px-4'> <Link href='/'>InstaDelicious</Link></h2>
        <ul className='flex flex-col font-mono text-xl gap-4 px-4'>
          <li><Link href="/"> <HomeIcon fontSize="large" /> Home</Link></li>
          <li><SearchIcon fontSize="large" /> Search</li>
          <li><Link href={`/profile/${user.id}`}><AccountCircleIcon fontSize="large" />  Profile </Link> </li>
          <li className='cursor-pointer' onClick={handleOpen}><AddAPhotoIcon fontSize="large"  /> Add a post</li>
        </ul>
        <p className='absolute left-0 bottom-0 px-4' onClick={handleLogOut}><LogoutIcon fontSize='large' /> Log Out </p>
      </nav>
    </aside>
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <PostForm />
      </Box>
      </Modal></>
  )
}

export default Navbar