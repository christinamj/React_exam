import React, { useState } from 'react';
import {
   View,
   Text,
   Button,
   StyleSheet,
   TextInput,
   Image,
   Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions/UserActions';
import generalStyles from '../GeneralStyles';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';

import Input from '../components/LabelInput';
import { Icon } from '@rneui/base';

const SignupScreen = () => {
   const navigation = useNavigation();
   const [changeName, setChangeName] = useState(''); // lift up
   const [nameValid, setNameValid] = useState(false); // lift up - pass through props instead
   const [touched, setTouched] = useState(false);
   const [email, onChangeEmail] = useState('');
   const [password, onChangePassword] = useState('');
   const [passwordMatch, onChangeMatch] = useState('');
   const [validMatch, setValidMatch] = useState('');
   const dispatch = useDispatch();

   const handleSignup = () => {
      console.log('wanna sign up');
      password === passwordMatch
         ? dispatch(signup(email, password)) && navigation.navigate('Login')
         : console.log("Passwords don't match");
   };

   return (
      <View style={[styles.container]}>
         <View style={[generalStyles.center, styles.logo]}>
            <Image
               source={require('../assets/logo.png')}
               style={[generalStyles.logo]}></Image>
         </View>
         <Text style={[generalStyles.h1, styles.alignLeft]}>
            Sign up to get access
         </Text>
         <View style={[generalStyles.shadow]}>
            <Input
               style={[styles.roundedTop]}
               label="email"
               placeholder="@student.cbs.dk"
               value={email}
               setContent={input => onChangeEmail(input)}></Input>
            {/* {email === '' ? placeholder="Fill in email" : ""} */}

            <Input
               label="password"
               placeholder="******"
               value={password}
               isSecureTextEntry={true}
               setContent={input => onChangePassword(input)}
               isValueValid={validMatch}
               onBlur={() => checkBlur()}></Input>

            <Input
               label="Confirm password"
               placeholder="******"
               isSecureTextEntry={true}
               value={passwordMatch}
               isValueValid={validMatch}
               // onBlur={() => checkBlur()}
               setContent={input => onChangeMatch(input)}></Input>
            {/* <TextInput style={defaultStyles.textInput} onChangeText={onChangeEmail} value={email} />
      <TextInput style={defaultStyles.textInput} onChangeText={onChangePassword} value={password} />
      <TextInput style={defaultStyles.textInput} onChangeText={onChangeMatch} value={password} /> */}
            {password != passwordMatch && (
               <View style={[generalStyles.errorWrapper]}>
                  <Ionicons
                     name="close-circle"
                     size={30}
                     color="#B10024"></Ionicons>
                  <Text style={[generalStyles.error]}>
                     Passwords don't match
                  </Text>
               </View>
            )}
         </View>

         <View
            style={[
               generalStyles.longBtnWrap,
               generalStyles.shadow,
               styles.positionBtn,
            ]}>
            <Pressable onPress={handleSignup}>
               <Text style={[generalStyles.whiteP, generalStyles.boldTxt]}>
                  Get access
               </Text>
            </Pressable>
         </View>
         <View style={[styles.signUpWrapper]}>
            <Text style={[styles.refTxt, styles.signup]}>
               Already have a user?{' '}
            </Text>
            <Link
               style={[styles.signup, generalStyles.boldPurple]}
               to={{ screen: 'Login' }}>
               Log in
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
   roundedTop: {
      borderTopRightRadius: 25,
   },
   logo: {
      marginBottom: 50,
   },
   alignLeft: {
      textAlign: 'left',
      marginBottom: 10,
      color: '#32305D',
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

   signup: {
      fontSize: 12,
      fontFamily: 'OpenSans-Regular',
   },

   positionBtn: {
      marginTop: 20,
      padding: 20,
   },
});

export default SignupScreen;
