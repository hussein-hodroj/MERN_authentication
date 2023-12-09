//make asynchronous request to our backend
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' })

export const apiSlice = createApi({
    baseQuery, 
    //hayde halla2 krml ma n3mal getch kl shwy so bt3mal cache w use lal data
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})