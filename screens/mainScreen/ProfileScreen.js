import {useState,useEffect} from "react"
import { Text ,View,StyleSheet,Button,FlatList,Image,TouchableOpacity} from "react-native";
import { AntDesign,EvilIcons   } from "@expo/vector-icons";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

import { FIREBASE_AUTH ,FIRESTORE_DB} from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";

const auth = FIREBASE_AUTH;

const ProfileScreen = ({navigation}) => {
  const[userPosts,setUserPost] = useState()
  const [likesCount, setLikesCount] = useState(0);
  const dispatch = useDispatch();
  const{userId} = useSelector(state => state.auth)

  useEffect(()=>{
    getUserPost();
  },[]);

  const likesCountHandler = () => setLikesCount(prevStat =>prevStat +1 )

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
            <View style={styles.iconsContainer}>
            <View>
            <TouchableOpacity
        // style={styles.loginLink}
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Коментарі",{postId: item.id})}
      >
         <EvilIcons name="comment" size={24} color="#FF6C00" />
      </TouchableOpacity>
           
            </View>
            <View style={styles.likesContainer}>
            <TouchableOpacity  onPress={likesCountHandler}>
            <AntDesign name="like2" size={24} color="#FF6C00" />
            </TouchableOpacity>
            <Text style={styles.likesNumber}> {likesCount}</Text>
            
          </View>
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
    },
    iconsContainer:{
      flexDirection: "row",
      justifyContent:'space-evenly',
      alignItems: 'center',
      gap: 20,
    },
    likesContainer:{
      flexDirection: "row",
      alignItems: 'center',
      gap: 2,
    },
    likesNumber:{
      fontSize:16,
      fontWeight: 'bold',
    }
});

export default ProfileScreen;
