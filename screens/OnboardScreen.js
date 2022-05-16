import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   Image,
   Pressable,
   TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import generalStyles from '../GeneralStyles';
import LabelInput from '../components/LabelInput';
import { OnboardUser } from '../store/actions/UserActions';
import { useNavigation } from '@react-navigation/native';

export default function onboardUser(props) {
   const navigation = useNavigation();
   const dispatch = useDispatch();
   const user = useSelector(state => state.user.loggedInUser);
   const token = useSelector(state => state.user.token);

   const [firstname, onChangeFirstname] = React.useState(user?.firstname);
   const [studyProgramme, onChangeStudyProgramme] = React.useState(
      user?.studyProgramme,
   );

   const handleOnboarding = () => {
      dispatch(OnboardUser(email, firstname, studyProgramme));
   };

   return (
      <View style={[generalStyles.wrapper]}>
         <View style={[generalStyles.center, styles.logoPosition]}>
            <Image
               source={require('../assets/logo.png')}
               style={[generalStyles.logo]}></Image>
         </View>
         <View>
            <Text style={[generalStyles.h1, styles.margin]}>
               Before we start...
            </Text>
         </View>
         <View style={[generalStyles.wrapInputs]}>
            <View style={[generalStyles.shadow, styles.marginBot]}>
               <LabelInput
                  label="What is your name?"
                  text={user.firstname}
                  value={firstname}
                  placeholder="First name and last name"
                  setContent={firstname =>
                     onChangeFirstname(firstname)
                  }></LabelInput>
            </View>

            <View style={[generalStyles.shadow]}>
               <LabelInput
                  label="Study programme"
                  text={user.studyProgramme}
                  placeholder="MSc in business and adminstration"
                  value={studyProgramme}
                  setContent={studyProgramme =>
                     onChangeStudyProgramme(studyProgramme)
                  }></LabelInput>
            </View>
         </View>
         <View
            style={[
               generalStyles.longBtnWrap,
               generalStyles.shadow,
               styles.positionBtn,
            ]}>
            <Pressable
               onPress={() =>
                  dispatch(
                     OnboardUser(
                        firstname,
                        user.id,
                        user.email,
                        token,
                        studyProgramme,
                     ),
                  )
               }>
               <Text style={[generalStyles.whiteP, generalStyles.boldTxt]}>
                  Next
               </Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   logoPosition: {
      marginTop: 30,
   },
   positionBtn: {
      position: 'absolute',
      bottom: 40,
      left: 20,
   },
   margin: {
      marginTop: 30,
      marginBottom: 50,
   },
   marginBot: {
      marginBottom: 15,
   },
});
