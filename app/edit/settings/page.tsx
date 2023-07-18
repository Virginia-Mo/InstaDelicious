import SettingForm from '@/components/forms/settingForm'
import SettingInfosForm from '@/components/forms/settingInfosForm'
import Navbar from '@/components/navBar/Navbar'
import SettingsMenu from '@/components/settingsMenu/settingsMenu'
import React from 'react'

const Settings = () => {
  return (
    <div className='flex h-full'>
        <Navbar />
        <div>
        <h1 className='text-center pb-6 text-2xl'>Edit your personal infos</h1>
        <section className='mx-auto my-0 h-full flex flex-col pt-8'>
            <div className='flex'>
            <SettingsMenu/>
            <SettingInfosForm />
            </div>
        </section>
        </div>

    </div>
  )
}

export default Settings