import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  look:false,
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  socket:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setLook(state, value) {
      state.look = value.payload;
    },
    setSocket(state, value) {
      state.socket = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken, setLook ,setSocket} = authSlice.actions;

export default authSlice.reducer;