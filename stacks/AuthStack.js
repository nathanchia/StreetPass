import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen  from '../screens/SignInScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import ReturnSignInScreen from '../screens/ReturnSignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const AuthStack = createStackNavigator();

export default () => {
  return (
      <AuthStack.Navigator >
          <AuthStack.Screen name='SignInScreen' component={SignInScreen} options={{headerShown:false}} />
          <AuthStack.Screen name='CreateAccountScreen' component={CreateAccountScreen} options={{headerTransparent:true, title:''}}/>
          <AuthStack.Screen name='ReturnSignInScreen' component={ReturnSignInScreen} options={{headerShown:false}}/>
          <AuthStack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} options={{headerTransparent:true, title:''}} />
      </AuthStack.Navigator>
  )
}

