import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const destAddSlice = createSlice({
  name: "destAdd",
  initialState: {
    value: null,
  },
  reducers: {
    setDestAddress: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDestAddress } = destAddSlice.actions;

export const destAdd = (state: RootState) => state.destAdd.value;

export default destAddSlice.reducer;
