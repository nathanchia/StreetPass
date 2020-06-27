import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SubmitButton from '../components/SubmitButton';
import * as Styles from '../styles/master';

export default ({route, navigation}) => {
  return (
    <View style={styles.returnContainer} >
        <Text style={styles.returnText}>{route.params.result}</Text>
        <SubmitButton containerStyle={styles.largerButton} title='Return to Sign in' onPress={()=>{navigation.pop()}}/>
    </View>
  )
}

const styles = StyleSheet.create({
    returnContainer : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
    }, returnText : {
        ...Styles.fontFamily,
        fontSize : 15,
        marginBottom : 25,
        textAlign:'center'
    }, largerButton : {
      width: '70%',
    }
});