import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FIREBASE_AUTH } from "../../firebase/config";

import { authSlice } from "./authReducer";

const { authSignOut, authStateChange, updateUserProfile } = authSlice.actions;

const auth = FIREBASE_AUTH;

export const authSingUpUser =
  ({ nickName, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      console.log("user:", user);

      await updateProfile(user, { displayName: nickName });

      const { uid, displayName } = auth.currentUser;

      const userUpdateProfile = { nickName: displayName, userId: uid };

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
        console.log("authStateChangeUser: ", user);
        const userUpdateProfile = {
          nickName: user.displayName,
          userId: user.uid,
        };
        // authSlice.actions.
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ stateChange: true }));
      } else {
        // Handle case when user is null
        console.log("User is null");
      }
    });
  } catch (err) {
    // Handle any errors that occur during the auth state change
    console.error("Error in authStateChangeUser:", error);
  }
};
