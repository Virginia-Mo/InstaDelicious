import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import {User} from '../../models/users'
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

interface SliceState {
    users : User[]
};

const initialState : SliceState = {
    users : [],
};


export const fetchUsers = createAsyncThunk('users/getUsers', async () => {
    console.log('fetching users')
    try {
        const response = await axios.get('/api/users')
        const data = await response.data
        return data

    } catch (error) {
        return error
    }
})

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers : {
        getUsers : (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        },
       },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        }
})
export const {getUsers} =  userSlice.actions;

export default userSlice; 