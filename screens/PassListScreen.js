import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';

import PassEntry from '../components/PassEntry';
import PingButton from '../components/PingButton';
import * as Styles from '../styles/master';

export default ({ navigation }) => {
  const[passes, setPasses] = useState([]);
  const[responseText, setResponseText] = useState('Ping to find passes');

  // Ping functiom
  async function ping() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setResponseText('Needs permission to ping for passes');
    } else {
      setPasses([]);
      try {
        let {coords} = await Location.getCurrentPositionAsync({});
        
        AsyncStorage.getItem('userInfo').then((user) => {
          let auth = 'Bearer ' + JSON.parse(user).token;
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
                  if(json.msg.length > 0){
                    setPasses(json.msg);
                  } else {
                    setResponseText('No passes found near you\nTry again later');
                  }
                }
              });
            } else {
              // Not JSON, most likely server error
              setResponseText('Unexpected error occured');
            }
          }).catch((error) => {
              // fetch error
              setResponseText(error);
          });
        }).catch((error) => {
          // Get userinfo storage error
          setResponseText(error);
        });
      } catch (error) {
        // Get position error
        setResponseText('' + error);
      }
    } 
  };

  // Ping button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<PingButton onPress={() => {ping();}}/>),
    });
  }, [navigation]);

  // Display Passes
  if (passes.length > 0) {
    return (
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
    )
  } else {  // Either no passes or error
    return (
      <View style={styles.responseContainer}>
        <Text style={styles.responseText}>{responseText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer : {
    alignSelf : "center",
    width: '80%'
  }, responseContainer : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, responseText : {
    ...Styles.fontFamily,
    textAlign: 'center',
    fontSize : 11,
  },
});