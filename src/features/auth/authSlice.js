import { createSlice } from "@reduxjs/toolkit";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../../constants/User/authConstants";

const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(LOGIN_SUCCESS, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(LOGIN_FAILED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
