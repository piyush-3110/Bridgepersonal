import { configureStore } from "@reduxjs/toolkit";
import chainReducer from "./features/chainSlice";
import inputReducer from "./features/inputSlice";
import balReducer from "./features/balSlice";
import estGasFeeReducer from "./features/EstGasFeeSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chain: chainReducer,
  input: inputReducer,
  bal: balReducer,
  estGasFee: estGasFeeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
