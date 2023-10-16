import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FIREBASE_AUTH } from "../../firebase/config";

import { updateUserProfile, authStateChange,authSignOut } from "./authReducer";

const auth = FIREBASE_AUTH;

export const authSingUpUser =
  ({nickName,email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
         
       await updateProfile(user, { displayName: nickName });

      const { uid, displayName} = auth.currentUser;

      const userUpdateProfile = { nickName: displayName, userId: uid, email: email };
     
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (err) {
      console.log("err", err);
      console.log("err.message", err.message);
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log("err", err);
      console.log("err.message", err.message);
    }
  };

export const authSingOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (err) {
    console.log("err", err);
    console.log("err.message", err.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const userUpdateProfile = {
          nickName: user.displayName,
          userId: user.uid,
          email: user.email,
        };
    
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ stateChange: true }));
      } else {
        console.log("User is null");
      }
    });
  } catch (err) {
    console.error("Error in authStateChangeUser:", err);
  }
};
