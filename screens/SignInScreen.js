import React, {useContext} from 'react';
import { StyleSheet, Text , View, TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';
import AuthInput from '../components/AuthInput';
import * as Styles from '../styles/master';

export default ({ navigation }) => {
  const authFunctions = useContext(AuthContext);

  return (
    <View style={styles.signInContainer}>
        <AuthInput style={styles.removeRoundedBottom} placeholder='User Name'/>
        <AuthInput style={styles.removeRoundedTop} placeholder='Password'/>
        <SubmitButton title={'Sign In'} onPress={()=> {authFunctions.signIn();} }/>

        <TouchableOpacity style={styles.createAccountContainer} onPress={()=>{navigation.push('CreateAccountScreen')}} >
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
  createAccountContainer : {
    marginTop : 15,
  }, 
  createAccountText : {
    ...Styles.fontFamily,
    fontSize : 11,
    textDecorationLine : 'underline',
  }
});