'use client'

import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import { useAppDispatch } from '@/Types/reduxTypes';
import {getUser, setOnline} from '@/redux/reducers/users';

const Navbar = () => {
  const dispatch = useAppDispatch()
  const handleLogOut = () => {
    dispatch(setOnline(false))
    dispatch(getUser({}))
    signOut()
  }
  return (
    <nav className='border-r-stone-500 h-auto flex flex-col sticky'>
        <h2 className='font-sans text-4xl py-10 px-4'> InstaDelicious</h2>
        <ul className='flex flex-col font-mono text-xl gap-4 px-4'>
            <li><HomeIcon fontSize="large"/> Home</li>
            <li><SearchIcon fontSize="large"/> Search</li>
            <li><AccountCircleIcon fontSize="large"/>  Profile</li>
        </ul>
        <p className='absolute left-0 bottom-0 px-4' onClick={handleLogOut}><LogoutIcon fontSize='large'  /> Log Out </p>
    </nav>
  )
}

export default Navbar