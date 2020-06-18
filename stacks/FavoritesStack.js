import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';

import FavoritesScreen from '../screens/FavoritesScreen';
import * as Styles from '../styles/master';


const FavoritesStack = createStackNavigator();

export default ({ navigation }) => {
  return (
      <FavoritesStack.Navigator>
          <FavoritesStack.Screen 
            name='FavScreen' 
            component={FavoritesScreen} 
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
      </FavoritesStack.Navigator>
  )
}

