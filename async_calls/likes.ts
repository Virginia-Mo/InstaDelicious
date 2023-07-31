import axios from 'axios'
import {store} from '@/redux/store/store'
import { fetchUser } from '@/redux/middlewares/users'


export const AddLikes = async (id: number, onlineUser : number) => {
    const user = store.getState().persistedReducer.user.user
    try {
        const response = await axios.patch(`/api/like/${id}`, {
            userId : onlineUser,
        })
        if (response.status === 200) {
            store.dispatch(fetchUser(user.id))
        }
        return response
    } catch (error) {
        return error
    }
}

export const MinusLikes = async (id: number, onlineUser : number) => {
    try {
        const user = store.getState().persistedReducer.user.user

        const response = await axios.put(`/api/like/${id}`, {
            userId : onlineUser,
        })
        if (response.status === 200) {
            store.dispatch(fetchUser(user.id))
        }
        return response
    } catch (error) {
        return error
    }
}
