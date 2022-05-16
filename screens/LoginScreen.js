import React, { useState } from 'react';
import {
   View,
   Text,
   Button,
   StyleSheet,
   TextInput,
   Pressable,
   Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, refreshToken, restoreUser } from '../store/actions/UserActions';

import { Link } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import generalStyles from '../GeneralStyles';

import Input from '../components/LabelInput';

const LoginScreen = props => {
   const [email, onChangeEmail] = useState('');
   const [password, onChangePassword] = useState('');
   const dispatch = useDispatch();
   const error = useSelector(state => state.user.error);

   const handleLogin = () => {
      dispatch(login(email, password));
   };

   React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
         let userToken, user, expiration, refreshTokenString;

         try {
            expiration = new Date(
               JSON.parse(await SecureStore.getItemAsync('expiration')),
            );

            // if expiration.....
            console.log('expiration', expiration);
            console.log('now', new Date());
            if (expiration < new Date()) {
               // then it is expired
               console.log('refresh token');
               refreshTokenString = await SecureStore.getItemAsync(
                  'refreshToken',
               );
               dispatch(refreshToken(refreshTokenString));
            }
            console.log('no refresh token');

            userToken = await SecureStore.getItemAsync('userToken');
            user = JSON.parse(await SecureStore.getItemAsync('user'));

            // console.log(userToken);
            // console.log(user);
            // console.log(expiration);
         } catch (e) {
            // Restoring token failed
            console.log('restore token failed');
            console.log(e);
         }

         dispatch(restoreUser(user, userToken));
      };

      bootstrapAsync();
   }, []);

   return (
      <View style={styles.container}>
         <View style={[generalStyles.center, styles.logo]}>
            <Image
               source={require('../assets/logo.png')}
               style={[generalStyles.logo]}></Image>
         </View>
         <Text style={[generalStyles.h1, styles.alignLeft]}>Log in</Text>
         <View>
            <Input
               label="E-mail"
               style={generalStyles.textInput}
               setContent={input => onChangeEmail(input)}
               value={email}
               placeholder="sije19ab@student.cbs.dk"
            />
         </View>
         <View>
            <Input
               label="Password"
               style={generalStyles.textInput}
               isSecureTextEntry={true}
               setContent={input => onChangePassword(input)}
               value={password}
               placeholder="******"
            />
         </View>
         {error !== undefined ? (
            <View style={[generalStyles.errorWrapper]}>
               <Ionicons
                  name="close-circle"
                  size={30}
                  color="#B10024"></Ionicons>
               <Text style={[generalStyles.error]}>{error}</Text>
            </View>
         ) : (
            console.log('its undefined')
         )}
         <Text style={[generalStyles.boldPurple, styles.forgot]}>
            Forgot password?
         </Text>
         <View
            style={[
               generalStyles.longBtnWrap,
               generalStyles.shadow,
               styles.positionBtn,
            ]}>
            <Pressable onPress={handleLogin}>
               <Text style={[generalStyles.whiteP, generalStyles.boldTxt]}>
                  Log in
               </Text>
            </Pressable>
         </View>
         <View style={[styles.signUpWrapper]}>
            <Text style={[styles.refTxt, styles.signup]}>
               Don't have an account?{' '}
            </Text>
            <Link
               style={[styles.signup, generalStyles.boldPurple]}
               to={{ screen: 'Signup' }}>
               Sign up
            </Link>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 90,
      padding: 20,
      backgroundColor: '#ffff',
   },
   logo: {
      marginBottom: 50,
   },
   signup: {
      fontSize: 12,
      fontFamily: 'OpenSans-Regular',
   },
   forgot: {
      paddingTop: 20,
      paddingBottom: 25,
      fontSize: 12,
      color: '#32305D',
      textAlign: 'center',
   },
   signUpWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
   },
   refTxt: {
      color: '#32305D',
      textAlign: 'left',
   },
   positionBtn: {
      marginTop: 20,
      padding: 20,
   },

   alignLeft: {
      textAlign: 'left',
      marginBottom: 10,
      color: '#32305D',
   },
});

export default LoginScreen;
