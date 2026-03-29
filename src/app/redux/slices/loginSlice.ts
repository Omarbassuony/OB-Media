import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface IUserData {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "loginSlice/SignIn",
  async (userData: IUserData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        userData
      );
      // API response shape: { success: true, message: "signed in successfully", data: { token, user } }
      if (data.success) {
        localStorage.setItem("token", data.data.token);
      }
      toast.success(data.message);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message || error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

interface IinitialState {
  token: string | null;
  loading: boolean;
}

const initialState: IinitialState = {
  token: null,
  loading: false,
};

export const login = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    clearData: (state) => {
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    getToken: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        state.token = token ?? null;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      // token is nested inside data.data.token
      if (action.payload?.success) {
        state.token = action.payload.data.token;
      }
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearData, getToken } = login.actions;
export const loginSlice = login.reducer;
