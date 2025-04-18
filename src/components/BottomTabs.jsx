import {
  BottomTabView,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../constant";
import Home from "../screens/Home";
import PatientList from "../screens/PatientList";
import Profile from "../screens/Profile";
import Appointments from "../screens/Appointments";
import AddAppointment from "../screens/AddAppointment";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "PatientList") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Appointments") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "AddAppointment") {
            iconName = focused ? "add-circle" : "add-circle";
          }

          // Return the Icon component for Android
          if (route.name === "AddAppointment") {
            const CustomIcon = () => (
              <Ionicons
                style={styles.addBtn}
                name={iconName}
                size={60}
                color={theme.COLORS.Primary}
              />
            );
            return <CustomIcon />;
          }

          // Return the Icon component for iOS and other platforms
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.COLORS.Primary,
        tabBarInactiveTintColor: "gray",
        // tabBarShowLabel: false,

        headerStyle: {
          height: 100,
        },
        headerTransparent: true,
        headerTitleAlign: "left",
        headerTitleStyle: {
          marginLeft: 10,
          fontSize: 24,
          fontWeight: "700",
          color: theme.COLORS.primeText,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="PatientList"
        component={PatientList}
        options={{ title: "Patient's List" }}
      />
      <Tab.Screen
        name="AddAppointment"
        component={AddAppointment}
        options={{ title: "Add Patient Details", tabBarLabel: "" }}
      />

      <Tab.Screen name="Appointments" component={Appointments} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleStyle: {
            color: "white",
            marginLeft: 10,
            fontSize: 24,
            fontWeight: "700",
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    height: 60,
    // width:'100%',
    // justifyContent:'center',
    // alignItems:'center',
    position: "relative",
    top: -26,
    padding: 0,
    textAlign: "center",
    //  backgroundColor:"blue",
    //  borderRadius:50
  },
});
