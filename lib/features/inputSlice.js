import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    value: "",
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
