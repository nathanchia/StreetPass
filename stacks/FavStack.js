import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import FavScreen from '../screens/FavScreen';

const FavStack = createStackNavigator();

export default ({ navigation }) => {
  return (
      <FavStack.Navigator>
          <FavStack.Screen 
            name='FavScreen' 
            component={FavScreen} 
            options={{
              title:'Street Passes',  
              headerTitleAlign :'center', 
              headerLeft: () => (<Button onPress={() => {navigation.openDrawer()}} title="Info" color="#000000"/>)
            }}
          />
      </FavStack.Navigator>
  )
}

