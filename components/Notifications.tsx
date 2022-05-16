import React, { useState } from 'react';
import { Switch } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

type SwitchComponentProps = {};

const SwitchComponent: React.FunctionComponent<SwitchComponentProps> = () => {
   const [checked, setChecked] = useState(false);

   const toggleSwitch = () => {
      setChecked(!checked);
   };

   return (
      <View style={styles.view}>
         <Switch
            value={checked}
            onValueChange={value => setChecked(value)}
            color="#5050A5"
         />
      </View>
   );
};

const styles = StyleSheet.create({
   view: {
      margin: 10,
      position: 'absolute',
      right: 0,
      top: '40%',
   },
});

export default SwitchComponent;
