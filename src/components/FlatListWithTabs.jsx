import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { theme } from "../constant";
import {
  ref,
  child,
  get,
  onValue,
  orderByChild,
  query,
  equalTo,
} from "firebase/database";
import { auth, database } from "../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";

// const tabs = [
//   { disease: "All" },
//   { disease: "Diabetes" },
//   { disease: "Food Poisoning" },
//   { disease: "Bruise" },
//   { disease: "Sun Stroke" },
//   { disease: "Broken Bone" },
//   { disease: "Infection" },
//   { disease: "Snake Bite" },
// ];

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
        <Ionicons name="caret-forward" size={40} color={theme.COLORS.Primary} />
      </TouchableOpacity>
    </View>
  );
};

const FlatListWithTabs = ({ navigation, searchQuery, newData }) => {
  // const [data,setPatientsData] = useState([])
  // const data = []
  // console.log("++-->",newData)
  const [data, setData] = useState(newData);

  // Check if searched text is not blank
  // if (searchQuery) {

  //   const newData = data.filter(
  //     function (item) {
  //       const itemData = item.title
  //         ? item.title.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = searchQuery.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //   });
  //   setData(newData);

  // }
  // console.log("++++>>>>>>", data)

  const tabs = [{ disease: "All" }];
  const diseases = data.map((item) => item.disease);
  const distinctDiseases = [...new Set(diseases)];

  distinctDiseases.forEach((disease) => {
    tabs.push({ disease });
  });
  // const tabs = data.map(item => ({ disease: item.disease }));
  // console.log()
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredData, setFilteredData] = useState(tabs.map(() => data));

  // useEffect(()=>{

  // const dbRef = ref(database);
  // get(child(dbRef, `patients/`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log("Dataaaaa",snapshot.val());
  //     // data.push(snapshot.val())
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

  //   console.log("hello")

  // const starCountRef = ref(database, 'patients/');
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   // updateStarCount(postElement, data);
  //   console.log(data)
  // });
  // patientData ? patientData(): ""

  // }, [])

  useEffect(() => {
    // const starCountRef = query(database.ref('patients'), orderByChild('doctor').equalTo(auth.currentUser.uid));
    // onValue(starCountRef, (snapshot) => {
    //   const pdata = snapshot.val();
    //   const dataArray = Object.keys(pdata).map((key) => ({ id: key, ...pdata[key] }))
    //   setData(dataArray)
    //   console.log('data=>>>>', dataArray)

    // }, [])

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
      // console.log("filtered data =>>>", dataArray);
    });
  }, []);

  useEffect(() => {
    // filterData(0)
    setFilteredData([data]);
    setData(newData);
  }, [data, newData]);

  const filterData = (tabIndex) => {
    let filtered;
    if (tabIndex === 0) {
      filtered = data;
    } else {
      filtered = data.filter((item) => item.disease === tabs[tabIndex].disease);
    }

    filteredData[tabIndex] = filtered;
    setFilteredData([...filteredData]);
  };

  const handleTabPress = (tabIndex) => {
    setSelectedTab(tabIndex);
    filterData(tabIndex);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 8 }}>
        <ScrollView
          style={styles.tabsList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.disease}
              onPress={() => handleTabPress(index)}
              style={[
                styles.tab,
                index === selectedTab ? styles.selectedTab : null,
              ]}
            >
              <Text
                style={[
                  styles.tabTitle,
                  index === selectedTab ? styles.selectedTabTitle : null,
                ]}
              >
                {tab.disease}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* { console.log(">>>>",selectedTab)} */}
      <FlatList
        data={filteredData[selectedTab]}
        style={styles.listSec}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListItem
            navigation={navigation}
            name={item.name}
            dateOfArrival={item.dateOfArrival}
            cost={item.cost}
            disease={item.disease}
            medication={item.medication}
            gender={item.gender}
            dob={item.dob}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  tab: {
    backgroundColor: "#daf4f5",
    marginHorizontal: 5,
    borderRadius: 6,

    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 40,
  },
  selectedTab: {
    backgroundColor: theme.COLORS.Primary,
  },
  tabTitle: {
    fontWeight: "bold",
    color: theme.COLORS.Primary,
    fontWeight: "700",
  },
  selectedTabTitle: {
    color: "white",
  },
  tabsList: {
    // marginTop:10,
  },
  list: {
    backgroundColor: theme.COLORS.secondary,
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 14,
  },
  listSec: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
  },
  date: {
    color: theme.COLORS.secText,
  },
});

export default FlatListWithTabs;
