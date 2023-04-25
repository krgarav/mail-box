import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: [] };
const mailSlice = createSlice({
  name: "mail",
  initialState: initialState,
  reducers: {
    sendMail(state, action) {
      state.email = action.payload;
    },
  },
});


export const mailAction = mailSlice.actions;
export default mailSlice.reducer;
