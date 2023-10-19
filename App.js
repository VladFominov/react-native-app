import 'expo-dev-client';
import "react-native-gesture-handler";

import { useCallback } from "react";

 // початок завантаження фотнів
import * as SplashScreen from 'expo-splash-screen';
// кінець завантаження фотнів
import { Provider } from "react-redux";

import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { store } from "./redux/store";
import "./firebase/config"
import Main from "./components/main"


export default function App() {
  
const [fontsLoaded] = useFonts({
  "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
});

const onLayoutRootView = useCallback(async () => {
  if(fontsLoaded){
    await SplashScreen.hideAsync();
  }
},[fontsLoaded])

if(!fontsLoaded){
  return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
}
  // кінець завантаження фотнів
  return (
    <Provider store={store}>
    <Main    onLayoutRootView={onLayoutRootView}/>
    </Provider>
  );
}






