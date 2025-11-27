import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Linking, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRemoveAccountResponse, IStoreUserProfileDetails} from '../../redux/types';

import {
  BottomContainer,
  BottomDetailsContainer,
  BottomDetailsSubContainer,
  BottomElementsContainer,
  ChangePasswordContainer,
  Container,
  DeleteText,
  EditIconContainer,
  Location,
  LocationRowContainer,
  MailAddress,
  MailRowContainer,
  MainLoaderContainer,
  PathIcon,
  PhoneNumber,
  PhoneRowContainer,
  ProfileDescContainer,
  ProfileEditIcon,
  ProfileImage,
  ProfileLocationIcon,
  ProfileMailIcon,
  ProfileName,
  ProfilePhoneIcon,
  ProfileRowContainer,
  RightArrowContainer,
  SignOutContainer,
  SignOutText,
  TimeText,
  TypeText,
} from './styled';

import pngImages from '../../assets/images/pngImages';
import DeleteIcon from '../../assets/svg/DeleteRedIcon';
import DrawerIcon from '../../assets/svg/drawer/DrawerIcon';
import SignOut from '../../assets/svg/drawer/SignOut';
import LockIcon from '../../assets/svg/LockIcon';
import ModalView from '../../components/modalView';
import {strings} from '../../constants/strings';
import {APPLE_ACCOUNT, DELETE_REGEX, FACEBOOK_ACCOUNT, GOOGLE_ACCOUNT} from '../../constants/utils/constantData';
import {localStrings} from '../../localization/localStrings';
import {NAV_CHANGE_PASSWORD, NAV_LOGIN, NAV_PROFILE_EDIT} from '../../navigation/navConstants';
import {fcmService} from '../../push-notification/FCMService';
import {callGetUserProfileAPI, callRemoveAccountAPI, callSignOutAPI} from '../../redux/actions/auth';
import {PageTitle, PageTitleContainer} from '../../style';
import colors from '../../style/colors';
import styles from '../../style/style';
import {INavigation, IUserDetailAPIResponse} from '../../types';
import {clearUserData, showToastMessage, VALIDATION_REGEX} from '../../utils';
import ConfirmModal from '../bids/ConfirmModal';
import DeleteModal from './deleteModal';
import {ASYNC_CONST} from '../../helpers/constants';

interface IUserInfo {
  email?: string;
  firstName?: string;
  lastName?: string;
  userAvatar: string;
  userName?: string;
  customerRoleName?: string;
  phone?: string;
  address?: string;
  memberSince?: string;
  customerId: number;
  ProviderSystemName?: number;
}

