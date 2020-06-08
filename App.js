import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';

import LoadingScreen from './screens/LoadingScreen'
import AuthStack from './stacks/AuthStack';
import RootStack from './stacks/RootStack';
import { AuthContext } from './contexts/AuthContext'

export default function App() {
  let [fontsLoaded] = useFonts({
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
  });

  const [userToken, setUserToken] = useState(null);
  let syncToken = null;

  const authContext = useMemo(() =>{
    return {
      signIn: (username, password, setResponseText) => {
        if (username && password) {
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
          }).then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json().then(json => {
                if (response.status === 200) {
                  syncToken = json.token;
                  setUserToken(json.token);
                } else {
                  setResponseText(json.msg);
                }
              });
            } else {
              setResponseText('Unexpected error occured');
            }
          }).catch((error) => {
              setResponseText(error);
          });
        }
      },
      signUp: (username, password, displayName, navigation, setResponseText) => {
        if (username && password && displayName) {
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
          }).then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json().then(json => {
                if (response.status === 200) {
                  navigation.replace('ReturnSignInScreen');
                } else {
                  setResponseText(json.msg);
                }
              });
            } else {
              setResponseText('Unexpected error occured');
            }
          }).catch((error) => {
              setResponseText(error);
          });
        } else {
          setResponseText('Please fill out all fields');
        }
        
      },
      signOut: () => {
        syncToken = null;
        setUserToken(null);
      },
      getUserToken: () => {
        return syncToken;   
      },
    }
  }, []);

  if (!fontsLoaded) {
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



