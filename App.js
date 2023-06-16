
import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import {onAuthStateChanged} from "firebase/auth";
import useRoute from "./router";
import { store } from "./redux/store";

import {FIREBASE_AUTH} from "./firebase/config"

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
const [user, setUser] = useState(null);

useEffect(() =>{
  onAuthStateChanged(FIREBASE_AUTH,(user) =>{
    setUser(user);
  })
})

  const routing = useRoute(user);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      // Handle the error here
      console.error("Error occurred:", error);
    }

    setIsLoading(false);
  };

  let [fontsLoaded] = useFonts({
    "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
