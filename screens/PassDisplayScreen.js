import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Enticons from 'react-native-vector-icons/Entypo';

import DisplayEntry from '../components/DisplayEntry';
import * as Styles from '../styles/master';
import SpinnerModal from '../components/SpinnerModal';
import SmallModal from '../components/SmallModal';

export default ({ route, navigation }) => {
  const[entries, setEntries] = useState([]);
  const[responseMsg, setResponseMsg] = useState('');
  const[isLoading, setIsLoading] = useState(true);
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
              SecureStore.getItemAsync('favorites').then((favorites)=>{
                let favArray = JSON.parse(favorites);
                favArray.push({key: route.params.passEntry.key, displayName: route.params.passEntry.displayName});
                let strFav = JSON.stringify(favArray);
                favHandler(strFav, true);
              }).catch(error=> {
                setOkTitle('Error');
                setOkText(error);
                setShowOk(true);
              })
            }}
          />
        ),
      })
    }
  }

  // On navigate, get the entries of the pass and whether pass is already favorited or not
  useEffect(()=> {
    SecureStore.getItemAsync('user').then((user) => {
      let targetId = route.params.passEntry.key;
      let url = 'https://nkchia.pythonanywhere.com/getpass?userid=' + targetId;

      let token = JSON.parse(user).token;
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
              setIsLoading(false);

              setHeader(json.isFav);

              let entriesArray = JSON.parse(json.entries);
              if (entriesArray.length <= 0) {
                setResponseMsg('This user has nothing to say');
              }
              setEntries(entriesArray);
            }
          });
        } else {
            setIsLoading(false);
            setResponseMsg('Server error');
        }
      }).catch((error) => {
        // Fetch Error
          setIsLoading(false);
          setResponseMsg(''+ error);
      });
    }).catch((error) => {
      // SecureStorage error

    });
  },[])
      
  // Fav/Unfav function that takes STRING of an array of favorite entries
  // in the form '[{key: 1, displayName: 'test'}]
  // isNoWFav is a boolean. If true, displays smallModal after successful POST
  // and also changes header fill based on it
  const favHandler = (newFav, isNowFav) => {
    SecureStore.getItemAsync('user').then((user) => {
      let token = JSON.parse(user).token;
      let auth = 'Bearer ' + token;
      fetch('https://nkchia.pythonanywhere.com/updatefav', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth,
        },
        body: JSON.stringify({
          newFav:newFav
        })
      }).then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(json => {
            if (response.status === 200) {
              if (isNowFav) {
                setOkTitle('Success');
                setOkText('You have added this user to your favorites');
                setShowOk(true);
              }
              setHeader(isNowFav);
              SecureStore.setItemAsync('favorites', newFav).catch(error=> {
                //Set Storage error
                setOkTitle('Error');
                setOkText(error);
                setShowOk(true);
              });
            }
          });
        } else {
          // Not JSON, most likely server error
          setOkTitle('Error');
          setOkText('Server Error');
          setShowOk(true);
        }
      }).catch((error) => {
          // fetch error
          setOkTitle('Error');
          setOkText(error);
          setShowOk(true);
      });
    }).catch((error) => {
      // Get storage error
      setOkTitle('Error');
      setOkText(error);
      setShowOk(true);
    });
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
        text={'You may not see this pass again'}
        okCallback={()=>{
          setShowPrompt(false);

          SecureStore.getItemAsync('favorites').then((favorites)=>{
            let rmKey = route.params.passEntry.key;
            let favArray = JSON.parse(favorites);
            let newArray = favArray.filter(function(entry) {
              return entry.key !== rmKey;
            });
            let strFav = JSON.stringify(newArray);
            favHandler(strFav, false);
          }).catch(error=> {
            setOkTitle('Error');
            setOkText(error);
            setShowOk(true);
          })
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
