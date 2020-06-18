import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import * as Styles from '../styles/master';
import PassEntry from '../components/PassEntry';

export default ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const [responseMsg, setResponseMsg] = useState('');

  // On navigate to this screen, load most recent favorites
  React.useEffect(() => {
    const loadFav = navigation.addListener('focus', () => {
      SecureStore.getItemAsync('favorites').then(favorites => {
        let favArray = JSON.parse(favorites);
        setFavorites(favArray);
        if (favArray.length <= 0) {
          setResponseMsg('No favorite passes')
        }  
      }).catch(error => {
          setFavorites([]);
          setResponseMsg(error);
      })
    });

    return loadFav;
  }, [navigation]);

  return (
    <View style={styles.favContainer}>
       {
        favorites.length > 0
        ? 
        <FlatList 
          contentContainerStyle={styles.listContainer}
          data={favorites} 
          renderItem={passEntry => 
            <PassEntry 
              title={passEntry.item.displayName} 
              key={passEntry.item.key}
              onPress={()=>{navigation.navigate('PassDisplayScreen', {passEntry: passEntry.item})}}
            />
          } 
        />
        : 
        <Text style={styles.noFav}>{responseMsg}</Text> 
      }
    </View>
  )
}

const styles = StyleSheet.create({
  favContainer: {
    height: '100%',
    justifyContent:'center'
  },
  listContainer: {
    alignSelf : "center",
    width: '80%', 
    marginTop: '3%',
  },
  noFav : {
    ...Styles.fontFamily,
    alignSelf: 'center',
  }
});