import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { FIRESTORE_DB } from "../../firebase/config";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    await onSnapshot(collection(FIRESTORE_DB, "posts"),(data)=>setPosts(data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))) );
  };

  useEffect(() => {
    getAllPosts()
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View>
            <TouchableOpacity
        style={styles.loginLink}
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Map",{location: item.location})}
      >
        <Text style={styles.loginLinkText}>Go to map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Comments",{postId: item.id})}
      >
        <Text style={styles.loginLinkText}>Додати коментар</Text>
      </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
