import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mailSlice from "./mail-slice";
import layoutSlice from "./layout-slice";

const Store = configureStore({
  reducer: { auth: authSlice, mail: mailSlice, layout: layoutSlice },
});

export default Store;
