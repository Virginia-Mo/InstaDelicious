import SettingForm from '@/components/forms/settingForm'
import Navbar from '@/components/navBar/Navbar'
import SettingsMenu from '@/components/settingsMenu/settingsMenu'
import React from 'react'

const Settings = () => {
  return (
    <div className='flex h-full'>
        <Navbar />
        <section className='mx-auto my-0 h-full flex justify-center flex-col'>
            <h1>Edit profile</h1>
            
            <SettingsMenu/>
        </section>


    </div>
  )
}

export default Settings