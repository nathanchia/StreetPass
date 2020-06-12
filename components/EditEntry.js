import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';

import * as Styles from '../styles/master';
import FullModal from './FullModal';
import SmallModal from './SmallModal';

// An entry in the edit screen, displays title and text, as well as provides delete and edit functionality
const EditEntry = props => {
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    let editModal;
    // Full modal with title and text fields
    if (!props.partial) {
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
                partial={true}
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
            <SmallModal 
                visible={deleteVisible}
                title={'Are you sure?'}
                text={'Once deleted, this entry will be gone forever'}
                isPrompt={true}
                okCallback={() => {
                    props.onDelete(props.entryKey);
                    setDeleteVisible(false);
                }}
                noCallback={() => {setDeleteVisible(false);}}
            />
  
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
})

export default EditEntry;