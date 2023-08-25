import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { STORAGE_DB, FIRESTORE_DB } from "../../firebase/config";

const CreatePostScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const isFocused = useIsFocused();

  const { userId, nickName } = useSelector((state) => state.auth);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    // try{}catch(err){console.log(err);
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
    setPhoto(null);
  };

  // функция, для корректной работы =================
  const uriToBlob = (photo) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", photo, true);

      xhr.send(null);
    });
  };

  // end функция, для корректной работы =================



  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();
    const storageRef = ref(STORAGE_DB, `images/${uniquePostId}`);
    const blobFile = await uriToBlob(photo);

    try {
       await uploadBytes(storageRef, blobFile);
      const data =await getDownloadURL(storageRef, data);
      console.log("data: ", data)
      return data;
    } catch (err) {
      console.log("err", err);
      console.log("err.message", err.message);
    }
    
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    console.log("photo: ", photo)
    try{
      const createPost = await addDoc(collection(FIRESTORE_DB, "posts"), {
        photo,
        comment,
        location: location.coords,
        userId,
        nickName,
      });
      console.log("createPost: ", createPost)
    }catch(err){
      console.error("Error adding document: ", err);
    }
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.CreatePostsForm}>
        {isFocused && (
          <Camera
            style={styles.camera}
            ref={(ref) => setCamera(ref)}
            type={type}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.flipCameraBtn}
                onPress={toggleCameraType}
              >
                <MaterialIcons
                  name="flip-camera-android"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
            {photo && (
              <View style={styles.cameraImgContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 200, width: 200 }}
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.cameraIconWrap}
              onPress={takePhoto}
              activeOpacity={0.6}
            >
              <AntDesign name="camerao" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.cameraText}>Зробити фото</Text>
          </Camera>
        )}

        <View style={{ marginTop: 33 }}>
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            // value={state.login}
            // onFocus={() => setIsShowKeyboard(true)}
            onChangeText={setComment}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.6}
          onPress={sendPhoto}
        >
          <Text style={styles.btnText}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  CreatePostsForm: {
    paddingHorizontal: 16,
  },
  camera: {
    height: "60%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  flipCameraBtn: {
    marginTop: 50,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraIconWrap: {
    marginTop: 250,
    padding: 18,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraText: {
    color: "#fff",
  },
  cameraImgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: `#8b008b`,
    borderWidth: 1,
  },
  input: {
    height: 50,
    borderColor: `#E5E5E5`,
    borderBottomColor: "#FF6C00",
    borderWidth: 1,
  },
  btn: {
    // padding: 16 32 16 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 51,
    marginTop: 43,
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

export default CreatePostScreen;
