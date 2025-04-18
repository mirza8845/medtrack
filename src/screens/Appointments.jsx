import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { theme } from "../constant";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { database } from "../firebaseConfig";

const ListItem = ({
  navigation,
  name,
  dateOfArrival,
  gender,
  medication,
  cost,
  disease,
  dob,
}) => {
  const date = new Date(dateOfArrival);
  const dateString = date.toLocaleDateString("en-US");

  return (
    <View style={styles.list}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.listImg}
          source={require("../assets/img/patient-img.png")}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{dateString}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PatientDetails", {
            name,
            dateString,
            gender,
            medication,
            cost,
            disease,
            dob,
          })
        }
      >
        <Ionicons name="caret-forward" size={35} color={theme.COLORS.Primary} />
      </TouchableOpacity>
    </View>
  );
};

export default function Appointments({ navigation }) {
  const auth = getAuth();
  const [Data, setData] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    getPatientsData();
  }, []);

  useEffect(() => {
    dateFilter();
  }, [Data]);

  const getPatientsData = () => {
    const filteredRef = query(
      ref(database, "patients"),
      orderByChild("doctor"),
      equalTo(auth.currentUser.uid)
    );

    onValue(filteredRef, (snapshot) => {
      const pdata = snapshot.val();
      const dataArray = Object.keys(pdata || {}).map((key) => ({
        id: key,
        ...pdata[key],
      }));
      setData(dataArray);
      // console.log("data =>>>", dataArray);
    });
  };

  // const dateFilter = () => {
  //     const currentDate = new Date();
  //     currentDate.setHours(0, 0, 0, 0);
  //     const timestamp = currentDate.getTime();
  //     const filterData = Data.filter(
  //         function (item) {
  //             const itemDate = new Date(item.dateOfArrival);
  //             const itemTimestamp = itemDate.setHours(0, 0, 0, 0);
  //             return itemTimestamp === timestamp;
  //         });
  //         // console.log("Today Filter Data", filterData);
  //     setTodayData(filterData);
  // };

  const dateFilter = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const timestamp = currentDate.getTime();

    const filterDataToday = Data.filter(function (item) {
      const itemDate = new Date(item.dateOfArrival);
      const itemTimestamp = itemDate.setHours(0, 0, 0, 0);
      return itemTimestamp === timestamp;
    });
    setTodayData(filterDataToday);

    const firstDayOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() + 1
    );
    const timestampWeek = firstDayOfWeek.getTime();
    const lastDayOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + (6 - currentDate.getDay())
    );
    lastDayOfWeek.setHours(23, 59, 59, 999);
    const timestampLastDayOfWeek = lastDayOfWeek.getTime();

    const filterDataWeek = Data.filter(function (item) {
      const itemDate = new Date(item.dateOfArrival);
      const itemTimestamp = itemDate.setHours(0, 0, 0, 0);
      return (
        itemTimestamp >= timestampWeek &&
        itemTimestamp <= timestampLastDayOfWeek
      );
    });
    setWeekData(filterDataWeek);

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const timestampMonth = firstDayOfMonth.getTime();
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    lastDayOfMonth.setHours(23, 59, 59, 999);
    const timestampLastDayOfMonth = lastDayOfMonth.getTime();

    const filterDataMonth = Data.filter(function (item) {
      const itemDate = new Date(item.dateOfArrival);
      const itemTimestamp = itemDate.setHours(0, 0, 0, 0);
      return (
        itemTimestamp >= timestampMonth &&
        itemTimestamp <= timestampLastDayOfMonth
      );
    });
    setMonthData(filterDataMonth);
  };

  console.log("Today Data", todayData);
  console.log("All Data", Data);

  return (
    <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
      <View style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.section}>
            <Text style={styles.title}>Today</Text>
            {todayData.map((item) => (
              <ListItem
                key={item.id}
                navigation={navigation}
                name={item.name}
                dateOfArrival={item.dateOfArrival}
                cost={item.cost}
                disease={item.disease}
                medication={item.medication}
                gender={item.gender}
                dob={item.dob}
              />
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>This Week</Text>
            {weekData.map((item) => (
              <ListItem
                key={item.id}
                navigation={navigation}
                name={item.name}
                dateOfArrival={item.dateOfArrival}
                cost={item.cost}
                disease={item.disease}
                medication={item.medication}
                gender={item.gender}
                dob={item.dob}
              />
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>This Month</Text>
            {monthData.map((item) => (
              <ListItem
                key={item.id}
                navigation={navigation}
                name={item.name}
                dateOfArrival={item.dateOfArrival}
                cost={item.cost}
                disease={item.disease}
                medication={item.medication}
                gender={item.gender}
                dob={item.dob}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 100,
  },
  bg: {
    flex: 1,
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "600",
  },
  section: {
    width: "100%",
    marginVertical: 10,
  },
  list: {
    backgroundColor: theme.COLORS.secondary,
    marginVertical: 6,
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 14,
  },
  listSec: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  date: {
    color: theme.COLORS.secText,
    fontSize: 14,
  },
});
