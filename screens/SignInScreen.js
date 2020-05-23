import React, {useContext} from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';

import { AuthContext } from '../contexts/AuthContext'

export default ({ navigation }) => {
  const authFunctions = useContext(AuthContext);

  return (
    <View>
        <TextInput placeholder='User Name'/>
        <TextInput placeholder='Password'/>
        <Button title={'Sign In'} onPress={()=> {authFunctions.signIn();} }/>
        <Button title={'Create Account Instead'} onPress={()=>{navigation.push('CreateAccountScreen')}}/>
    </View>
  )
}

const styles = StyleSheet.create({
 
});