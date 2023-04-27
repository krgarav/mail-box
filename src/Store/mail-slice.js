import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: [], getMail: [], mailDetail: [] };
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
    addMailDetail(state, action) {
      state.mailDetail = action.payload;
    },
  },
});
export const getMailDetail = (key) => {
  return async (dispatch) => {
    const id = localStorage.getItem("email").replace(/@|\./g, "");
    const response = await fetch(
      "https://mail-box-2b4a6-default-rtdb.firebaseio.com/" +
        id +
        "/" +
        key +
        ".json"
    );
    const data = await response.json();
    dispatch(mailAction.addMailDetail(data))
  };
};

export const getAction = (mail) => {
  return async (dispatch) => {
    const newmail = mail.replace(/@|\./g, "");
    const response = await fetch(
      "https://mail-box-2b4a6-default-rtdb.firebaseio.com/" + newmail + ".json"
    );
    const data = await response.json();
    const allmail = Object.entries(data);

    dispatch(mailAction.getMail(allmail));
  };
};
export const mailAction = mailSlice.actions;
export default mailSlice.reducer;
