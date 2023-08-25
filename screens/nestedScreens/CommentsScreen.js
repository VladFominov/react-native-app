import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { FIRESTORE_DB } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const [allComments, setAllComments] = useState([]);
  const { postId } = route.params;
  const [comment, setComment] = useState("");

  const { nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    const commentsRef = collection(FIRESTORE_DB, "posts", postId, "comments");
    await addDoc(commentsRef, { comment, nickName });
    setComment("");
  };

  const getAllPosts = async () => {
    const commentsRef = collection(FIRESTORE_DB, "posts", postId, "comments");
    await onSnapshot(commentsRef, (data) =>
      setAllComments(
        data.docs.map((doc) => ({
          ...doc.data(), id: doc.id,
        }))
      )
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.comment}</Text>
              <Text>{item.nickName}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={{ marginTop: 33 }}>
        <TextInput
          style={styles.input}
          placeholder="Текст..."
          onChangeText={setComment}
          value={comment}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.6}
        onPress={createPost}
      >
        <Text style={styles.btnText}>Створити пост</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
  },
  commentContainer:{
borderColor:"#FF6C00",
borderWidth:1,
marginHorizontal: 16,
padding: 10,
marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: `transparent`,
    borderBottomColor: "#FF6C00",
    borderWidth: 1,
  },
  btn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 51,
    marginTop: 43,
    marginBottom: 30,
    justifyContent: "center",
    textAlign: "center",
  },
  btnText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default CommentsScreen;
