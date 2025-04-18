import { StyleSheet, Text, View, Image, ImageBackground, TextInput, ScrollView } from 'react-native';
import { SIZES, theme } from '../constant';


export default function SplashScreen({navigation}) {
  
    return (

        <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
         <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Image source={require("../assets/img/logo.png")} />
            <Text style={{fontSize:35, fontWeight:'800', marginTop:10, color:theme.COLORS.primeText}}>MedTrack</Text>
         </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
   
    bg: {
        flex: 1,
    },


});
