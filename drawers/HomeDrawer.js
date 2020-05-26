import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabs from '../tabs/HomeTabs';
import EditProfileStack from '../stacks/EditProfileStack';
import CustomDrawerContent from './DrawerContent';

const HomeDrawer = createDrawerNavigator();

// Need another regular stack for settings
export default () => {
  return (
    <HomeDrawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} >
        <HomeDrawer.Screen name='HomeTabs' component={HomeTabs} />
        <HomeDrawer.Screen name='EditProfileStack' component={EditProfileStack} />
    </HomeDrawer.Navigator> 
  )
}
