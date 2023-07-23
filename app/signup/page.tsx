'use client'

import SignupForm from '@/components/forms/signupForm'
import React from 'react'
import { useAppSelector } from '@/types/reduxTypes'
import { Alert, AlertTitle } from '@mui/material'

export default function SignUp () {

  const message : string = useAppSelector((state) => state.persistedReducer.message.message)
console.log("message", message)
  return (
    <div className="bg-slate-50 h-screen">
      {message &&
      <div className=' flex justify-center items-center h-screen'>
      <Alert severity="success" variant='filled'>
        <AlertTitle>Success ! </AlertTitle> {message}
      </Alert>
      </div>}
      { !message && 
        <SignupForm />}
    </div>
  )
}
