import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';

import * as Styles from '../styles/master';
import FullModal from './FullModal';
import SmallModal from './SmallModal';

// Displays an individual entry for the client and allows it to edit
// Required props: onUpdate, title, text, onDelete, entryKey
const EditEntry = props => {
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    return (
        <View style={styles.entryContainer}>
            <SmallModal 
                visible={deleteVisible}
                title={'Are you sure?'}
                text={'Once deleted, this entry will be gone forever'}
                isPrompt={true}
                okCallback={() => {
                    setDeleteVisible(false);
                    props.onDelete(props.entryKey);
                }}
                noCallback={() => {setDeleteVisible(false);}}
            />
  
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
            />

            <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{props.title}</Text>
                <View style={styles.iconContainer}> 
                    <Enticons 
                        name={'trash'} 
                        size={20} 
                        color={'black'} 
                        onPress={()=>{setDeleteVisible(true);}}
                    />
                    
                    <Enticons 
                        name={'pencil'}
                        size={20} 
                        color={'black'}
                        onPress={()=>{setEditVisible(true);}} 
                    />
                </View>
            </View>
           
            <Text style={styles.entryText}>{props.text}</Text>     
        </View>
    );
}

const styles = StyleSheet.create({
    entryContainer : {
        ...Styles.entryContainer,
    }, 
    entryHeader : {
        ...Styles.entryTitleBottomMargin,
        flexDirection: 'row',
        width: '100%',  
        justifyContent: 'space-between',
    },
    iconContainer: {
        flexDirection: 'row', 
        width: 65, 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    entryTitle : {
        ...Styles.fontFamily,
        ...Styles.entryTitle,
        width: '65%',
    },
    entryText : {
        ...Styles.fontFamily,
    }, 
})

export default EditEntry;