import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text} from 'react-native';
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
  const[noPass, setNoPass] = useState('Ping to get passes');

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
      setIsLoading(true);
      // Clear 'Empty list' statement
      setNoPass('');

      try {
        let {coords} = await Location.getCurrentPositionAsync({});
        let locationArray = (await Location.reverseGeocodeAsync(coords))[0];
        let address = locationArray.street + ', ' + locationArray.region + ', ' +
          locationArray.postalCode + ', ' + locationArray.isoCountryCode;

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
            setIsLoading(false);

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
                    setNoPass('Ping to get passes');
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
              setIsLoading(false);
              showResponse('Error', error);
          });
        }).catch((error) => {
          // Get userinfo storage error
          setIsLoading(false);
          showResponse('Error', error);
        });
      } catch (error) {
        // Get position error
        setIsLoading(false);
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
              title={passEntry.item.username} 
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