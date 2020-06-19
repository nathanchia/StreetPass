import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Enticons from 'react-native-vector-icons/Entypo';

import { AuthContext} from '../contexts/AuthContext';
import * as Style from '../styles/master';

export default (props) => {
  const authFunctions = useContext(AuthContext);
  
    // All drawer content. Note that screens in the actual drawer are not rendered
    return (
      <DrawerContentScrollView
        contentContainerStyle={{flex:1}}
        {...props}
      >
        <DrawerItem label='Home' 
          labelStyle={{...Style.fontFamily}} 
          icon={()=><Enticons name={'home'} size={20}/>} 
          onPress={()=>{props.navigation.navigate('HomeTabs')}}
        />
        <DrawerItem 
          label='Edit Post' 
          labelStyle={{...Style.fontFamily}} 
          icon={()=><Enticons name={'pencil'} size={20}/>} 
          onPress={()=>{props.navigation.navigate('EditProfileStack')}}
        />
        <DrawerItem 
          label='Settings' 
          labelStyle={{...Style.fontFamily}} 
          icon={()=><Enticons name={'cog'} size={20}/>} 
          onPress={()=>{props.navigation.navigate('SettingsStack')}}
        />
        <DrawerItem 
          label='Sign Out' 
          labelStyle={{...Style.fontFamily}} 
          style={{position:'absolute', bottom:10}}
          icon={()=><Enticons name={'log-out'} size={20}/>} 
          onPress={()=>{authFunctions.signOut()}}
        />
      </DrawerContentScrollView>
    );
}

