'use client'

import axios from 'axios'
import { getMessage } from '@/redux/reducers/message'
import {store} from '@/redux/store/store'
import { getConnectedUser } from './user/getUser'
import { signOut } from 'next-auth/react'
import { removeCurrentUser } from '@/redux/reducers/users'
import { use } from 'react'
import { useSession } from 'next-auth/react'

interface stateType {
    email: string,
    password: string ,
    username: string ,
    picture: string
    bio: string,
    id : number,
    token : string
  }
  interface stateType2 {
    email: string,
    picture: string
    bio: string,
    id : number,
    token : string
  }
 interface stateType3 {
    id : number,
    password: string,
    token : string
  }

export async function editSettings (data : stateType) {
  try {
    const response = await axios.patch(`/api/edit`, 
     {
        confirmPassword : data.password,
        email : data.email,
        password : data.password,
        username : data.username,
    },
    { headers : {
      Authorization : `Bearer ${data.token}`}
     })
    if (response.status === 200) {
      getConnectedUser(data.id)
      store.dispatch(getMessage(response.data.message))
      setTimeout(() => {
         store.dispatch(getMessage(""))
         }, 2500);
    }
    return response
} catch (error) {
    return error
}
  }

export async function editProfile (data : stateType2) {

    try {
      const response = await axios.put(`/api/edit`, 
      {
        picture : data.picture,
        bio : data.bio,
        email : data.email },
        { headers : {
          Authorization : `Bearer ${data.token}`}
         }
      )
        
      if (response.status === 200) {
        getConnectedUser(data.id)
        store.dispatch(getMessage(response.data.message))
        setTimeout(() => {
           store.dispatch(getMessage(""))
           }, 2500);
      }
      return response
  } catch (error) {
      return error
  }
    }

export async function deleteAccount (data : stateType3, session : any) {
    try {
      const response = await axios.post(`/api/edit/${data.id}`, 
      { password : data.password },
    { headers : {
        Authorization : `Bearer ${data.token}`}
       })

      if (response.status === 200) {
        store.dispatch(getMessage(response.data.message))
        setTimeout(() => {
          if (response.data.message === "Your account has been deleted. We are sorry to see you go !" || response.data.message === "Access denied")
          {
            signOut({redirect: true, callbackUrl: '/'} )
            store.dispatch(removeCurrentUser())
            }
            store.dispatch(getMessage(""))
           }, 2500);
      }
      return response
  } catch (error) {
      return error
  }
    }