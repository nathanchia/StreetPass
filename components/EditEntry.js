import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';

import * as Styles from '../styles/master';
import SubmitButton from '../components/SubmitButton';
import FullModal from './FullModal';

// An entry in the edit screen, displays title and text, as well as provides delete and edit functionality
const EditEntry = props => {
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    let editModal;
    // Full modal with title and text fields
    if (props.deletable) {
        editModal = 
            <FullModal 
                visible={editVisible} 
                setModalVisible={setEditVisible} 
                headerTitle={'Edit Entry'} 
                onShow={(setTitle, setText) => {
                    setTitle(props.title);
                    setText(props.text);
                }}
                submitFunction={props.onUpdate} 
                entryKey={props.entryKey} 
            />;
    } else {  // Only edit display name
        editModal = 
            <FullModal 
                visible={editVisible} 
                setModalVisible={setEditVisible} 
                headerTitle={'Change Display Name'} 
                onShow={(setTitle, setText) => {
                    setText(props.text);
                }}
                submitFunction={props.onUpdate} 
            />;
    }

    return (
        <View style={styles.entryContainer}>
            <Modal animationType={'slide'} visible={deleteVisible} transparent={true}>
                <View style={styles.deleteContainer}>
                    <Text style={styles.deleteHeader} >{'Are you sure?'}</Text>
                    <Text style={styles.deleteText} >{'Once deleted, this entry will be gone forever'}</Text>
                    <View style={styles.deletePrompt}>
                        <SubmitButton containerStyle={styles.smallerButtons} title={'Yes'} onPress={() => {
                            props.onDelete(props.entryKey);
                            setDeleteVisible(false);
                        }}/>
                        <SubmitButton containerStyle={styles.smallerButtons} title={'No'} onPress={() => {setDeleteVisible(false);}}/>
                    </View>
                </View>
            </Modal>

            {editModal}

            <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{props.title}</Text>
                { props.deletable &&
                    <Enticons 
                        style={styles.entryHeaderIconLeft} 
                        name={'trash'} 
                        size={20} 
                        color={'black'} 
                        onPress={()=>{setDeleteVisible(true);}}
                    />
                }
                <Enticons 
                    style={styles.entryHeaderIconRight} 
                    name={'pencil'}
                    size={20} 
                    color={'black'}
                    onPress={()=>{setEditVisible(true);}} 
                />
            </View>
           
            <Text style={styles.entryText}>{props.text}</Text>     
        </View>
    );
}

const styles = StyleSheet.create({
    entryContainer : {
        width: '80%',
        marginBottom : 30,
        alignSelf: 'center',
    }, 
    entryHeader : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,   
    },
    entryTitle : {
        ...Styles.fontFamily,
        textDecorationLine: 'underline',
        fontSize: 20,
        flex: 10,
    },
    entryHeaderIconLeft : {
        flex: 2,
    },
    entryHeaderIconRight : {
        flex: 1,
    },
    entryText : {
        ...Styles.fontFamily,
    },
    deleteContainer : {
        ...Styles.coloredBorder,
        marginTop: '50%',
        width: '70%',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: '5%',
    }, 
    deleteHeader : {
        ...Styles.fontFamily,
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: '10%',
    }, 
    deleteText: {
        ...Styles.fontFamily,
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: '10%',
    },
    deletePrompt : {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    smallerButtons : {
        width: '40%',
    }, 
})

export default EditEntry;

/*
            <Modal animationType={'slide'} visible={editVisible} >
                <View style={{...styles.editContainer, height: screenHeight}}>
                    <View style={styles.editHeader}>
                        <Text style={styles.editTitle}>{props.title}</Text>
                        <Enticons name={'cross'} size={30} onPress={() => {
                            setValidEntry('');
                            setEditVisible(false);
                        }} />
                    </View>  

                    <InfoInput 
                        containerStyle={{width: '100%'}} 
                        value={editText} 
                        onChangeText={setEditText}
                        multi={true}
                    />

                    <Text style={styles.validEntry}>{validEntry}</Text>

                    <SubmitButton 
                        containerStyle={styles.saveButton} 
                        title={'Save Changes'}
                        onPress={() => {
                            if (editText) {
                                props.onUpdate(editText, props.entryKey, props.title);
                                setValidEntry('');
                                setEditVisible(false);
                            } else {
                                setValidEntry('Cannot be empty');
                            }
                        }}
                    />
                </View>
            </Modal>

*/