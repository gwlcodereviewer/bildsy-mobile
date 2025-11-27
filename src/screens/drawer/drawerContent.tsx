import {DrawerContentScrollView, useDrawerStatus} from '@react-navigation/drawer';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {LoginManager} from 'react-native-fbsdk-next';
import DrawerHome from '../../assets/svg/drawer/DrawerHome';
import SignOut from '../../assets/svg/drawer/SignOut';
import HelpIcon from '../../assets/svg/HelpButton';
import {
  Container,
  ImageContainer,
  ItemText,
  LabelName,
  ListContainer,
  ListItemContainer,
  UserEmail,
  UserName,
  UserProfileContainer,
  UserProfileImage,
  SignOutContainer,
  MainLoaderContainer,
  HelpButton,
  VersionName,
  SignOutItemText,
} from './styled';
import DrawerBlogs from '../../assets/svg/drawer/DrawerBlogs';
import DrawerProject from '../../assets/svg/drawer/DrawerProject';
import {
  NAV_BLOGS_SCREEN,
  NAV_DASHBOARD_SCREEN,
  NAV_PROJECTS_SCREEN,
  NAV_HELP,
  NAV_LOGIN,
  NAV_PROFILE_DETAILS,
} from '../../navigation/navConstants';
import {ASYNC_CONST} from '../../helpers/constants';
import {localStrings} from '../../localization/localStrings';
import {IStoreUserProfileDetails} from '../../redux/types';
import {callSignOutAPI, callGetUserProfileAPI} from '../../redux/actions/auth';
import {INavigation} from '../../style/types';
import {navProjects, navBlogs, navDashboard, navHelp} from '../../constants/utils/constantData';
import pngImages from '../../assets/images/pngImages';
import {IGetConfiguration, IUserDetailAPIResponse} from '../../types';
import colors from '../../style/colors';
import styles from '../../style/style';
import baseUrl from '../../configs';
import ConfirmModal from '../bids/ConfirmModal';
import {clearUserData} from '../../utils';
import DrawerHelpIcon from '../../assets/svg/drawer/DrawerHelpIcon';

export const DrawerItems = [
  {name: navDashboard, isSelected: true},
  {name: navProjects, isSelected: false},
  {name: navBlogs, isSelected: false},
  {name: navHelp, isSelected: false},
];

interface IUserInfo {
  email?: string;
  firstName?: string;
  lastName?: string;
  userAvatar: string;
  userName?: string;
}
interface Props {
  navigation: INavigation;
  callSignOutAPI: () => Promise<any>;
  userDetailResponse: IUserDetailAPIResponse;
  callGetUserProfileAPI: () => Promise<any>;
  getQBConfigResponse: IGetConfiguration | undefined;
}
const myGlobal: any = global;

