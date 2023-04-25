import { createSlice } from "@reduxjs/toolkit";
const initialToken = localStorage.getItem("token");
const initialState = {
  token: initialToken ? initialToken : "",
  isLoggedIn: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice.reducer;
