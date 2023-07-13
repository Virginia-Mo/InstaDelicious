'use client'
import React, { useState} from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { Button, TextField} from '@mui/material'
import BadgeAvatars from '../avatar/avatar'
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '@/types/reduxTypes'
import SettingsMenu from '../settingsMenu/settingsMenu'

const schema = object({
    email: string().required('Email is required').email('Email is invalid').trim(),
    password: string().required('Password is required').min(5, 'Password must between 6 and 20 characters').max(20, 'Password must between 6 and 20 characters').trim(),
}).required()

const SettingForm = () => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data: any) => {
       signIn('credentials', {email: data.email, password: data.password, redirect : false})
    }
    const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)

  return (

    <form action="" onSubmit={handleSubmit(onSubmit)}className='flex flex-col gap-7 items-center'>
      <div className='border-gray-200 border-2 rounded-lg flex flex-col gap-8 items-end px-5'>
        <div className='flex gap-4'>
        <p><Avatar alt={user.username} src={user.picture} sx={{ width: 62, height: 62}} /></p>
        <div>
            <p>{user.username}</p>
            <Controller
        name="photo"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        id='photo'
        type='file'
        variant='standard'
        label="Username"
        className='w-80 '/> 
  }/> 
        </div>
      
</div>
<div className='flex gap-4 '>
<p>Bio</p>
<Controller
        name="bio"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        id='bio'
        type='textarea'
        variant='outlined'
        label=""
        className='w-80 '
        error={errors?.password ? true : false}
        /> 
  }/>
</div>
   <Button type='submit' variant='outlined' className='w-80'>Submit</Button>

    </div>
    </form>
  )
}

export default SettingForm