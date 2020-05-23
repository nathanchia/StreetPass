import React, { useState } from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { PassInfoContext } from '../contexts/PassInfoContext';
import PassListScreen from '../screens/PassListScreen';
import PassDisplayScreen from '../screens/PassDisplayScreen';

const StreetPassStack = createStackNavigator();

export default ({ navigation }) => {
  const[testInfo, setTestInfo] = useState([
    {key: '1', name: 'Amy', hobbies:'Archery'},
    {key: '2', name: 'Bob', hobbies: 'Boxing'},
    {key: '3', name: 'Clint', hobbies: 'Cooking'}
  ]);
  
  return (
    <PassInfoContext.Provider value={testInfo}>
      <StreetPassStack.Navigator>
        <StreetPassStack.Screen 
          name='PassListScreen' 
          component={PassListScreen} 
          options={{
            title:'Street Passes',  
            headerTitleAlign :'center', 
            headerLeft: () => (<Button onPress={() => {navigation.openDrawer()}} title="Info" color="#000000"/>)
          }} 
        />
        <StreetPassStack.Screen name='PassDisplayScreen' component={PassDisplayScreen} options={{ title:''}} />
      </StreetPassStack.Navigator>
    </PassInfoContext.Provider>
  )
}

