import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { AsyncStorage } from 'react-native';
import Enticons from 'react-native-vector-icons/Entypo';

import EditEntry from '../components/EditEntry';
import FullModal from '../components/FullModal';

export default ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [passEntries, setPassEntries] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);

  // Returns true when first navigated to this screen
  const isFocused = useIsFocused();

  // Loads user information when first navigated
  useEffect(() => {
    AsyncStorage.getItem('userInfo').then((user) => {
      let data = JSON.parse(user);
      setDisplayName(data.displayName);   
    });
  }, [isFocused]);

  // Displays modal
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Enticons 
        style={{marginRight : 10}} 
        name={'plus'} 
        size={30} 
        onPress={() => {setCreateVisible(true)}}
      />),
    });
  }, [navigation]);

  const updateDisplayName = (newDisplayName) => {
    setDisplayName(newDisplayName);
  }

  const newEntry = (newTitle, newValue) => {
    let newKey = new Date().getTime() + newTitle;
    setPassEntries(currentEntries => [...currentEntries, {key: newKey ,title: newTitle, text: newValue}]);
  }

  const updateEntry = (newTitle, newText, targetKey) => {
    let index = passEntries.findIndex(entry => entry.key === targetKey);
    setPassEntries(currentEntries => [
        ...currentEntries.slice(0, index),
        {key: targetKey, title: newTitle, text: newText},
        ...currentEntries.slice(index + 1)
    ]);
  };

  const removeEntry = (targetKey) => {
    setPassEntries(currentEntries => currentEntries.filter((entry) => entry.key !== targetKey));
  };

  return (
    <View style={styles.editContainer} >
      <FullModal 
        visible={createVisible} 
        setModalVisible={setCreateVisible} 
        headerTitle={'Create New Entry'}
        submitFunction={newEntry} 
      />

      <ScrollView>
        <EditEntry onUpdate={updateDisplayName} title={'Display name'} text={displayName}/>
        {passEntries.map((entry) => 
          <EditEntry 
            deletable={true} 
            onDelete={removeEntry} 
            onUpdate={updateEntry}
            title={entry.title} 
            text={entry.text} 
            entryKey={entry.key}
          />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer : {
    paddingTop : '5%',
    height: '100%',
  }, 
});