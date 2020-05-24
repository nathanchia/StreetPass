import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

import EditProfileScreen from '../screens/EditProfileScreen';

const EditProfileStack = createStackNavigator();

export default ({navigation}) => {
  return (
      <EditProfileStack.Navigator >
          <EditProfileStack.Screen 
            name='EditProfileScreen' 
            component={EditProfileScreen} 
            options={{
                title:'Edit Your Profile',  
                headerTitleAlign :'center', 
                headerLeft: () => (<Button onPress={() => {navigation.openDrawer()}} title="Info" color="#000000"/>)
            }} 
          />
      </EditProfileStack.Navigator>
  )
}