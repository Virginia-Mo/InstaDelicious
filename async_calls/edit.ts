'use client'

import axios from 'axios'
import { getMessage } from '@/redux/reducers/message'
import {store} from '@/redux/store/store'
import { getConnectedUser } from './user/getUser'

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
export async function deleteAccount (data : stateType) {
    try {
      const response = await axios.delete(`/api/edit`, 
       {
          email : data.email,
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