import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
 
} from "react-native";
// import { AntDesign,EvilIcons   } from "@expo/vector-icons";
import { collection, query, where, onSnapshot,getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";

import Post from "../../components/Post";

const auth = FIREBASE_AUTH;

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPost] = useState();
  const [commentsCounts, setCommentsCounts] = useState({});
  const [likesCounts, setLikesCounts] = useState({});
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

 
  
  const getUserPost = async () => {
    const q = query(
      collection(FIRESTORE_DB, "posts"),
      where("userId", "==", userId)
    );
      // Initialize an object to store comments counts
     
    await onSnapshot(q, (data) => {
      const postList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const initialLikesCounts = {};
      const initialCommentsCounts = {};
      
       // Create a function to fetch comments for a post
    const fetchComments = async (post) => {
      initialLikesCounts[post.id] = post.totalLikes || 0;
      const commentsSnapshot = await getDocs(
        collection(FIRESTORE_DB, "posts", post.id, "comments")
      );
      initialCommentsCounts[post.id] = commentsSnapshot.size;
    };

    // Create an array of promises to fetch comments for each post
    const fetchCommentsPromises = postList.map(fetchComments);

    // Wait for all comments to be fetched before setting state
    Promise.all(fetchCommentsPromises)
      .then(() => {
        setUserPost(postList);
        setLikesCounts(initialLikesCounts);
        setCommentsCounts(initialCommentsCounts);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
    });  
  };

  useEffect(() => {
    getUserPost();
  }, []);

  const signOut = () => {
    dispatch(authSingOutUser());
  };

  return (
    <View style={styles.container}>
      <Button title="singOut" onPress={signOut} />
      <FlatList
        data={userPosts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Post
              imageUri={item.photo}
              postComment={item.comment}
              commentsAmount={commentsCounts[item.id]}
              commentsLink={() =>
                navigation.navigate("Коментарі", { postId: item.id,imageUri: item.photo, })
              }
            likesAmount={item.totalLikes}
            />           
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

export default ProfileScreen;
