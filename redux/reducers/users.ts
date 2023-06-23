import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import {fetchUser} from '../middlewares/users'
import { UserDB } from "@/Types/models"


interface SliceState {
    user : UserDB,
    online : boolean,  
};

const initialState : SliceState = {
    user : {} as UserDB,
    online : false,
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        getUser : (state, action: PayloadAction) => {
            state.user = action.payload
        },
        setOnline : (state, action : PayloadAction<boolean>) => {
            state.online = action.payload
        },
       },
    extraReducers: (builder) => {
        // builder.addCase(fetchUsers.fulfilled, (state, action) => {
        //     state.user = action.payload
        // // })
        // builder.addCase(fetchUser.fulfilled, (state, action) => {
        //     console.log("action", action)
        //     state.user = action.payload
        // })
        }
})
export const { getUser, setOnline } =  userSlice.actions;

export default userSlice; 