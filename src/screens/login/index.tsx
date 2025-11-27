/* eslint-disable camelcase */
/* eslint-disable global-require */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, TouchableOpacity, BackHandler, Alert, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FaceBookIcon from '../../assets/svg/FaceBookIcon';
import GoogleIcon from '../../assets/svg/GoogleIcon';
import {strings} from '../../constants/strings';
import {
  AccountText,
  BottomContainer,
  EmailContainer,
  ForgotPasswordText,
  IconContainer,
  LoginContainer,
  LogoContainer,
  LogoImage,
  SignInText,
  SignUpContainer,
  SignUpText,
  SocialLoginContainer,
  WelcomeText,
  ForgotPasswordTextContainer,
  BottomViewContainer,
} from './styled';
import {callLoginAPI, callSocialSignUpAPI} from '../../redux/actions/auth';
import {SubmitButton, ButtonText} from '../../style';
import FloatingLabelInput from '../../components/floatingLabelInput';
import {INavigation, ILoginAPIResponse} from '../../types';
import {IStore, ILoginPayload, ISocialMediaPayload} from '../../redux/types';
import {
  NAV_SIGN_UP,
  NAV_DRAWER_SCREEN,
  NAV_RESET_PASSWORD_SEND_EMAIL,
  NAV_DASHBOARD_SCREEN,
  NAV_ADDRESS_SCREEN,
  NAV_HELP_SCREEN,
} from '../../navigation/navConstants';
import colors from '../../style/colors';
import {ASYNC_CONST} from '../../helpers/constants';
import HelpIcon from '../../assets/svg/HelpButton';
import {
  isEmailOrPhoneValid,
  isValidEmail,
  loginWithFacebook,
  showToastMessage,
  isIOS,
  loginWithApple,
  loginWithGoogle,
} from '../../utils';
import AppleIcon from '../../assets/svg/AppleIcon';
import pngImages from '../../assets/images/pngImages';
import {userTypeHO} from '../../constants/utils/constantData';
import {HelpButton} from '../drawer/styled';

