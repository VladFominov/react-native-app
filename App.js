
// початок старого коду, який працював
if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import "react-native-gesture-handler";

import { useCallback ,useEffect,useState} from "react";
 // початок завантаження фотнів
import * as SplashScreen from 'expo-splash-screen';
// кінець завантаження фотнів
import { Provider } from "react-redux";
// import { User,onAuthStateChanged } from "firebase/auth";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { store } from "./redux/store";
import "./firebase/config"
import Main from "./components/main"
// import {FIREBASE_AUTH} from "./firebase/config"

// const auth = FIREBASE_AUTH;


export default function App() {
  // const [user, setUser] = useState(User ||null);
  // useEffect(()=>{
  //   onAuthStateChanged(auth,(user)=>{
  //     console.log("Auth state changed user: ", user);
  //     setUser(user);
  //   });
  // },[])
  // початок завантаження фотнів
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






