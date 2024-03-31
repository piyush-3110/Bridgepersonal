import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fromChain: { name: "Polygon", chainId: 10109 },
  toChain: { name: "Arbitrum", chainId: 10231 },
};

export const chainSlice = createSlice({
  name: "chain",
  initialState,
  reducers: {
    setFromChain: (state, action) => {
      state.fromChain = action.payload;
    },
    setToChain: (state, action) => {
      state.toChain = action.payload;
    },
  },
});

export const { setFromChain, setToChain } = chainSlice.actions;

export default chainSlice.reducer;
