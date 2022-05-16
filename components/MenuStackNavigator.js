import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './../screens/MenuScreen';
import EditProfile from './../screens/EditProfile';
import { ScreenHeight } from '@rneui/base';
import generalStyles from '../GeneralStyles';

const Stack = createNativeStackNavigator();

export default function MenuStackNavigator() {
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: true,
            headerTitle: 'Menu',
            headerBackVisible: true,
            headerBackTitleVisible: true,
            headerStyle: {
               height: 180,
            },
         }}>
         <Stack.Screen
            name="MenuStack"
            component={MenuScreen}
            options={{
               headerTitle: 'MENU',
               headerTitleStyle: {
                  fontFamily: 'Teko-Medium',
                  fontSize: 26,
                  color: '#5050A5',
               },
            }}
         />
         <Stack.Screen
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
         />
      </Stack.Navigator>
   );
}
