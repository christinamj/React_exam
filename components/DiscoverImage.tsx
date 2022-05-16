import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
   View,
   Text,
   Button,
   StyleSheet,
   Image,
   TouchableOpacity,
   ImageBackground,
} from 'react-native';

import generalStyles from '../GeneralStyles';

interface Props {
   header: string;
   src: { uri: string };
   color: string;
   onPress(arg: any): void;
}

function DiscoverImage({ header, src, color, onPress }: Props) {
   return (
      <View style={styles.container}>
         <ImageBackground source={src} resizeMode="cover" style={styles.image}>
            <Text style={[styles.text, generalStyles.h1]}>{header}</Text>
            <View style={[styles.overlay]}></View>
         </ImageBackground>
      </View>
   );
}

const styles = StyleSheet.create({
   image: {
      flex: 1,
      justifyContent: 'center',
      width: 350,
      height: 130,
   },

   marginTop: {
      marginTop: 50,
   },
   text: {
      textAlign: 'center',
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0,
      top: 45,
      zIndex: 10,
      color: '#FFFF',
   },
   container: {
      flex: 1,

      marginTop: 10,
      padding: 20,
   },

   overlay: {
      borderRadius: 5,
      position: 'absolute',
      height: 130,
      width: 351,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 5,
      opacity: 0.7,
      backgroundColor: '#700F6E',
   },
});

export default DiscoverImage;
