import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { AuthContext} from '../contexts/AuthContext';
  
export default (props) => {
  const authFunctions = useContext(AuthContext);

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label='Sign Out' onPress={()=>{authFunctions.signOut()}}/>
      </DrawerContentScrollView>
    );
}