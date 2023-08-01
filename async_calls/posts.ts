import axios from 'axios'
import {store} from '@/redux/store/store'
import { fetchUser } from '@/redux/middlewares/users'
import { Post } from '@/types/models'

interface stateType {
  title: string,
  description: string,
  details: string,
  ingredients: string,
  url: string
}

export const AddPost = async (id: number, data : stateType) => {
    try {
        const response = await axios.post(`/api/posts`, 
         {
            title : data.title,
            authorId : id,
            description : data.description,
            details : data.details,
            ingredients : data.ingredients,
            url : data.url
        })
        
        if (response.status === 200) {
            // store.dispatch(fetchUser(id))
        }
        return response
    } catch (error) {
        return error
    }
}

export const getPosts = async () => {
    try {
        const response = await axios.get(`/api/posts`)
        const data = await response.data
        return data
    } catch (error) {
        return error
    }
}

