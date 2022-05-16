import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStackNavigator from './ChatStackNavigator';
import OnboardNavigator from './OnboardNavigator';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import HomeScreen from './../screens/HomeScreen';
import DiscoverScreen from './../screens/DiscoverScreen';
import MenuScreen from '../screens/MenuScreen';
import { HeaderShownContext } from '@react-navigation/elements';
import SignupScreen from './../screens/SignupScreen';
import LoginScreen from './../screens/LoginScreen';
import OnboardScreen from './../screens/OnboardScreen';
import { useSelector } from 'react-redux';
import MenuStackNavigator from '../components/MenuStackNavigator';
import DiscoverNavigator from './DiscoverStack';

const tabNavigation = props => {
   const Stack = createNativeStackNavigator();
   const Tab = createBottomTabNavigator();
   const loggedInUser = useSelector(state => state.user.loggedInUser);

   return (
      <NavigationContainer>
         {loggedInUser !== undefined ? (
            <Tab.Navigator
               screenOptions={{
                  headerShown: true,
                  headerBackTitleVisible: true,
                  tabBarShowIcon: true,
                  color: '#5050A5',
                  tabBarLabelStyle: { fontFamily: 'Teko-Medium', fontSize: 16 },
                  tabBarActiveTintColor: '#5050A5',
                  tabBarStyle: { height: 85, paddingTop: 10 },
                  headerStyle: {
                     height: 60,
                  },
               }}>
               <Tab.Screen
                  name="Home"
                  component={OnboardNavigator}
                  options={{
                     headerTitle: '',
                     tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused}>
                           <Entypo name="home" size={size} color={color} />
                        </View>
                     ),
                  }}
               />
               <Tab.Screen
                  name="Discover"
                  component={DiscoverNavigator}
                  options={{
                     headerTitle: '',
                     tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                           <FontAwesome
                              name="search"
                              size={size}
                              color={color}
                           />
                        </View>
                     ),
                  }}
               />
               <Tab.Screen
                  name="Chat"
                  component={ChatStackNavigator}
                  options={{
                     headerTitle: '',
                     tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                           <Entypo name="chat" size={size} color={color} />
                        </View>
                     ),
                  }}
               />
               <Tab.Screen
                  name="Menu"
                  component={MenuStackNavigator}
                  options={{
                     headerTitle: '',
                     tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                           <Ionicons
                              name="ios-menu"
                              size={size}
                              color={color}
                           />
                        </View>
                     ),
                  }}
               />
            </Tab.Navigator>
         ) : (
            <Stack.Navigator
               screenOptions={{
                  headerShown: false,
               }}>
               <Stack.Screen
                  name="Signup"
                  component={SignupScreen}
                  options={{
                     headerTitle: 'SIGN UP',
                  }}
               />
               <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
         )}
      </NavigationContainer>
   );
};

const styles = StyleSheet.create({});

export default tabNavigation;
