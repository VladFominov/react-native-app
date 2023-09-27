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
    authStateChange: (state, { payload }) => {
      console.log("authStateChange action dispatched with payload:", payload);
      return {
        ...state,
        stateChange: payload.stateChange,
      };
    },
    authSignOut: () => initialState,
  },
});
// console.log("authSlice: ",authSlice)
console.log("authSlice.initialState: ",authSlice.getInitialState())

export const { updateUserProfile,authSignOut ,authStateChange} = authSlice.actions;
// console.log("updateUserProfile: ",updateUserProfile)
export default authSlice.reducer 


