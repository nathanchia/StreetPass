import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';

import * as Styles from '../styles/master';

// An entry in the edit screen, displays title and text, as well as provides
// delete and edit functionality
const EditEntry = props => {
    return (
        <View style={styles.entryContainer}>
            <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{props.title}</Text>
                { props.deletable &&
                    <Enticons style={styles.entryHeaderIconLeft} name={'trash'} size={20} color={'black'} />
                }
                <Enticons style={styles.entryHeaderIconRight} name={'pencil'} size={20} color={'black'} />
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
    }
})

export default EditEntry;