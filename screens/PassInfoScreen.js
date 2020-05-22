import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ({ route }) => {
  return (
    <View>
        <Text>{'Name: ' + route.params.passInfo.name}</Text>
        <Text>{'Hobbies: ' + route.params.passInfo.hobbies}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
 
});