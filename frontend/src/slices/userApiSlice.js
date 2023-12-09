//here where we will have all of our endpoints to work with backend 
//now apiSlice fina n3tebera hiyye l parent slice

import { apiSlice } from './apiSlice'
const USERS_URL = '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({ //it allow us to create our own endpoint in this file and inject them into the endpoint bl apiSlice file
endpoints: (builder) => ({
    login: builder.mutation({
    query: (data) => ({
        url: `${USERS_URL}/auth`, //hayde btstahdefa bl controller 
        method: 'POST', 
        body: data 
    })        
    }),
    register: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}`, //hayde btstahdefa bl controller 
            method: 'POST', 
            body: data 
        })        
        }),
    logout: builder.mutation({
        query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST', 
            
        })
    }), 
   updateUser: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/profile`, //hayde btstahdefa bl controller 
            method: 'PUT', 
            body: data 
        })        
        }),
})
})  

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice
