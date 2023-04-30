import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: [],
  getMail: [],
  mailDetail: [],
  mailState: false,
  sentMail: [],
};
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
    resetMailDetail(state) {
      state.mailDetail = [];
    },
    resetgetMail(state) {
      state.getMail = [];
    },
    changeMailState(state) {
      state.mailState = !state.mailState;
    },
    addToSentMail(state, action) {
      state.sentMail = action.payload;
    },
  },
});
export const sentMailItem = () => {
  return async (dispatch) => {
    const name = localStorage.getItem("email").split("@")[0];
    const newResponse = await fetch(
      "https://mail-box-2b4a6-default-rtdb.firebaseio.com/sent/" +
        name +
        "/.json"
    );
    const data = await newResponse.json();
    const newData = Object.entries(data);
    dispatch(mailAction.addToSentMail(newData));
  };
};
export const deleteMail = (key) => {
  return async (dispatch) => {
    const id = localStorage.getItem("email").replace(/@|\./g, "");
    const response = await fetch(
      `https://mail-box-2b4a6-default-rtdb.firebaseio.com/${id}/${key}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      alert("message deleted");
    }
    dispatch(getAction(localStorage.getItem("email")));
  };
};
export const sentMailUpdate = (key) => {
  return async (dispatch) => {
    const name = localStorage.getItem("email").split("@")[0];
    const response = await fetch(
      "https://mail-box-2b4a6-default-rtdb.firebaseio.com/sent/" +
        name +
        "/" +
        key +
        ".json"
    );
    const data = await response.json();
    dispatch(mailAction.addMailDetail(data));
    fetch(
      "https://mail-box-2b4a6-default-rtdb.firebaseio.com/sent/" +
        name +
        "/" +
        key +
        ".json",
      {
        method: "PUT",
        body: JSON.stringify({ ...data, userClicked: true }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
};
export const update = (key) => {
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
    dispatch(mailAction.addMailDetail(data));
    fetch(
      "https://mail-box-2b4a6-default-rtdb.firebaseio.com/" +
        id +
        "/" +
        key +
        ".json",
      {
        method: "PUT",
        body: JSON.stringify({ ...data, userClicked: true }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
};
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

    dispatch(mailAction.addMailDetail(data));
  };
};

export const getAction = (mail) => {
  return async (dispatch) => {
    try {
      const newmail = mail.replace(/@|\./g, "");
      const response = await fetch(
        `https://mail-box-2b4a6-default-rtdb.firebaseio.com/${newmail}.json`
      );
      if (!response.ok) {
        throw new Error("Data not available");
      }
      const data = await response.json();
      const allmail = Object.entries(data);
      dispatch(mailAction.getMail(allmail));
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const mailAction = mailSlice.actions;
export default mailSlice.reducer;
