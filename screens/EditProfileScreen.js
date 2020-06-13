import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';
import * as SecureStore from 'expo-secure-store';

import EditEntry from '../components/EditEntry';
import FullModal from '../components/FullModal';
import SmallModal from '../components/SmallModal';

export default ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [passEntries, setPassEntries] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sets error modal to visible and assigns error msg
  const reportError = (error) => {
    setErrorMsg('' + error);
    setErrorVisible(true);
  }

  // Loads user information from server when first mounted
  useEffect(() => {
    SecureStore.getItemAsync('user').then((user) => {
      let json = JSON.parse(user);
      setDisplayName(json.displayName);
      let entriesArray = JSON.parse(json.entries);
      setPassEntries(entriesArray);
    }).catch((error)=> {
      reportError('' + error);
    })
  }, []);

  // Displays create new entry modal
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

  // Skeleton code for post requests to server
  const postRequest = (url, body, callbackFunc) => {
    SecureStore.getItemAsync('user').then((user) => {
      let json = JSON.parse(user);
      let auth = 'Bearer ' + json.token;
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth,
        },
        body: JSON.stringify(body)
      }).then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(json => {
            if (response.status === 200) {
              callbackFunc();
            }
          });
        } else {
          reportError('Unexpected error occured');
        }
      }).catch((error) => {
        // Fetch Error
        reportError(''+ error);
      });
    }).catch((error) => {
      // SecureStorage error
      reportError('' + error);
    });
  };

  const updateDisplayName = (newDisplayName) => {
    postRequest('https://nkchia.pythonanywhere.com/changename', {newName: newDisplayName}, () => {
      setDisplayName(newDisplayName);
    })
  }

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

  return (
    <View style={styles.editContainer} >
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

      <ScrollView>
        <EditEntry key={'displayName'} partial={true} onUpdate={updateDisplayName} title={'Display name'} text={displayName}/>
        {passEntries.map((entry) => 
          <EditEntry 
            deletable={true} 
            onDelete={removeEntry} 
            onUpdate={updateEntry}
            title={entry.title} 
            text={entry.text} 
            key={entry.key}
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
