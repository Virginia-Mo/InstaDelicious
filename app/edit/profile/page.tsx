'use client'

import { getConnectedUser } from '@/async_calls/user/getUser'
import SettingForm from '@/components/forms/settingForm'
import Navbar from '@/components/navBar/Navbar'
import SettingsMenu from '@/components/settingsMenu/settingsMenu'
import React, { useEffect } from 'react'
import { useAppSelector } from '@/types/reduxTypes'
import { useSession } from 'next-auth/react'
import { Alert, AlertTitle } from '@mui/material'
const Settings = () => {

  const { status } = useSession()
  const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  const message : string = useAppSelector((state) => state.persistedReducer.message.message)
  useEffect(() => {
  getConnectedUser(user.id)
}, [])

  if (status === "loading") {
    return <p>Loading...</p>
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }
  return (
    <div className='flex h-full'>
        <Navbar />
        <div>
       <h1 className='text-center pb-6 text-2xl'>Edit your personal infos</h1>
        <section className='mx-auto my-0 h-full flex flex-col pt-8'>
          <div className='flex'>
            <SettingsMenu/>
            {!message &&
            <SettingForm /> }
            {message &&
      <div className='flex pl-5 items-center'>
      <Alert severity="success" >
        <AlertTitle>Success ! </AlertTitle> {message}
      </Alert>
      </div>}
            </div>
        </section>
        </div>
    </div>
  )
}

export default Settings