import { configureStore, combineReducers } from "@reduxjs/toolkit";
import controlSlice from "./slices/controlSlice";

const rootReducer = combineReducers({
  controlSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
