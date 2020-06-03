import React, { useContext, useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';
import InfoInput from '../components/InfoInput';

export default () => {
  const authFunctions = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <View style={styles.createAccountContainer}>
        <InfoInput field='Username' onChangeText={setUsername} value={username}/>
        <InfoInput field='Password' onChangeText={setPassword} value={password}/>
        <InfoInput field='Display Name' onChangeText={setDisplayName} value={displayName}/>
        <SubmitButton title='Create Account' onPress={()=>{authFunctions.signUp(username, password);}}/>
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