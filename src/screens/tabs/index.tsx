import React, {useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import DashBoardScreen from '../dashboard';
import ProjectScreen from '../projects';
import BlogsScreen from '../blogs';
import DrawerHome from '../../assets/svg/drawer/DrawerHome';
import DrawerBlogs from '../../assets/svg/drawer/DrawerBlogs';
import DrawerProject from '../../assets/svg/drawer/DrawerProject';
import NotificationScreen from '../notification';
import colors from '../../style/colors';
import DrawerBell from '../../assets/svg/drawer/DrawerBell';
import styles from '../../style/style';
import {rh} from '../../style/Dimen';
import {ScreenChange} from '../../redux/actions/auth';

import {
  NAV_BLOGS_SCREEN,
  NAV_DASHBOARD_SCREEN,
  NAV_NOTIFICATION_SCREEN,
  NAV_PROJECTS_SCREEN,
} from '../../navigation/navConstants';
import {INavigation} from '../../types';
import {navProjects, navDashboard, navBlogs, navNotification} from '../../constants/utils/constantData';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  ScreenChange?: (screenName: string) => Promise<any>;
}
const Tab = createBottomTabNavigator();
const myGlobal: any = global;
const MainTabScreen: React.FC<Props> = (props: Props) => {
  const getDashboardIcon = (color: string, focused: boolean) => (
    <View>
      <DrawerHome isSelected={focused} />
    </View>
  );
  const getProjectIcon = (color: string, focused: boolean) => (
    <View>
      <DrawerProject isSelected={focused} />
    </View>
  );
  const getBlogsIcon = (color: string, focused: boolean) => (
    <View>
      <DrawerBlogs isSelected={focused} />
    </View>
  );
  const getNotificationIcon = (color: string, focused: boolean) => (
    <View>
      <DrawerBell isSelected={focused} />
    </View>
  );
  const {navigation, route, ScreenChange: _ScreenChange} = props;

  const getInitialName = () => {
    let InitialRouteName;
    switch (myGlobal.tab) {
      case 'NAV_PROJECTS_SCREEN':
        InitialRouteName = navProjects;
        break;
      case 'NAV_BLOGS_SCREEN':
        InitialRouteName = navBlogs;
        break;
      case 'NAV_DASHBOARD_SCREEN':
        InitialRouteName = navDashboard;
        break;
      default:
        InitialRouteName = navDashboard;
    }
    return InitialRouteName;
  };
  useEffect(() => {
    if (myGlobal.tab !== NAV_NOTIFICATION_SCREEN) navigation?.navigate(getInitialName());
    if (!myGlobal.tab) {
      myGlobal.tab = NAV_DASHBOARD_SCREEN;
    }
  }, [myGlobal.tab]);
  return (
    <Tab.Navigator initialRouteName={getInitialName()}>
      <Tab.Screen
        name={navDashboard}
        component={DashBoardScreen}
        options={{
          tabBarLabel: navDashboard,
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: colors.darkBlack,
          tabBarActiveBackgroundColor: colors.orangeWithOpacity,
          tabBarItemStyle: {height: rh(80)},
          tabBarStyle: {height: rh(80)},
          tabBarIconStyle: {maxHeight: rh(30)},
          tabBarIcon: ({color, focused}: {color: string; focused: boolean}) => getDashboardIcon(color, focused),
        }}
        initialParams={{tab: myGlobal.tab}}
        listeners={() => ({
          tabPress: () => {
            ScreenChange(NAV_DASHBOARD_SCREEN);
            myGlobal.tab = NAV_DASHBOARD_SCREEN;
          },
        })}
      />
      <Tab.Screen
        name={navProjects}
        component={ProjectScreen}
        options={{
          tabBarLabel: navProjects,
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: colors.darkBlack,
          tabBarActiveBackgroundColor: colors.orangeWithOpacity,
          tabBarItemStyle: {height: rh(80)},
          tabBarStyle: {height: rh(80)},
          tabBarIconStyle: {maxHeight: rh(30)},
          tabBarIcon: ({color, focused}: {color: string; focused: boolean}) => getProjectIcon(color, focused),
        }}
        initialParams={{tab: myGlobal.tab}}
        listeners={() => ({
          tabPress: () => {
            ScreenChange(NAV_PROJECTS_SCREEN);
            myGlobal.tab = NAV_PROJECTS_SCREEN;
          },
        })}
      />
      <Tab.Screen
        name={navBlogs}
        component={BlogsScreen}
        options={{
          tabBarLabel: navBlogs,
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: colors.darkBlack,
          tabBarActiveBackgroundColor: colors.orangeWithOpacity,
          tabBarItemStyle: {height: rh(80)},
          tabBarStyle: {height: rh(80)},
          tabBarIconStyle: {maxHeight: rh(30)},
          tabBarIcon: ({color, focused}: {color: string; focused: boolean}) => getBlogsIcon(color, focused),
        }}
        initialParams={{tab: myGlobal.tab}}
        listeners={() => ({
          tabPress: () => {
            ScreenChange(NAV_BLOGS_SCREEN);
            myGlobal.tab = NAV_BLOGS_SCREEN;
          },
        })}
      />
      <Tab.Screen
        name={navNotification}
        component={NotificationScreen}
        options={{
          tabBarLabel: navNotification,
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: colors.darkBlack,
          tabBarActiveBackgroundColor: colors.orangeWithOpacity,
          tabBarItemStyle: {height: rh(80)},
          tabBarStyle: {height: rh(80)},
          tabBarIconStyle: {maxHeight: rh(30)},
          tabBarIcon: ({color, focused}: {color: string; focused: boolean}) => getNotificationIcon(color, focused),
        }}
        initialParams={{tab: myGlobal.tab}}
        listeners={() => ({
          tabPress: e => {
            ScreenChange(NAV_NOTIFICATION_SCREEN);
            myGlobal.tab = NAV_NOTIFICATION_SCREEN;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
