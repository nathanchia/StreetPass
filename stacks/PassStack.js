import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';
import * as Styles from '../styles/master';


import { PassInfoContext } from '../contexts/PassInfoContext';
import PassListScreen from '../screens/PassListScreen';
import PingButton from '../components/PingButton';

const PassStack = createStackNavigator();

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
            headerRight: () => (<PingButton onPress={() => {navigation.openDrawer()}} />),
          }} 
        />
      </PassStack.Navigator>
    </PassInfoContext.Provider>
  )
}

