import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Enticons from 'react-native-vector-icons/Entypo';

import PassStack from '../stacks/PassStack';
import FavoritesStack from '../stacks/FavoritesStack';
import * as Styles from '../styles/master';

const HomeTabs = createBottomTabNavigator();

export default () => {
  return (
    <HomeTabs.Navigator  
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'PassStack') {
            iconName = focused ? 'text-document-inverted' : 'text-document';
          } else if (route.name === 'FavoritesStack') {
            iconName = focused ? 'heart' : 'heart-outlined';
          }

          return <Enticons name={iconName} size={size} color={color} />;
        },
      })}
    
      tabBarOptions={{
        showLabel : false,
        style : { ...Styles.backgroundColor },
        activeTintColor : 'black',
        inactiveTintColor : 'black',
      }}
    >
        <HomeTabs.Screen name='PassStack' component = {PassStack} options={{title: 'Street Passes'}}/>
        <HomeTabs.Screen name='FavoritesStack' component ={FavoritesStack} options={{title: 'Favorites'}}/>
    </HomeTabs.Navigator>
  )
}

