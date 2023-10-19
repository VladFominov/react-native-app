import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import {
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
        <AuthStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveTintColor: "#FF6C00",
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="post" size={45} color={color} />
          ),
        }}
        name="Пости"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="add-circle" size={45} color={color} />
          ),
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="user" size={45} color={color} />
          ),
        }}
        name="nickName"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
