import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Slider, Text, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AsyncStorage } from 'react-native';
import { Dimensions } from "react-native";
import * as SecureStore from 'expo-secure-store';

import SubmitButton from '../components/SubmitButton';
import SmallModal from '../components/SmallModal';
import InfoInput from '../components/InfoInput';
import SpinnerModal from '../components/SpinnerModal';
import * as Styles from '../styles/master';
import PostReq from '../contexts/PostReq';

export default SettingsScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [sliderVal, setSliderVal] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalText, setModalText] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const screenHeight = Math.round(Dimensions.get('window').height);

    // Load settings saved
    useEffect(() => {
        const loadSettings = navigation.addListener('focus', () => {
            SecureStore.getItemAsync('user').then(user=> {
                let displayName = JSON.parse(user).displayName;
                setDisplayName(displayName);
            })

            AsyncStorage.getItem('settings').then(settings => {
                if (settings != 'none') {
                    setSliderVal(parseInt(settings));
                    setIsEnabled(false);
                } else {
                    setIsEnabled(true);
                }
            });
        });
        return loadSettings;
    }, [navigation])

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    }
  
    const reportError = (error) => {
        setModalTitle('Error');
        setModalText('' + error);
        setShowModal(true);
    }

    async function submitChanges() {
        // Local settings for max distance
        if (isEnabled) {
            await AsyncStorage.setItem('settings', 'none');
        } else {
            await AsyncStorage.setItem('settings', sliderVal.toString());
        }
        
        let user = await SecureStore.getItemAsync('user');
        let json = JSON.parse(user);
        let oldDisplayName = json.displayName;
        // User has a new display name, post to server
        if (oldDisplayName != displayName) {
            PostReq(
                'https://nkchia.pythonanywhere.com/changename',
                {newName: displayName},
                setIsLoading,
                reportError,
                () => {
                    json.displayName = displayName;
                    SecureStore.setItemAsync('user', JSON.stringify(json));
                    setModalTitle('Success');
                    setModalText('Settings have been saved');
                    setShowModal(true);
                }
            );
        } else {
            setModalTitle('Success');
            setModalText('Settings have been saved');
            setShowModal(true);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{...styles.settingsContainer, height: screenHeight}}>
                <SpinnerModal visible={isLoading} />

                <SmallModal 
                    visible={showModal} 
                    title={modalTitle} 
                    text={modalText} 
                    okCallback={()=> {setShowModal(false);}}
                />

                <InfoInput
                    value={displayName}
                    onChangeText={setDisplayName}
                    maxLength={18}
                    field={'Change your display name'}   
                    containerStyle={{width:'100%', marginBottom: 70}} 
                />

                <View style={{...styles.header, marginBottom: 25}}>
                    <Text style={styles.title}>{'No distance filter'}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#FF9F2E' }}
                        thumbColor={isEnabled ? 'white' : 'white'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            
                {
                    !isEnabled &&
                    <View>
                        <View style={{...styles.header, marginBottom: 15}}>
                            <Text style={styles.title}>Maximum Distance</Text>
                            <Text style={styles.title}>{sliderVal + ' mi'}</Text>
                        </View>
                    
                        <Slider
                            style={styles.slider}
                            minimumValue={1}
                            maximumValue={10}
                            minimumTrackTintColor="black"
                            maximumTractTintColor="black"
                            value={sliderVal}
                            step={1}
                            onValueChange={value => setSliderVal(value)}
                        />
                    </View>       
                } 

                <SubmitButton 
                    containerStyle={styles.button} 
                    onPress={submitChanges} 
                    title={'Save Changes'}
                />  
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    settingsContainer: {
        padding: '10%',
    },  
    title: {
        ...Styles.fontFamily,
        fontSize: 17,
    },
    header: {
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    slider: {
        width: '100%',
        alignSelf: 'center',
    }, 
    button: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 130,
        width: '70%',
    }
});
