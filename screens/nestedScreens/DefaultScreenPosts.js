import { useEffect, useState } from "react";

import { Text, View, StyleSheet, FlatList, Image,TouchableOpacity } from "react-native";


const DefaultScreenPosts = ({ route, navigation }) => {
  console.log("navigation :",navigation)
  const [posts, setPosts] = useState([]);
  console.log("route.params :", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, ...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts :", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, justifyContent: "center",
          alignItems: "center",}}>
            <Image source={{ uri: item.photo }} style={{width: 350, height: 200}} />
          </View>
        )}
      />
  
      <TouchableOpacity style={styles.loginLink} activeOpacity={0.6} onPress={() => navigation.navigate("Map")}>
              <Text style={styles.loginLinkText} >Go to map</Text>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.loginLink} activeOpacity={0.6} onPress={() => navigation.navigate("Comments")}>
              <Text style={styles.loginLinkText} >Go to comments</Text>
            </TouchableOpacity>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DefaultScreenPosts;
