import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import { adminApi } from "./api/admin.api";
import { userApi } from "./api/user.api";
import { useSelector } from "react-redux";
import authslice from "./slice/auth.slice"

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authslice
    },
    middleware: def => def().concat(authApi.middleware, adminApi.middleware, userApi.middleware)
})

type RootType = ReturnType<typeof reduxStore.getState>
export const useAppSelector = useSelector.withTypes<RootType>()

export default reduxStore