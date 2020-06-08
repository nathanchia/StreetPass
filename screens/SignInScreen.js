import React, {useContext, useState} from 'react';
import { StyleSheet, Text , View, TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';
import AuthInput from '../components/AuthInput';
import * as Styles from '../styles/master';

export default ({ navigation }) => {
  const authFunctions = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseText, setResponseText] = useState('');

  return (
    <View style={styles.signInContainer}>
        <AuthInput style={styles.removeRoundedBottom} placeholder='User Name' onChangeText={setUsername} value={username}/>
        <AuthInput style={styles.removeRoundedTop} placeholder='Password' onChangeText={setPassword} value={password} secure={true}/>
        
        <Text style={styles.responseText}>{responseText}</Text>

        <SubmitButton title={'Sign In'} onPress={()=> {authFunctions.signIn(username, password, setResponseText);}}
        />

        <TouchableOpacity style={styles.createAccountContainer} onPress={()=>{
          setResponseText('');
          navigation.push('CreateAccountScreen');
          }} 
        >
          <Text style={styles.createAccountText}>Create Account Instead</Text>
        </TouchableOpacity>
    </View>
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
    color: 'red'
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