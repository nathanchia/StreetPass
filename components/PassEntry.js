import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Styles  from '../styles/master';

// Displays a pass in home tabs and favourite tabs
// Includes display name distance from user
// Required props: onPress, title
// Optional props: hasDistance <- if true, distance prop is required
const PassEntry = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.entryContainer} onPress={props.onPress}>
            <Text style={styles.entryText}>{props.title}</Text>
            {
              props.hasDistance &&
              <Text style={styles.entryText}>{props.distance + ' miles'}</Text>
            }
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  entryContainer : {
    ...Styles.coloredBorder,
    height : 41,
    flexDirection: 'row',
    justifyContent :'space-around',
    alignItems : 'center',
    marginVertical : 7,
  }, entryText : {
    ...Styles.fontFamily,
  }
})

export default PassEntry;