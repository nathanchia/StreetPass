import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import InfoInput from '../components/InfoInput';

export default () => {
  const [displayName, setDisplayName] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.editContainer}>
      <InfoInput field={'Display name'} onChangeText={setDisplayName} value={displayName}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  editContainer : {
    flex : 1,
    alignItems : 'center',
    paddingTop : 25,
  }, 
});