import React, { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import * as SecureStore from 'expo-secure-store';

import LoadingScreen from './screens/LoadingScreen'
import AuthStack from './stacks/AuthStack';
import RootStack from './stacks/RootStack';
import { AuthContext } from './contexts/AuthContext'

export default function App() {
  let [fontsLoaded] = useFonts({
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() =>{
    return {
      signIn: (username, password) => {
        fetch('http://10.0.2.2:5000/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        }).then((response) => response.json())
          .then((json) => {
            if (json.token) {
              setUserToken(json.token);
            } else {
              console.log(json.msg);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },
      signUp: (username, password) => {
        fetch('http://10.0.2.2:5000/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        }).then((response) => response.json())
          .then((json) => {
            console.log(json.msg);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      signOut: () => {
        setUserToken(null);
      },
      getUserToken: () => {
        return userToken;
      }
    }
  }, []);

/*
  useEffect(()=> {
    setTimeout(()=>{
      setIsLoading(false);
    }, 1000);
  }, []);
*/

  if (!fontsLoaded || isLoading) {
    return <LoadingScreen />
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {userToken ? (<RootStack />) : (<AuthStack />)}
        </NavigationContainer>
      </AuthContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
 
});