const DrawerContent = (props: Props) => {
  const {
    navigation,
    callSignOutAPI: pCallSignOutAPI,
    callGetUserProfileAPI: pCallGetUserProfileAPI,
    userDetailResponse,
    getQBConfigResponse,
  } = props;
  const [isAPIInProgress, setIsAPIInProgress] = useState<boolean>(false);
  const [toggleConfirmModal, setToggleConfirmModal] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: '',
    firstName: '',
    lastName: '',
    userAvatar: '',
    userName: '',
  });

  const getIcon = (title: string, isSelected: boolean) => {
    switch (title) {
      case navDashboard:
        return <DrawerHome isSelected={isSelected} />;
      case navProjects:
        return <DrawerProject isSelected={isSelected} />;
      case navBlogs:
        return <DrawerBlogs isSelected={isSelected} />;
      case navHelp:
        return <DrawerHelpIcon isSelected={isSelected} />;
      default:
        return <DrawerProject isSelected={isSelected} />;
    }
  };
  const navigationRoutes = {
    Dashboard: NAV_DASHBOARD_SCREEN,
    Projects: NAV_PROJECTS_SCREEN,
    Blogs: NAV_BLOGS_SCREEN,
    Help: NAV_HELP,
  };

  const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

  const isDrawerOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    pCallGetUserProfileAPI();
    setIsAPIInProgress(true);
    if (userDetailResponse.Success) {
      setUserInfo({
        email: userDetailResponse?.Data.Email,
        firstName: userDetailResponse?.Data.FirstName.trim().split(/ +/).join(' '),
        lastName: userDetailResponse?.Data.LastName.trim().split(/ +/).join(' '),
        userName: userDetailResponse?.Data.FullName,
        userAvatar: userDetailResponse?.Data.AvatarUrl,
      });
      setIsAPIInProgress(false);
    } else {
      AsyncStorage.getItem(ASYNC_CONST.loggedInUserInfo)
        .then(data => {
          const userData = JSON.parse(data || '');
          setUserInfo({
            email: userData?.userEmail,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            userName: userData?.userName,
            userAvatar: userData?.userAvatar || null,
          });
          setIsAPIInProgress(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [isDrawerOpen]);

  const signOut = () => {
    pCallSignOutAPI()
      .then(async (res: {Success: boolean}) => {
        if (res.Success) {
          clearUserData(() => {
            navigation?.reset({
              index: 0,
              routes: [{name: NAV_LOGIN}],
            });
          });
        }
      })
      .catch((error: {message: string | undefined}) => {
        console.log('', JSON.stringify(error));
      });
  };
  const onPressPrevious = () => {
    myGlobal.tab = NAV_PROFILE_DETAILS;
    navigation.navigate(NAV_PROFILE_DETAILS);
  };
  // eslint-disable-next-line consistent-return
  const getIndex = () => {
    if (myGlobal.tab === NAV_DASHBOARD_SCREEN) return 0;
    if (myGlobal.tab === NAV_PROJECTS_SCREEN) return 1;
    if (myGlobal.tab === NAV_BLOGS_SCREEN) return 2;
    if (myGlobal.tab === NAV_HELP) return 3;
    return 0;
  };
  return (
    <Container>
      <DrawerContentScrollView {...props}>
        <UserProfileContainer
          onPress={() => {
            onPressPrevious();
          }}>
          {isAPIInProgress && (
            <MainLoaderContainer>
              <ActivityIndicator size="large" color={colors.white} style={styles.activityIndicator} />
            </MainLoaderContainer>
          )}
          <ImageContainer>
            <UserProfileImage source={userInfo.userAvatar ? {uri: userInfo.userAvatar} : pngImages.defaultUserImage} />
            <LabelName>{localStrings.homeowner}</LabelName>
          </ImageContainer>
          <UserName numberOfLines={1} ellipsizeMode="tail">
            {userInfo.userName ? userInfo.userName : `${userInfo.firstName} ${userInfo.lastName}`}
          </UserName>
          <UserEmail>{userInfo.email}</UserEmail>
        </UserProfileContainer>
        <ListContainer>
          {DrawerItems.map((element, index) => (
            <ListItemContainer
              key={element.name}
              isSelected={index === getIndex()}
              onPress={() => {
                if (getKeyValue(element.name)(navigationRoutes) === NAV_HELP) {
                  myGlobal.tab = getKeyValue(element.name)(navigationRoutes);
                  props.navigation.navigate(NAV_HELP, {
                    params: {screenName: getKeyValue(element.name)(navigationRoutes)},
                  });
                } else {
                  props.navigation.navigate(NAV_DASHBOARD_SCREEN, {
                    params: {screenName: getKeyValue(element.name)(navigationRoutes)},
                  });
                  myGlobal.tab = getKeyValue(element.name)(navigationRoutes);
                }
              }}>
              {getIcon(element.name, index === getIndex())}
              <ItemText isSelected={index === getIndex()}>{element.name}</ItemText>
            </ListItemContainer>
          ))}
          <SignOutContainer
            onPress={() => {
              setToggleConfirmModal(true);
            }}>
            <SignOut />
            <SignOutItemText isSelected={false}>{localStrings.signOut} </SignOutItemText>
          </SignOutContainer>
          {!baseUrl.isProduction && <VersionName>Version 4.9</VersionName>}
        </ListContainer>
      </DrawerContentScrollView>
      <ConfirmModal
        toggle={toggleConfirmModal}
        message={localStrings.signOutConfirmation}
        changeToggleValue={(toggleValue: boolean) => {
          setToggleConfirmModal(toggleValue);
        }}
        onConfirm={() => {
          signOut();
        }}
      />
    </Container>
  );
};
const mapStateToProps = (store: IStoreUserProfileDetails) => ({
  userDetailResponse: store?.userProfile?.payload,
  getQBConfigResponse: store?.qbConfigKey?.payload,
});

const mapDispatchToProps = {
  callSignOutAPI,
  callGetUserProfileAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
