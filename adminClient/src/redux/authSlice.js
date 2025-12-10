import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;


export const getAdminDetails = createAsyncThunk("auth/getAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URI}/api/backends/get-admin`, {
        withCredentials: true,
      });
      return res.data.admin;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch admin");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.admin = null,
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(getAdminDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
