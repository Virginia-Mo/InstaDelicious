import SettingForm from '@/components/forms/settingForm'
import Navbar from '@/components/navBar/Navbar'
import SettingsMenu from '@/components/settingsMenu/settingsMenu'
import React from 'react'

const Settings = () => {
  return (
    <div className='flex h-full'>
        <Navbar />
        <section className='mx-auto my-0 h-full flex flex-col pt-8'>
            <SettingsMenu/>
        </section>


    </div>
  )
}

export default Settings