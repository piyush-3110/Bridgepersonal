import { createSlice } from "@reduxjs/toolkit";

export const estGasFeeSlice = createSlice({
  name: "estGasFee",
  initialState: {
    value: "0",
  },
  reducers: {
    setEstGasFee: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEstGasFee } = estGasFeeSlice.actions;

// export const selectBalValue = (state) => state.bal.value;

export default estGasFeeSlice.reducer;
