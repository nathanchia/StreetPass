import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';
import * as SecureStore from 'expo-secure-store';

import EditEntry from '../components/EditEntry';
import FullModal from '../components/FullModal';

export default ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [passEntries, setPassEntries] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);

  // Loads user information from server when first mounted
  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      let url = 'http://10.0.2.2:5000/getpass?userid=self'
      let auth = 'Bearer ' + token;
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: auth,
        }
      }).then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(json => {
            if (response.status === 200) {
              setDisplayName(json.displayName);
              let entriesArray = JSON.parse(json.entries);
              setPassEntries(entriesArray);
            }
          });
        } else {
          setDisplayName('Unexpected error occured');
        }
      }).catch((error) => {
        // Fetch Error
        setDisplayName(''+ error);
      });
    }).catch((error) => {
      // SecureStorage error
      setDisplayName('' + error);
    });
  }, []);

  // Displays modal
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Enticons 
        style={{marginRight : 10}} 
        name={'plus'} 
        size={30} 
        onPress={() => {setCreateVisible(true)}}
      />),
    });
  }, [navigation]);

  const updateDisplayName = (newDisplayName) => {
    setDisplayName(newDisplayName);
  }

  const newEntry = (newTitle, newValue) => {
    let newKey = new Date().getTime() + newTitle;
    setPassEntries(currentEntries => [...currentEntries, {key: newKey ,title: newTitle, text: newValue}]);
  }

  const updateEntry = (newTitle, newText, targetKey) => {
    let index = passEntries.findIndex(entry => entry.key === targetKey);
    setPassEntries(currentEntries => [
        ...currentEntries.slice(0, index),
        {key: targetKey, title: newTitle, text: newText},
        ...currentEntries.slice(index + 1)
    ]);
  };

  const removeEntry = (targetKey) => {
    setPassEntries(currentEntries => currentEntries.filter((entry) => entry.key !== targetKey));
  };

  return (
    <View style={styles.editContainer} >
      <FullModal 
        visible={createVisible} 
        setModalVisible={setCreateVisible} 
        headerTitle={'Create New Entry'}
        submitFunction={newEntry} 
      />

      <ScrollView>
        <EditEntry partial={true} onUpdate={updateDisplayName} title={'Display name'} text={displayName}/>
        {passEntries.map((entry) => 
          <EditEntry 
            deletable={true} 
            onDelete={removeEntry} 
            onUpdate={updateEntry}
            title={entry.title} 
            text={entry.text} 
            entryKey={entry.key}
          />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer : {
    paddingTop : '5%',
    height: '100%',
  }, 
});