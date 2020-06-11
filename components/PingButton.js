import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import * as Styles  from '../styles/master';

// Ping button for home screen
const PingButton = props => {
    return (
        <TouchableHighlight underlayColor='white' style={styles.buttonContainer} onPress={props.onPress}>
            <Text style={styles.buttonText}>Ping</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    buttonContainer : {
        backgroundColor : 'black',
        borderRadius : 12,
        justifyContent : 'center',
        marginRight : 10
    }, 
    buttonText : {
        ...Styles.fontFamily,
        textAlign : 'center',
        color: '#ffffff',
        fontSize : 22,
        padding : 18,
        paddingVertical : 5
    }
})

export default PingButton;