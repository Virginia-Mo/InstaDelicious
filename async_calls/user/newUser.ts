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
  
export async function AddNewUser (data : stateType) {
      try {
          const response = await axios.post(`/api/signup`, 
           {
              email : data.email,
              password : data.password,
              username : data.username,
              picture : data.picture
          })
          if (response.status === 200) {
             store.dispatch(getMessage(response.data.message))
             setTimeout(() => {
                store.dispatch(getMessage(""))
              window.location.href = "/"
                }, 3500);
          }
          return response
      } catch (error) {
          return error
      }
  }