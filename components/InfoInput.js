import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import * as Styles from '../styles/master';

// Used for user input, at create new account and new/edit entry
// Required Props: onChangeText, value, field (title), 
// Optional Props: containerStyle, autoCapitalize, secure, multi
const InfoInput = props => {
    const [inputHeight, setInputHeight] = useState(0);

    return (
        <View style={{...styles.infoInputContainer, ...props.containerStyle, height: Math.max(35, inputHeight)}}>
            <Text style={{fontFamily: 'RobotoSlab-Regular'}}>{props.field}</Text>
            <TextInput 
                style={styles.infoInput}
                onChangeText={enteredText => props.onChangeText(enteredText)}
                value={props.value}
                autoCapitalize={props.autoCapitalize}
                secureTextEntry={props.secure}
                multiline={props.multi} 
                onContentSizeChange={(event) => {
                    let newHeight = event.nativeEvent.contentSize.height;
                    // 140 is arbitrary may change in future
                    // React does not allow props to be used to check for screen height
                    if (newHeight <= 140) {
                        setInputHeight(newHeight);
                    } else {
                        setInputHeight(140);
                    }
                }}      
            />
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

