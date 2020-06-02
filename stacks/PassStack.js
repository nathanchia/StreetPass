import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';
import * as Location from 'expo-location';
import * as Styles from '../styles/master';


import { PassInfoContext } from '../contexts/PassInfoContext';
import PassListScreen from '../screens/PassListScreen';
import PingButton from '../components/PingButton';

const PassStack = createStackNavigator();

const testRequest = () => {
  return fetch('http://10.0.2.2:5000/ping')
    .then((response) => response.json())
    .then((json) => {
      console.log(json.dev);
    })
    .catch((error) => {
      console.error(error);
    });
};

async function testPost() {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('rejected');
  } else {
    try {
      let {coords} = await Location.getCurrentPositionAsync({});
      console.log('' + coords.latitude + ', ' + coords.longitude);
      fetch('http://10.0.2.2:5000/ping', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Nathan',
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      }).then((response) => response.json())
        .then((json) => {
          console.log(json.test);
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
  const[testInfo, setTestInfo] = useState([
    {key: '1', name: 'Amy', hobbies:'Archery'},
    {key: '2', name: 'Bob', hobbies: 'Boxing'},
    {key: '3', name: 'Clint', hobbies: 'Cooking'},
  ]);
  
  return (
    <PassInfoContext.Provider value={testInfo}>
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
            headerRight: () => (<PingButton onPress={testPost} />),
          }} 
        />
      </PassStack.Navigator>
    </PassInfoContext.Provider>
  )
}

