import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

import PassEntry from '../components/PassEntry';
import PingButton from '../components/PingButton';
import SmallModal from '../components/smallModal';

export default ({ navigation }) => {
  const[passes, setPasses] = useState([]);
  const[responseVisible, setResponseVisible] = useState(false);
  const[responseTitle, setResponseTitle] = useState('');
  const[responseText, setResponseText] = useState('');

  const showResponse = (title, text) => {
    setResponseTitle(title);
    setResponseText('' + text);
    setResponseVisible(true);
  }

  // Ping function
  async function ping() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setResponseText('Needs permission to ping for passes');
    } else {
      setPasses([]);
      try {
        let {coords} = await Location.getCurrentPositionAsync({});
        /*
        Location.reverseGeocodeAsync(coords).then((geocode) => {
          console.log(geocode);
        });
        */
        SecureStore.getItemAsync('token').then((token) => {
          let auth = 'Bearer ' + token;
          fetch('http://10.0.2.2:5000/ping', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: auth,
            },
            body: JSON.stringify({
              latitude: coords.latitude,
              longitude: coords.longitude,
            })
          }).then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json().then(json => {
                if (response.status === 200) {
                  let numPasses = json.passes.length;
                  if (numPasses > 0) {
                    if (numPasses > 1) {
                      showResponse('Found ' + json,passes.length + ' passes!', 'Congrats');
                    } else {
                      showResponse('Found 1 pass!', 'Congrats');
                    }
                    setPasses(json.passes);
                  } else {
                    showResponse('Found 0 passes', 'No one\'s near you.\nTry again later');
                  }
                }
              });
            } else {
              // Not JSON, most likely server error
              showResponse('Error', 'Unexpected error occured');
            }
          }).catch((error) => {
              // fetch error
              showResponse('Error', error);
          });
        }).catch((error) => {
          // Get userinfo storage error
          showResponse('Error', error);
        });
      } catch (error) {
        // Get position error
        showResponse('Error', error);
      }
    } 
  };

  // Ping button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<PingButton onPress={() => {ping();}}/>),
    });
  }, [navigation]);

  
  return (
    <View>
      <SmallModal 
        visible={responseVisible}
        title={responseTitle}
        text={responseText}
        okCallback={()=>{
          setResponseVisible(false);
        }}
      />
      
      <FlatList 
        contentContainerStyle={styles.listContainer}
        data={passes} 
        renderItem={passInfo => 
          <PassEntry 
            title={passInfo.item.username} 
            distance={passInfo.item.distance}
            onPress={()=>{navigation.navigate('PassDisplayScreen', {passInfo: passInfo.item})}}
          />
        } 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer : {
    alignSelf : "center",
    width: '80%', 
    marginTop: '3%',
  },
});