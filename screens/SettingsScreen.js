import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Slider, Text } from "react-native";
import { AsyncStorage } from 'react-native';

import SubmitButton from '../components/SubmitButton';
import SmallModal from '../components/SmallModal';
import * as Styles from '../styles/master';

export default SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sliderVal, setSliderVal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Load settings saved
  useEffect(() => {
    AsyncStorage.getItem('settings').then(settings => {
        if (settings != 'none') {
            setSliderVal(parseInt(settings));
        } else {
            setIsEnabled(true);
        }
    });
  }, [])

  const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
  }

  return (
    <View style={styles.settingsContainer}>
        <SmallModal visible={showModal} title={'Success'} text={'Settings have been saved'} okCallback={()=> {setShowModal(false);}}/>

        <View style={{...styles.header, marginBottom: 30}}>
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
            onPress={()=>{
                if (isEnabled) {
                    AsyncStorage.setItem('settings', 'none').then(() => {
                        setShowModal(true);
                    });
                } else {
                    AsyncStorage.setItem('settings', sliderVal.toString()).then(() => {
                        setShowModal(true);
                    });
                }
            }} 
            title={'Save Changes'}
        />  
    </View>
  );
}

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        padding: '5%',
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
        bottom: 70,
    }
});
