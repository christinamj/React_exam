import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './../screens/ChatScreen';
import ChatMessagesScreen from './../screens/ChatMessagesScreen';
import {
   NavigationContainer,
   getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function ChatStackNavigator() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="ChatStack"
            component={ChatScreen}
            options={{ title: 'Chat' }}
         />
         <Stack.Screen
            name="ChatMessages"
            component={ChatMessagesScreen}
            options={({ route }) => ({
               title: route.params?.chatRoomName,
               headerBackTitleVisible: false,
            })}
         />
      </Stack.Navigator>
   );
}
