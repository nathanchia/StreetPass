import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as Styles  from '../styles/master';

// Displays an individual entry of another user
// Required props: title, text
// Optional props: containerStyle
const DisplayEntry = props => {
    return (
        <View style={{...styles.entryContainer, ...props.containerStyle}}>
            <Text style={styles.entryTitle}>{props.title}</Text>
            <Text style={styles.entryText}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    entryContainer : {
        ...Styles.entryContainer,
    }, 
    entryTitle : {
        ...Styles.fontFamily,
        ...Styles.entryTitleBottomMargin,
        ...Styles.entryTitle,
    }, 
    entryText : {
        ...Styles.fontFamily,
    }, 
})

export default DisplayEntry;