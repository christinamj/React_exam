import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardScreen from './../screens/OnboardScreen';
import HomeScreen from './../screens/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function OnboardNavigator() {
   const user = useSelector(state => state?.user?.loggedInUser);
   const navigation = useNavigation();
   React.useEffect(() => {
      console.log('Homescreen');
      console.log('Homescreen user', user);
      {
         user.firstname == ''
            ? navigation.navigate('OnboardScreen')
            : console.log('exists');
      }
   }, []);
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: true,
            headerBackTitleVisible: true,
         }}>
         {user.firstname == '' ? (
            <Stack.Screen
               name="OnboardScreen"
               component={OnboardScreen}
               options={{
                  headerShown: false,
                  headerBackVisible: false,
                  headerBackTitleVisible: false,
               }}
            />
         ) : (
            <Stack.Screen
               name="HomeScreen"
               component={HomeScreen}
               options={{
                  headerTitle: 'FEED',
                  headerBackVisible: true,
                  headerBackTitleVisible: false,

                  headerTitleStyle: {
                     fontFamily: 'Teko-Medium',
                     fontSize: 26,
                     color: '#5050A5',
                  },
               }}
            />
         )}
      </Stack.Navigator>
   );
}
