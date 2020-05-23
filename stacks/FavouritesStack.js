import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import FavouritesScreen from '../screens/FavouritesScreen';

const FavouritesStack = createStackNavigator();

export default ({ navigation }) => {
  return (
      <FavouritesStack.Navigator>
          <FavouritesStack.Screen 
            name='FavScreen' 
            component={FavouritesScreen} 
            options={{
              title:'Favourites',  
              headerTitleAlign :'center', 
              headerLeft: () => (<Button onPress={() => {navigation.openDrawer()}} title="Info" color="#000000"/>)
            }}
          />
      </FavouritesStack.Navigator>
  )
}

