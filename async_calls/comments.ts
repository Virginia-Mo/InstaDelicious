import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchComments = createAsyncThunk('comments/getComments', async () => {
    try {
        const response = await axios.get('/api/comments')
        const data = await response.data
        return data
    } catch (error) {
        return error
    }
})

export const addComments = createAsyncThunk('comments/addComments', async () => {
    try {
        const response = await axios.post('/api/comments/')
        const data = await response.data
        return data
    } catch (error) {
        return error
    }
})