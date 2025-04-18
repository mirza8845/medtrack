import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SIZES, theme } from "../constant";
import { useHeaderHeight } from "@react-navigation/elements";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";
import Btn from "../components/Btn";

export default function Login({ navigation }) {
  const height = useHeaderHeight();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const auth = getAuth();

  const handleEmail = (value) => {
    setEmail(value);
  };
  const handlePass = (value) => {
    setPassword(value);
  };

  const submit = () => {
    // console.log(email)
    // console.log(password)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("SucessFully Login", auth);
        //   navigation.navigate("BottomTabs")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout", auth);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
      <View style={styles.head}>
        <Text style={styles.title}>Welcome back to MedTrack!</Text>
        <Text style={styles.desc}>
          Sign in to Med Track and pick up where you left off.
        </Text>
      </View>
      {/* <View style={styles.btns}>
        <TouchableOpacity style={styles.btn}>
          <Image source={require("../assets/img/google.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image source={require("../assets/img/fb.png")} />
        </TouchableOpacity>
      </View> */}

      <View style={styles.form}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={height}
        >
          <ScrollView>
            <View style={styles.section}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={handleEmail}
                placeholder="Email"
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={handlePass}
                textContentType={"password"}
                secureTextEntry={true}
                placeholder="Password"
              />
            </View>
            {/* <Btn title={"Signup"} submitFunct={navigation.navigate("Home")} /> */}
            <TouchableOpacity style={styles.subBtn} onPress={() => submit()}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => navigation.replace("Signup")}>
          <Text style={{ textAlign: "center", color: theme.COLORS.Primary }}>
            Don’t have an account? Join us
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  subBtn: {
    backgroundColor: theme.COLORS.Primary,
    paddingVertical: theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base * 2,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    marginHorizontal: "auto",
  },
  btnText: {
    fontSize: 22,
    color: theme.COLORS.secondary,
    fontWeight: "600",
  },
  bg: {
    flex: 1,
  },
  head: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 5,
  },
  desc: {
    textAlign: "center",
    fontSize: 16,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    paddingHorizontal: 26,
    paddingVertical: 16,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
  },
  form: {
    flex: 2,
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e7e8ee",
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 20,
    color: "#677294",
    borderRadius: 10,
  },
  section: {
    marginVertical: 12,
  },
});
