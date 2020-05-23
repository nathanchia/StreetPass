import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabs from '../tabs/HomeTabs';
import EditProfileScreen from '../screens/EditProfileScreen';
import CustomDrawerContent from './DrawerContent';

const HomeDrawer = createDrawerNavigator();

export default () => {
  return (
    <HomeDrawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} >
        <HomeDrawer.Screen name='Home' component={HomeTabs} />
    </HomeDrawer.Navigator> 
  )
}
