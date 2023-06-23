'use client'
import React, { useState} from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { Button, TextField} from '@mui/material'

const schema = object({
    email: string().required('Email is required').email('Email is invalid').trim(),
    password: string().required('Password is required').min(5, 'Password must between 6 and 20 characters').max(20, 'Password must between 6 and 20 characters').trim(),
}).required()

const LoginForm = () => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data: any) => {
       signIn('credentials', {email: data.email, password: data.password, redirect : false})
    }

  return (
    <>
      <h2 className='text-center text-black font-sans font-bold text-5xl '>InstaDelicious</h2>
    <form action="" onSubmit={handleSubmit(onSubmit)}className='flex flex-col gap-7 items-center py-10'>
      <div className='border-gray-200 border-2 rounded-lg py-4'>
        <Controller
        name="email"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        id='email'
        type='email'
        variant='standard'
        label="Email"
        className='w-80 '
        helperText={errors?.email ? errors?.email?.message : null} 
        error={errors?.email ? true : false}
        placeholder='Enter your email'/> 
  }
/> 
<Controller
        name="password"
        control={control}
        defaultValue=''
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
/> <div className='mt-8'>
   <Button type='submit' variant='outlined' className='w-80'>Login</Button></div>
   </div>
   <div className='border-gray-200 border-2 rounded-lg w-full pb-5'>
   <p className='text-black py-3 font-mono'>You don't have an account ?</p>
   <Button type='submit' variant='outlined' className='mt-10 w-80' color='secondary'>
    <Link href="/signup">Sign up</Link></Button>
    </div>
    </form>
    </>
  )
}

export default LoginForm