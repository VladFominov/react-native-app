import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const state =   useSelector((state) => state);
  // console.log("stateMain: ",state);
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());

  }, []);



  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
