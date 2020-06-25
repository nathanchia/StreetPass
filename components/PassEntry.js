import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as Styles  from '../styles/master';

// Displays a pass in home tabs and favourite tabs
// Includes display name distance from user
// Required props: onPress, title
// Optional props: hasDistance <- if true, distance prop is required
const PassEntry = props => {
  let entryText;
  // Show name and distance
  if (props.hasDistance) {
    entryText =
    <View style={styles.hasDistance}>
        <Text style={{...styles.entryText, flex:20, textAlign:'center'}}>{props.title}</Text>
        <Text style={{...styles.entryText, flex:13, textAlign:'right'}}>{props.distance + ' miles'}</Text>
    </View>
  } else {  // Just show name
    entryText =
    <View style={styles.hasDistance}>
      <Text style={{...styles.entryText, flex:1, textAlign:'center'}}>{props.title}</Text>
    </View>
 ;
  }

  return (
      <TouchableOpacity activeOpacity={0.6} style={styles.entryContainer} onPress={props.onPress}>
        {entryText}
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  entryContainer : {
    ...Styles.coloredBorder,
    height : 41,
    marginVertical : 7,
    paddingHorizontal: 15,
  },
  hasDistance: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryText : {
    ...Styles.fontFamily,
  }
})

export default PassEntry;