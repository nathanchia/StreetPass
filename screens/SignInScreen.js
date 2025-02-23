import React, {useContext, useState} from 'react';
import { StyleSheet, Text , View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

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

          <View style={styles.titleContainer}>
            <Text style={styles.firstTitle}>{'C L O '}</Text>
            <Text style={styles.secondTitle}>{' / Cards'}</Text>
          </View>
          

          <AuthInput style={styles.removeRoundedBottom} placeholder='Username' onChangeText={setUsername} value={username}/>
          <AuthInput style={styles.removeRoundedTop} placeholder='Password' onChangeText={setPassword} value={password} secure={true}/>
          
          <Text style={styles.responseText}>{responseText}</Text>

          <SubmitButton title={'Sign In'} onPress={()=> {
            setResponseText('');
            authFunctions.signIn(username, password, setResponseText, setIsLoading);
          }}/>

          <TouchableOpacity style={{marginTop : 15}} onPress={()=>{
            setUsername('');
            setPassword('');
            setResponseText('');
            navigation.push('CreateAccountScreen');
            }} 
          >
            <Text style={styles.smallText}>Create Account Instead</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop : 10}} onPress={()=>{
            setUsername('');
            setPassword('');
            setResponseText('');
            navigation.push('ForgotPasswordScreen');
            }} 
          >
            <Text style={styles.smallText}>Forgot Password</Text>
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
    backgroundColor:'white'
  }, 
  titleContainer: {
    flexDirection: 'row', 
    marginBottom: 10,
  },
  firstTitle: {
    ...Styles.fontFamily,
    color: '#FF9F2E', 
    fontSize: 20,
  },
  secondTitle: {
    ...Styles.fontFamily,
    fontSize: 30,
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
    ...Styles.redText,
  },
  smallText : {
    ...Styles.fontFamily,
    fontSize : 11,
    textDecorationLine : 'underline',
  }
});