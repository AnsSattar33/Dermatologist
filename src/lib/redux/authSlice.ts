import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: Boolean
    user: null | {
        username: string
        email: string
    }
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {

        login: (state, action: PayloadAction<AuthState['user']>) => {

            state.user = action.payload,
                state.isAuthenticated = true
        },
        logout: (state) => {

            state.user = null
            state.isAuthenticated = false
        },
        alreadyHaveAccount: (state, action: PayloadAction<AuthState['isAuthenticated']>) => {

            state.isAuthenticated = action.payload
        }
    }
})

export const { login, logout, alreadyHaveAccount } = authSlice.actions
export default authSlice.reducer