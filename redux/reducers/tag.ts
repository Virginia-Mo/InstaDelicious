import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

interface Tag {
    createdAt : Date,
    id: number,
    name: string
}
interface SliceState {
    tags: Tag[]
};
const initialState : SliceState = {
    tags : []
};

export const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers : {
        // getTags : (state : SliceState, action: PayloadAction<string>) => {
        //     state.tags.push(action.payload)
        // },
       },
    extraReducers: (builder) => {
        // builder.addCase(fetchTags.fulfilled, (state, action: PayloadAction<Tag[]>)  => {
        //     state.tags = action.payload
        // })
        }
})
// export const { getTags } =  tagSlice.actions;

export default tagSlice; 