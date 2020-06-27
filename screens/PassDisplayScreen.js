import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Enticons from 'react-native-vector-icons/Entypo';

import DisplayEntry from '../components/DisplayEntry';
import * as Styles from '../styles/master';
import SpinnerModal from '../components/SpinnerModal';
import SmallModal from '../components/SmallModal';
import PostReq from '../contexts/PostReq';

export default ({ route, navigation }) => {
  const[entries, setEntries] = useState([]);

  // Used to display initial loading error, or empty pass
  const[responseMsg, setResponseMsg] = useState('');
  
  const[isLoading, setIsLoading] = useState(true);

  // Other responses here
  const[showOk, setShowOk] = useState(false);
  const[okTitle, setOkTitle] = useState('');
  const[okText, setOkText] = useState('');
  const[showPrompt, setShowPrompt] = useState(false);

  // Used to set fav (heart) button on top right corner
  // Accepts a boolean, true = already favorited, false if not
  const setHeader = (isFilled) => {
    // Favorited, so onPress prompts to unfavors it
    if (isFilled) {
      navigation.setOptions({
        headerRight: () => (
          <Enticons  
            style={{marginRight : 10}} 
            name={'heart'} 
            size={30} 
            onPress={()=>{setShowPrompt(true);}}
          /> 
        ),
      });
    } else {  // Not favorited so onPress auto favors it
      navigation.setOptions({
        headerRight: () => (
          <Enticons
            style={{marginRight : 10}} 
            name={'heart-outlined'} 
            size={30} 
            onPress={()=>{
              setIsLoading(true);
              AsyncStorage.getItem('favorites').then((favorites)=>{
                let favArray = JSON.parse(favorites);
                favArray.push({key: route.params.passEntry.key, displayName: route.params.passEntry.displayName});
                let strFav = JSON.stringify(favArray);
                favHandler(strFav, true);
              });
            }}
          />
        ),
      })
    }
  }

  // On navigate, GET the entries of the pass and whether pass is already favorited or not
  useEffect(()=> {
    let targetId = route.params.passEntry.key;
    let url = global.endpoint + 'getpass?userid=' + targetId;

    SecureStore.getItemAsync('user').then((user) => {
      let token = JSON.parse(user).token;
      let auth = 'Bearer ' + token;
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: auth,
        }
      }).then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          return response.json().then(json => {
            setHeader(json.isFav);

            let entriesArray = JSON.parse(json.entries);
            if (entriesArray.length <= 0) {
              setResponseMsg('This user has nothing to say');
            }

            setEntries(entriesArray);
          });
        } else {
          setResponseMsg('Server error');
        }
      }).catch((error) => {
        // Fetch Error
          setIsLoading(false);
          setResponseMsg(''+ error);
      });
    });
  },[])
      

  const reportError = (error) => {
    setOkTitle('Error');
    setOkText('' + error);
    setShowOk(true);
  }

  // Fav/Unfav function that takes STRING newFav in the form '[{key: 1, displayName: 'test'}]
  // isNowFav is a boolean. If true, displays smallModal after successful POST
  // Changes header after POST as well
  const favHandler = (newFav, isNowFav) => {
    PostReq(
      global.endpoint + 'updatefav',
      {newFav:newFav},
      setIsLoading,
      reportError,
      () => {
        setHeader(isNowFav);
        AsyncStorage.setItem('favorites', newFav);
      }
    );
  }

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

      <SmallModal 
        visible={showOk} 
        title={okTitle} 
        text={okText}
        okCallback={()=>{
          setShowOk(false);
        }}  
      />
      <SmallModal 
        visible={showPrompt} 
        title={'Are you sure?'} 
        text={'You may not see this card again'}
        okCallback={()=>{
          setShowPrompt(false);
          setIsLoading(true);
          AsyncStorage.getItem('favorites').then((favorites)=>{
            let rmKey = route.params.passEntry.key;
            let favArray = JSON.parse(favorites);
            let newArray = favArray.filter(function(entry) {
              return entry.key !== rmKey;
            });
            let strFav = JSON.stringify(newArray);
            favHandler(strFav, false);
          });
        }}
        isPrompt={true}
        noCallback={()=>{
          setShowPrompt(false);
        }}
      />

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
