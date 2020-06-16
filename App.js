import React, { useState, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';

import LoadingScreen from './screens/LoadingScreen'
import AuthStack from './stacks/AuthStack';
import RootStack from './stacks/RootStack';
import { AuthContext } from './contexts/AuthContext'

export default function App() {
  // Returns true only when fonts are loaded
  let [fontsLoaded] = useFonts({
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
  });

  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() =>{
    return {
      signIn: (username, password, setResponseText, setIsLoading) => {
        if (username && password) {
          setIsLoading(true);

          fetch('https://nkchia.pythonanywhere.com/signin', {
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
                  SecureStore.setItemAsync('user', JSON.stringify(json)).then((error) => {
                    if (error) {
                      setResponseText('' + error);
                    } else {
                      setUserToken(json.token);
                    }
                  });            
                } else {
                  // Invalid credentials
                  setResponseText(json.msg);
                }
              });
            } else {
              // Not JSON, most likely server error
              setResponseText('Unexpected error occured');
            }
          }).catch((error) => {
              setIsLoading(false);
              setResponseText('' + error);
          });
        }
      },
      signUp: (username, password, confirmPass, displayName, navigation, setResponseText, setIsLoading) => {
        if (username && password && confirmPass && displayName) {
          if (password !== confirmPass) {
            setResponseText('Passwords are different');
          } else {
            setIsLoading(true);
            fetch('https://nkchia.pythonanywhere.com/create', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                password: password,
                displayName: displayName,
              })
            }).then((response) => {
              setIsLoading(false);

              const contentType = response.headers.get("content-type");
              if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(json => {
                  if (response.status === 200) {
                    navigation.replace('ReturnSignInScreen');
                  } else {
                    // User already exists
                    setResponseText(json.msg);
                  }
                });
              } else {
                // Not JSON, most likely server error
                setResponseText('Unexpected error occured');
              }
            }).catch((error) => {
                setIsLoading(false);
                setResponseText('' + error);
            });
          }
        } else {
          setResponseText('Please fill out all fields');
        }
      },
      signOut: () => {
        // Delete cached user info
        SecureStore.setItemAsync('user', '').then((error) => {
          if (error) {
            setResponseText('' + error);
          } else {
            setUserToken(null);
          }
        });     
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



