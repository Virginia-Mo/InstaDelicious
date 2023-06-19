import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTags = createAsyncThunk('tags/getTags', async () => {
    try {
        const response = await axios.get('/api/tags')
        const data = await response.data
        return data
    } catch (error) {
        return error
    }
})

export const addTags = createAsyncThunk('tags/addTags', async () => {
    try {
        const response = await axios.post('/api/tags')
        const data = await response.data
        return data
    } catch (error) {
        return error
    }
})