import axios from 'axios'
import {store} from '@/redux/store/store'
import { fetchUser } from '@/redux/middlewares/users'
import { getConnectedUser } from './user/getUser'
import { getPosts } from './posts'


export const AddLikes = async (id: number, onlineUser : number) => {
    try {
        const response = await axios.patch(`/api/like/${id}`, {
            userId : onlineUser,
        })
        if (response.status === 200) {
            getPosts()
        }
        return response
    } catch (error) {
        return error
    }
}

export const MinusLikes = async (id: number, onlineUser : number) => {
    try {

        const response = await axios.put(`/api/like/${id}`, {
            userId : onlineUser,
        })
        if (response.status === 200) {
            getPosts()
        }
        return response
    } catch (error) {
        return error
    }
}
