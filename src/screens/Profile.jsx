import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { SIZES, theme } from "../constant";
import { ref, set, push, onValue } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import Btn from "../components/Btn";
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";

export default function Profile({ navigation }) {
  const auth = getAuth();
  const [currUser, SetCurrUser] = useState({});

  useEffect(() => {
    getData();
  }, []);

  // console.log(">>>>",currUser)
  function getData(params) {
    const starCountRef = ref(database, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const emailToFind = auth.currentUser.email;
      const matchingObjects = [];
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key].email === emailToFind) {
          const matchingObject = {
            id: key,
            ...data[key],
          };
          matchingObjects.push(matchingObject);
        }
      }
      SetCurrUser(matchingObjects[0]);
    });
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        // navigation.navigate("Login")
        console.log("Signout", auth);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
      <View style={styles.top}>
        <View style={styles.section}>
          <Text style={styles.title}>Set up your profile</Text>
          <Text style={styles.subtitle}>
            Update your profile to connect your doctor with better impression.
          </Text>
          <Image
            style={styles.userImg}
            source={require("../assets/img/default-avatar.png")}
          />
        </View>
      </View>
      <View style={styles.information}>
        <Text style={styles.infoTitle}>Personal information</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.textField}>
              {currUser ? currUser.name : auth.currentUser.displayName}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.textField}>
              {currUser ? currUser.email : auth.currentUser.email}
            </Text>
          </View>
          {/* <View style={styles.field}>
                        <Text style={styles.label}>Date of birth</Text>
                        <Text style={styles.textField}>1-JAN-1980</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Location</Text>
                        <Text style={styles.textField}>2216 Oakway Lane, Woodland Hills, California, United States</Text>
                    </View> */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Btn s title={"Signout"} submitFunct={() => logout()} />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: theme.COLORS.Primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
  },
  bg: {
    flex: 1,
  },
  information: {
    flex: 1.1,
    paddingHorizontal: 20,
  },
  userImg: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  section: {
    flex: 0.6,
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    marginBottom: 20,
  },

  field: {
    backgroundColor: "#ffff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 14,
    marginVertical: 10,
  },
  textField: {
    fontSize: 20,
    color: theme.COLORS.secText,
  },
  label: {
    color: theme.COLORS.Primary,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  infoTitle: {
    fontSize: 25,
    marginVertical: 10,
    fontWeight: "500",
  },
});
