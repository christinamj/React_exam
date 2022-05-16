import React from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   Text,
   ImageBackground,
} from 'react-native';
import generalStyles from '../GeneralStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Props {
   eventName: string;
   organisor: string;
   date: Date;
   src: { uri: string };
   start: string;
   end: string;
   location: string;
   onPress: (arg: any) => void;
}

export default function EventPreview({
   eventName,
   organisor,
   src,
   date,
   start,
   end,
   location,
}: Props) {
   return (
      <View style={styles.container}>
         <View style={[styles.textCon]}>
            <Text style={[styles.text, styles.header]}>{eventName}</Text>
            <Text style={[styles.text, generalStyles.boldTxt]}>
               {organisor}
            </Text>
            <Text style={[styles.text, generalStyles.smallPBold]}>
               <Ionicons name="time" size={15} color="#ffff"></Ionicons> {date}{' '}
               · {start} - {end}
            </Text>
            <Text style={[styles.text, generalStyles.smallP]}>
               <Ionicons name="location" size={15} color="#ffff"></Ionicons>
               {location}
            </Text>
         </View>
         <ImageBackground
            source={src}
            resizeMode="cover"
            style={styles.image}></ImageBackground>
         <View style={[styles.overlay]}></View>
      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      fontFamily: 'Teko-Medium',
      padding: 0,
      margin: 0,
      fontSize: 26,
   },
   image: {
      flex: 1,
      justifyContent: 'center',
      width: 350,
      height: 170,
   },

   textCon: {
      position: 'absolute',
      top: 90,
      zIndex: 100,
      left: 35,
   },
   marginTop: {
      marginTop: 30,
   },
   text: {
      zIndex: 10,
      color: '#FFFF',
   },
   container: {
      flex: 1,
      height: 170,
      marginTop: 0,
      padding: 20,
      position: 'relative',
      marginBottom: 20,
   },
   overlay: {
      borderRadius: 5,
      position: 'absolute',
      height: 170,
      width: 351,
      top: 18,
      left: 20,
      right: 0,
      zIndex: 5,
      opacity: 0.7,
      backgroundColor: '#00000083',
   },
});
