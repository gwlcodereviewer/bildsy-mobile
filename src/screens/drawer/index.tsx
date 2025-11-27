import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {NAV_DASHBOARD_SCREEN, NAV_HELP, NAV_PROFILE_DETAILS} from '../../navigation/navConstants';
import DrawerContent from './drawerContent';
import MainTabScreen from '../tabs';
import ProfileScreen from '../viewProfile';
import {navDashboard} from '../../constants/utils/constantData';
import HelpPage from '../Help/index';

const myGlobal: any = global;

const DrawerScreen = () => {
  const Drawer = createDrawerNavigator();
  const [action, setAction] = useState<string>();

  useEffect(() => {
    setAction(myGlobal.tab);
  }, [myGlobal.tab]);
  return (
    <Drawer.Navigator
      screenOptions={{swipeEnabled: true}}
      initialRouteName={action}
      drawerContent={(props: any) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={NAV_DASHBOARD_SCREEN}
        component={MainTabScreen}
        initialParams={{screenName: NAV_DASHBOARD_SCREEN}}
        options={{drawerLabel: navDashboard, title: navDashboard, headerShown: false}}
      />
      <Drawer.Screen name={NAV_PROFILE_DETAILS} component={ProfileScreen} options={{headerShown: false}} />
      <Drawer.Screen name={NAV_HELP} component={HelpPage} options={{headerShown: false}} />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
