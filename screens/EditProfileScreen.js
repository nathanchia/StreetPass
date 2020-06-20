import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, AsyncStorage, Text } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';
import * as SecureStore from 'expo-secure-store';

import EditEntry from '../components/EditEntry';
import SpinnerModal from '../components/SpinnerModal';
import FullModal from '../components/FullModal';
import SmallModal from '../components/SmallModal';
import * as Styles from '../styles/master';

export default ({navigation}) => {
  const [passEntries, setPassEntries] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sets error modal to visible and assigns error msg
  const reportError = (error) => {
    setErrorMsg('' + error);
    setErrorVisible(true);
  }

  // Loads user information from server when first mounted
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Enticons 
        style={{marginRight : 10}} 
        name={'plus'} 
        size={30} 
        onPress={() => {setCreateVisible(true)}}
      />),
    });

    AsyncStorage.getItem('entries').then((entries) => {
        let entriesArray = JSON.parse(entries);
        setPassEntries(entriesArray);
    });
  }, []);

  // Skeleton code for post requests to server
  // callbackFunction is called when POST request is successful
  // ^ usually used to update current state visually
  const postRequest = (url, body, callbackFunc) => {
    setIsLoading(true);

    SecureStore.getItemAsync('user').then((user) => {
      let token = JSON.parse(user).token;
      let auth = 'Bearer ' + token;
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth,
        },
        body: JSON.stringify(body)
      }).then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          callbackFunc();
        } else {
          reportError('Server error');
        }
      }).catch((error) => {
        // Fetch Error
        setIsLoading(false);
        reportError(''+ error);
      });
    });
  };

  // Entries are in the form {key: newKey ,title: newTitle, text: newValue}
  const newEntry = (newTitle, newValue) => {
    let newKey = new Date().getTime() + newTitle;
    let newEntries = [...passEntries, {key: newKey ,title: newTitle, text: newValue}];

    postRequest('https://nkchia.pythonanywhere.com/updateentries', {newEntries: JSON.stringify(newEntries)}, () => {
      setPassEntries(newEntries);
    })
  };

  const updateEntry = (newTitle, newText, targetKey) => {
    let index = passEntries.findIndex(entry => entry.key === targetKey);
    let newEntries =  [
      ...passEntries.slice(0, index),
      {key: targetKey, title: newTitle, text: newText},
      ...passEntries.slice(index + 1)
    ];

    postRequest('https://nkchia.pythonanywhere.com/updateentries', {newEntries: JSON.stringify(newEntries)}, () => {
      setPassEntries(newEntries);
    })
  };

  const removeEntry = (targetKey) => {
    let newEntries = passEntries.filter((entry) => entry.key !== targetKey);
    postRequest('https://nkchia.pythonanywhere.com/updateentries', {newEntries: JSON.stringify(newEntries)}, () => {
      setPassEntries(newEntries);
    })
  };

  let entryComponent;
  if (passEntries.length > 0) {
    entryComponent =
      <ScrollView>
        {passEntries.map((entry) => 
          <EditEntry 
            onDelete={removeEntry} 
            onUpdate={updateEntry}
            title={entry.title} 
            text={entry.text} 
            key={entry.key}
            entryKey={entry.key}
          />
        )}
      </ScrollView>;
  } else {
    entryComponent = 
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{'Empty post'}</Text>
      </View>;
  }

  return (
    <View style={styles.editContainer} >
      <SpinnerModal visible={isLoading}/>
      <FullModal 
        visible={createVisible} 
        setModalVisible={setCreateVisible} 
        headerTitle={'Create New Entry'}
        submitFunction={newEntry} 
      />

      <SmallModal
        visible={errorVisible}
        title={'Error'}
        text={errorMsg}
        okCallback={()=> {
          setErrorVisible(false);
        }}
      />

      {entryComponent}
     
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer : {
    height: '100%',
  }, 
  emptyContainer: {
    flex: 1,
    justifyContent:'center',
  },  
  emptyText: {
    ...Styles.fontFamily,
    alignSelf: 'center',
  }
});
