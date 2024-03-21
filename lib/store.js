import { configureStore } from "@reduxjs/toolkit";
import chainReducer from "./features/chainSlice";
import inputReducer from "./features/inputSlice";
import balReducer from "./features/balSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chain: chainReducer,
  input: inputReducer,
  bal: balReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
