import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeDrawer from '../drawers/HomeDrawer';
import PassDisplayScreen from '../screens/PassDisplayScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const RootStack = createStackNavigator();

export default () => {
  return (
      <RootStack.Navigator >
          <RootStack.Screen name='HomeDrawer' component={HomeDrawer} options={{headerShown: false}}/>
          <RootStack.Screen name='PassDisplayScreen' component={PassDisplayScreen} options={{title: ''}} />
          <RootStack.Screen name='EditProfileScreen' component={EditProfileScreen} options={{title: 'Edit your Profile'}} />
      </RootStack.Navigator>
  )
}

