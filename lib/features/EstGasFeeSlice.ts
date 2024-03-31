import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const estGasFeeSlice = createSlice({
  name: "estGasFee",
  initialState: {
    value: 0,
  },
  reducers: {
    setEstGasFee: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEstGasFee } = estGasFeeSlice.actions;

export const selectBalValue = (state: RootState) => state.bal.value;

export default estGasFeeSlice.reducer;
