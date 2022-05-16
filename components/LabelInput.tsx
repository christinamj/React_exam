import React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

interface Props {
   label: string;
   value: string;
   placeholder: string;
   isSecureTextEntry: boolean;
   setContent: (arg: string) => void;
}

const Input = ({
   label = 'My default value',
   value,
   placeholder,
   isSecureTextEntry,
   setContent,
}: Props) => {
   const [touched, setTouched] = useState(false);

   const handleNewInput = (enteredText: string) => {
      setTouched(true);
      enteredText === '';
      setContent(enteredText);
   };

   return (
      <View style={[styles.wrapper]}>
         <Text style={[styles.label]}>{label}</Text>
         <TextInput
            style={[styles.textfield]}
            value={value}
            secureTextEntry={isSecureTextEntry}
            onChangeText={handleNewInput}
            placeholder={placeholder}></TextInput>
      </View>
   );
};

const styles = StyleSheet.create({
   wrapper: {
      flexDirection: 'column',
      width: '100%',
   },
   label: {
      fontFamily: 'OpenSans-Bold',
      textTransform: 'uppercase',
      color: '#32305D',
      top: 15,
      paddingHorizontal: 10,
      fontWeight: 'bold',
      zIndex: 6,
      position: 'absolute',
      fontSize: 12,
   },
   textfield: {
      paddingHorizontal: 10,
      paddingTop: 35,
      paddingBottom: 15,
      backgroundColor: '#fff',
      color: '#000',

      width: '100%',
      borderWidth: 1,
      borderColor: '#EEEEEE',
      textTransform: 'lowercase',
      height: 70,
   },
});

export default Input;
