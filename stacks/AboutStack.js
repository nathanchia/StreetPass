import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';

import AboutScreen from '../screens/AboutScreen.js';
import * as Styles from '../styles/master';

const AboutStack = createStackNavigator();

export default ({navigation}) => {
  return (
      <AboutStack.Navigator>
          <AboutStack.Screen 
            name='AboutScreen' 
            component={AboutScreen} 
            options={{
              title:'About',  
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
      </AboutStack.Navigator>
  )
}
