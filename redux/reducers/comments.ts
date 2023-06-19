import {createSlice} from "@reduxjs/toolkit"
import type {PayloadAction } from '@reduxjs/toolkit'
import { fetchComments } from "../../async_calls/comments"
import { Comment } from "@/Types/models"

interface SliceState {
    comments: Comment[]
};
const initialState : SliceState = {
    comments : []
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers : {
       },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>)  => {
            state.comments = action.payload
        })
        }
})
// export const { getTags } =  tagSlice.actions;

export default commentsSlice; 