import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
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
import { AntDesign, MaterialIcons, EvilIcons } from "@expo/vector-icons";

import useFirebaseUpload from "../../hooks/useFirebaseUpload"

const CreatePostScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [imageLocation, setImageLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const isFocused = useIsFocused();
  
  const {uploadImageAndAddToFirestore,isLoading } = useFirebaseUpload()

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
      let location = await Location.getLastKnownPositionAsync() 
      
      setLocation(location);
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    if (location && location.coords) {
      try {
        const locationInfo = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
       
        if (locationInfo && locationInfo.length > 0) {
          const formattedAddress = locationInfo[0].region;

          setImageLocation(formattedAddress);
        }
      } catch (error) {
        console.error("Error while fetching location info:", error);
      }
    }else {   
      console.log("Location data is not available.");
    }
  };

  const sendPhoto = async () => {
    uploadImageAndAddToFirestore(photo, comment, location, userId, nickName,imageLocation);
    navigation.navigate("Posts");
    setPhoto(null);
    setComment("");
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
            <View style={{ marginLeft: 250 }}>
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

        <View style={{ marginTop: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            value={comment}
            onChangeText={setComment}
          ></TextInput>
        </View>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <EvilIcons name="location" size={28} color="black" />
          <TextInput
            style={{ height: 50, borderColor: `#E5E5E5` }}
            placeholder="Місцевість..."
            value={imageLocation}
            editable={false}
            // onChangeText={setImageLocation}
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
    height: "65%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  flipCameraBtn: {
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
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 51,
    marginTop: 30,
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

