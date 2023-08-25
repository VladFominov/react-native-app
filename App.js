import "react-native-gesture-handler";

import { useState } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { store } from "./redux/store";

import Main from "./components/main"
console.log("Initial state: ", store.getState())

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

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
    <Main />
    </Provider>
  );
}
