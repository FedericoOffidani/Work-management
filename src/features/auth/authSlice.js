import { createSlice } from "@reduxjs/toolkit";

const addPersistentData = (token, rememberMe) => {
  if (!rememberMe) {
    sessionStorage.setItem("token", JSON.stringify({ token }));
  } else {
    localStorage.setItem("token", JSON.stringify({ token }));
  }
};

const removePersistentData = () => {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");
};

const initializeState = () => {
  if (
    sessionStorage.getItem("token") !== null &&
    sessionStorage.getItem("token") !== undefined
  ) {
    const jsonData = JSON.parse(sessionStorage.getItem("token"));
    return {
      token: jsonData.token,
      rememberMe: true,
      isLoggedIn: true,
    };
  } else if (
    localStorage.getItem("token") !== null &&
    localStorage.getItem("token") !== undefined
  ) {
    const jsonData = JSON.parse(localStorage.getItem("token"));
    return {
      token: jsonData.token,
      rememberMe: true,
      isLoggedIn: true,
    };
  }
  return {
    token: null,
    rememberMe: false,
    isLoggedIn: false,
  };
};

export const authSlice = createSlice({
  name: "token",
  initialState: initializeState(),
  reducers: {
    login: (state, action) => {
      addPersistentData(action.payload.token, action.payload.rememberMe);
      state.token = action.payload.token;
      state.rememberMe = action.payload.rememberMe;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      removePersistentData();
      state.token = null;
      state.rememberMe = false;
      state.isLoggedIn = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
