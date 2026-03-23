import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";
import { getStorage } from "../utils/auth.storage";


type authType = {
    admin: {
        _id: string,
        email: string
        name: string
        profilePic: string
        role: string
    } | null
}
const initialState: authType = { admin: getStorage() }

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.admin = payload.result
        })


})

export const { } = authSlice.actions
export default authSlice.reducer