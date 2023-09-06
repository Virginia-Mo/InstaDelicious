'use client'

import axios from 'axios'
import { store } from '@/redux/store/store'
import { getOnlineUser, getAllUsers } from '@/redux/reducers/users'


export async function getConnectedUser (id: number) {
    try {
        const response = await axios.get(`/api/users/${id}`)
        const data = await response.data
        store.dispatch(getOnlineUser(data))
        return data
    } catch (error) {
        return error
    }
  }

export async function getUsers (){
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
