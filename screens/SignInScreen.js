import React from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';

export default ({navigation}) => {
  return (
    <View>
        <TextInput placeholder='User Name'/>
        <TextInput placeholder='Password'/>

        <Button title={'Create Account'} onPress={()=> navigation.push('CreateAccount')}/>
    </View>
  )
}

const styles = StyleSheet.create({
 
});