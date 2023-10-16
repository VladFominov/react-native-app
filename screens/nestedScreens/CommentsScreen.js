import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { FIRESTORE_DB } from "../../firebase/config";
import useFirebaseAvatar from "../../hooks/useFirebaseAvatar";

const MAX_CHARACTERS_PER_LINE = 37;

const CommentsScreen = ({ route }) => {
  const [allComments, setAllComments] = useState([]);
  const { postId, imageUri } = route.params;
  const [comment, setComment] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { getAvatarUrl, isLoading } = useFirebaseAvatar();

  const { nickName,userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPostData();
  }, []);

  const createPost = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    const commentsRef = collection(FIRESTORE_DB, "posts", postId, "comments");
    const avatarRef = await getAvatarUrl(userId);
    await addDoc(commentsRef, { comment, nickName,avatarRef });
    setComment("");
  };

  const getAllPostData = async () => {
    try {
     
      const commentsRef = collection(FIRESTORE_DB, "posts", postId, "comments");
      await onSnapshot(commentsRef, (data) =>
        setAllComments(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
    } catch (err) {
      console.log(console.error("Error fetching post data:", err));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 380, height: 200 }}
          />
        </View>

        <SafeAreaView style={styles.container}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View>
                
                  <View style={styles.avatarContainer} >
                  <Text>{item.nickName}</Text>
                    <Image source={{ uri: item.avatarRef }} style={{ width: 40, height: 40, borderRadius: 50}} />
                  </View>
                
                <View style={styles.commentContainer}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <View style={styles.inputAndBtnWrap}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            onChangeText={setComment}
            value={comment}
            multiline={true}
            numberOfLines={10}
            maxLength={MAX_CHARACTERS_PER_LINE}
          ></TextInput>

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.6}
            onPress={createPost}
          >
            <FontAwesome5 name="arrow-circle-up" size={24} color="#FF6C00" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  avatarContainer:{
    marginLeft: 5,
  },
  commentContainer: {
    borderColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderWidth: 1,
    borderBottomEndRadius:12,
    borderTopRightRadius:12,
    borderBottomLeftRadius:12,
    marginHorizontal: 16,
    padding: 10,
    marginBottom: 10,
  },
  commentText: {
    
  },
  inputAndBtnWrap: {
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginTop: 33,
    marginHorizontal: 16,
    padding: 5,
  },
  input: {
    height: 50,
    borderColor: `transparent`,

    borderWidth: 1,
  },
  btn: {
    position: "absolute",
    top: 16,
    right: 16,
  },

});

export default CommentsScreen;
