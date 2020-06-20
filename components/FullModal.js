import React, { useState } from 'react';
import {  Modal, View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';
import * as Styles  from '../styles/master';
import { Dimensions } from "react-native";

import InfoInput from '../components/InfoInput';
import SubmitButton from '../components/SubmitButton';

// Non transparent modal that covers whole screen, used in edit and create entry 
// Required props: visible, setModalVisible, headerTitle, submitFunction, 
// Optional props: onShow, entryKey 
const FullModal = props => {
    const [newTitle, setNewTitle] = useState('');
    const [newValue , setNewValue] = useState('');
    const [validEntry, setValidEntry] = useState('');

    // Ensures Submit button is always at the right abs pos
    const screenHeight = Math.round(Dimensions.get('window').height);

    // onShow loads the previous entries to allow easy editing
    return (
        <Modal 
            animationType={'slide'} 
            visible={props.visible} 
            onShow={() => {
                if (props.onShow) {
                    props.onShow(setNewTitle, setNewValue);
                }
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style= {{...styles.modalContainer, height: screenHeight}}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>{props.headerTitle}</Text>
                        <Enticons name={'cross'} size={30} onPress={() => {
                            setNewValue('');
                            setNewTitle('');
                            setValidEntry('');
                            props.setModalVisible(false);
                        }} />
                    </View>
                
                    <InfoInput 
                        containerStyle={{width: '100%'}} 
                        field={'Title'}  
                        value={newTitle}
                        onChangeText={setNewTitle} 
                    />

                    <InfoInput 
                        containerStyle={{width: '100%'}} 
                        field={'Text'} 
                        value={newValue} 
                        onChangeText={setNewValue}
                        multi={true}
                    />  

                    <Text style={styles.validEntry}>{validEntry}</Text>

                    <SubmitButton 
                        containerStyle={styles.saveButton} 
                        title={'Save Changes'}
                        onPress={() => {
                            if (newTitle && newValue) {
                                //props.entryKey is optional and provided for editing of entry
                                props.submitFunction(newTitle, newValue, props.entryKey);
                                setNewTitle('');
                                setNewValue('');
                                setValidEntry('');
                                props.setModalVisible(false);
                            } else {
                                setValidEntry('Both fields cannot be empty');
                            } 
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer : {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        paddingTop: '10%',
    }, 
    headerContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    headerTitle : {
        ...Styles.fontFamily,
        fontSize: 20,
    },
    validEntry : {
        ...Styles.fontFamily,
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 11,
        bottom: 130,
        color: 'red',
    },
    saveButton : {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 70
    }
})

export default FullModal;