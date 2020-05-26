import React, { useContext } from 'react';
import { StyleSheet, Button, View } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';
import InfoInput from '../components/InfoInput';

export default () => {
  const authFunctions = useContext(AuthContext);

  return (
    <View style={styles.createAccountContainer}>
        <InfoInput field='Username' />
        <InfoInput field='Password' />
        <InfoInput field='Full Name' />
        <SubmitButton title='Create Account' onPress={()=>{authFunctions.signUp();}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  createAccountContainer : {
    flex : 1,
    alignItems : 'center',
    justifyContent: 'center',
  },
});