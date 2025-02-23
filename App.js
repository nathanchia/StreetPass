import React, { useState, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import AuthStack from './stacks/AuthStack';
import RootStack from './stacks/RootStack';
import { AuthContext } from './contexts/AuthContext'

export default function App() {
  // API endpoint
  // Actual Production Server
  global.endpoint = 'https://nkchia.pythonanywhere.com/';
  // Local Server
  // global.endpoint = 'http://10.0.2.2:5000/'

  // Returns true only when fonts are loaded
  let [fontsLoaded] = useFonts({
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
  });

  // Only used to know if client is logged in. Use SecureStorage for actual token
  const [userToken, setUserToken] = useState(null);

  const validateEmail = (email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  })

  const authContext = useMemo(() =>{
    return {
      signIn: (username, password, setResponseText, setIsLoading) => {
        if (username && password) {
          setIsLoading(true);

          fetch(global.endpoint + 'signin', {
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
            setIsLoading(false);

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json().then(json => {
                if (response.status === 200) {
                  AsyncStorage.getAllKeys().then((keys) => {
                    if(!keys.includes('settings')) {
                      // Default setting of distance, 3 miles. 
                      // If assigned to 'none' instead, server will not filter
                      // For now setting is just a string, will be object if more params
                      AsyncStorage.setItem('settings', '3');
                    }
                  });

                  let user = {token:json.token, displayName:json.displayName};
                  SecureStore.setItemAsync('user', JSON.stringify(user)).then(
                    AsyncStorage.setItem('favorites', json.favorites).then(
                      AsyncStorage.setItem('entries', json.entries).then(() => {
                          setUserToken(json.token);
                      })
                    )
                  );            
                } else {
                  // Invalid credentials
                  setResponseText(json.msg);
                }
              });
            } else {
              // Not JSON, most likely server error
              setResponseText('Server error');
            }
          }).catch((error) => {
            // Fetch error
            setIsLoading(false);
            setResponseText('' + error);
          });
        }
      },
      signUp: (username, password, email, displayName, navigation, setResponseText, setIsLoading) => {
        if (username && password && email && displayName) {
          let lowerEmail = String(email).toLowerCase();
          if (validateEmail(lowerEmail)) {
            setIsLoading(true);
            fetch(global.endpoint + 'create', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                password: password,
                email: lowerEmail,
                displayName: displayName,
              })
            }).then((response) => {
              setIsLoading(false);
  
              const contentType = response.headers.get("content-type");
              if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(json => {
                  if (response.status === 200) {
                    navigation.replace('ReturnSignInScreen',  {result: 'Successfully Created Account!'});
                  } else {
                    // Username or email already exists
                    setResponseText(json.msg);
                  }
                });
              } else {
                // Not JSON, most likely server error
                setResponseText('Server error');
              }
            }).catch((error) => {
              // Fetch error
              setIsLoading(false);
              setResponseText('' + error);
            });
          } else {
            setResponseText('Invalid email address');
          }
        } else {
          setResponseText('Please fill out all fields');
        }
      },
      signOut: () => {
        // Delete cached user info
        SecureStore.setItemAsync('user', '').then(
          AsyncStorage.setItem('favorites', '').then(
            AsyncStorage.setItem('entries', '').then(() => {
                setUserToken(null);
            })
          )
        ).catch(error => {
          //Failed to sign out
        });      
      },
    }
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />
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



