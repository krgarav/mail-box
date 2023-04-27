import { createSlice } from "@reduxjs/toolkit";
const initialState = { blueTick: true };

const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    setBlueTick(state) {
      state.blueTick = false;
    },
  },
});
export const layoutAction = layoutSlice.actions;
export default layoutSlice.reducer;
