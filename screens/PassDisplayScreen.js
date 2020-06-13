import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import DisplayEntry from '../components/DisplayEntry';
import * as Styles from '../styles/master';

export default ({ route }) => {
  const[entries, setEntries] = useState([]);
  const[responseMsg, setResponseMsg] = useState('');

  useFocusEffect(() => {
      let targetId = route.params.passEntry.key;
      SecureStore.getItemAsync('user').then((user) => {
        let json = JSON.parse(user);
        let url = 'https://nkchia.pythonanywhere.com/getpass?userid=' + targetId;
        let auth = 'Bearer ' + json.token;
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
                let entriesArray = JSON.parse(json.entries);
                if (entriesArray.length <= 0) {
                  setResponseMsg('This user has nothing to say');
                } 
                setEntries(entriesArray);
              }
            });
          } else {
            setResponseMsg('Unexpected error occured');
          }
        }).catch((error) => {
          // Fetch Error
          setResponseMsg(''+ error);
        });
      }).catch((error) => {
        // SecureStorage error
        setResponseMsg('' + error);
      });
    }
  )
  
  return (
    <View style={styles.displayContainer}>
      {
        entries.length <= 0 &&
        <Text style={styles.noEntry}>{responseMsg}</Text>
      }
      {entries.map((entry) => <DisplayEntry title={entry.title} text={entry.text}/>)}
    </View>
  )
}

const styles = StyleSheet.create({
  displayContainer: {
    paddingTop: '5%',
  }, 
  noEntry: {
    ...Styles.fontFamily,
    alignSelf: 'center',
    fontSize: 15,
    marginTop: '55%',
  }
});
