import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk('users/getUsers', async () => {
    try {
        const response = await axios.get('/api/users')
        const data = await response.data
        return data
    } catch (error) {
        return error
    }
})
