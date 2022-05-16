import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import generalStyles from '../GeneralStyles';
import LabelInput from '../components/LabelInput';
import { useNavigation } from '@react-navigation/native';
import { addEvent } from '../store/actions/EventActions';

export default function onboardUser(props) {
   const navigation = useNavigation();
   const dispatch = useDispatch();
   const event = useSelector(state => state.events.event);
   const token = useSelector(state => state.user.token);
   const user = useSelector(state => state.user.loggedInUser);
   //    const user = useSelector(state => state.user.loggedInUser);

   const [eventTitle, onChangeeventTitle] = React.useState(event?.eventTitle);
   const [date, onChangedate] = React.useState(event?.date);
   const [organisation, onChangeOrganisation] = React.useState(
      event?.organisation,
   );
   const [start, onChangeStart] = React.useState(event?.start);
   const [end, onChangeEnd] = React.useState(event?.end);
   const [location, onChangeLocation] = React.useState(event?.location);

   return (
      <View style={[generalStyles.wrapper]}>
         <View style={[generalStyles.wrapInputs]}>
            <View style={[generalStyles.shadow, styles.marginBot]}>
               <LabelInput
                  label="Event title?"
                  text=""
                  value={eventTitle}
                  setContent={eventTitle =>
                     onChangeeventTitle(eventTitle)
                  }></LabelInput>
            </View>

            <View style={[generalStyles.shadow, styles.marginBot]}>
               <LabelInput
                  label="Date"
                  text=""
                  placeholder="MON, 1. APR"
                  value={date}
                  setContent={date => onChangedate(date)}></LabelInput>
            </View>

            <View style={[generalStyles.shadow, styles.marginBot]}>
               <LabelInput
                  label="Starting time"
                  text=""
                  placeholder="12:00"
                  value={start}
                  setContent={start => onChangeStart(start)}></LabelInput>
            </View>

            <View style={[generalStyles.shadow, styles.marginBot]}>
               <LabelInput
                  label="Ending time"
                  text=""
                  placeholder="19:00"
                  value={end}
                  setContent={start => onChangeEnd(end)}></LabelInput>
            </View>

            <View style={[generalStyles.shadow, styles.marginBot]}>
               <LabelInput
                  label="Location"
                  text=""
                  value={location}
                  setContent={location =>
                     onChangeLocation(location)
                  }></LabelInput>
            </View>

            <View style={[generalStyles.shadow, styles.marginBot]}>
               <LabelInput
                  label="Organisation"
                  text=""
                  value={organisation}
                  setContent={organisation =>
                     onChangeOrganisation(organisation)
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
                     addEvent(
                        eventTitle,
                        date,
                        start,
                        end,
                        location,
                        organisation,
                        user.email,
                        token,
                     ),
                  ) && navigation.navigate('EventsStack')
               }>
               <Text style={[generalStyles.whiteP, generalStyles.boldTxt]}>
                  Add event
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
