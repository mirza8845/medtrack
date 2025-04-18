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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHeaderHeight } from "@react-navigation/elements";
import { useState } from "react";
import { auth, database } from "../firebaseConfig";
import { ref, set, push } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({ navigation }) {
  const height = useHeaderHeight();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (value) => {
    setName(value);
  };
  const handleEmail = (value) => {
    // console.log(value)
    setEmail(value);
  };
  const handlePass = (value) => {
    setPassword(value);
  };

  const submit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userEmail = userCredential.user.email;
        // console.log("userCredential",user)
        const userRef = push(ref(database, "users"));
        const userId = userRef.key;

        set(userRef, {
          name: name,
          email: userEmail,
        })
          .then(() => {
            console.log("Sucessfully Signup", userId);
            navigation.replace("BottomTabs");
          })
          .catch((error) => {
            console.log("Error not", error);
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
      <View style={styles.head}>
        <Text style={styles.title}>Welcome to MedTrack!</Text>
        <Text style={styles.desc}>
          Ready to take control of your patient data? Sign up now to get started
        </Text>
      </View>
      {/* <View style={styles.btns} >
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
                placeholder="Name"
                value={name}
                onChangeText={handleName}
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={handleEmail}
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.input}
                textContentType={"password"}
                value={password}
                onChangeText={handlePass}
                secureTextEntry={true}
                placeholder="Password"
              />
            </View>
            {/* <Btn title={"Signup"} submitFunct={navigation.navigate("Home")} /> */}
            <TouchableOpacity style={styles.subBtn} onPress={() => submit()}>
              <Text style={styles.btnText}>Signup</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ textAlign: "center", color: theme.COLORS.Primary }}>
            Have an account? Log in
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
