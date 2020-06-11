import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enticons from 'react-native-vector-icons/Entypo';

import EditProfileScreen from '../screens/EditProfileScreen';
import * as Styles from '../styles/master';

const EditProfileStack = createStackNavigator();

export default ({navigation}) => {
  return (
      <EditProfileStack.Navigator >
          <EditProfileStack.Screen 
            name='EditProfileScreen' 
            component={EditProfileScreen} 
            options={{
              title:'Edit your Profile',  
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
      </EditProfileStack.Navigator>
  )
}