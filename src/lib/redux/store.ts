import { configureStore } from "@reduxjs/toolkit"
import authSlice from '@/lib/redux/authSlice'
import userSlice from '@/lib/redux/features/userSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch