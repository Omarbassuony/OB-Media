import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface ISignupData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
}

export const signUp = createAsyncThunk(
  "signupSlice/signUp",
  async (userData: ISignupData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        userData
      );
      // API response shape: { success: true, message: "account created", data: { token, user } }
      toast.success(data.message);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message || error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

interface IState {
  loading: boolean;
  message: string;
}

const initialState: IState = {
  loading: false,
  message: "",
};

export const signup = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload?.message ?? "";
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const signupSlice = signup.reducer;
