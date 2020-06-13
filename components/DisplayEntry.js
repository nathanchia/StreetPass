import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as Styles  from '../styles/master';

// Ping button for home screen
const DisplayEntry = props => {
    return (
        <View style={styles.entryContainer}>
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