import { configureStore } from "@reduxjs/toolkit"
import authSlice from '@/lib/redux/authSlice.ts'

export const store = configureStore({

    reducer: {
        authSlice: authSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch