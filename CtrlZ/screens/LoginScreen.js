import React, { useContext, useState } from "react";
import {
  Statusbar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { titles, colors, btn1, hr80 } from '../../globals/style'
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../AuthProvider";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

// import { firebase } from '../../../Firebase/firebaseConfig'

const LoginScreen = ({ navigation }) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customerror, setcustomError] = useState("");
  const { login } = useContext(AuthContext);

  const handlelogin = () => {
    // console.log(email, password);
    login(email, password);
    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      {/* <Statusbar /> */}
      <Text style={styles.head1}>Log In To Your Account</Text>
      {customerror !== "" && <Text style={styles.errormsg}>{customerror}</Text>}
      <View style={styles.inputout}>
        <AntDesign
          name="user"
          size={24}
          color={"orange"}
          //   color={emailfocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmailfocus(true);
            setPasswordfocus(false);
            setShowpassword(false);
            setcustomError("");
          }}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputout}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={24}
          color={"orange"}
          //   color={passwordfocus == true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onFocus={() => {
            setEmailfocus(false);
            setPasswordfocus(true);
            setcustomError("");
          }}
          secureTextEntry={showpassword === false ? true : false}
          onChangeText={(text) => setPassword(text)}
        />

        <Octicons
          name={showpassword == false ? "eye-closed" : "eye"}
          size={24}
          color="orange"
          onPress={() => setShowpassword(!showpassword)}
        />
      </View>
      <TouchableOpacity onPress={() => handlelogin()}>
        {/* <TouchableOpacity style={btn1} onPress={() => handlelogin()}> */}
        <Text
          style={{
            // color: colors.col1,
            // fontSize: titles.btntxt,
            color: "#FF5733",
            fontSize: 20,
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          Log in
        </Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Forgot Password?</Text>
      {/* <Text style={styles.or}>OR</Text>
      <Text style={styles.gftxt}>Sign In With...</Text>

      <View style={styles.gf}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.SIZES.STANDARD}
          color={GoogleSigninButton.COLORS.DEFAULT}
          onPress={signInWithGoogle}
        />
      </View> */}
      {/* <View style={hr80}></View> */}
      <Text>
        Don't have an account?
        <Text
          style={styles.signup}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  head1: {
    // fontSize: titles.title1,
    // color: colors.text1,
    color: "#FF5733",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  inputout: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    // backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignSelf: 'center',
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "80%",
  },
  forgot: {
    // color: colors.text2,
    marginTop: 20,
    marginBottom: 10,
    color: "#000080",
  },
  or: {
    // color: colors.text1,
    marginVertical: 10,
    fontWeight: "bold",
  },
  gftxt: {
    // color: colors.text2,
    marginVertical: 10,
    fontSize: 25,
  },
  gf: {
    flexDirection: "row",
    marginBottom: 15,
  },
  gficon: {
    backgroundColor: "white",
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 20,
  },
  signup: {
    // color: colors.text1,
    color: "#007AFF",
  },
  errormsg: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default LoginScreen;
