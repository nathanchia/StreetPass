import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Modal, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { AsyncStorage } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';
import {Dimensions } from "react-native";

import EditEntry from '../components/EditEntry';
import InfoInput from '../components/InfoInput';
import SubmitButton from '../components/SubmitButton';
import * as Styles from '../styles/master';

export default ({navigation}) => {
  const screenHeight = Math.round(Dimensions.get('window').height);

  const [displayName, setDisplayName] = useState('');
  const [passEntries, setPassEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newValue , setNewValue] = useState('');

  // Returns true when first navigated to this screen
  const isFocused = useIsFocused();

  // Loads user information when first navigated
  useEffect(() => {
    AsyncStorage.getItem('userInfo').then((user) => {
      let data = JSON.parse(user);
      setDisplayName(data.displayName);   
    });
  }, [isFocused]);

  // Displays modal
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Enticons 
        style={{marginRight : 10}} 
        name={'plus'} 
        size={30} 
        onPress={() => {setModalVisible(true)}}
      />),
    });
  }, [navigation]);

  return (
    <View style={styles.editContainer} >
      <Modal animationType={'slide'} visible={modalVisible} >
        <View style= {{...styles.modalContainer, height: screenHeight}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{'New Entry'}</Text>
            <Enticons name={'cross'} size={30} onPress={() => {
              setNewValue('');
              setNewTitle('');
              setModalVisible(false);
            }} />
          </View>
          
          <InfoInput 
            containerStyle={{width: '100%'}} 
            field={'Title'}  
            value={newTitle}
            onChangeText={setNewTitle} 
          />

          <InfoInput 
            containerStyle={{width: '100%'}} 
            field={'Text'} 
            value={newValue} 
            onChangeText={setNewValue}
            multi={true}
          />

          <SubmitButton 
            containerStyle={styles.saveButton} 
            title={'Save Changes'}
            onPress={() => {
              let newKey = new Date().getTime() + newTitle;
              setPassEntries(currentEntries => [...currentEntries, 
                {key: newKey ,title: newTitle, text: newValue}
              ]);
              setNewTitle('');
              setNewValue('');
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
      
      <ScrollView>
        <EditEntry title={'Display name'} text={displayName}/>
        {passEntries.map((entry) => <EditEntry deletable={true} title={entry.title} text={entry.text} />)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer : {
    paddingTop : '5%',
    height: '100%',
  }, 
  modalContainer : {
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingTop: '10%'
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
  saveButton : {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 70
  }
});