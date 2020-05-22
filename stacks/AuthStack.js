import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen  from '../screens/SignInScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';

const AuthStack = createStackNavigator();

export default () => {
  return (
      <AuthStack.Navigator>
          <AuthStack.Screen name='SignInScreen' component={SignInScreen} options={{ title:'Sign In', headerTitleAlign :'center' }} />
          <AuthStack.Screen name='CreateAccountScreen' component={CreateAccountScreen} options={{ title : 'Create Account', headerTitleAlign: 'center' }}/>
      </AuthStack.Navigator>
  )
}

