import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserAuth } from "../types/auth";
import { storageService } from "../services/storageService";

const localUser = storageService.getLocal<IUserAuth>("userData");
const initialState = {
  user: localUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      return { ...state, ...action.payload };
    },

    resetAuth: () => {
      storageService.removeLocal("userData");
      storageService.removeLocal("accessToken");
      storageService.removeLocal("refreshToken");
      return { ...initialState, user: null };
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
