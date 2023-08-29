import {useState,useEffect} from "react"
import { Text ,View,StyleSheet,Button,FlatList,Image} from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

import { FIREBASE_AUTH ,FIRESTORE_DB} from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";

const auth = FIREBASE_AUTH;

const ProfileScreen = () => {
  const[userPosts,setUserPost] = useState()
  const dispatch = useDispatch();
  const{userId} = useSelector(state => state.auth)

  useEffect(()=>{
    getUserPost();
  },[]);

  const getUserPost = async () => {
    const q = query(collection(FIRESTORE_DB, "posts"), where("userId", "==", userId));
    await onSnapshot(q,(data) =>
    setUserPost(
     data.docs.map((doc) => ({
       ...doc.data()
     }))
   )
   )
  };

  const signOut = () => {
    dispatch(authSingOutUser())
  }
  return (
    <View style={styles.container}>
      <Button title="singOut" onPress={signOut } />
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
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            /> 
            <View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProfileScreen;
