import { useEffect, } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase/config";
import {updateUserProfile,authSignOut} from "../redux/auth/authReducer"

const auth = FIREBASE_AUTH;

const useAuth = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            navigation.navigate("Posts")
        } else {
          
          dispatch(authSignOut());
        }
      });
      return  unsubscribe;
    }, []);
  };
  
export default useAuth;
