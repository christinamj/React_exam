import React from 'react';
import {
   View,
   Text,
   Button,
   StyleSheet,
   ImageBackground,
   TouchableOpacity,
   Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import generalStyles from '../GeneralStyles';
import DiscoverImage from '../components/DiscoverImage';
import { useDispatch } from 'react-redux';
import { getEvents } from '../store/actions/EventActions';

const DiscoverScreen = props => {
   const dispatch = useDispatch();
   const navigation = useNavigation();
   return (
      <View style={[styles.pageWrapper]}>
         {/* <View style={styles.container}>
            <ImageBackground
               source={require('../assets/all-events.png')}
               resizeMode="cover"
               style={styles.image}>
               <Text style={[styles.text, generalStyles.h1]}>All events</Text>
               <View style={[styles.overlay]}></View>
            </ImageBackground>
         </View> */}
         <View>
            <Pressable onPress={() => navigation.navigate('EventsStack')}>
               <DiscoverImage
                  src={require('../assets/all-events.png')}
                  header="All events"
                  onPress={() => navigation.navigate('Events')}
                  color="#700F6E"></DiscoverImage>
            </Pressable>
         </View>

         {/* <View style={[styles.marginTop]}>
            <DiscoverImage
               src={require('../assets/all-orgs.png')}
               header="All organisations"
               onPress={() => console.log('pressed it')}></DiscoverImage>
         </View> */}

         {/* <ImageBackground
            source={require('../assets/all-events.png')}></ImageBackground> */}
      </View>
   );
};

const styles = StyleSheet.create({
   marginTop: {
      marginTop: 100,
   },
});

export default DiscoverScreen;
