import axios from 'axios'
import {store} from '@/redux/store/store'
import { fetchUser } from '@/redux/middlewares/users'
import { Post } from '@/Types/models'

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
            store.dispatch(fetchUser(id))
        }
        return response
    } catch (error) {
        return error
    }
}
export const handleSubmitImage = async (data : string) => {
    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dps629xiv/image/upload`, 
         {
            body : data,
        })
        
        if (response.status === 200) {
            console.log("SUBMIT",response)
        }
        return response
    } catch (error) {
        return error
    }
}