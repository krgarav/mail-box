import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mailSlice from "./mail-slice";

const Store = configureStore({
  reducer: { auth: authSlice, mail: mailSlice },
});

export default Store;
