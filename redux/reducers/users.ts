import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import {User} from '../../Types/users'
import {fetchUsers} from '../middlewares/users'

interface SliceState {
    users : User[]
};

const initialState : SliceState = {
    users : [],
};


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