import { configureStore } from "@reduxjs/toolkit";
import chainReducer from "./features/chainSlice";
import inputReducer from "./features/inputSlice";
import balReducer from "./features/balSlice";
import destAddSlice from "./features/destAddressSlice";
import estGasFeeReducer from "./features/EstGasFeeSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chain: chainReducer,
  input: inputReducer,
  bal: balReducer,
  estGasFee: estGasFeeReducer,
  destAdd: destAddSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
