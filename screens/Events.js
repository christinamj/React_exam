import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Link } from '@react-navigation/native';
import generalStyles from '../GeneralStyles';
import EventPreview from '../components/EventPreview';
import { getEvents } from '../store/actions/EventActions';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Events(props) {
   const events = useSelector(state => state?.events?.events);
   const user = useSelector(state => state?.user?.loggedInUser);
   const navigation = useNavigation();
   const dispatch = useDispatch();
   //    React.useEffect(() => {
   //       dispatch(getEvents());
   //    });
   React.useEffect(() => {
      dispatch(getEvents());
   }, []);
   return (
      <View>
         <View style={[styles.addWrapper]}>
            <Text style={[generalStyles.p, styles.alignText]}>Add event</Text>
            <Pressable onPress={() => navigation.navigate('AddEvent')}>
               <Ionicons name="add-circle" size={30} color="#5050A5"></Ionicons>
            </Pressable>
         </View>
         <FlatList
            scrollEnabled={true}
            data={events}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
               <EventPreview
                  date={item.date}
                  eventName={item.eventTitle}
                  organisor={item.organisation}
                  start={item.start}
                  end={item.end}
                  location={item.location}
                  src={
                     (item?.imageName === 'default' &&
                        require('../assets/innovation.png')) ||
                     (item?.imageName === 'cbs-default' &&
                        require('../assets/cbs-default.jpeg')) ||
                     (item?.imageName === 'ghost' &&
                        require('../assets/ghost-world.png')) ||
                     (item?.imageName === 'oldboy' &&
                        require('../assets/oldboy.png')) ||
                     (item?.imageName === 'christmas yoga' &&
                        require('../assets/yoga.png'))
                  }>
                  {item.author === user.email && (
                     <View>
                        <Text style={[styles.delete]}>Button to delete</Text>
                     </View>
                  )}
               </EventPreview>
            )}></FlatList>
      </View>
   );
}

const styles = StyleSheet.create({
   alignText: { paddingRight: 5 },
   addWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingTop: 10,
   },
   image: {
      flex: 1,
      justifyContent: 'center',
      width: 350,
      height: 130,
   },

   delete: {
      zIndex: 110,
      position: 'absolute',
      color: '#AAAA',
      fontSize: 200,
   },

   textCon: {
      position: 'absolute',
      top: 90,
      zIndex: 100,
      left: 25,
   },
   marginTop: {
      marginTop: 50,
   },
   text: {
      zIndex: 10,
      color: '#FFFF',
   },
   container: {
      flex: 1,
      height: 130,
      marginTop: 10,
      padding: 20,
      position: 'relative',
      marginBottom: 110,
   },
});
