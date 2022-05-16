import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import generalStyles from '../GeneralStyles';

// };

export default function HomeScreen(props) {
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
      <View style={[generalStyles.centerCenter]}>
         <Text style={[generalStyles.h1]}>Feed</Text>
         <Text style={[generalStyles.p]}>{user.firstname}</Text>
      </View>
   );
}

const styles = StyleSheet.create({});
