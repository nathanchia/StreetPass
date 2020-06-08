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
  const [displayName, setDisplayName] = useState('');
  const [responseText, setResponseText] = useState('');

  return (
    <View style={styles.createAccountContainer}>
        <InfoInput field='Username' onChangeText={setUsername} value={username}/>
        <InfoInput field='Password' onChangeText={setPassword} value={password} secure={true}/>
        <InfoInput field='Display Name' onChangeText={setDisplayName} value={displayName}/>
        <Text style={styles.responseText}>{responseText}</Text>
        <SubmitButton title='Create Account' onPress={()=>{authFunctions.signUp(username, password, displayName, navigation, setResponseText);}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  createAccountContainer : {
    flex : 1,
    alignItems : 'center',
    justifyContent: 'center',
  },
  responseText : {
    ...Styles.fontFamily,
    marginBottom: 25,
    fontSize : 11,
    color: 'red'
  },
});