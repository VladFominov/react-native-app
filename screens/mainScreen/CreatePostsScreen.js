import { useState } from "react";
import * as Location from 'expo-location';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";

const CreatePostScreen = ({navigation}) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
  
    const photo = await camera.takePictureAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
             setErrorMsg('Permission to access location was denied');
             return;
           }
    let location = await Location.getCurrentPositionAsync();
     console.log("location:", location);
    setPhoto(photo.uri);
    console.log("Photo URI:", photo.uri);
  };

  const sendPhoto = () => {
    console.log("navigation :", navigation);
    navigation.navigate("DefaultScreen",{photo})
  }

 
  return (
    <View style={styles.container}>
      <View style={styles.CreatePostsForm}>
      <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
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
        <Text style={styles.cameraText}>Завантажте фото</Text>
      </Camera>
      <View style={{ marginTop: 33 }}>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          // value={state.login}
          // onFocus={() => setIsShowKeyboard(true)}
          // onChangeText={(value)=>setState((prevState =>({...prevState,login:value})))}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={sendPhoto}>
        <Text style={styles.btnText} 
        
        >
          Опубліковати
        </Text>
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
  CreatePostsForm:{
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
// border: 1px solid "#E8E8E8";

  },
  cameraIconWrap: {
    padding: 18,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraText: {
    color: "#d2691e",
  },
  cameraImgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: `#8b008b`,
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
