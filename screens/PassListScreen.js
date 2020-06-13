import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

import PassEntry from '../components/PassEntry';
import PingButton from '../components/PingButton';
import SmallModal from '../components/SmallModal';
import * as Styles from '../styles/master';

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
      try {
        let {coords} = await Location.getCurrentPositionAsync({});
        let locationArray = (await Location.reverseGeocodeAsync(coords))[0];
        let address = locationArray.street + ',\n' + locationArray.region + ', \n' +
          locationArray.postalCode + ', \n' + locationArray.isoCountryCode;

        SecureStore.getItemAsync('user').then((user) => {
          let json = JSON.parse(user);
          let auth = 'Bearer ' + json.token;
          fetch('https://nkchia.pythonanywhere.com/ping', {
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
                      showResponse('Found ' + json.passes.length + ' passes!', address);
                    } else {
                      showResponse('Found 1 pass!', address);
                    }
                    setPasses(json.passes);
                  } else {
                    showResponse('Found 0 passes', 'No one\'s near you.\nTry again later');
                    setPasses([]);
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
      
      {
        passes.length > 0
        ? 
        <FlatList 
          contentContainerStyle={styles.listContainer}
          data={passes} 
          renderItem={passEntry => 
            <PassEntry 
              title={passEntry.item.username} 
              distance={passEntry.item.distance}
              onPress={()=>{navigation.navigate('PassDisplayScreen', {passEntry: passEntry.item})}}
            />
          } 
        />
        : 
        <Text style={styles.noPass}>{'Ping to get passes'}</Text> 
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer : {
    alignSelf : "center",
    width: '80%', 
    marginTop: '3%',
  },
  noPass : {
    ...Styles.fontFamily,
    marginTop:'60%',
    alignSelf: 'center',
  }
});