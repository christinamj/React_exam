import React from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   Text,
   ImageBackground,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from './../screens/DiscoverScreen';
import EventsScreen from './../screens/Events';
import AddEvent from './../screens/AddEvent';

import generalStyles from '../GeneralStyles';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function DiscoverNavigator() {
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: true,
            headerTitle: 'Discover',
            headerBackVisible: true,
            headerBackTitleVisible: true,
            headerStyle: {
               height: 180,
            },
         }}>
         <Stack.Screen
            name="DiscoverStack"
            component={DiscoverScreen}
            options={{
               headerTintColor: '#5050A5',
               headerTitle: 'DISCOVER',
               headerTitleStyle: {
                  fontFamily: 'Teko-Medium',
                  fontSize: 26,
                  color: '#5050A5',
               },
            }}
         />
         <Stack.Screen
            name="EventsStack"
            component={EventsScreen}
            options={{
               headerTitle: 'EVENTS',
               headerBackTitleVisible: false,
               headerTintColor: '#5050A5',

               headerTitleStyle: {
                  fontFamily: 'Teko-Medium',
                  fontSize: 26,
                  color: '#5050A5',
               },
            }}
         />
         <Stack.Screen
            name="AddEvent"
            component={AddEvent}
            options={{
               headerTitle: 'ADD EVENT',
               headerBackTitleVisible: false,
               headerTintColor: '#5050A5',

               headerTitleStyle: {
                  fontFamily: 'Teko-Medium',
                  fontSize: 26,
                  color: '#5050A5',
               },
            }}
         />
         {/* <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
               headerTitle: 'EDIT PROFILE',
               headerBackVisible: true,
               headerBackTitleVisible: false,

               headerTitleStyle: {
                  fontFamily: 'Teko-Medium',
                  fontSize: 26,
                  color: '#5050A5',
               },
            }}
         /> */}
      </Stack.Navigator>
   );
}
