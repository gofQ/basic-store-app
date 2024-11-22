import { createSlice } from "@reduxjs/toolkit"

type initialStateType = {
    accessToken:string,
    refreshToken:string,
    userId:any,
    user:any,
    favorites:any[],
    storeCategory:{
        name:string,
        trigger:boolean
    },
    carts:any[]
}

const initialState:initialStateType = {
    accessToken:'',
    refreshToken:'',
    userId:'',
    user:{},
    favorites:[],
    storeCategory:{
        name:'beauty',
        trigger:false
    },
    carts:[]
}

const mainSlice=createSlice({
    name:"main",
    initialState,
    reducers:{
        setAccessToken:(state,action)=>{
            state.accessToken=action.payload
        },
        setRefreshToken:(state,action)=>{
            state.refreshToken=action.payload
        },
        setUserId:(state,action)=>{
            state.userId=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setFavorites:(state,action)=>{
            state.favorites=action.payload
        },
        setStoreCategory:(state,action)=>{
            state.storeCategory.name=action.payload
            state.storeCategory.trigger=true
        },
        setCarts:(state,action)=>{
            state.carts=action.payload
        }
    }
})

export default mainSlice.reducer

export const {setAccessToken,setRefreshToken,setUserId,setUser,setFavorites,setStoreCategory,setCarts}=mainSlice.actions