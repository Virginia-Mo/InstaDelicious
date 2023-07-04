import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import {fetchUser} from '../middlewares/users'
import { UserDB, User } from "@/Types/models"


interface SliceState {
    user : UserDB,
    onlineUser : UserDB,
    userFollower : UserDB[],
    users : UserDB[],
    followers : UserDB[],
    following : UserDB[],
    online : boolean,  
    follower : User[]
};

const initialState : SliceState = {
    user : {} as UserDB,
    onlineUser : {} as UserDB,
    userFollower : [],
    users : [],
    followers : [],
    following : [],
    online : false,
    follower : []
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        getOnlineUser : (state, action: PayloadAction) => {
            state.onlineUser = action.payload
        },
        getOnlineUserFollower : (state, action: PayloadAction) => {
            state.userFollower = action.payload
        },
        getUser : (state, action: PayloadAction) => {
            state.user = action.payload
        },
        getAllUsers : (state, action: PayloadAction) => {
            state.users = action.payload
        },
        getFollowers : (state, action: PayloadAction) => {
            console.log("action", action.payload)
            // if (action.payload === undefined){
            //     state.followers = []
            // } else {
            //     state.followers = []
                state.followers = action.payload
            // }
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
export const { getUser, setOnline, getAllUsers, getFollowers, getFollowing, getOnlineUser, getOnlineUserFollower } =  userSlice.actions;

export default userSlice; 