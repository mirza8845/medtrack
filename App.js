import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import BottomTabs from "./src/components/BottomTabs";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import PatientDetails from './src/screens/PatientDetails';
import SplashScreen from './src/screens/SplashScreen';
import { auth } from './src/firebaseConfig';

const Stack = createNativeStackNavigator();





export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes and update the isSignedIn state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setIsSignedIn(user !== null);
    });

    // Clean up the listener when unmounting
    return unsubscribe;
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator >
        {isSignedIn? 
           (<>
            <Stack.Screen  name="BottomTabs" component={BottomTabs} options={{ headerShown: false }}  />
            <Stack.Screen  name="Home" component={Home} options={{ headerShown: false }}  />
            <Stack.Screen  name="PatientDetails" component={PatientDetails} options={{
        
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            marginLeft: 10,
            fontSize: 20,
          }, }}  /></>) :
            (<><Stack.Screen  name="Signup" component={Signup} options={{ headerShown: false }}  />
            <Stack.Screen  name="Login" component={Login} options={{ headerShown: false }}  /></>)
        }
      </Stack.Navigator>

      {/* <BottomTabs /> */}
      {/* <Profile /> */}
      {/* <Home /> */}
      {/* <PatientList /> */}
      {/* <AddAppointment /> */}
      {/* <Appointments /> */}
      {/* <Signup /> */}
      {/* <SplashScreen /> */}
      <StatusBar style="auto" />
    </NavigationContainer>

    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
