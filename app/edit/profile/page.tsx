'use client'

import { getConnectedUser } from '@/async_calls/user/getUser'
import SettingForm from '@/components/forms/settingForm'
import SettingInfosForm from '@/components/forms/settingInfosForm'
import Navbar from '@/components/navBar/Navbar'
import SettingsMenu from '@/components/settingsMenu/settingsMenu'
import React, { useEffect } from 'react'
import { useAppSelector } from '@/types/reduxTypes'
import { useSession } from 'next-auth/react'

const Settings = () => {

  const { status } = useSession()
  if (status === "loading") {
    return <p>Loading...</p>
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)

useEffect(() => {
  getConnectedUser(user.id)
}, [])

  return (
    <div className='flex h-full'>
        <Navbar />
        <div>
       <h1 className='text-center pb-6 text-2xl'>Edit your personal infos</h1>
        <section className='mx-auto my-0 h-full flex flex-col pt-8'>
          <div className='flex'>
            <SettingsMenu/>
            <SettingForm />
            </div>
        </section>
        </div>
    </div>
  )
}

export default Settings