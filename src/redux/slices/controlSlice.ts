import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IControl, DashboardTitle } from "./types";

const initialState: IControl = {
  isBackButton: false,
  title: "Dashboard",
};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    handleBackButton: (state, action: PayloadAction<boolean>) => {
      state.isBackButton = action.payload;
    },
    editTitle: (state, action: PayloadAction<DashboardTitle>) => {
      state.title = action.payload;
    },
  },
});

export const { handleBackButton, editTitle } = controlSlice.actions;

export default controlSlice.reducer;
