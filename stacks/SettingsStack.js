import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';

import SettingsScreen from '../screens/SettingsScreen';
import ChangePassScreen from '../screens/ChangePassScreen';
import * as Styles from '../styles/master';

const SettingsStack = createStackNavigator();

export default ({navigation}) => {
  return (
      <SettingsStack.Navigator >
          <SettingsStack.Screen 
            name='SettingsScreen' 
            component={SettingsScreen} 
            options={{
              title:'Settings',  
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
          <SettingsStack.Screen 
            name='ChangePassScreen' 
            component={ChangePassScreen}
            options={{headerTransparent:true, title:''}}
          />
      </SettingsStack.Navigator>
  )
}