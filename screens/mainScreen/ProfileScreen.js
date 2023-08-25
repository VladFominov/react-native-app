import { Text ,View,StyleSheet,Button} from "react-native";

import { FIREBASE_AUTH } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";

const auth = FIREBASE_AUTH;

const ProfileScreen = () => {
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(authSingOutUser())
  }
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="singOut" onPress={signOut } />
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
