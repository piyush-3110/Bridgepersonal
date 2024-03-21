// balSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const balSlice = createSlice({
  name: "bal",
  initialState: {
    value: 0,
  },
  reducers: {
    setBal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBal } = balSlice.actions;

export const selectBalValue = (state) => state.bal.value;

export default balSlice.reducer;