interface Props {
  navigation: INavigation;
  callGetUserProfileAPI: () => Promise<any>;
  userDetailResponse: IUserDetailAPIResponse;
  callSignOutAPI: () => Promise<any>;
  callRemoveAccountAPI: (id: number, status: boolean) => Promise<IRemoveAccountResponse>;
  isRemoveAPIinProgress?: boolean;
}
const ViewProfileScreen: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    callGetUserProfileAPI: pCallGetUserProfileAPI,
    callSignOutAPI: pCallSignOutAPI,
    userDetailResponse,
    callRemoveAccountAPI: _callRemoveAccountAPI,
    isRemoveAPIinProgress,
  } = props;
  const [toggleConfirmModal, setToggleConfirmModal] = useState<boolean>(false);
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);
  const [removeAccount, setRemoveAccount] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);
  const [deleteText, setDeleteText] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: '',
    firstName: '',
    lastName: '',
    userAvatar: '',
    userName: '',
    customerRoleName: '',
    address: '',
    phone: '',
    memberSince: '',
    customerId: 0,
    ProviderSystemName: 0,
  });
  const refreshData = () => {
    getProfileAPIData();
  };

  useEffect(() => {
    if (userDetailResponse?.Success) {
      setUserInfo({
        email: userDetailResponse.Data.Email,
        firstName: userDetailResponse.Data.FirstName,
        lastName: userDetailResponse.Data.LastName,
        userName: userDetailResponse.Data.FullName,
        userAvatar: userDetailResponse.Data.AvatarUrl,
        customerRoleName:
          userDetailResponse.Data.CustomerRoleName.charAt(0).toUpperCase() +
          userDetailResponse.Data.CustomerRoleName.slice(1).toLowerCase(),
        address: userDetailResponse.Data.StreetAddress,
        phone: userDetailResponse.Data.Phone,
        memberSince: moment(userDetailResponse.Data.MemberSince).format('LL'),
        customerId: userDetailResponse.Data.CustomerId,
        ProviderSystemName: userDetailResponse?.Data?.ProviderSystemName,
      });
    }
    setIsAPIinProgress(false);
  }, [userDetailResponse]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfileAPIData();
    });
    setIsAPIinProgress(true);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setDeleteText('');
    setErrorText('');
  }, [removeAccount]);

  const getProfileAPIData = () => {
    setIsAPIinProgress(true);
    pCallGetUserProfileAPI();
  };

  const makeCall = (mobileNumber: string) => {
    let PhoneNumberValue = '';
    let theNumber = '';
    theNumber = mobileNumber.replace(VALIDATION_REGEX.phoneNumber, '');
    if (Platform.OS === 'android') {
      PhoneNumberValue = `tel:${theNumber}`;
    } else {
      PhoneNumberValue = `telprompt:${theNumber}`;
    }
    Linking.openURL(PhoneNumberValue);
  };

  const PageHeaderContainer = () => (
    <PageTitleContainer>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <DrawerIcon />
      </TouchableOpacity>
      <PageTitle>{localStrings.viewProfile}</PageTitle>
    </PageTitleContainer>
  );

  const goToProfileEdit = () => {
    props.navigation.navigate(NAV_PROFILE_EDIT, {callback: () => refreshData()});
  };

  const goToChangePassword = () => {
    props.navigation.navigate(NAV_CHANGE_PASSWORD);
  };

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
        console.log(error.message);
      });
  };

  /**
   * Function to redirect to login
   */
  const redirectToLogin = async () => {
    await fcmService.clearNotification();
    clearUserData(() => {
      navigation?.reset({
        index: 0,
        routes: [{name: NAV_LOGIN}],
      });
    });
  };

  /**
   * Function to revoke google account access
   */
  const revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      redirectToLogin();
    } catch (error) {
      showToastMessage(strings.error, error.Message);
    }
  };

  /**
   * Function to check account status
   */
  const checkRemoveStatus = () => {
    setDeleteToggle(false);
    _callRemoveAccountAPI(userInfo?.customerId, false)
      .then(res => {
        if (res?.Success) {
          setDeleteToggle(true);
        }
      })
      .catch(error => {
        showToastMessage(strings.error, error.Message);
      });
  };

  /**
   * Function to delete user account
   */
  const deleteAccount = () => {
    if (deleteText.length === 6) {
      const isDelete = DELETE_REGEX.test(deleteText);
      if (isDelete) {
        setDeleteToggle(false);
        _callRemoveAccountAPI(userInfo?.customerId, true)
          .then(res => {
            if (res?.Success) {
              if (userInfo?.ProviderSystemName === GOOGLE_ACCOUNT) {
                revokeAccess();
              } else if (userInfo?.ProviderSystemName === FACEBOOK_ACCOUNT) {
                // TODO: Add revoke logic for FB
              } else if (userInfo?.ProviderSystemName === APPLE_ACCOUNT) {
                // TODO: Add revoke logic for Apple account
              }
              redirectToLogin();
            }
          })
          .catch(error => {
            showToastMessage(strings.error, error.Message);
          });
      } else {
        setErrorText(localStrings.deleteError);
      }
    } else {
      setErrorText(localStrings.deleteError);
    }
  };

  return (
    <Container source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <BottomContainer>
        {isAPIinProgress ||
          (isRemoveAPIinProgress && (
            <MainLoaderContainer>
              <ActivityIndicator size="large" color={colors.primaryThemeColor} style={styles.activityIndicator} />
            </MainLoaderContainer>
          ))}
        <BottomElementsContainer>
          <EditIconContainer>
            <TouchableOpacity onPress={() => goToProfileEdit()} testID={strings.editProfileBtn}>
              <ProfileEditIcon source={pngImages.editViewProfileIcon} resizeMode="cover" />
            </TouchableOpacity>
          </EditIconContainer>
          <ProfileRowContainer>
            <ProfileImage source={userInfo.userAvatar ? {uri: userInfo.userAvatar} : pngImages.defaultUserImage} />
            <ProfileDescContainer>
              <TypeText>{userInfo.customerRoleName}</TypeText>
              <ProfileName numberOfLines={1} ellipsizeMode="tail">
                {userInfo.userName ? userInfo.userName : `${userInfo.firstName} ${userInfo.lastName}`}
              </ProfileName>
              <TimeText>{userInfo.memberSince}</TimeText>
            </ProfileDescContainer>
          </ProfileRowContainer>
          <BottomDetailsContainer>
            {userInfo.phone !== null && userInfo.phone !== '' ? (
              <PhoneRowContainer>
                <TouchableOpacity testID={strings.makeCallButton} onPress={() => makeCall(`${userInfo.phone}`)}>
                  <ProfilePhoneIcon source={pngImages.iconsInputPhone} resizeMode="cover" />
                </TouchableOpacity>
                <PhoneNumber>{userInfo.phone}</PhoneNumber>
              </PhoneRowContainer>
            ) : null}
            <MailRowContainer>
              <ProfileMailIcon source={pngImages.iconsInputMessage} resizeMode="cover" />
              <MailAddress>{userInfo.email}</MailAddress>
            </MailRowContainer>
            <LocationRowContainer>
              <ProfileLocationIcon source={pngImages.iconsLocation} resizeMode="cover" />
              <Location numberOfLines={5} ellipsizeMode="tail">
                {userInfo.address}
              </Location>
            </LocationRowContainer>
          </BottomDetailsContainer>
        </BottomElementsContainer>

        <ChangePasswordContainer testID={strings.changePasswordBtn} onPress={() => goToChangePassword()}>
          <BottomDetailsSubContainer>
            <LockIcon />
            <SignOutText>{localStrings.changePassword}</SignOutText>
          </BottomDetailsSubContainer>
          <RightArrowContainer>
            <PathIcon source={pngImages.pathIcons} resizeMode="cover" />
          </RightArrowContainer>
        </ChangePasswordContainer>
        <SignOutContainer
          testID={localStrings.deleteAccount}
          onPress={() => {
            setRemoveAccount(true);
          }}>
          <BottomDetailsSubContainer>
            <DeleteIcon />
            <DeleteText onPress={() => setRemoveAccount(true)}>{localStrings.deleteAccount}</DeleteText>
          </BottomDetailsSubContainer>
          <RightArrowContainer>
            <PathIcon source={pngImages.pathIcons} resizeMode="cover" />
          </RightArrowContainer>
        </SignOutContainer>
        <SignOutContainer
          testID={strings.signOutBtn}
          onPress={() => {
            setToggleConfirmModal(true);
          }}>
          <BottomDetailsSubContainer>
            <SignOut />
            <SignOutText>{localStrings.signOut}</SignOutText>
          </BottomDetailsSubContainer>
          <RightArrowContainer>
            <PathIcon source={pngImages.pathIcons} resizeMode="cover" />
          </RightArrowContainer>
        </SignOutContainer>
      </BottomContainer>
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
      <ModalView
        modalHeaderText={localStrings.deleteAccount}
        visible={removeAccount}
        modalMessage={localStrings.deleteConfirmation}
        onPress={() => {
          setRemoveAccount(false);
          checkRemoveStatus();
        }}
        modalPrimaryBtnName={localStrings.ok}
        isDoubleButton={true}
        onModalClose={() => setRemoveAccount(false)}
      />
      <DeleteModal
        modalHeaderText={localStrings.deleteTitle}
        visible={deleteToggle}
        onPress={() => deleteAccount()}
        modalPrimaryBtnName={localStrings.yes}
        isDoubleButton={true}
        onModalClose={() => setDeleteToggle(false)}
        placeHolder={localStrings.enter}
        onChangeValue={value => setDeleteText(value)}
        inputValue={deleteText}
        errorText={errorText}
      />
    </Container>
  );
};

const mapStateToProps = (store: IStoreUserProfileDetails) => ({
  userDetailResponse: store?.userProfile?.payload,
  loginResponse: store?.auth?.payload,
  removeAccountResponse: store?.removeAccount?.payload,
  isRemoveAPIinProgress: store?.removeAccount?.isApiInProgress,
});
const mapDispatchToProps = {
  callGetUserProfileAPI,
  callSignOutAPI,
  callRemoveAccountAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);
