import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "@/lib/appwrite/config";
import { ID } from "appwrite";

interface UserState {
  user: {
    $id?: string;
    name: string;
    email: string;
    emailVerification: boolean;
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null
};

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ name, email, password }: { name?: string; email?: string; password?: string }) => {
    try {
      if (name) {
        await account.updateName(name);
      }
      if (email) {
        await account.updateEmail(email, password!);
      }
      if (password) {
        await account.updatePassword(password);
      }
      const user = await account.get();
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update profile';
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch profile';
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer; 