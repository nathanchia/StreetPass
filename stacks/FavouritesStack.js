import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';

import FavouritesScreen from '../screens/FavouritesScreen';
import * as Styles from '../styles/master';


const FavouritesStack = createStackNavigator();

export default ({ navigation }) => {
  return (
      <FavouritesStack.Navigator>
          <FavouritesStack.Screen 
            name='FavScreen' 
            component={FavouritesScreen} 
            options={{
              title:'Favourites',  
              headerStyle: {
                ...Styles.backgroundColor,
              },
              headerTitleStyle : {
                ...Styles.fontFamily,
              },
              headerTintColor : 'black',
              headerLeft: () => (<Enticons style={{marginLeft : 10}} name={'menu'} size={30} onPress={() => {navigation.openDrawer()}}/>),
            }} 
          />
      </FavouritesStack.Navigator>
  )
}

