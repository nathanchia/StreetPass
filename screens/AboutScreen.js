import React from 'react';
import { StyleSheet, ScrollView, Linking, Text } from 'react-native';

import DisplayEntry from '../components/DisplayEntry';
import * as Styles from '../styles/master';

export default () => {
  return (
    <ScrollView >
        <DisplayEntry 
            title={'How to use GeoPost'} 
            text={
                '1. Press the \"ping\" button on the home screen.\n' +
                '2. Posts within the proximity of the user are retrieved and displayed.\n' +
                '3. The user may then view these posts, and if so chooses, favorite them to be saved for the future.\n' +
                '4. At the same time, the user\'s own post is registered at the current location so other users may find it.\n'
            }
        />

        <Text style={styles.lineBreak} >{'---------------------------'}</Text>

        <DisplayEntry 
            title={'Developer Info'} 
            text={
                'Hi! Thank you for using this app, my name is Nathan. I made this app as a small project ' +
                'when I was studying Computer Science at the University of Washington. ' +
                'The frontend was developed using React Native, and all the backend, ' +
                'including the account authentication and the location service, were developed ' +
                'from scratch using Python and Flask. The database is managed using SQLAlchemy.' 
            }
        />

        <DisplayEntry 
            title={'Contact me'} 
            text={'Feel free to contact me through these links:'}
            
        />

        <Text 
            style={styles.links} 
            onPress={() => Linking.openURL('https://www.linkedin.com/in/nkchia/')}>
                https://www.linkedin.com/in/nkchia/
        </Text>

        <Text 
            style={{...styles.links, marginBottom: 40}} 
            onPress={() => Linking.openURL('mailto:nathan.nkc98@gmail.com')}>
                nathan.nkc98@gmail.com
        </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    lineBreak: {
        marginTop: 30,
        alignSelf:'center',
        marginBottom: 10,
    },
    links: {
        ...Styles.fontFamily,
        color: 'blue', 
        alignSelf:'center', 
        marginTop: 15,
        textDecorationLine:'underline',
    }
});