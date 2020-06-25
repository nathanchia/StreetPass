import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, AsyncStorage} from 'react-native';
import * as Location from 'expo-location';

import PassEntry from '../components/PassEntry';
import PingButton from '../components/PingButton';
import SmallModal from '../components/SmallModal';
import * as Styles from '../styles/master';
import SpinnerModal from '../components/SpinnerModal';
import PostReq from '../contexts/PostReq';

export default ({ navigation }) => {
  const[passes, setPasses] = useState([{key:1, displayName:'Ethan', distance:'1.8'}, {key:2, displayName:'Nathan Chia', distance:'4.7'}, {key:3, displayName:'Chloe', distance:'7.1'}, {key:4, displayName:'Sandals the cat', distance:'7.3'}]);
  const[responseVisible, setResponseVisible] = useState(false);
  const[responseTitle, setResponseTitle] = useState('');
  const[responseText, setResponseText] = useState('');
  const[isLoading, setIsLoading] = useState(false);
  const[noPass, setNoPass] = useState('Ping to find cards');

  // Shows small modal, used to relay errors/show #of passes and address
  const showResponse = (title, text) => {
    setResponseTitle(title);
    setResponseText('' + text);
    setResponseVisible(true);
  }

  const reportError = (error) => {
    showResponse('Error', error);
    setNoPass('Ping to find cards');
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

        PostReq(
          'https://nkchia.pythonanywhere.com/ping', 
          {maxDistance: maxDistance, latitude: coords.latitude, longitude: coords.longitude},
          setIsLoading,
          reportError,
          (response) => {
            return response.json().then(json => {
              let numPasses = json.passes.length;
              if (numPasses > 0) {
                if (numPasses > 1) {
                  showResponse('Found ' + json.passes.length + ' cards at', address);
                } else {
                  showResponse('Found 1 card at', address);
                }
                setPasses(json.passes);
              } else {
                showResponse('Found 0 cards at', address);
                setNoPass('Ping to find cards');
                setPasses([]);
              }
            });
          }
        );
      } catch (error) {
        setIsLoading(false);
        reportError(error);
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
    width: '85%', 
    marginTop: '3%',
  },
  noPass : {
    ...Styles.fontFamily,
    alignSelf: 'center',
  }
});