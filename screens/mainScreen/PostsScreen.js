
import {createStackNavigator} from "@react-navigation/stack"

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts"
import CommentsScreen from "../nestedScreens/CommentsScreen"
import MapScreen from "../nestedScreens/MapScreen"

const NestedScreen = createStackNavigator();

const PostScreen = () =>{
    return(
<NestedScreen.Navigator>
    <NestedScreen.Screen name="Всі пости користувачів" component={DefaultScreenPosts} />
    <NestedScreen.Screen name="Коментарі" component={CommentsScreen} /> 
    <NestedScreen.Screen name="Map" component={MapScreen} />
</NestedScreen.Navigator>
    )

};

export default PostScreen;