'use client'
import React, { FormEventHandler, useState} from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, ref } from 'yup'
import { Button, TextField} from '@mui/material'
import { AddNewUser } from '@/async_calls/user/newUser'

const schema = object({
    username: string().required('Username is required').min(2, 'Username must be between 2 and 20 characters').max(20).trim(),
    email: string().required('Email is required').email('Email is invalid').trim(),
    password: string().required('Password is required').min(6, 'Password must be between 6 and 20 characters').max(20, 'Password must be between 6 and 20 characters').trim(),
    confirmPassword: string().required('Please re-enter your password').oneOf([ref("password")], "Passwords don't match !").trim(),
}).required()

interface dataForm {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const SignupForm = () => {
    const [error, setError] = useState('')

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data: dataForm) => {
        AddNewUser(data)
    }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}className='flex flex-col gap-7'>
<Controller
        name="username"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        id='username'
        type='text'
        variant='standard'
        label="Username"
        className='w-80 '
        helperText={errors?.username ? errors?.username?.message : null} 
        error={errors?.username ? true : false}
        placeholder='Enter your username'/> 
  }
/> 
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
/> 
<Controller
        name="confirmPassword"
        control={control}
        defaultValue=''
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
   <Button type='submit' variant='outlined' className='mt-10 w-80'>Submit</Button>
   <Button variant='outlined' className='mt-10 w-80' color='secondary'>
    <Link href="/">Go to sign in Page</Link></Button>
    </form>
  )
}

export default SignupForm