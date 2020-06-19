import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';
import * as Styles from '../styles/master';

import PassListScreen from '../screens/PassListScreen';

const PassStack = createStackNavigator();

export default ({ navigation }) => {
  return (
    <PassStack.Navigator>
      <PassStack.Screen 
        name='PassListScreen' 
        component={PassListScreen} 
        options={{
          title:'Posts',  
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
    </PassStack.Navigator>
  )
}

