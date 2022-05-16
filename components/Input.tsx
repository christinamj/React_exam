import React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

interface Props {
   label: string;
   text: string;
   error: string;
   isSecureTextEntry: boolean;
   nameValid: boolean;
   onValid: (arg: boolean) => void;
   setContent: (arg: string) => void;
}

const Input = ({
   label = 'My default value',
   text,
   error,
   isSecureTextEntry,
   nameValid,
   onValid,
   setContent,
}: Props) => {
   const [touched, setTouched] = useState(false);

   const handleNewInput = (enteredText: string) => {
      setTouched(true);
      enteredText === '' ? onValid(false) : onValid(true);
      setContent(enteredText);
   };

   return (
      <View>
         <Text>{label}</Text>
         <TextInput
            value={text}
            secureTextEntry={isSecureTextEntry}
            onChangeText={handleNewInput}
            onBlur={() => setTouched(true)}></TextInput>
         {!nameValid && touched && <Text>{error}</Text>}
      </View>
   );
};

const styles = StyleSheet.create({});

export default Input;
