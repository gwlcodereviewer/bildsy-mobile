import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerScreen from '../screens/drawer';
import {
  NAV_LOGIN,
  NAV_ON_BOARDING,
  NAV_SIGN_UP,
  NAV_DRAWER_SCREEN,
  NAV_RESET_PASSWORD_SEND_EMAIL,
  NAV_RESET_PASSWORD_VERIFICATION_CODE,
  NAV_RESET_PASSWORD_CREATE_PASSWORD,
  NAV_ADD_PROJECT,
  FILTER,
  NAV_HOME,
  NAV_BIDS,
  NAV_INFO_TABS,
  NAV_BLOG_DETAILS,
  NAV_COMPLAINTS_DETAILS,
  NAV_PROFILE_EDIT,
  NAV_CHANGE_PASSWORD,
  NAV_ADDRESS_SCREEN,
  NAV_BIDS_DETAIL,
  NAV_HELP,
  NAV_BIDS_PROFILE,
  NAV_BIDS_VIEW_PROFILE,
  NAV_CHAT_MESSAGE,
  NAV_HELP_SCREEN,
  NAV_ADD_REVIEW_SCREEN,
} from './navConstants';
import Login from '../screens/login';
import SignUp from '../screens/signUp';
import AddProject from '../screens/addProject';
import OnBoarding from '../screens/onBoarding';
import Bids from '../screens/bids/bid/bids';
import ResetPasswordSendEmail from '../screens/ResetPasswordSendEmail';
import ResetPasswordVerificationCode from '../screens/ResetPasswordVerificationCode';
import ResetPasswordCreatePassword from '../screens/ResetPasswordCreatePassword';
import Filter from '../screens/projects/filter/Filter';
import {ASYNC_CONST} from '../helpers/constants';
import InfoTabs from '../screens/bids/index';
import BlogDetails from '../screens/blogDetails/index';
import EditProfile from '../screens/editProfile';
import ChangePassword from '../screens/changePassword';
import BidsDetails from '../screens/bids/bid/bidDetail/bidsDetail';
import bidsProfile from '../screens/bids/bid/bidsProfile/bidsProfile';
import bidsViewProfile from '../screens/bids/bid/bidsViewProfile/bidsViewProfile';
import complaintsDetail from '../screens/bids/complaintsDetails/complaintDetail/complaintsDetail';
import MessageList from '../screens/chat/MessageList';
import AddressScreen from '../screens/signUp/address';
import HelpPage from '../screens/Help';
import {localStrings} from '../localization/localStrings';
import AddReview from '../screens/addReview';

const Stack = createStackNavigator();
const myGlobal: any = global;
const MainStackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    getLoginStatus().then(res => {
      if (res !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  const getLoginStatus = () => checkLogin();
  const checkLogin = async () => {
    const loggedIn = await AsyncStorage.getItem(ASYNC_CONST.loggedInUserInfo);
    return loggedIn;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ||
        myGlobal.userSuccessfullyLoggedInThroughFacebook ||
        myGlobal.userSuccessfullyLoggedInThroughGoogle ||
        myGlobal.userSuccessfullyLoggedInThroughApple ? (
          <>
            <Stack.Screen name={NAV_HOME} component={DrawerScreen} options={{headerShown: false}} />
          </>
        ) : (
          <>
            <Stack.Screen
              name={NAV_ON_BOARDING}
              component={OnBoarding}
              options={{headerShown: false, gestureEnabled: false}}
            />
          </>
        )}
        <Stack.Screen name={NAV_LOGIN} component={Login} options={{headerShown: false, gestureEnabled: false}} />
        <Stack.Screen
          name={NAV_DRAWER_SCREEN}
          component={DrawerScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen name={NAV_SIGN_UP} component={SignUp} options={{headerShown: false}} />
        <Stack.Screen
          name={NAV_RESET_PASSWORD_SEND_EMAIL}
          component={ResetPasswordSendEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NAV_RESET_PASSWORD_VERIFICATION_CODE}
          component={ResetPasswordVerificationCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NAV_RESET_PASSWORD_CREATE_PASSWORD}
          component={ResetPasswordCreatePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NAV_ADD_PROJECT}
          component={AddProject}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen name={FILTER} component={Filter} options={{headerShown: false}} />
        <Stack.Screen name={NAV_BIDS} component={Bids} options={{headerShown: false}} />
        <Stack.Screen name={NAV_INFO_TABS} component={InfoTabs} options={{headerShown: false}} />
        <Stack.Screen name={NAV_BLOG_DETAILS} component={BlogDetails} options={{headerShown: false}} />
        <Stack.Screen name={NAV_PROFILE_EDIT} component={EditProfile} options={{headerShown: false}} />
        <Stack.Screen name={NAV_CHANGE_PASSWORD} component={ChangePassword} options={{headerShown: false}} />
        <Stack.Screen name={NAV_ADDRESS_SCREEN} component={AddressScreen} options={{headerShown: false}} />
        <Stack.Screen name={NAV_BIDS_DETAIL} component={BidsDetails} options={{headerShown: false}} />
        <Stack.Screen name={NAV_BIDS_PROFILE} component={bidsProfile} options={{headerShown: false}} />
        <Stack.Screen name={NAV_BIDS_VIEW_PROFILE} component={bidsViewProfile} options={{headerShown: false}} />
        <Stack.Screen name={NAV_COMPLAINTS_DETAILS} component={complaintsDetail} options={{headerShown: false}} />
        <Stack.Screen name={NAV_CHAT_MESSAGE} component={MessageList} options={{headerShown: false}} />
        <Stack.Screen
          name={NAV_HELP_SCREEN}
          component={HelpPage}
          options={{headerBackTitle: localStrings.back, headerShown: false}}
        />
        <Stack.Screen name={NAV_ADD_REVIEW_SCREEN} component={AddReview} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStackNavigator;
