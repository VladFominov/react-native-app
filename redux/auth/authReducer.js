import { createSlice } from "@reduxjs/toolkit";

const initialState=  {
  userId: null,
  email:null,
  nickName: null,
  stateChange: false,
 
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      nickName: payload.nickName,
      userId: payload.userId,
      email: payload.email,
    }),

    authStateChange: (state, { payload }) => ({
        ...state,
        stateChange: payload.stateChange,
      }),
    authSignOut: () => initialState,
  },
});

export const { updateUserProfile,authSignOut ,authStateChange} = authSlice.actions;

export default authSlice.reducer;


