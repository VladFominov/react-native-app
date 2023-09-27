import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, getDocs } from "firebase/firestore";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";

import { FIRESTORE_DB } from "../../firebase/config";
import Post from "../../components/Post";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [commentsCounts, setCommentsCounts] = useState({});
  const [likesCounts, setLikesCounts] = useState({});

  const getAllPosts = async () => {
    await onSnapshot(collection(FIRESTORE_DB, "posts"), (data) =>{
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
        setPosts(postList);
        setLikesCounts(initialLikesCounts);
        setCommentsCounts(initialCommentsCounts);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
    });
   };

  const incrementLikes = async (postId) => {
    const postRef = doc(FIRESTORE_DB, "posts", postId);
    await updateDoc(postRef, { totalLikes: likesCounts[postId] + 1, });
  };

  useEffect(() => {
    getAllPosts();
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
            <Post
              imageUri={item.photo}
              commentsLink={() =>
                navigation.navigate("Коментарі", { postId: item.id,imageUri: item.photo, })
              }
              locationLink={() =>
                navigation.navigate("Map", { location: item.location })
              }
              postComment={item.comment}
              commentsAmount={commentsCounts[item.id]}
              likesCountHandler={() => incrementLikes(item.id)}
              likesAmount={likesCounts[item.id]}
              imageLocation={item.imageLocation}
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
    paddingHorizontal: 16,
  },
});

export default DefaultScreenPosts;
