import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { authSingUpUser } from "../../redux/auth/authOperations";

const image = require("../../assets/photoBG.jpg");

const initialState = {
  nickName: "",
  email: "",
  password: "",
};

export default function RegisterScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isNickNameFocused, setIsNickNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };

    const dimension = Dimensions.addEventListener("change", onChange);

    return () => {
      dimension;
    };
  }, []);

  const keyboardBehavior = Platform.select({
    ios: "padding",
    android: undefined, // Use default behavior
  });

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    dispatch(authSingUpUser(state));
  };

  const marginBottomValue = isShowKeyboard ? 32 : 78;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView behavior={keyboardBehavior}>
            <View style={styles.form}>
              <View
                style={{ marginBottom: marginBottomValue, width: dimensions }}
              >
                <Text style={styles.titleText}>Реєстрація</Text>
                <View style={{ marginTop: 33 }}>
                  <TextInput
                    
                    style={[
                      styles.input,
                      isNickNameFocused && styles.inputFocused,
                    ]}
                    placeholder="nickName"
                    value={state.nickName}
                    onFocus={() => setIsNickNameFocused(true)}
                    onBlur={() => setIsNickNameFocused(false)}
                    // onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        nickName: value,
                      }))
                    }
                  ></TextInput>
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                  
                    style={[
                      styles.input,
                      isEmailFocused && styles.inputFocused,
                    ]}
                    placeholder="Адреса електронної пошти"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    // onFocus={() => setIsShowKeyboard(true)}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  ></TextInput>
                </View>

                <View style={{ marginTop: 16 }}>
                  <TextInput
                    // style={styles.input}
                    style={[
                      styles.input,
                      isPasswordFocused && styles.inputFocused,
                    ]}
                    secureTextEntry={!showPassword}
                    placeholder="Пароль"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    // onFocus={() => setIsShowKeyboard(true)}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.showPasswordBtn}
                    activeOpacity={0.6}
                  >
                    <Text
                      style={styles.showPasswordBtText}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Приховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn} activeOpacity={0.6}>
                  <Text style={styles.btnText} onPress={handleSubmit}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginLink}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
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
    fontFamily: "DMMono-Regular",
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
  showPasswordBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showPasswordBtText: {
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
