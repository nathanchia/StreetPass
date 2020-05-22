import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StreetPassStack from '../stacks/StreetPassStack';
import FavStack from '../stacks/FavStack';

const HomeTabs = createBottomTabNavigator();

export default () => {
  return (
    <HomeTabs.Navigator>
        <HomeTabs.Screen name='StreetPasses' component = {StreetPassStack} options={{title: 'Street Passes'}}/>
        <HomeTabs.Screen name='Favourites' component ={FavStack} options={{title: 'Favourites'}}/>
    </HomeTabs.Navigator>
  )
}

