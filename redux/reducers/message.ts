import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    message : ""
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers : {
        getMessage : (state, action: PayloadAction<string>) => {
            state.message = action.payload
        },
       },
    extraReducers: (builder) => {
        // builder.addCase(fetchmessages.fulfilled, (state, action: PayloadAction<message[]>)  => {
        //     state.messages = action.payload
        // })
        }
})
export const { getMessage} =  messageSlice.actions;

export default messageSlice; 