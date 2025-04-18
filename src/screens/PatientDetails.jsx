import { StyleSheet, Text, View, Image, ImageBackground, TextInput, ScrollView } from 'react-native';
import { SIZES, theme } from '../constant';
import {  ref, set, push, onValue } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import Btn from '../components/Btn';
import { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';

export default function PatientDetails({navigation, route}) {
    const {name, dateString,  gender, medication, cost, disease, dob } = route.params;

    return (
        
        <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
            <View style={styles.top}>
                <View style={styles.section}>
                <Image style={styles.userImg} source={require("../assets/img/patient-img.png")} />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.disease}>{disease}</Text>
                </View>
            </View>
            <View style={styles.information}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Appointment Date</Text>
                        <Text style={styles.textField}>{dateString}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.textField}>{gender}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <Text style={styles.textField}>{dob}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Medication</Text>
                        <Text style={styles.textField}>{medication}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Cost</Text>
                        <Text style={styles.textField}>{cost}</Text>
                    </View>
                </ScrollView>
                
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    top: {
        flex: 1,
        justifyContent:'center',
        marginTop:50,
    },
    bg: {
        flex: 1,
    },
    information:{
        flex:2,
        paddingHorizontal:20

    },
    userImg:{
        borderRadius:50,
        width:100,
        height:100,
        
    },
    section:{
    
        flex:0.6,
        alignItems:'center',
       
        paddingHorizontal:20
       
    },
    name:{
        fontSize:32,
        fontWeight:'500',
        color:theme.COLORS.primeText,
      
    },
    disease:{
        textAlign:'center',
        color:theme.COLORS.secText,
        fontSize:20,
        marginBottom:20
    },
   
    field:{
        backgroundColor:"#ffff",
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:14,
        marginVertical:10
    },
    textField:{
        fontSize:20,
        color:theme.COLORS.secText
    },
    label:{
        color:theme.COLORS.Primary,
        fontSize:16,
        marginBottom:5,
        fontWeight:"500"

    },
    infoTitle:{
        fontSize:25,
        marginVertical:10,
        fontWeight:"500"
    }

});
