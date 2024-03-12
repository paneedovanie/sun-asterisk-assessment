import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    accessToken: undefined,
  } as { user?: User; accessToken?: undefined },
  reducers: {
    setAuth: (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
    },
    clearAuth: (state) => {
      state.user = undefined;
      localStorage?.clear();
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
