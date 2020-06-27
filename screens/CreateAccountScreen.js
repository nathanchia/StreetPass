import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';
import InfoInput from '../components/InfoInput';
import SpinnerModal from '../components/SpinnerModal';
import * as Styles from '../styles/master';

export default ({navigation}) => {
  const authFunctions = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.createAccountContainer}>
          <SpinnerModal visible={isLoading} />
          <InfoInput autoCapitalize={'none'} field='Username' onChangeText={setUsername} value={username}/>
          <InfoInput  autoCapitalize={'none'} field='Password' onChangeText={setPassword} value={password} secure={true}/>
          <InfoInput  autoCapitalize={'none'} field='Email' onChangeText={setEmail} value={email}/>
          <InfoInput field='Display Name' maxLength={18} onChangeText={setDisplayName} value={displayName}/>
          <Text style={styles.responseText}>{responseText}</Text>
          <SubmitButton 
            title='Create Account' 
            onPress={()=>{authFunctions.signUp(
              username, 
              password, 
              email, 
              displayName, 
              navigation, 
              setResponseText, 
              setIsLoading);}}
          />
      </View>
    </TouchableWithoutFeedback>
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
    ...Styles.redText,
  },
});