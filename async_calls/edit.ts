'use client'

import axios from 'axios'
import { getMessage } from '@/redux/reducers/message'
import {store} from '@/redux/store/store'
import { getOnlineUser } from '@/redux/reducers/users'
import { getConnectedUser } from './user/getUser'
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
// interface stateType2 {
//     email: string,
//     picture: string,
//     bio: string,
//     id : number
//   }  
export async function editSettings (data : stateType) {
  try {
    const response = await axios.patch(`/api/edit`, 
     {
        confirmPassword : data.password,
        email : data.email,
        password : data.password,
        username : data.username,
    })
    console.log("response", data)
    if (response.status === 200) {
       store.dispatch(getMessage(response.data.message))
    }
    return response
} catch (error) {
    return error
}
  }

export async function editProfile (data : stateType) {
    try {
      const response = await axios.put(`/api/edit`, {
        
           picture : data.picture,
           bio : data.bio,
           email : data.email, 
           headers : {
             authorization : `Bearer ${data.token}`
             
            },
          })

      if (response.status === 200) {
        getConnectedUser(data.id)
         store.dispatch(getMessage(response.data.message))
      }
      return response
  } catch (error) {
      return error
  }
    }