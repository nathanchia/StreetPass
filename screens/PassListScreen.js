import React, { useContext } from 'react';
import { StyleSheet, Button, View, FlatList } from 'react-native';

import { PassInfoContext } from '../contexts/PassInfoContext';
import PassEntry from '../components/PassEntry';


export default ({ navigation }) => {
  const passInfoArray = useContext(PassInfoContext);
  
  return (
    <FlatList 
      contentContainerStyle={styles.listContainer}
      data={passInfoArray} 
      renderItem={passInfo => 
        <PassEntry 
          title={passInfo.item.username} 
          distance={passInfo.item.distance}
          onPress={()=>{navigation.navigate('PassDisplayScreen', {passInfo: passInfo.item})}}
        />
      } 
    />
  )
}

const styles = StyleSheet.create({
  listContainer : {
    alignSelf : "center",
    width: '80%'
  }
});