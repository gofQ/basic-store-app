import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/config";


export const fakeApi=createApi({
    reducerPath:'fakeApi',
    baseQuery:fetchBaseQuery({baseUrl:API_URL}),
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>'/products'
        }),
        getAllProducts:builder.query({
            query:()=>'/products?limit=194'
        }),
        getProduct:builder.query({
            query:(id)=>`/products/${id}`
        }),
        getCategories:builder.query({
            query:()=>'/products/category-list'
        }),
        getCategory:builder.query({
            query:(category)=>`/products/category/${category}`
        })
    })
});

export const {useGetProductsQuery,useGetProductQuery,useGetCategoriesQuery,useGetCategoryQuery,useGetAllProductsQuery}:any=fakeApi;