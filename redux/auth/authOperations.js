import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import {FIREBASE_AUTH} from "../../firebase/config"

import{authSlice} from "./authReducer"

const auth = FIREBASE_AUTH;

export const authSingUpUser = ({login,email,password})=> async(dispatch, getState) =>{

    try{
    const{ user} =  await  createUserWithEmailAndPassword(auth,email,password);
    dispatch(authSlice.actions.updateUserProfile({userId:user.uid}))
    console.log("user", user);
}
catch(err){
    console.log("err",err);
    console.log("err.message",err.message);
}
};

export const authSingInUser = ({email,password})=> async(dispatch, getState) =>{
    
    try{
    const user =  await  signInWithEmailAndPassword(auth,email,password);
    
}
catch(err){
    console.log("err",err);
    console.log("err.message",err.message);
}
};

export const authSingOutUser = ()=> async(dispatch, getState) =>{

};

