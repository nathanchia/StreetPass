import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';
import InfoInput from '../components/InfoInput';
import * as Styles from '../styles/master';

export default ({navigation}) => {
  const authFunctions = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [responseText, setResponseText] = useState('');

  return (
    <View style={styles.createAccountContainer}>
        <InfoInput autoCapitalize={'none'} field='Username' onChangeText={setUsername} value={username}/>
        <InfoInput  autoCapitalize={'none'} field='Password' onChangeText={setPassword} value={password} secure={true}/>
        <InfoInput  autoCapitalize={'none'} field='Confirm Password' onChangeText={setConfirmPass} value={confirmPass} secure={true}/>
        <InfoInput field='Display Name' onChangeText={setDisplayName} value={displayName}/>
        <Text style={styles.responseText}>{responseText}</Text>
        <SubmitButton title='Create Account' onPress={()=>{authFunctions.signUp(username, password, confirmPass, displayName, navigation, setResponseText);}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  createAccountContainer : {
    paddingTop: '25%',
    flex : 1,
    alignItems : 'center',
    justifyContent: 'center',
  },
  responseText : {
    ...Styles.fontFamily,
    marginBottom: 10,
    fontSize : 11,
    color: 'red'
  },
});