import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    value: "0",
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = inputSlice.actions;

export const selectInputValue = (state) => state.input.value;

export default inputSlice.reducer;
