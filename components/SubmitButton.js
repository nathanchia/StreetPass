import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import * as Styles  from '../styles/master';

// Button for form submissions
const SubmitButton = props => {
    return (
        <TouchableHighlight style={{...styles.buttonContainer, ...props.containerStyle}} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    buttonContainer : {
        ...Styles.backgroundColor,
        width : '50%',
        borderRadius : 28,
        height : 45,
        justifyContent : 'center',
    }, 
    buttonText : {
        ...Styles.fontFamily,
        textAlign : 'center',
        color: '#ffffff',
        fontSize : 18,
    }
})

export default SubmitButton;