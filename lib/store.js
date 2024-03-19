import { configureStore } from "@reduxjs/toolkit";
import chainReducer from "./features/chainSlice";

export const store = configureStore({
  reducer: chainReducer,
});
