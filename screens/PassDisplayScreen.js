import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import DisplayEntry from '../components/DisplayEntry';
import * as Styles from '../styles/master';
import SpinnerModal from '../components/SpinnerModal';

export default ({ route }) => {
  const[entries, setEntries] = useState([]);
  const[responseMsg, setResponseMsg] = useState('');
  const[isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

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
                if (isActive) {
                  if (entriesArray.length <= 0) {
                    setResponseMsg('This user has nothing to say');
                  }
                  setEntries(entriesArray);
                  setIsLoading(false);
                }
              }
            });
          } else {
            if (isActive) {
              setResponseMsg('Unexpected error occured');
            }
          }
        }).catch((error) => {
          // Fetch Error
          if (isActive) {
            setIsLoading(false);
            setResponseMsg(''+ error);
          }
        });
      }).catch((error) => {
        // SecureStorage error
        if (isActive) {
          setIsLoading(false);
          setResponseMsg(''+ error);
        }
      });

      return () => {
        isActive = false;
      };
    })
  )
  
  let display;
  if (entries.length <= 0) {
    display =
      <View style={styles.noEntryContainer}>
        <Text style={styles.noEntry}>{responseMsg}</Text>
      </View>;
  } else {
    display = 
      <ScrollView >
        {entries.map((entry) => <DisplayEntry key={entry.key} title={entry.title} text={entry.text}/>)}
      </ScrollView>;
  }

  return (
    <View style={styles.displayContainer}>
      <SpinnerModal visible={isLoading} />
      {display}
    </View>
  )
}

const styles = StyleSheet.create({
  displayContainer: {
    flex: 1,
  }, 
  noEntryContainer: {
    height: '100%',
    justifyContent: 'center', 
  },
  noEntry: {
    ...Styles.fontFamily,
    alignSelf: 'center',
    fontSize: 15,
  }
});
