import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';
import * as Location from 'expo-location';
import * as Styles from '../styles/master';
import { AsyncStorage } from 'react-native';

import { PassInfoContext } from '../contexts/PassInfoContext';
import PassListScreen from '../screens/PassListScreen';
import PingButton from '../components/PingButton';

const PassStack = createStackNavigator();

async function ping(setPasses, setResponseText) {
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

export default ({ navigation }) => {
  const[passes, setPasses] = useState([]);
  const[responseText, setResponseText] = useState('Ping to find passes');
  
  return (
    <PassInfoContext.Provider value={{passes: passes, responseText: responseText}}>
      <PassStack.Navigator>
        <PassStack.Screen 
          name='PassListScreen' 
          component={PassListScreen} 
          options={{
            title:'Street Passes',  
            headerStyle: {
              ...Styles.backgroundColor,
            },
            headerTitleStyle : {
              ...Styles.fontFamily,
            },
            headerTintColor : 'black',
            headerLeft: () => (<Enticons style={{marginLeft : 10}} name={'menu'} size={30} onPress={() => {navigation.openDrawer()}}/>),
            headerRight: () => (<PingButton onPress={() => { ping(setPasses, setResponseText); }}/>),
          }} 
        />
      </PassStack.Navigator>
    </PassInfoContext.Provider>
  )
}

