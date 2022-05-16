import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   Button,
   Pressable,
   Switch,
} from 'react-native';
import { Link } from '@react-navigation/native';
import generalStyles from '../GeneralStyles';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/actions/UserActions';
import { eventNotifications } from '../store/actions/UserActions';
import { chatNotifications } from '../store/actions/UserActions';
import { StackActions, useNavigation } from '@react-navigation/native';

import ProfileCard from '../components/ProfileCard';
import Notifications from '../components/Notifications';

import ProfilePic from '../components/ProfilePic';

const Menu = props => {
   const dispatch = useDispatch();
   const navigation = useNavigation();
   const user = useSelector(state => state?.user?.loggedInUser);
   const token = useSelector(state => state.user.token);

   const [switchValue, setSwitchValue] = useState(false);

   const toggleEventSwitch = value => {
      setSwitchValue(value);
      console.log('toogle swotch');
      console.log(value);
      dispatch(eventNotifications(user.id, value, token));
      console.log(user);
   };
   const toggleChatSwitch = value => {
      setSwitchValue(value);
      console.log('toogle chat switch');
      console.log(value);
      dispatch(chatNotifications(user.id, value, token));
      console.log(user);
   };

   React.useEffect(() => {
      console.log('user', user);
      if (user === undefined) {
         console.log('undefined user', user);
      }
   });

   return (
      <View style={[generalStyles.paddingCenter]}>
         <View>
            <View style={[generalStyles.flex, generalStyles.paddingCenter]}>
               <View>
                  <ProfilePic></ProfilePic>
               </View>
               <View>
                  <ProfileCard
                     firstname={user.firstname}
                     email={user.email}></ProfileCard>
               </View>
            </View>
            <View style={[generalStyles.paddingVCenter]}>
               <View
                  style={[
                     generalStyles.longBtnWrap,
                     generalStyles.shadow,
                     styles.positionBtn,
                     styles.margin,
                  ]}>
                  <Pressable onPress={() => navigation.navigate('EditProfile')}>
                     <Text
                        style={[generalStyles.whiteP, generalStyles.boldTxt]}>
                        Edit profile
                     </Text>
                  </Pressable>
               </View>
            </View>
         </View>
         <View>
            <Text style={[generalStyles.h1]}>NOTIFICATIONS</Text>
            <View
               style={[
                  generalStyles.flex,
                  styles.notificationWrapper,
                  generalStyles.shadow,
               ]}>
               <View>
                  <Text style={[generalStyles.subheader]}>Chat</Text>
                  <Text style={[generalStyles.smallP]}>
                     When you recieve a new message
                  </Text>
               </View>
               <View>
                  <Switch
                     value={user.chatToggle}
                     onValueChange={toggleChatSwitch}
                     color="#5050A5"
                     trackColor={{ true: '#32305D' }}
                  />
               </View>
            </View>

            <View
               style={[
                  generalStyles.flex,
                  styles.notificationWrapper,
                  styles.margin,
                  generalStyles.shadow,
               ]}>
               <View>
                  <Text style={[generalStyles.subheader]}>Event reminder</Text>
                  <Text style={[generalStyles.smallP]}>
                     An hour before events you are ‘going to’
                  </Text>
               </View>
               {/* <View>
                  <Switch
                     value={switchValue}
                     onValueChange={toggleEventSwitch}
                     color="#5050A5"
                  />
               </View> */}
            </View>
         </View>
         <View style={[styles.buttonWrapper, generalStyles.shadow]}>
            <Pressable onPress={() => dispatch(logOut())}>
               <Text style={[styles.buttonStyle]}> LOG OUT</Text>
            </Pressable>
         </View>
      </View>
   );
};

export default Menu;

const styles = StyleSheet.create({
   notificationWrapper: {
      backgroundColor: '#FFFFFF',
      marginTop: 20,
      marginBottom: 3,
      padding: 18,
      borderRadius: 5,
      shadowColor: '#AAAAAA29',
      justifyContent: 'flex-start',
      width: 350,
      justifyContent: 'space-between',
   },
   buttonWrapper: {
      backgroundColor: '#FFFFFF',
      fontFamily: 'Teko-Medium',
      marginHorizontal: 20,
      height: 80,
      display: 'flex',
      justifyContent: 'center',
   },
   buttonStyle: {
      fontSize: 26,
      fontFamily: 'Teko-Medium',
      color: '#32305D',
      textAlign: 'center',
      width: 350,
   },
   margin: {
      marginBottom: 30,
   },
});
