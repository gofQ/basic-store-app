import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/config";

export const auth=createApi({
    reducerPath:'auth',
    baseQuery:fetchBaseQuery({baseUrl:API_URL}),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(body)=>({
                url:'/user/login',
                method:'POST',
                body
            })
        }),
        register:builder.mutation({
            query:(body)=>({
                url:'/users/add',
                method:'POST',
                body
            })
        }),
    })
})

export const {useLoginMutation,useRegisterMutation}:any=auth;