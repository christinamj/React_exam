import React from 'react';
import { StyleSheet, Text, View, Pressable, Option } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import generalStyles from '../GeneralStyles';
import ProfileImage from '../components/ProfilePic';
import { EditProfile, deleteProfile } from '../store/actions/UserActions';
import LabelInput from '../components/LabelInput';

export default function editProfile(props) {
   const dispatch = useDispatch();
   const user = useSelector(state => state?.user?.loggedInUser);

   // const loggedInUser = useSelector(state => state?.user?.loggedInUser);
   const token = useSelector(state => state?.user.token);
   // const loggedInUser = useSelector(state => state.user.loggedInUser);
   const [firstname, onChangeFirstname] = React.useState(user?.firstname);
   const [studyProgramme, onChangeStudyprogramme] = React.useState(
      user?.studyProgramme,
   );
   return (
      <View style={[generalStyles.wrapper]}>
         <View style={[styles.profileWrapper]}>
            <View>
               <Text style={[generalStyles.boldBlue, styles.marginTop]}>
                  PROFILE IMAGE
               </Text>
               <View
                  style={[
                     generalStyles.shadow,
                     styles.longBtnWrap,
                     styles.marginTop,
                  ]}>
                  <Pressable onPress={() => navigation.navigate('EditProfile')}>
                     <Text
                        style={[
                           generalStyles.whiteP,
                           generalStyles.boldTxt,
                           styles.centerTxt,
                        ]}>
                        Upload
                     </Text>
                  </Pressable>
               </View>
            </View>
            <ProfileImage></ProfileImage>
         </View>
         <View>
            <View
               style={[
                  generalStyles.shadow,
                  styles.marginBot,
                  styles.marginTop,
               ]}>
               <LabelInput
                  label="What is your name?"
                  text={user.firstname}
                  value={firstname}
                  setContent={firstname =>
                     onChangeFirstname(firstname)
                  }></LabelInput>
            </View>
            <View style={[generalStyles.shadow, styles.marginBot]}>
               <LabelInput
                  label="Study programme"
                  text={user.studyProgramme}
                  value={studyProgramme}
                  setContent={studyProgramme =>
                     onChangeStudyprogramme(studyProgramme)
                  }></LabelInput>
            </View>
         </View>

         <View style={[styles.buttonWrapper]}>
            <Pressable
               onPress={() =>
                  dispatch(
                     EditProfile(
                        firstname,
                        user.id,
                        user.email,
                        token,
                        studyProgramme,
                        user.chatToggle,
                        user.eventToggle,
                     ),
                     console.log('pressing save'),
                  )
               }>
               <Text style={[styles.buttonStyle]}> Save changes</Text>
            </Pressable>
         </View>

         <View style={[styles.deleteWrapper]}>
            <Pressable
               onPress={() =>
                  dispatch(
                     deleteProfile(user.id, token),
                     console.log('deleting user'),
                  )
               }>
               <Text style={[styles.buttonStyle]}> Delete account</Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   inputWrapper: {
      backgroundColor: '#FFFFFF',
      marginTop: 20,
      marginBottom: 3,
      padding: 20,
      borderRadius: 5,
      shadowColor: '#AAAAAA29',
      marginRight: 20,
      marginLeft: 20,
   },
   centerTxt: {
      textAlign: 'center',
   },
   buttonWrapper: {
      marginTop: 10,
      backgroundColor: '#5050A5',
      fontFamily: 'Teko-Medium',
      padding: 15,
      borderRadius: 5,
   },

   deleteWrapper: {
      marginTop: 180,
      width: '50%',
      backgroundColor: '#FA2846',
      fontFamily: 'Teko-Medium',
      padding: 15,
      borderRadius: 5,
   },
   buttonStyle: {
      color: '#fff',
      fontFamily: 'OpenSans-Bold',
      fontSize: 16,
   },
   profileWrapper: {
      display: 'flex',

      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 25,
      marginRight: 4,
      marginTop: 20,
   },
   studyProgram: {
      height: 100,
   },

   marginBot: {
      marginBottom: 15,
   },

   marginTop: {
      marginTop: 10,
   },

   longBtnWrap: {
      width: 135,
      padding: 12,
      borderRadius: 5,
      backgroundColor: '#5050A5',
      height: 45,
   },
});
