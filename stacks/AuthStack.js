import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen  from '../screens/SignInScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import ReturnSignInScreen from '../screens/ReturnSignInScreen';

const AuthStack = createStackNavigator();

export default () => {
  return (
      <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name='SignInScreen' component={SignInScreen} />
          <AuthStack.Screen name='CreateAccountScreen' component={CreateAccountScreen} />
          <AuthStack.Screen name='ReturnSignInScreen' component={ReturnSignInScreen} />
      </AuthStack.Navigator>
  )
}

