import { combineReducers, getDefaultMiddleware , configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import {userSlice} from '../reducers/users';
import {tagSlice} from '../reducers/tag';
import storage from 'redux-persist/lib/storage';
import {commentsSlice} from '../reducers/comments';


const persistConfig = {
  key: 'user',
  storage,
}
const reducers = combineReducers({ 
  user : userSlice.reducer, 
  tag: tagSlice.reducer, 
  comment: commentsSlice.reducer });

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
  reducer:{
    persistedReducer
  },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
  
  })
  const Persistor = persistStore(store);

export { Persistor};

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>
