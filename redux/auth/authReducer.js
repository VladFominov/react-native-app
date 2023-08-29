import { createSlice } from "@reduxjs/toolkit";

const initialState=  {
  userId: null,
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
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
     
    }),
    authSignOut: () => initialState,
  },
});
// console.log("authSlice: ",authSlice)
// console.log("authSlice.initialState: ",authSlice.getInitialState())

// export const { updateUserProfile, authStateChange } = authSlice.actions;
// console.log("updateUserProfile: ",updateUserProfile)
export default authSlice.reducer 


