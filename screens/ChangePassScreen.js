import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, Text } from 'react-native';

import InfoInput from '../components/InfoInput';
import SubmitButton from '../components/SubmitButton';
import SpinnerModal from '../components/SpinnerModal';
import PostReq from '../contexts/PostReq';
import * as Styles from '../styles/master';

export default ({navigation}) => {    
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseText, setResponseText] = useState('');

    const changePass = (oldPass, newPass, confirmPass) => {
        if (newPass !== confirmPass) {
            setResponseText('New passwords do not match');
        } else {
            PostReq(global.endpoint + 'changepass', {oldPassword:oldPass, newPassword:newPass}, setIsLoading, setResponseText, ()=>{navigation.pop();})
        }
    }    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.changeContainer}>
                <SpinnerModal visible={isLoading}/> 
                <InfoInput secure={true} autoCapitalize={'none'} field={'Old Password'} value={oldPass} onChangeText={setOldPass}/>
                <InfoInput secure={true} autoCapitalize={'none'} field={'New Password'} value={newPass} onChangeText={setNewPass}/>
                <InfoInput secure={true} autoCapitalize={'none'} field={'Repeat new password'} value={confirmPass} onChangeText={setConfirmPass}/>
                <Text style={styles.responseText}>{responseText}</Text>
                <SubmitButton containerStyle={styles.largerButton} title='Change Password' onPress={()=>{changePass(oldPass, newPass, confirmPass);}}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    changeContainer : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    responseText: {
        ...Styles.redText,
    },
    largerButton : {
        width: '70%',
    }
});