import React, { useContext } from 'react';
import { StyleSheet, Button, View, FlatList } from 'react-native';

import { PassInfoContext } from '../contexts/PassInfoContext';


export default ({ navigation }) => {
    const passInfoArray = useContext(PassInfoContext);
  
    return (
    <View>
      <FlatList data={passInfoArray} renderItem={passInfo => <Button title={passInfo.item.name} onPress={()=>{navigation.push('PassDisplayScreen', {passInfo: passInfo.item})}}/>} />
    </View>
  )
}

const styles = StyleSheet.create({
 
});