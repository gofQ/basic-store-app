import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token , RootState} from "../store";
import { API_URL } from "../../utils/config";


export const userApi=createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({baseUrl:API_URL,
        prepareHeaders:(headers,{getState})=>{
            const authToken=token(getState() as RootState);
            if(authToken){
                headers.set('authorization',`Bearer ${authToken}`);
            }
            return headers;
        },
        credentials:'include'
    }),
    endpoints:(builder)=>({
        getUserInformation:builder.query({
            query:()=>'/auth/me',
        }),
    })
})

export const {useGetUserInformationQuery}:any=userApi;