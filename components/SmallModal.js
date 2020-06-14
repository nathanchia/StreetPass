import React from 'react';
import { Text, Modal, View, StyleSheet } from 'react-native';

import * as Styles  from '../styles/master';
import SubmitButton from '../components/SubmitButton';

// Useful for relaying info to user and prompting yes/np
// Required props: visible, title, text, okCallback
// Optional props: isPrompt <- if true, will display yes/no instead of ok, will then require noCallBack
const SmallModal = props => {
    let buttons;
    // Yes and no buttons
    if (props.isPrompt) {
        buttons = 
            <View style={styles.smallPrompt}>
                <SubmitButton containerStyle={styles.smallerButtons} title={'Yes'} onPress={props.okCallback}/>
                <SubmitButton containerStyle={styles.smallerButtons} title={'No'} onPress={props.noCallback}/>
            </View>
    } else {  // Ok buttons
        buttons = 
            <SubmitButton 
                containerStyle={{...styles.smallerButtons, ...styles.centerButton}} 
                title={'OK'} 
                onPress={props.okCallback}
            />
    }

    return (
        <Modal animationType={'slide'} visible={props.visible} transparent={true}>
            <View style={styles.smallContainer}>
                <Text style={styles.smallTitle} >{props.title}</Text>
                <Text style={styles.smallText} >{props.text}</Text>
                {buttons}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    smallContainer: {
        ...Styles.coloredBorder,
        position: 'absolute',
        top: '35%',
        width: '70%',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: '5%',
    },
    smallTitle: {
        ...Styles.fontFamily,
        fontSize: 20,
        textAlign:'center',
        marginBottom: '10%',
        width: '100%',
    },
    smallText: {
        ...Styles.fontFamily,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: '10%',
        width:'100%',
    },
    smallPrompt : {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    smallerButtons : {
        width: '40%',
    }, 
    centerButton : {
        alignSelf: 'center',
    }
})

export default SmallModal;