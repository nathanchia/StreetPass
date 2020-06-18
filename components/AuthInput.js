import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import * as Styles  from '../styles/master';

// Signin fields (username and password)
// Required props: placeholder, onChangeText, value, 
// Optional props: secure, style
const AuthInput = props => {
    return (
        <TextInput 
            style={{...styles.authInput, ...props.style}} 
            placeholder={props.placeholder}
            autoCapitalize={'none'}
            onChangeText={enteredText => props.onChangeText(enteredText)}
            value={props.value}
            secureTextEntry={props.secure}
        />
    );
}

const styles = StyleSheet.create({
    authInput : {
        ...Styles.coloredBorder,
        ...Styles.entryDimensions,
        ...Styles.fontFamily,
        paddingLeft : 20,
    }
})

export default AuthInput;