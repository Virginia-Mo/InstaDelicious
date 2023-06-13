import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../reducers/users'

const store = configureStore({
  reducer:{
    users : userSlice.reducer
  },
  })

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>

export default store