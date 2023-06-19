import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import {fetchUser} from '../middlewares/users'
import { UserDB } from "@/Types/models"


interface SliceState {
    user : UserDB
};

const initialState : SliceState = {
    user : {} as UserDB
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        getUser : (state, action: PayloadAction<UserDB>) => {
            state.user = action.payload
        },
       },
    extraReducers: (builder) => {
        // builder.addCase(fetchUsers.fulfilled, (state, action) => {
        //     state.user = action.payload
        // })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            console.log("action", action)
            state.user = action.payload
        })
        }
})
export const { getUser } =  userSlice.actions;

export default userSlice; 