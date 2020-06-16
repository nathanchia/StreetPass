import React, {useContext, useState} from 'react';
import { StyleSheet, Text , View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {Keyboard} from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';
import AuthInput from '../components/AuthInput';
import SpinnerModal from '../components/SpinnerModal';
import * as Styles from '../styles/master';

export default ({ navigation }) => {
  const authFunctions = useContext(AuthContext);
  const[isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseText, setResponseText] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.signInContainer}>
          <SpinnerModal visible={isLoading} />

          <AuthInput style={styles.removeRoundedBottom} placeholder='Username' onChangeText={setUsername} value={username}/>
          <AuthInput style={styles.removeRoundedTop} placeholder='Password' onChangeText={setPassword} value={password} secure={true}/>
          
          <Text style={styles.responseText}>{responseText}</Text>

          <SubmitButton title={'Sign In'} onPress={()=> {
            setResponseText('');
            authFunctions.signIn(username, password, setResponseText, setIsLoading);
          }}/>

          <TouchableOpacity style={styles.createAccountContainer} onPress={()=>{
            setUsername('');
            setPassword('');
            setResponseText('');
            navigation.push('CreateAccountScreen');
            }} 
          >
            <Text style={styles.createAccountText}>Create Account Instead</Text>
          </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback >
  )
}

const styles = StyleSheet.create({
  signInContainer : {
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center',
  }, 
  removeRoundedBottom : {
    borderBottomLeftRadius : 0,
    borderBottomRightRadius : 0,
  }, 
  removeRoundedTop : {
    borderTopWidth : 0,
    borderTopLeftRadius : 0,
    borderTopRightRadius : 0,
    marginBottom: 10,
  }, 
  responseText : {
    ...Styles.fontFamily,
    marginBottom: 10,
    fontSize : 11,
    color: 'red',
    alignSelf: 'center',
  },
  createAccountContainer : {
    marginTop : 15,
  }, 
  createAccountText : {
    ...Styles.fontFamily,
    fontSize : 11,
    textDecorationLine : 'underline',
  }
});