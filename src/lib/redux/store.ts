import { configureStore } from "@reduxjs/toolkit"
import authSlice from '@/lib/redux/authSlice'
import userSlice from '@/lib/redux/features/userSlice'
import cartSlice from '@/lib/redux/features/cartSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        cart: cartSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch