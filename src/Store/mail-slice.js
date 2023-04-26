import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: [], getMail: [] };
const mailSlice = createSlice({
  name: "mail",
  initialState: initialState,
  reducers: {
    sendMail(state, action) {
      state.email = action.payload;
    },
    getMail(state, action) {
      state.getMail = action.payload;
    },
  },
});

export const getAction = (mail) => {
  return async (dispatch) => {
    const newmail = mail.replace(/@|\./g, "");
    const response = await fetch(
      "https://mail-box-2b4a6-default-rtdb.firebaseio.com/" + newmail + ".json"
    );
    const data = await response.json();
    const allmail = Object.values(data);
    // for (const [key, value] of Object.entries(data)) {
    //   // console.log(`${key}: ${JSON.stringify(value)}`);
    //   allmail += JSON.stringify(value);
    // }

    dispatch(mailAction.getMail(allmail));
  };
};
export const mailAction = mailSlice.actions;
export default mailSlice.reducer;
