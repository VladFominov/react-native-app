import { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,  
} from "react-native";
import { Octicons, Ionicons, Entypo } from "@expo/vector-icons";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { useSelector } from "react-redux";

import { FIREBASE_AUTH, FIRESTORE_DB, STORAGE_DB } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";

import Post from "../../components/Post";
import useFirebaseAvatar from "../../hooks/useFirebaseAvatar";

const auth = FIREBASE_AUTH;
const imageBg = require("../../assets/photoBG.jpg");
const screenWidth = Dimensions.get("window").width;
const avatarWidth = 120;

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPost] = useState();
  const [commentsCounts, setCommentsCounts] = useState({});
  const [likesCounts, setLikesCounts] = useState({});
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();
  
  const { userId, nickName, email } = useSelector((state) => state.auth);
  const { uploadAvatar, getAvatarUrl, clearAvatar, isLoading } =
    useFirebaseAvatar();
    
  useEffect(() => {
    getUserAvatar();
    getUserPost();
  }, [userId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
    try {
      const uploadedAvatarUrl = await uploadAvatar(
        userId,
        result.assets[0].uri
      );
      
      setAvatar(uploadedAvatarUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserAvatar = async () => {

    try {
      const avatarUrl = await getAvatarUrl(userId);
      if (avatarUrl) {
        setAvatar(avatarUrl);
      } else {
       
        setAvatar(null); 
      }
    } catch (err) {
      console.error("Error fetching avatar:", err);
    }
  };

  const handleClearAvatar = async () => {
    await clearAvatar(String(userId));
    setAvatar(null);
  };

  const getUserPost = async () => {
    const q = query(
      collection(FIRESTORE_DB, "posts"),
      where("userId", "==", userId)
    );
   
    await onSnapshot(q, (data) => {
      const postList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const initialLikesCounts = {};
      const initialCommentsCounts = {};

      const fetchComments = async (post) => {
        initialLikesCounts[post.id] = post.totalLikes || 0;
        const commentsSnapshot = await getDocs(
          collection(FIRESTORE_DB, "posts", post.id, "comments")
        );
        initialCommentsCounts[post.id] = commentsSnapshot.size;
      };

      const fetchCommentsPromises = postList.map(fetchComments);

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

  const signOut = () => {
    dispatch(authSingOutUser());
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        keyExtractor={(item, indx) => indx.toString()}
        ListHeaderComponent={() => (
          <ImageBackground
            source={imageBg}
            resizeMode="cover"
            style={styles.bgImage}
          >
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={pickImage}>
                {avatar ? (
                  <>
                    <Image
                      source={{ uri: avatar }}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 30,
                        borderWidth: 2,
                        borderColor: "#00008b",
                      }}
                    />
                    <View>
                      <Entypo
                        name="cross"
                        size={24}
                        color="black"
                        onPress={handleClearAvatar}
                        style={{ marginLeft: 50 }}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <Avatar.Image
                      size={120}
                      source={require("../../assets/avatarDefaultImg.png")}
                      style={{
                        borderWidth: 2,
                        borderRadius: 30,
                        borderColor: "#00008b",
                      }}
                    />
                    <Ionicons
                      name="camera-outline"
                      size={24}
                      color="black"
                      style={styles.cameraIcon}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <View style={styles.userLoginDataWrap}>
                <Text style={styles.userName}>{nickName}</Text>
                <Text style={styles.userEmail}>{email}</Text>
              </View>
              <TouchableOpacity onPress={signOut} style={styles.signOutBtn}>
                <Octicons name="sign-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
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
                navigation.navigate("Коментарі", {
                  postId: item.id,
                  imageUri: item.photo,
                })
              }
              likesAmount={item.totalLikes}
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
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-start",
    //   textAlign: "center",
    resizeMode: "cover",
  },
  avatarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    left: (screenWidth - avatarWidth) / 2,
    top: 20,
    zIndex: 999,
  },
  cameraIcon: { position: "absolute", top: 100, right: 100 },
  form: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    marginTop: 120,

    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  userLoginDataWrap: {
    marginTop:10,
    marginLeft: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: { fontSize: 16, fontWeight: "bold" },
  signOutBtn: {
    marginTop: 5,
    padding: 10,
    alignSelf: "flex-end",
    right: 0,
  },
  postContainer: {
    flex: 1,
    marginBottom: 8,
  },
});

export default ProfileScreen;

