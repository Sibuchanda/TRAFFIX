import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URI}/api/backends`;

const axiosConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

// Async thunks for Getting all backends
export const fetchBackends = createAsyncThunk(
  "backends/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`, axiosConfig);
      return response.data.backends;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch backends"
      );
    }
  }
);

// Add backend
export const addBackend = createAsyncThunk(
  "backends/add",
  async (backendData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/add`,
        backendData,
        axiosConfig
      );
      return response.data.backend;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add backend"
      );
    }
  }
);

// Update backend
export const updateBackend = createAsyncThunk(
  "backends/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, axiosConfig);
      return response.data.backend;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update backend"
      );
    }
  }
);

// Delete backend
export const deleteBackend = createAsyncThunk(
  "backends/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete backend"
      );
    }
  }
);

// Check backend status
export const checkStatus = createAsyncThunk(
  "backends/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/check-status`);
      return response.data.backends;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update status"
      );
    }
  }
);

// Slice
const backendSlice = createSlice({
  name: "backends",
  initialState: {
    backends: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch backends
      .addCase(fetchBackends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBackends.fulfilled, (state, action) => {
        state.loading = false;
        state.backends = action.payload;
      })
      .addCase(fetchBackends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add backend
      .addCase(addBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.backends.unshift(action.payload);
        state.success = "Backend added successfully";
      })
      .addCase(addBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update backend
      .addCase(updateBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBackend.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.backends.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.backends[index] = action.payload;
        }
        state.success = "Backend updated successfully";
      })
      .addCase(updateBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete backend
      .addCase(deleteBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.backends = state.backends.filter((b) => b._id !== action.payload);
        state.success = "Backend deleted successfully";
      })
      .addCase(deleteBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check status
      .addCase(checkStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.backends = action.payload;
      })
      .addCase(checkStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkStatus.rejected, (state, action) => {
        state.loading = false;
        state.backends = action.payload;
      });
  },
});

export const { clearMessages } = backendSlice.actions;
export default backendSlice.reducer;
