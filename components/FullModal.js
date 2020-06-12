import React, { useState } from 'react';
import {  Modal, View, StyleSheet, Text } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';
import * as Styles  from '../styles/master';
import { Dimensions } from "react-native";

import InfoInput from '../components/InfoInput';
import SubmitButton from '../components/SubmitButton';

// Non transparent modal used in edit 
// Required props: visible, setModalVisible, headerTitle, submitFunction, 
// Optional props: onShow, entryKey 
const FullModal = props => {
    const [newTitle, setNewTitle] = useState('');
    const [newValue , setNewValue] = useState('');
    const [validEntry, setValidEntry] = useState('');
    const screenHeight = Math.round(Dimensions.get('window').height);

    // Only allow title editing if not display name
    let titleInput;
    if (props.entryKey) {
        titleInput =
            <InfoInput 
                containerStyle={{width: '100%'}} 
                field={'Title'}  
                value={newTitle}
                onChangeText={setNewTitle} 
            />;
    }

    // Hide 'text' header if only editing display name
    let textInput;
    if (props.entryKey) {
        textInput =
            <InfoInput 
                containerStyle={{width: '100%'}} 
                field={'Text'} 
                value={newValue} 
                onChangeText={setNewValue}
                multi={true}
            />;
    } else {
        textInput =
        <InfoInput 
            containerStyle={{width: '100%'}} 
            field={''} 
            value={newValue} 
            onChangeText={setNewValue}
            multi={false}
        />;
    }

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
            
                {titleInput}

                {textInput}

                <Text style={styles.validEntry}>{validEntry}</Text>

                <SubmitButton 
                    containerStyle={styles.saveButton} 
                    title={'Save Changes'}
                    onPress={() => {
                        if (props.entryKey) {
                            if (newTitle && newValue) {
                                props.submitFunction(newTitle, newValue, props.entryKey);
                                setNewTitle('');
                                setNewValue('');
                                setValidEntry('');
                                props.setModalVisible(false);
                            } else {
                                setValidEntry('Both fields cannot be empty');
                            }
                        } else {
                            if (newValue) {
                                props.submitFunction(newValue);
                                setNewTitle('');
                                setNewValue('');
                                setValidEntry('');
                                props.setModalVisible(false);
                            } else {
                                setValidEntry('Display name cannot be empty');
                            }
                        }
                    }}
                />
            </View>
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