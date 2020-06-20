import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabs from '../tabs/HomeTabs';
import EditProfileStack from '../stacks/EditProfileStack';
import CustomDrawerContent from './DrawerContent';
import SettingsStack from '../stacks/SettingsStack';
import AboutStack from '../stacks/AboutStack';

const HomeDrawer = createDrawerNavigator();

// Note: Screens not actually shown on drawer. Refer DrawerContent
export default () => {
  return (
    <HomeDrawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} >
        <HomeDrawer.Screen name='HomeTabs' component={HomeTabs} />
        <HomeDrawer.Screen name='EditProfileStack' component={EditProfileStack} />
        <HomeDrawer.Screen name='SettingsStack' component={SettingsStack} />
        <HomeDrawer.Screen name='AboutStack' component={AboutStack} />
    </HomeDrawer.Navigator> 
  )
}
