'use client'

import axios from 'axios'
import { store } from '@/redux/store/store'
import { getOnlineUser, getAllUsers, getFollowers, getFollowing } from '@/redux/reducers/users'
import { getConnectedUser } from './user/getUser'
import { get } from 'http'


export async function AddFollowing ( followed : number, onlineUser : number) {
console.log("sdfgh", onlineUser, followed)
    try {
        const response = await axios.post(`/api/follow/following`, 
         {
            superId : followed,
            userId : onlineUser
        })
        return new Response(JSON.stringify({message : 'followed'}))

    } catch (error) {
        return error
    }
  }
  export async function MinusFollowing ( followed : number, onlineUser : number) {
    console.log("sdfgh", onlineUser, followed)
    
        try {
            const response = await axios.patch(`/api/follow/following`, 
             {
                superId : followed,
                userId : onlineUser
            })
            if (response.status === 200) {
                getConnectedUser(onlineUser)
                }
        } catch (error) {
            return error
        }
      }


  export async function addFollowing (id: number) {
    try {
        const response = await axios.get(`/api/users/${id}`)
        const data = await response.data
        store.dispatch(getOnlineUser(data))
        return data
    } catch (error) {
        return error
    }
  }

export async function minusFollowing (){
    try {
        const response = await axios.get('/api/users')
        const data = await response.data
        if (data) {
            store.dispatch(getAllUsers(data))
        return data}
    } catch (error) {
        return error
    }
  }