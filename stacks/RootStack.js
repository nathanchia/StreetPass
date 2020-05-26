import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeDrawer from '../drawers/HomeDrawer';
import PassDisplayScreen from '../screens/PassDisplayScreen';
import * as Styles from '../styles/master';

const RootStack = createStackNavigator();

export default () => {
  return (
      <RootStack.Navigator>
          <RootStack.Screen name='HomeDrawer' component={HomeDrawer} options={{headerShown: false}}/>
          <RootStack.Screen 
            name='PassDisplayScreen' 
            component={PassDisplayScreen}
            options={({ route }) => ({ 
              title: route.params.passInfo.name + '\'s Profile',
              headerStyle: {
                ...Styles.backgroundColor,
              },
              headerTitleStyle : {
                ...Styles.fontFamily,
              },
              headerTintColor : 'black',
              headerBackTitle : '',
            })} 
          />
      </RootStack.Navigator>
  )
}
