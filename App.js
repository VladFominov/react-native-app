import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";

const AuthStack = createStackNavigator();

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
    <NavigationContainer>
      <AuthStack.Navigator>
      <AuthStack.Screen name="Registration" options={{headerShown:false}} component={RegisterScreen} />
      <AuthStack.Screen name="Login" options={{headerShown:false}}  component={LoginScreen} />
      </AuthStack.Navigator>     
    </NavigationContainer>
  );
}
