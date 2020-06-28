import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, Text } from 'react-native';

import InfoInput from '../components/InfoInput';
import SubmitButton from '../components/SubmitButton';
import SpinnerModal from '../components/SpinnerModal';
import * as Styles from '../styles/master';

export default ({navigation}) => {
    const [email, setEmail] = useState('');
    const [responseText, setResponseText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = (email) => {
        // Validate email
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let lowerEmail = String(email).toLowerCase();
        if (re.test(lowerEmail)) {
            setIsLoading(true);

            fetch(global.endpoint + 'forgot', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {email : lowerEmail}
                )
            }).then((response) => {
                setIsLoading(false);
                if (response.status === 200) {
                    navigation.replace('ReturnSignInScreen',  {result: 'Reset password email has been sent to\n' + email});
                } else if (response.status === 404) {
                    response.json().then(json=> {
                        setResponseText(json.msg);
                    });
                } else {
                    setResponseText('Server error');
                }
            }).catch((error) => {
                // Fetch Error
                setIsLoading(false);
                setResponseText(''+ error);
            });
        } else {
            setResponseText('Invalid email');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.forgotContainer}>
                <SpinnerModal visible={isLoading} />
                <InfoInput autoCapitalize={'none'} field={'Account Email'} value={email} onChangeText={setEmail}/>
                <Text style={styles.responseText}>{responseText}</Text>
                <SubmitButton containerStyle={styles.largerButton} title='Send email' onPress={()=>{sendEmail(email);}}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    forgotContainer : {
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