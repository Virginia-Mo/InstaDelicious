'use client'

import axios from 'axios'
import { getMessage } from '@/redux/reducers/message'
import {store} from '@/redux/store/store'

interface stateType {
    email: string,
    password: string ,
    username: string ,
    picture: string
  }
  
export async function editProfile (data : stateType) {
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