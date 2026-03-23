import { APP_URL } from "@/constant/config"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/contact`, credentials: "include" }),
    tagTypes: [],
    endpoints: (builder) => {
        return {
            createContact: builder.mutation<CONTACT_CREATE_RESPONCE, void>({
                query: userData => {
                    return {
                        url: "/create-contact",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: []
            }),
            getAllProject: builder.query<PROJECT_GET_RESPONCE, void>({
                query: () => {
                    return {
                        url: "/get-project",
                        method: "GET"
                    }
                },
                providesTags: []
            }),
            getAbout: builder.query<ABOUT_GET_RESPONCE, void>({
                query: () => {
                    return {
                        url: "/get-about",
                        method: "GET"
                    }
                },
                providesTags: []
            }),
            getExp: builder.query<EXP_GET_RESPONCE, void>({
                query: () => {
                    return {
                        url: "/get-exp",
                        method: "GET"
                    }
                },
                providesTags: []
            }),
            getStat: builder.query<STAT_GET_RESPONCE, void>({
                query: () => {
                    return {
                        url: "/get-stat",
                        method: "GET"
                    }
                },
                providesTags: []
            }),
            sendReplyTOContact: builder.mutation<SEND_REPLY_RESPONCE, SEND_REPLY_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-contact/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: []
            }),

        }
    }
})

export const { useGetAboutQuery, useCreateContactMutation, useGetAllProjectQuery, useGetExpQuery, useGetStatQuery, useSendReplyTOContactMutation } = userApi
