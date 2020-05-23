import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PassStack from '../stacks/PassStack';
import FavouritesStack from '../stacks/FavouritesStack';

const HomeTabs = createBottomTabNavigator();

export default () => {
  return (
    <HomeTabs.Navigator>
        <HomeTabs.Screen name='StreetPasses' component = {PassStack} options={{title: 'Street Passes'}}/>
        <HomeTabs.Screen name='Favourites' component ={FavouritesStack} options={{title: 'Favourites'}}/>
    </HomeTabs.Navigator>
  )
}

