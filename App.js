import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from'@react-navigation/drawer';

import LoadingScreen from './screens/LoadingScreen'
import AuthStack from './stacks/AuthStack';
import HomeTabs from './tabs/HomeTabs';
import { AuthContext } from './contexts/AuthContext'

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() =>{
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    }
  }, []);


  useEffect(()=> {
    setTimeout(()=>{
      setIsLoading(false);
    }, 1000);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {userToken ? ( 
            <Drawer.Navigator>
              <Drawer.Screen name='HomeTabs' component={HomeTabs} />
            </Drawer.Navigator>) : (
              <AuthStack />
            )
          }
        </NavigationContainer>
      </AuthContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
 
});
