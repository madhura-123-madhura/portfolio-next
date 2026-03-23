import { APP_URL } from "@/constant/config"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { removeStorage } from "../utils/auth.storage"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {

            login: builder.mutation<LOGIN_RESPONCE, LOGIN_REQUEST>({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: (data: LOGIN_RESPONCE) => {
                    return data
                }
            }),
            logout: builder.mutation<void, void>({
                query: () => {
                    return {
                        url: "/logout",
                        method: "POST",

                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: () => {
                    removeStorage()
                }
            }),

        }
    }
})

export const { useLoginMutation, useLogoutMutation } = authApi
