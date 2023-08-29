import { useState, useEffect } from "react";
import {useDispatch} from "react-redux"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard ,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import {authSingInUser} from "../../redux/auth/authOperations";

const image = require("../../assets/photoBG.jpg");

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 20 *2)

  const dispatch = useDispatch();

  useEffect(() => {

    const onChange = () => {
      const width = Dimensions.get('window').width - 20 *2;
      setDimensions(width);
    }

    Dimensions.addEventListener("change", onChange);

    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  },[]);

  const keyboardBehavior = Platform.select({
    ios: "padding",
    android: undefined, // Use default behavior
  });

  const handleSubmit = () =>{
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    
    dispatch(authSingInUser(state));
    setState(initialState)
  }

  // const keyboardHide = () =>{
  //   Keyboard.dismiss();
  //   setIsShowKeyboard(false);
  // }

  const marginBottomValue = isShowKeyboard ? 32 : 78;
  // onPress={keyboardHide}
  return (
    <TouchableWithoutFeedback>
    <View style={styles.container}>
     
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView behavior={keyboardBehavior}>
          <View style={styles.form}>
          <View style={{marginBottom: marginBottomValue, width: dimensions, }}>
          <Text style={styles.titleText}>Увійти</Text>
          
            <View style={{ marginTop: 32 }}>
              <TextInput
                style={[
                  styles.input,
                  isEmailFocused && styles.inputFocused,
                ]}
                placeholder="Адреса електронної пошти"
                onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                value={state.email}
                onChangeText={(value)=>setState((prevState =>({...prevState,email:value})))}
              ></TextInput>
            </View>

            <View style={{ marginTop: 16 }}>
              <TextInput
                 style={[
                  styles.input,
                  isPasswordFocused && styles.inputFocused,
                ]}
                secureTextEntry={!showPassword}
                placeholder="Пароль"
                onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                value={state.password}
                onChangeText={(value)=>setState((prevState =>({...prevState,password:value})))}
              ></TextInput>
               <TouchableOpacity style={styles.showPasswordBtn} activeOpacity={0.6}>
                  <Text style={styles.showPasswordBtText} onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={handleSubmit} >
              <Text style={styles.btnText} > Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginLink} activeOpacity={0.6} onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.loginLinkText} >Немає акаунту? Зареєструватися</Text>
            </TouchableOpacity>  
          </View>
            
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>    
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    textAlign: "center",
    resizeMode: "cover",
  },
  form: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  titleText: {
    fontFamily:'DMMono-Regular',
    fontSize: 30,
    letterSpacing: 0.01,
    fontWeight: "bold",
    textAlign: "center",
    color: "#212121",
    marginTop: 92,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFFFFF",

    borderRadius: 8,
    height: 50,
    paddingLeft: 16,
    backgroundColor: "#E8E8E8",
    color: "#212121",
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
  showPasswordBtn:{
    position: "absolute",
    top: 16,
    right: 16,
  },
  showPasswordBtText:{
    color: "#1B4371",
   
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

  loginLink: {
    marginTop: 16,
  },

  loginLinkText: {
    textAlign: "center",
  },
});
