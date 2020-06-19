import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, AsyncStorage} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

import PassEntry from '../components/PassEntry';
import PingButton from '../components/PingButton';
import SmallModal from '../components/SmallModal';
import * as Styles from '../styles/master';
import SpinnerModal from '../components/SpinnerModal';

export default ({ navigation }) => {
  const[passes, setPasses] = useState([]);
  const[responseVisible, setResponseVisible] = useState(false);
  const[responseTitle, setResponseTitle] = useState('');
  const[responseText, setResponseText] = useState('');
  const[isLoading, setIsLoading] = useState(false);
  const[noPass, setNoPass] = useState('Ping to find posts');

  // Shows small modal, used to relay errors/show #of passes and address
  const showResponse = (title, text) => {
    setResponseTitle(title);
    setResponseText('' + text);
    setResponseVisible(true);
  }

  // Ping function
  async function ping() {
    let { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      // Clear 'Empty list' statement
      setNoPass('');

      setIsLoading(true);
  
      try {
        // Based on user settings
        let maxDistance = await AsyncStorage.getItem('settings');
        let {coords} = await Location.getCurrentPositionAsync({});
        let locationArray = (await Location.reverseGeocodeAsync(coords))[0];
        let address = '';
        // Make sure all parts are not null
        if (locationArray.street) {
          address += (locationArray.street + ', ');
        } 
        if (locationArray.region) {
          address += (locationArray.region + ', ');
        }
        if (locationArray.postalCode) {
          address += (locationArray.postalCode + ', ');
        }
        if (locationArray.isoCountryCode) {
          address += locationArray.isoCountryCode;
        }

        SecureStore.getItemAsync('user').then((user) => {
          let token = JSON.parse(user).token;
          let auth = 'Bearer ' + token;

          fetch('https://nkchia.pythonanywhere.com/ping', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: auth,
            },
            body: JSON.stringify({
              maxDistance: maxDistance,
              latitude: coords.latitude,
              longitude: coords.longitude,
            })
          }).then((response) => {
            setIsLoading(false);

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json().then(json => {
                if (response.status === 200) {
                  let numPasses = json.passes.length;
                  if (numPasses > 0) {
                    if (numPasses > 1) {
                      showResponse('Found ' + json.passes.length + ' posts at', address);
                    } else {
                      showResponse('Found 1 post at', address);
                    }
                    setPasses(json.passes);
                  } else {
                    showResponse('Found 0 posts at', address);
                    setNoPass('Ping to find posts');
                    setPasses([]);
                  }
                } else {
                  // Internal server error such as no token
                  setIsLoading(false);
                  showResponse('Error', json.msg);
                  setNoPass('Ping to find posts');
                }
              });
            } else {
              // Not JSON, most likely server error
              setIsLoading(false);
              showResponse('Error', 'Server error');
              setNoPass('Ping to find posts');
            }
          }).catch((error) => {
              // fetch error
              setIsLoading(false);
              showResponse('Error', error);
              setNoPass('Ping to find posts');
          });
        });
      } catch (error) {
        setIsLoading(false);
        showResponse('Error', error);
        setNoPass('Ping to find posts');
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
    <View style={styles.screenContainer}>
      <SmallModal 
        visible={responseVisible}
        title={responseTitle}
        text={responseText}
        okCallback={()=>{
          setResponseVisible(false);
        }}
      />
      
      <SpinnerModal visible={isLoading} />

      {
        passes.length > 0
        ? 
        <FlatList 
          contentContainerStyle={styles.listContainer}
          data={passes} 
          renderItem={passEntry => 
            <PassEntry 
              title={passEntry.item.displayName} 
              hasDistance={true}
              distance={passEntry.item.distance}
              key={passEntry.item.key}
              onPress={()=>{navigation.navigate('PassDisplayScreen', {passEntry: passEntry.item})}}
            />
          } 
        />
        : 
        <Text style={styles.noPass}>{noPass}</Text> 
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    justifyContent:'center'
  },
  listContainer : {
    alignSelf : "center",
    width: '80%', 
    marginTop: '3%',
  },
  noPass : {
    ...Styles.fontFamily,
    alignSelf: 'center',
  }
});