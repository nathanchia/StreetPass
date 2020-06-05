import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Styles  from '../styles/master';

const PassEntry = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.entryContainer} onPress={props.onPress}>
            <Text style={styles.entryText}>{props.title}</Text>
            <Text style={styles.entryText}>{props.distance + ' miles'}</Text>
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