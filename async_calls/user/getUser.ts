'use client'

import axios from 'axios'
import { store } from '@/redux/store/store'
import { getUser } from '@/redux/reducers/users'


export async function getConnectedUser (id: number) {
    try {
        const response = await axios.get(`/api/users/${id}`)
        const data = await response.data
        console.log("CONNECTED", data)
        store.dispatch(getUser(data))
        return data
    } catch (error) {
        return error
    }
  }