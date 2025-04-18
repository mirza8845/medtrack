import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SIZES, theme } from "../constant";
import { Ionicons } from "@expo/vector-icons";
import FlatListWithTabs from "../components/FlatListWithTabs";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { auth, database } from "../firebaseConfig";
import {
  ref,
  set,
  push,
  onValue,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import CustomDatePicker from "../components/CustomDatePicker";
// import debounce from 'lodash.debounce';

export default function Home({ navigation }) {
  const auth = getAuth();
  const [currUser, SetCurrUser] = useState({});
  const [newData, setNewData] = useState([]);
  const [newFilterData, setNewFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  // const handleDateChange = (selectedDate) => {
  //   setSelectedDate(selectedDate);
  // };

  useEffect(() => {
    // console.log(newFilterData)
    getDoctorData();
    getPatientsData();
  }, []);

  useEffect(() => {
    nameFilter("");
  }, [newData]);

  // useEffect(()=>{
  //   dateFilter(null)
  // }, [selectedDate])

  // console.log(">>>>",currUser)
  function getDoctorData(params) {
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
      setNewData(dataArray);
      // console.log("fPr data =>>>", dataArray);
    });
  };

  const nameFilter = (text) => {
    // Check if searched text is not blank
    if (text !== "") {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const filterData = newFilterData.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setNewFilterData(filterData);
      setSearchQuery(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setNewFilterData(newData);
      setSearchQuery(text);
    }
  };

  const handleSearch = (text) => {
    // setTimeout(() => {
    nameFilter(text);

    // }, 2000)
  };

  const dateFilter = (date) => {
    // Check if searched text is not blank
    if (date !== null) {
      const filterData = newFilterData.filter(function (item) {
        const itemData = new Date(item.dateOfArrival).toLocaleDateString(
          "en-US"
        );
        //  console.log("++++",itemData)
        // console.log("set",date)
        // console.log("get",itemData)
        return itemData.indexOf(date.toLocaleDateString("en-US")) > -1;
      });
      //  console.log(filterData)
      setNewFilterData(filterData);
      setSelectedDate(date);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setNewFilterData(newData);
      // setSelectedDate(date.toLocaleDateString("en-US"));
    }
  };

  // console.log("------->",newData);

  return (
    <View style={styles.container}>
      {/* <View style={styles.profile}> */}
      <LinearGradient
        colors={["#0ebf81", "#0bca93", "#08d9ad"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profile}
      >
        <View style={styles.innerPro}>
          <View>
            <Text style={styles.userName}>
              Hi, Dr {currUser ? currUser.name : auth.currentUser.displayName}!{" "}
            </Text>
            <Text style={styles.searchHead}>Find Your Patient </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              style={styles.avatar}
              source={require("../assets/img/default-avatar.png")}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/* </View> */}
      <ImageBackground
        style={styles.bg}
        source={require("../assets/img/bg.png")}
      >
        {/* <View style={styles.searchSection}> */}
        <View style={styles.search}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="search-outline" size={24} color="gray" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="gray"
              onChangeText={(text) => handleSearch(text)}
              // onSubmitEditing={handleSearch}
              value={searchQuery}
            />
          </View>
          {/* <TouchableOpacity onPress={showDatepicker}>
                    <Ionicons name="calendar" size={24} color="gray" />
                    {showDatePicker && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="default"
                                           
                                            onChange={handleDateChange}
                                            maximumDate={new Date()} // to set max date
                                            minimumDate={new Date(1990, 0, 1)} // to set min date
                                        />
                                    )}
                    </TouchableOpacity> */}
          <CustomDatePicker
            value={selectedDate}
            onChange={(e) => dateFilter(e)}
          />
        </View>
        {/* </View> */}

        <View style={{ flex: 1, marginTop: 40 }}>
          <FlatListWithTabs navigation={navigation} newData={newFilterData} />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    width: theme.SIZES.width,
  },
  bg: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    color: "white",
  },
  searchHead: {
    fontSize: 28,
    color: "white",
    fontWeight: "700",
  },
  search: {
    backgroundColor: "white",
    width: theme.SIZES.width / 1.1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    position: "absolute",
    top: -28,
    alignSelf: "center",
    zIndex: 1,
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    fontSize: 22,
    // width: theme.SIZES.width /1.4,
  },
  searchSection: {
    position: "relative",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  profile: {
    width: theme.SIZES.width,
    backgroundColor: theme.COLORS.Primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: theme.SIZES.base * 2.5,
  },
  innerPro: {
    flexDirection: "row",
    // backgroundColor: '#575',
    justifyContent: "space-between",
    // alignItems: 'center',
    paddingVertical: theme.SIZES.base * 4,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
