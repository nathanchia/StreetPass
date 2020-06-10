import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { PassInfoContext } from '../contexts/PassInfoContext';
import PassEntry from '../components/PassEntry';
import * as Styles from '../styles/master';

export default ({ navigation }) => {
  const passInfoObject = useContext(PassInfoContext);
  const passes = passInfoObject.passes;
  const responseText = passInfoObject.responseText;
  if (passes.length > 0) {
    return (
      <FlatList 
        contentContainerStyle={styles.listContainer}
        data={passes} 
        renderItem={passInfo => 
          <PassEntry 
            title={passInfo.item.username} 
            distance={passInfo.item.distance}
            onPress={()=>{navigation.navigate('PassDisplayScreen', {passInfo: passInfo.item})}}
          />
        } 
      />
    )
  } else {
    return (
      <View style={styles.responseContainer}>
        <Text style={styles.responseText}>{responseText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer : {
    alignSelf : "center",
    width: '80%'
  }, responseContainer : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, responseText : {
    ...Styles.fontFamily,
    textAlign: 'center',
    fontSize : 11,
  },
});