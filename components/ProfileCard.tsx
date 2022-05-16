import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface Props {
   firstname: string;
   email: string;
   imageSrc: { uri: string };
}

export default function ProfileCard({ firstname, email, imageSrc }: Props) {
   return (
      <TouchableOpacity style={styles.container}>
         <View style={styles.contentWrapper}>
            <View style={[styles.titleWrapper]}>
               <Text style={[styles.title]}>{firstname}</Text>
               <Text>{email}</Text>
            </View>
         </View>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      borderRadius: 5,
      height: 100,
      width: 372,
      paddingBottom: 5,
      marginVertical: 0,
      paddingHorizontal: 10,
   },
   contentWrapper: {
      paddingTop: 0,
      zIndex: 999,
   },
   titleWrapper: {
      paddingBottom: 3,
      flexDirection: 'column',
   },
   title: {
      fontSize: 26,
      fontFamily: 'Teko-Medium',
      color: '#5050A5',
   },
});