interface Props {
  navigation?: INavigation;
  callLoginAPI: (param: ILoginPayload) => Promise<any>;
  loginResponse: ILoginAPIResponse;
  callSocialSignUpAPI: (param: ISocialMediaPayload) => Promise<any>;
  isApiInProgress: boolean;
}
const myGlobal: any = global;
const Login: React.FC<Props> = (props: Props) => {
  const {callSocialSignUpAPI: pCallSocialSignUpAPI, loginResponse, isApiInProgress} = props;

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);
  const [encryptPassword, setEncryptPassword] = useState<boolean>(true);
  const [onPasswordFocus, setOnPasswordFocus] = useState<boolean>(false);

  useEffect(() => {
    if (loginResponse?.Success) {
      setEmail('');
      setEmailError('');
      setPassword('');
      setPasswordError('');
      setOnPasswordFocus(false);
      storeData(loginResponse);
    }
  }, [loginResponse]);

  const doLogin = () => {
    const {deviceToken} = myGlobal;
    if (password && email) {
      props.callLoginAPI({email, password, deviceToken});
    }
  };
  /**
   * Stored data
   */
  const storeData = async (res: ILoginAPIResponse) => {
    console.log('file: index.tsx:98 ~ storeData ~ res', res);
    try {
      const loginData = {
        userEmail: res?.Data?.Email,
        firstName: res?.Data?.FirstName,
        lastName: res?.Data?.LastName,
        userName: res?.Data?.FullName,
        userAvatar: res?.Data?.AvatarUrl,
        userAccessToken: res?.AccessToken,
        customerId: res?.Data?.CustomerId,
      };
      if (res?.Data?.QuickBloxLoginName !== null) {
        await AsyncStorage.setItem(ASYNC_CONST.qbLogin, res?.Data?.QuickBloxLoginName);
      }
      await AsyncStorage.setItem(ASYNC_CONST.accessToken, res.AccessToken);
      const customerId = JSON.stringify(res?.Data?.CustomerId);
      await AsyncStorage.setItem(ASYNC_CONST.customerId, customerId);
      myGlobal.tab = NAV_DASHBOARD_SCREEN;
      if (res.Data.IsInvitedUser === false) {
        await AsyncStorage.setItem(ASYNC_CONST.invitedUser, 'false');
      } else {
        await AsyncStorage.setItem(ASYNC_CONST.invitedUser, 'true');
      }
      if (res?.Data?.IsAddressCapture) {
        await AsyncStorage.setItem(ASYNC_CONST.loggedInUserInfo, JSON.stringify(loginData));
        props.navigation?.reset({
          index: 0,
          routes: [{name: NAV_DRAWER_SCREEN}],
        });
      }
    } catch (error) {
      console.log('store', error);
    }
  };
  /**
   * login with Facebook
   */
  const onFacebookSignUp = () => {
    loginWithFacebook()
      // eslint-disable-next-line consistent-return
      .then((res: any) => {
        if (res && !res.errorData) {
          pCallSocialSignUpAPI({
            email: res.userData.email || '',
            loginType: 1,
            deviceToken: myGlobal.deviceToken,
            socialMediaToken: res.accessToken,
            name: res.userData.name,
            externalIdentifier: res.userData.id,
            userType: userTypeHO,
            firstName: res?.userData?.first_name,
            lastName: res?.userData?.last_name,
          })
            .then(response => {
              if (response.Success) {
                if (response?.Data?.IsAddressCapture) {
                  setIsAPIinProgress(false);
                  storeData(response);
                } else {
                  myGlobal.userSuccessfullyLoggedInThroughFacebook = false;
                  props?.navigation?.navigate(NAV_ADDRESS_SCREEN);
                }
              }
              setIsAPIinProgress(false);
            })
            .catch((error: string) => {
              setIsAPIinProgress(false);
              showToastMessage(strings.error, error);
            });
        } else if (res.userData.email) {
          Alert.alert('', strings.checkEmailInSocialLogin, [
            {
              text: 'Cancel',
              onPress: () => props?.navigation?.navigate(NAV_SIGN_UP),
              style: 'cancel',
            },
          ]);
        }
      })
      .catch(() => {
        setIsAPIinProgress(false);
      });
  };

  /**
   * Sign Up with Apple
   */
  const onAppleSignUp = () => {
    loginWithApple()
      .then((res: any) => {
        if (res) {
          props
            .callSocialSignUpAPI({
              email: res?.email || '',
              loginType: 3,
              deviceToken: myGlobal.deviceToken,
              socialMediaToken: res?.identityToken,
              name: `${res?.fullName?.givenName} ${res?.fullName?.familyName}` || '',
              externalIdentifier: res?.user,
              userType: userTypeHO,
              firstName: res?.fullName?.givenName || '',
              lastName: res?.fullName?.familyName || '',
            })
            .then(response => {
              if (response.Success) {
                if (response?.Data?.IsAddressCapture) {
                  setIsAPIinProgress(false);
                  storeData(response);
                } else {
                  myGlobal.userSuccessfullyLoggedInThroughApple = false;
                  props?.navigation?.navigate(NAV_ADDRESS_SCREEN);
                }
              }
              setIsAPIinProgress(false);
            })
            .catch((error: string) => {
              setIsAPIinProgress(false);
              showToastMessage(strings.error, error);
            });
        } else {
          setIsAPIinProgress(false);
        }
      })
      .catch((error: {message: string}) => {
        setIsAPIinProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * Sign up With google
   */
  const onGoogleSignUp = () => {
    loginWithGoogle()
      .then((res: any) => {
        if (res && !res.errorData && res.user.email) {
          const socialMediaTokenByGmail = isIOS() ? res.idToken : res?.user?.id;
          pCallSocialSignUpAPI({
            email: res.user.email,
            loginType: 2,
            deviceToken: myGlobal.deviceToken,
            socialMediaToken: socialMediaTokenByGmail,
            name: res.user.name,
            externalIdentifier: res?.user?.id,
            userType: userTypeHO,
            firstName: res?.user?.givenName,
            lastName: res?.user?.familyName,
          })
            .then(response => {
              if (response.Success) {
                if (response?.Data?.IsAddressCapture) {
                  setIsAPIinProgress(false);
                  storeData(response);
                } else {
                  myGlobal.userSuccessfullyLoggedInThroughGoogle = false;
                  props?.navigation?.navigate(NAV_ADDRESS_SCREEN);
                }
              }
              setIsAPIinProgress(false);
            })
            .catch((error: string) => {
              setIsAPIinProgress(false);
              showToastMessage(strings.error, error);
            });
        }
      })
      .catch((error: any) => {
        setIsAPIinProgress(false);
      });
  };
  /**
   * function that toggle confirm password.
   */
  const togglePassword = () => {
    setEncryptPassword(!encryptPassword);
  };

  /**
   * Email/Phone validation
   */
  const validateEmailPhone = () => {
    if (email !== '') {
      const errorMsg = isEmailOrPhoneValid(email);
      setEmailError(errorMsg);
    }
  };
  const validatePassword = () => {
    setOnPasswordFocus(true);
  };
  const onChangeEmail = (value: string) => {
    if (value) {
      setEmail(value);
    } else {
      setEmail('');
    }
  };
  useEffect(() => {
    if (email !== '') {
      const errorMsg = isEmailOrPhoneValid(email);
      setEmailError(errorMsg);
    }
  }, [email]);
  useEffect(() => {
    validatePassword();
  }, [password]);

  useEffect(() => {
    const unsubscribe = props.navigation?.addListener('blur', () => {
      setEmail('');
      setEmailError('');
      setPassword('');
      setPasswordError('');
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (email && password) {
      setIsValidForm(!isValidEmail(email));
    } else {
      setIsValidForm(false);
    }
  }, [email, password]);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [props.navigation]);
  return (
    <LoginContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <LogoContainer>
        <LogoImage source={pngImages.bildsyIcon} />
      </LogoContainer>
      <BottomContainer testID={strings.keyboardDismissButton} onPress={() => Keyboard.dismiss()}>
        <WelcomeText>{strings.welcome}</WelcomeText>
        <SignInText>{strings.signInNow}</SignInText>
        <EmailContainer>
          <FloatingLabelInput
            testID={strings.userEmail}
            enableFocus={email !== ''}
            onChangeText={(value: string) => {
              onChangeEmail(value);
            }}
            onBlurHandler={() => validateEmailPhone()}
            inputValue={email}
            errorText={emailError}
            maxLength={64}
            label={strings.emailAddress}
            autoCapitalize="none"
          />
        </EmailContainer>
        <FloatingLabelInput
          testID={strings.password}
          enableFocus={password !== ''}
          encrypt={encryptPassword}
          onBlurHandler={() => validatePassword()}
          errorText={passwordError}
          inputValue={password}
          onChangeText={(value: string) => {
            setPassword(value);
          }}
          isShowOpenEye={true}
          onPressRightIcon={() => togglePassword()}
          label={strings.password}
        />
        <BottomViewContainer>
          <ForgotPasswordTextContainer
            testID={strings.forgotPasswordBtn}
            onPress={() => props.navigation?.navigate(NAV_RESET_PASSWORD_SEND_EMAIL)}>
            <ForgotPasswordText>{strings.forgetPassword}</ForgotPasswordText>
          </ForgotPasswordTextContainer>
          <SubmitButton selected={isValidForm} disabled={!isValidForm} onPress={doLogin} testID={strings.loginButton}>
            <ButtonText>
              {!isApiInProgress && strings.signIn}
              {isApiInProgress && <ActivityIndicator size="small" color={colors.white} />}
            </ButtonText>
          </SubmitButton>
          <SocialLoginContainer>
            <TouchableOpacity
              disabled={isApiInProgress}
              onPress={() => {
                onGoogleSignUp();
              }}
              testID={strings.googleBtn}>
              <GoogleIcon />
            </TouchableOpacity>

            {isIOS() && (
              <IconContainer>
                <TouchableOpacity
                  disabled={isApiInProgress}
                  onPress={() => {
                    onAppleSignUp();
                  }}
                  testID={strings.appleBtn}>
                  <AppleIcon />
                </TouchableOpacity>
              </IconContainer>
            )}
            <IconContainer>
              <TouchableOpacity
                disabled={isApiInProgress}
                onPress={() => {
                  onFacebookSignUp();
                }}
                testID={strings.facebookBtn}>
                <FaceBookIcon />
              </TouchableOpacity>
            </IconContainer>
          </SocialLoginContainer>
          <SignUpContainer
            onPress={() => {
              props?.navigation?.navigate(NAV_SIGN_UP);
            }}
            testID={strings.signUpBtn}>
            <AccountText>{strings.noAccount}</AccountText>
            <SignUpText>{strings.signUp}</SignUpText>
          </SignUpContainer>
        </BottomViewContainer>
      </BottomContainer>
    </LoginContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  loginResponse: store.auth.payload,
  isApiInProgress: store.auth.isApiInProgress,
});

const mapDispatchToProps = {
  callLoginAPI,
  callSocialSignUpAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
