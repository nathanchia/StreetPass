import React, { useState } from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { PassInfoProvider } from '../context/PassInfoContext';
import StreetPassScreen from '../screens/StreetPassScreen';
import PassInfoScreen from '../screens/PassInfoScreen';

const StreetPassStack = createStackNavigator();

export default ({ navigation }) => {
  const[testInfo, setTestInfo] = useState([
    {key: '1', name: 'Amy', hobbies:'Archery'},
    {key: '2', name: 'Bob', hobbies: 'Boxing'},
    {key: '3', name: 'Clint', hobbies: 'Cooking'}
  ]);
  
  return (
    <PassInfoProvider value={testInfo}>
      <StreetPassStack.Navigator>
        <StreetPassStack.Screen 
          name='StreetPassScreen' 
          component={StreetPassScreen} 
          options={{
            title:'Street Passes',  
            headerTitleAlign :'center', 
            headerLeft: () => (<Button onPress={() => {navigation.openDrawer()}} title="Info" color="#000000"/>)
          }} 
        />
        <StreetPassStack.Screen name='PassInfoScreen' component={PassInfoScreen} options={{ title:''}} />
      </StreetPassStack.Navigator>
    </PassInfoProvider>
  )
}

