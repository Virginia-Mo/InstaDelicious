'use client'

import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import { useAppDispatch } from '@/types/reduxTypes';
import {getUser, setOnline} from '@/redux/reducers/users';
import { redirect } from 'next/navigation'
import Link from 'next/link';

const Navbar = () => {
  const dispatch = useAppDispatch()
  const handleLogOut = () => {
    dispatch(setOnline(false))
    dispatch(getUser())
    signOut()
    redirect('/')
  }
  return (
    <aside className='sticky top-0 left-0'>
    <nav className='border-r-stone-500 h-full flex flex-col'>
        <h2 className='font-sans text-4xl py-6 px-4'> <Link href='/'>InstaDelicious</Link></h2>
        <ul className='flex flex-col font-mono text-xl gap-4 px-4'>
            <li><Link href="/"> <HomeIcon fontSize="large"/> Home</Link></li>
            <li><SearchIcon fontSize="large"/> Search</li>
            <li><AccountCircleIcon fontSize="large"/>  Profile</li>
        </ul>
        <p className='absolute left-0 bottom-0 px-4' onClick={handleLogOut}><LogoutIcon fontSize='large'  /> Log Out </p>
    </nav>
    </aside>
  )
}

export default Navbar