import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import * as Styles  from '../styles/master';

const AuthInput = props => {
    return (
        <TextInput style={{...styles.authInput, ...props.style}} placeholder={props.placeholder}/>
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