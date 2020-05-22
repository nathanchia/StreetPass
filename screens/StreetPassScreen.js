import React, { useContext } from 'react';
import { StyleSheet, Button, View, FlatList } from 'react-native';

import PassInfoContext from '../context/PassInfoContext';


export default ({ navigation }) => {
    const passInfoArray = useContext(PassInfoContext);
  
    return (
    <View>
      <FlatList data={passInfoArray} renderItem={passInfo => <Button title={passInfo.item.name} onPress={()=>{navigation.push('PassInfoScreen', {passInfo: passInfo.item})}}/>} />
    </View>
  )
}

const styles = StyleSheet.create({
 
});