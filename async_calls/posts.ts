import axios from 'axios'
import {store} from '@/redux/store/store'
import { fetchUser } from '@/redux/middlewares/users'
import { Post } from '@/types/models'
import { getMessage } from '@/redux/reducers/message'
import { get } from 'http'
import { data } from 'autoprefixer'
import { getConnectedUser } from './user/getUser'
import { redirect } from 'next/navigation'

interface stateType {
  title: string,
  description: string,
  details: string,
  ingredients: string[],
  url: string,
  authorId : number,
  token : string,
  tags : string[]
}
interface stateType2 {
    id : number,
    token : string
  }
export const AddPost = async (data : stateType) => {
    try { 
        const response = await axios.post(`/api/posts`, 
         {
            title : data.title,
            authorId : data.authorId,
            description : data.description,
            details : data.details,
            ingredients : data.ingredients,
            url : data.url,
            tags : data.tags
        },
        { headers : {
            Authorization : `Bearer ${data.token}`}
           })
        console.log(response)
        if (response.status === 200) {
            store.dispatch(getMessage(response.data.message))
      setTimeout(() => {
         store.dispatch(getMessage(""))
         }, 2500);
    }
    getPosts()
    getConnectedUser(data.authorId)
    redirect('/')
            // store.dispatch(fetchUser(id))
        
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

export const deletePost = async (datas : stateType2) => { 
    try {
        const response = await axios.put(`/api/posts`,
        {
            id : datas.id
        },
        { headers : {
            Authorization : `Bearer ${datas.token}`}
           })
           console.log(response)
      if (response.status === 200) {
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