import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import * as Styles from '../styles/master';

const InfoInput = props => {
    return (
        <View style={styles.infoInputContainer}>
            <Text style={{fontFamily: 'RobotoSlab-Regular'}}>{props.field}</Text>
            <TextInput style={styles.infoInput} />
        </View>  
    );
}

const styles = StyleSheet.create({
    infoInputContainer : {
        ...Styles.entryDimensions,
        marginBottom : 25,
    }, 
    infoInput : {
        ...Styles.fontFamily,
        ...Styles.bottomBorder,
        fontSize: 17,
        
    }
})

export default InfoInput;