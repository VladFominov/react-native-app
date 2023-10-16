import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useRoute from "../router";
import {authStateChangeUser} from "../redux/auth/authOperations"

const Main = ({onLayoutRootView}) => {
  
  const {stateChange} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(authStateChangeUser())
  },[])
  
  const routing = useRoute(stateChange);

  return <NavigationContainer onReady={onLayoutRootView}>{routing}</NavigationContainer>;
};

export default Main;

