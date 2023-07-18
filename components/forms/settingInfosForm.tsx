'use client'
import React, { useState} from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, TextField} from '@mui/material'
import BadgeAvatars from '../avatar/avatar'
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '@/types/reduxTypes'
import { object, string, ref } from 'yup'
import SettingsMenu from '../settingsMenu/settingsMenu'
import { useSession } from "next-auth/react"
import { editProfile, editSettings } from '@/async_calls/edit'
import { useAppDispatch } from '@/types/reduxTypes'

const schema = object({
    username: string().required('Username is required').min(2, 'Username must be between 2 and 20 characters').max(20).trim(),
    email: string().required('Email is required').email('Email is invalid').trim(),
    password: string().required("Password is required").min(6, 'Password must be between 6 and 20 characters').max(20, 'Password must be between 6 and 20 characters').trim(),
    confirmPassword: string().required('Please re-enter your password').oneOf([ref("password")], "Passwords don't match !").trim(),
}).required()

const SettingInfosForm = () => {
const dispatch = useAppDispatch()

  const { data: session } = useSession()
  console.log(session)
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data: any) => {
      if (data.password === data.confirmPassword) {
      editSettings(data)
    } else {
      // dispatch(getMessage(response.data.message))
      return
    }
  }
    const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)

  return (

    <form action="" onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7 items-center'>
      <div className='border-gray-200 border-1  flex flex-col gap-8 items-end px-5 py-7'>
<div className='flex gap-4 flex-col '>
<Controller
        name="username"
        control={control}
        defaultValue={user.username}
        render={({field}) => <TextField {...field}
        id='username'
        type='text'
        variant='standard'
        label="Username"
        className='w-80 '
        placeholder={user.username}/> 
  }
/> 
        <Controller
        name="email"
        control={control}
        defaultValue={user.email}
        render={({field}) => <TextField {...field}
        id='email'
        type='email'
        variant='standard'
        label="Email"
        className='w-80 '
        helperText={errors?.email ? errors?.email?.message : null} 
        error={errors?.email ? true : false}
        placeholder={user.email}/> 
  }
/> 
<Controller
        name="password"
        control={control}
        defaultValue=""
        render={({field}) => <TextField {...field}
        id='password'
        type='password'
        variant='standard'
        label="Password"
        className='w-80 '
        helperText={errors?.password ? errors?.password?.message : null} 
        error={errors?.password ? true : false}
        placeholder='Enter your password'/> 
  }
/> 
<Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({field}) => <TextField {...field}
        id='confirmPassword'
        type='password'
        variant='standard'
        label="Confirm your Password"
        className='w-80 '
        helperText={errors?.password ? errors?.password?.message : null} 
        error={errors?.password ? true : false}
        placeholder='Please re-enter your password'/> 
  }
/> 

</div>
   <Button type='submit' variant='outlined' className='w-80'>Submit</Button>

    </div>
    </form>
  )
}

export default SettingInfosForm