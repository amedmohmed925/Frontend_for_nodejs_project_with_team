import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/auth";


export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/signIn`, userData);


    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});


export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/signUp`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Registration failed");
  }
});

// ✅ تحديث `accessToken` باستخدام `refreshToken`
export const refreshAccessToken = createAsyncThunk("auth/refreshAccessToken", async (_, { rejectWithValue }) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available. Please log in again.");
    }

    const response = await axios.post(`${API_URL}/refreshToken`, { token: refreshToken });

    // تحديث `accessToken` في localStorage
    localStorage.setItem("token", response.data.accessToken);

    return response.data.accessToken;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Token refresh failed");
  }
});

// ✅ الحالة الأولية
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ عند تسجيل الدخول بنجاح
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      // ❌ عند فشل تسجيل الدخول
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ✅ عند تسجيل الحساب بنجاح
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      // ❌ عند فشل تسجيل الحساب
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ✅ عند تحديث `accessToken` بنجاح
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      // ❌ عند فشل تحديث `accessToken`
      .addCase(refreshAccessToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
