import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import { fakeApi } from "./services/fakeApi";
import { auth } from "./services/auth";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { userApi } from "./services/user";



const store=configureStore({ 
    reducer:{
        main: mainSlice,
        [fakeApi.reducerPath]:fakeApi.reducer,
        [auth.reducerPath]:auth.reducer,
        [userApi.reducerPath]:userApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(fakeApi.middleware).concat(auth.middleware).concat(userApi.middleware)
    
});

setupListeners(store.dispatch);

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export const token=(state:RootState)=>state.main.accessToken;

export default store;
