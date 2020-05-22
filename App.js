import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from'@react-navigation/drawer';

import AuthStack from './stacks/AuthStack';
import HomeTabs from './tabs/HomeTabs';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='HomeTabs' component={HomeTabs} />
        <Drawer.Screen name='Auth' component={AuthStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
 
});
