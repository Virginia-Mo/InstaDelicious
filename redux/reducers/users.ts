import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import {fetchUser} from '../middlewares/users'
import { UserDB, User } from "@/Types/models"


interface SliceState {
    user : UserDB,
    onlineUser : UserDB,
    onlineUserFollower : UserDB[],
    onlineUserFollowing : UserDB[],
    users : UserDB[],
    followers : UserDB[],
    following : UserDB[],
    online : boolean,  
};

const initialState : SliceState = {
    user : {} as UserDB,
    onlineUser : {} as UserDB,
    onlineUserFollower : [],
    onlineUserFollowing : [],
    users : [],
    followers : [],
    following : [],
    online : false,
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        getOnlineUser : (state, action: PayloadAction) => {
            state.onlineUser = action.payload
        },
        getOnlineUserFollower : (state, action: PayloadAction) => {
            console.log("gfghb", action.payload)
            state.onlineUserFollower = action.payload
        },
        getOnlineUserFollowing : (state, action: PayloadAction) => {
            state.onlineUserFollowing = action.payload
        },
        getUser : (state, action: PayloadAction) => {
            state.user = action.payload
        },
        getAllUsers : (state, action: PayloadAction) => {
            state.users = action.payload
        },
        getFollowers : (state, action: PayloadAction) => {
            console.log("here followers", action.payload)
            state.followers = action.payload
            console.log(state.followers)
        },
        getFollowing : (state, action: PayloadAction) => {
            state.following = action.payload
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
export const { getUser, setOnline, getAllUsers, getFollowers, getFollowing, getOnlineUser, getOnlineUserFollower, getOnlineUserFollowing} =  userSlice.actions;

export default userSlice; 