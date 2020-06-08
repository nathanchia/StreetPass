import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';
import * as Location from 'expo-location';
import * as Styles from '../styles/master';

import { PassInfoContext } from '../contexts/PassInfoContext';
import PassListScreen from '../screens/PassListScreen';
import PingButton from '../components/PingButton';
import { AuthContext } from '../contexts/AuthContext';

const PassStack = createStackNavigator();

async function ping(authToken, setTestInfo) {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('rejected');
  } else {
    try {
      let {coords} = await Location.getCurrentPositionAsync({});
      console.log('' + coords.latitude + ', ' + coords.longitude);
      
      let auth = 'Bearer ' + authToken;

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
      }).then((response) => response.json())
        .then((json) => {
          setTestInfo(json.msg);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  } 
};

export default ({ navigation }) => {
  const authFunctions = useContext(AuthContext);
  const[passes, setPasses] = useState([]);
  
  return (
    <PassInfoContext.Provider value={passes}>
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
            headerRight: () => (<PingButton onPress={() => { ping(authFunctions.getUserToken(), setPasses); }}/>),
          }} 
        />
      </PassStack.Navigator>
    </PassInfoContext.Provider>
  )
}

