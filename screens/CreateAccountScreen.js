import React, { useContext } from 'react';
import { StyleSheet, Button, View } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';

export default () => {
  const authFunctions = useContext(AuthContext);

  return (
    <View>
        <Button title='Create' onPress={()=>{authFunctions.signUp();}}/>
    </View>
  )
}

const styles = StyleSheet.create({
 
});