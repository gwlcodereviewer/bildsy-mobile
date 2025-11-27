/* eslint-disable camelcase */
import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Animated, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ModalDropdown from 'react-native-modal-dropdown';
import {connect} from 'react-redux';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import RNGooglePlaces from 'react-native-google-places';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleIcon from '../../assets/svg/GoogleIcon';
import FaceBookIcon from '../../assets/svg/FaceBookIcon';
import {
  countryId,
  HOMEOWNER,
  PROFESSIONAL,
  SOCIAL_AUTH_VALIDATION,
  userTypeHO,
} from '../../constants/utils/constantData';
import {
  SignUpContainer,
  LogoContainer,
  LogoImage,
  MainBodyScroll,
  BoldTitle,
  FormContainer,
  BottomContainer,
  InputFieldContainer,
  DropDownRowContainer,
  DropDownSubContainer,
  DropDownView,
  CheckBoxRowContainer,
  TextContainer,
  NormalText,
  UnderlineText,
  TextCenterComponent,
  InputFieldContainerPressable,
  BlankInputView,
  ErrorContainer,
  ErrorMessage,
  ErrorMessageView,
  SocialLoginContainer,
  IconContainer,
  InputCheckFieldContainer,
} from './styled';
import {strings} from '../../constants/strings';
import {
  isValidEmail,
  isValidPassword,
  isIOS,
  isEmailOrPhoneValid,
  checkValidPassword,
  equalPasswordAndConfirm,
  showToastMessage,
  loginWithFacebook,
  loginWithGoogle,
  loginWithApple,
  extraSpaceRemove,
  VALIDATION_REGEX,
} from '../../utils';
import {rh, rpx, rw} from '../../style/Dimen';
import colors from '../../style/colors';
import styles from '../../style/style';
import {localStrings} from '../../localization/localStrings';
import {SubmitButton, ButtonText} from '../../style';
import FloatingLabelInput from '../../components/floatingLabelInput';
import DownArrow from '../../assets/svg/DownArrow';
import {INavigation, ICountryStateResponse} from '../../style/types';
import {
  NAV_LOGIN,
  NAV_DRAWER_SCREEN,
  NAV_DASHBOARD_SCREEN,
  NAV_SIGN_UP,
  NAV_ADDRESS_SCREEN,
} from '../../navigation/navConstants';
import {
  callEmailExitsAPI,
  callGetStateAPI,
  callProLoginAPI,
  callProUserDetails,
  callSignUpAPI,
  callSocialSignUpAPI,
} from '../../redux/actions/auth';
import {
  IAuthStateType,
  IStore,
  ISocialMediaPayload,
  IEmailRequest,
  IEmailResponse,
  ILoginPayload,
  IUserResponse,
} from '../../redux/types';
import {URLS} from '../../constants/server';
import AppleIcon from '../../assets/svg/AppleIcon';
import {ASYNC_CONST} from '../../helpers/constants';
import ModalView from '../../components/modalView';
import {ILoginAPIResponse, IGoogleUserResponseType} from '../../types';
import pngImages from '../../assets/images/pngImages';
import LoginModalView from './loginModal';

interface Props {
  navigation?: INavigation;
  callGetStateAPI: (param: number) => Promise<any>;
  callSignUpAPI: any;
  auth?: IAuthStateType;
  callSocialSignUpAPI: (param: ISocialMediaPayload) => Promise<any>;
  isAPIinProgress?: boolean;
  socialSignInResponse: ILoginAPIResponse;
  isUserSignedIn?: boolean;
  isSignUpAPIinProgress?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  contryObjProps?: object;
  callEmailExitsAPI: (param: IEmailRequest) => Promise<IEmailResponse>;
  callProLoginAPI: (param: ILoginPayload) => Promise<any>;
  callProUserDetails: (param: IEmailRequest) => Promise<IUserResponse>;
  proUserDetails: IUserResponse;
}
interface IFormInput {
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  confirmPassword: string;
  confirmPasswordError: string;
  phone: string;
  address: string;
  suiteAddress: string;
  addressError: string;
  city: string;
  cityError: string;
  zipCode: string;
  zipCodeError: string;
  toggleCheckBox: boolean;
  country: string;
  state: string;
  countryError: string;
  stateError: string;
  checkBoxError: string;
  latitude: string;
  longitude: string;
  phoneNumberLength: number;
  phoneError: string;
}
const myGlobal: any = global;
const SignUp: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    callGetStateAPI: pCallGetStateAPI,
    callSignUpAPI: pCallSignUpAPI,
    callSocialSignUpAPI: pCallSocialSignUpAPI,
    isAPIinProgress,
    socialSignInResponse,
    isUserSignedIn,
    isSignUpAPIinProgress,
    contryObjProps,
    callEmailExitsAPI: pCallEmailExitsAPI,
    callProLoginAPI: pCallProLoginAPI,
    callProUserDetails: pCallProUserDetails,
    proUserDetails,
  } = props;
  const {
    firstNameRequired,
    lastNameRequired,
    emailIsRequired,
    selectCountry,
    selectState,
    passwordIsRequired,
    addressIsRequired,
    required,
    pleaseCheckYourEmail,
    ok,
    signUpSuccessfully,
    minDigit,
  } = localStrings;
  const [formInput, setFormInput] = useState<IFormInput>({
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    phone: '',
    address: '',
    suiteAddress: '',
    addressError: '',
    city: '',
    cityError: '',
    zipCode: '',
    zipCodeError: '',
    toggleCheckBox: false,
    country: '',
    state: '',
    countryError: '',
    stateError: '',
    checkBoxError: '',
    latitude: '',
    longitude: '',
    phoneNumberLength: 10,
    phoneError: '',
  });
  const [encryptPassword, setEncryptPassword] = useState<boolean>(true);
  const [encryptConfirmPassword, setEncryptConfirmPassword] = useState<boolean>(true);
  const [stateResponse, setStateResponse] = useState<ICountryStateResponse[]>([]);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [animatedIsFocused] = useState(new Animated.Value(0));
  const [selectedStateId, setSelectedStateId] = useState<number>(0);
  const [countryData, setCountryData] = useState(
    {
      countryIndex: 0,
      countryName: selectCountry,
    } || contryObjProps,
  );
  const [stateList, setStateList] = useState<string[]>([]);
  const [stateData, setStateData] = useState({
    stateIndex: 0,
    stateName: selectState,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [isAutoFill, setIsAutoFill] = useState<boolean>(false);
  const [proPassword, setProPassword] = useState<string>('');

  /**
   * Animation
   */
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  });

  useEffect(() => {
    getStateList();
  }, []);

  useEffect(() => {
    if (proUserDetails?.Success && isAutoFill) {
      AsyncStorage.removeItem(ASYNC_CONST.accessToken);
      setFormInput({
        ...formInput,
        firstName: proUserDetails?.Data?.GetCustomer?.FirstName,
        firstNameError: '',
        lastName: proUserDetails?.Data?.GetCustomer?.LastName,
        lastNameError: '',
        email: proUserDetails?.Data?.GetCustomer?.Email,
        emailError: '',
        password: proPassword,
        passwordError: '',
        confirmPassword: proPassword,
        confirmPasswordError: '',
        phone: proUserDetails?.Data?.GetCustomer?.PhoneNumber,
        phoneNumberLength: 14,
        phoneError: '',
      });
      setLoader(false);
      setLoginModal(false);
    }
  }, [proUserDetails]);

  const placeAddressComponent = {
    ZIP_CODE: 'postal_code',
    COUNTRY: 'country',
    STATE: 'administrative_area_level_1',
    CITY: 'locality',
    TOWN: 'sublocality_level_1',
    AREA: 'sublocality_level_2',
    NEAREST_ROAD: 'route',
    NAME: 'name',
    STREET_NUMBER: 'street_number',
  };

  function getAddressComponent(addressComponents: any[], key: string) {
    let value = '';
    const postalCodeType = addressComponents.filter(aComp =>
      aComp.types.some((typesItem: string) => typesItem === key),
    );
    if (postalCodeType != null && postalCodeType.length > 0) value = postalCodeType[0].name;
    return value;
  }

  useEffect(() => {
    const element = stateResponse.find(ele => ele.name === formInput.state);
    if (element) {
      setSelectedStateId(element.id);
    }
  }, [stateResponse]);

  const openAddressModal = () => {
    RNGooglePlaces.openAutocompleteModal({country: 'US', type: 'address'}).then(
      (place: {addressComponents: any[]; address: any; location: any}) => {
        const country = getAddressComponent(place.addressComponents, placeAddressComponent.COUNTRY);
        const state = getAddressComponent(place.addressComponents, placeAddressComponent.STATE);
        const city = getAddressComponent(place.addressComponents, placeAddressComponent.CITY);
        const zip = getAddressComponent(place.addressComponents, placeAddressComponent.ZIP_CODE);
        const streetNumber = getAddressComponent(place.addressComponents, placeAddressComponent.STREET_NUMBER);
        const name = getAddressComponent(place.addressComponents, placeAddressComponent.NEAREST_ROAD);
        let addressValue = streetNumber.concat(' ', name);
        if (!addressValue || addressValue.trim() === '' || addressValue == null) {
          addressValue = place.address;
        }
        setStateData({
          stateIndex: 0,
          stateName: state,
        });
        getStateList();
        setFormInput({
          ...formInput,
          zipCode: zip,
          latitude: place.location.latitude,
          longitude: place.location.longitude,
          address: addressValue,
          country,
          state,
          city,
        });
      },
    );
  };

  useEffect(() => {
    if (
      formInput.firstName &&
      formInput.lastName &&
      formInput.email &&
      !isValidEmail(formInput.email) &&
      formInput.address &&
      formInput.password &&
      !isValidPassword(formInput.password) &&
      formInput.confirmPassword &&
      !formInput.confirmPasswordError &&
      formInput.city &&
      formInput.zipCode &&
      formInput.toggleCheckBox &&
      stateData.stateName !== selectState
    ) {
      if (formInput.phone && formInput.phone.length === formInput.phoneNumberLength) {
        setIsValidForm(true);
      } else if (formInput.phone.length === 0) {
        setIsValidForm(true);
      } else {
        setIsValidForm(false);
      }
    } else {
      setIsValidForm(false);
    }
  });
  /**
   * function for getting list of states according to the selected country.
   * @param index of selected country.
   */
  const getStateList = () => {
    const arrStateNameList: string[] = [];
    pCallGetStateAPI(countryId)
      .then((res: any) => {
        if (res != null && res?.model?.length > 1) {
          arrStateNameList.push(selectState);
          setStateResponse(res.model);
          const element = res.model.find((ele: {name: string}) => ele.name === formInput.state);
          if (element) {
            setSelectedStateId(element.id);
          }
          for (let i = 0; i < res?.model?.length; ) {
            arrStateNameList.push(res.model[i].name);
            i += 1;
          }
          setStateList(arrStateNameList);
        } else if (res != null && res?.model?.length === 1) {
          setStateResponse(res.model);
          arrStateNameList.push(res.model[0].name);
          setStateList(arrStateNameList);
          setStateData({stateIndex: 0, stateName: arrStateNameList[0]});
        }
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };

  /**
   * Function for getting user selected state Id.
   * @param index Selected state index.
   * @param text Selected state name.
   */
  const onSelectState = (index: number, text: string) => {
    setStateData({stateIndex: index, stateName: text});
    if (text !== selectState) {
      setSelectedStateId(stateResponse[index - 1]?.id);
      setFormInput({
        ...formInput,
        stateError: '',
      });
    } else {
      setFormInput({
        ...formInput,
        stateError: required,
      });
    }
  };
  useEffect(() => {
    if (socialSignInResponse?.Success) {
      if (isUserSignedIn && socialSignInResponse?.Data?.IsAddressCapture) {
        storeData(socialSignInResponse);
      }
    }
  }, [socialSignInResponse]);
  /**
   * function for calling API
   */
  const onSignUp = () => {
    const {firstName, lastName, email, password, confirmPassword, phone, address, city, zipCode, suiteAddress} =
      formInput;
    pCallSignUpAPI({
      firstName: extraSpaceRemove(firstName),
      lastName: extraSpaceRemove(lastName),
      email,
      password,
      confirmPassword,
      phone,
      address,
      city,
      zipCode,
      countryId,
      stateId: selectedStateId,
      longitude: formInput.longitude,
      latitude: formInput.latitude,
      id: 0,
      suite: suiteAddress,
      deviceToken: myGlobal.deviceToken,
    })
      .then((res: {Success: boolean; Message: string}) => {
        if ((!res.Message || res.Message === null) && res.Success === true) {
          setShowModal(true);
        }
      })
      .catch((error: {message: string}) => {
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * Sign up With google
   */
  const onGoogleSignUp = () => {
    loginWithGoogle()
      .then((res: IGoogleUserResponseType) => {
        if (res && !res.errorData && res?.user?.email) {
          const socialMediaTokenByGmail = isIOS() ? res.idToken : res.user.id;
          pCallSocialSignUpAPI({
            email: res.user.email,
            loginType: 2,
            deviceToken: myGlobal.deviceToken,
            socialMediaToken: socialMediaTokenByGmail,
            name: res.user.name,
            externalIdentifier: res.user.id,
            userType: userTypeHO,
            firstName: res?.user?.givenName,
            lastName: res?.user?.familyName,
          })
            .then(response => {
              if (response.Success) {
                if (response?.Data?.IsAddressCapture) {
                  storeData(response);
                } else {
                  myGlobal.userSuccessfullyLoggedInThroughGoogle = false;
                  props?.navigation?.navigate(NAV_ADDRESS_SCREEN);
                }
              }
            })
            .catch((error: string) => {
              showToastMessage(strings.error, error);
            });
        }
      })
      .catch((error: any) => {
        console.log('google signin error', error);
      });
  };
  /**
   * Sign Up with facebook
   */
  const onFacebookSignUp = () => {
    loginWithFacebook()
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
              if (response.Success && response.Data.IsAddressCapture) {
                myGlobal.userSuccessfullyLoggedInThroughFacebook = false;
                storeData(response);
              } else if (response.Data !== null && response.Id !== SOCIAL_AUTH_VALIDATION) {
                props?.navigation?.navigate(NAV_ADDRESS_SCREEN);
              }
            })
            .catch((error: string) => {
              showToastMessage(strings.error, error);
            });
        } else if (res !== false) {
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
        console.log('facebook error');
      });
  };
  /**
   * Stored data
   */
  const storeData = async (res: any) => {
    try {
      const loginData = {
        userEmail: res.Data.Email,
        firstName: res.Data.FirstName,
        lastName: res.Data.LastName,
        userName: res.Data.FullName,
        userAccessToken: res.AccessToken,
        userAvatar: res.Data.AvatarUrl,
      };
      await AsyncStorage.setItem(ASYNC_CONST.loggedInUserInfo, JSON.stringify(loginData));
      await AsyncStorage.setItem(ASYNC_CONST.accessToken, res.AccessToken);
      await AsyncStorage.setItem(ASYNC_CONST.qbLogin, res.Data.QuickBloxLoginName);
      myGlobal.tab = NAV_DASHBOARD_SCREEN;
      props.navigation?.navigate(NAV_DRAWER_SCREEN);
    } catch (error) {
      console.log(error);
    }
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
                if (response.Data.IsAddressCapture) {
                  storeData(response);
                } else {
                  myGlobal.userSuccessfullyLoggedInThroughApple = false;
                  props?.navigation?.navigate(NAV_ADDRESS_SCREEN);
                }
              }
            })
            .catch((error: string) => {
              showToastMessage(strings.error, error);
            });
        }
      })
      .catch((error: {message: string}) => {
        showToastMessage(strings.error, error.message);
      });
  };

  /**
   * function that toggle password.
   */
  const togglePassword = () => {
    setEncryptPassword(!encryptPassword);
  };

  /**
   * function that toggle confirm password.
   */
  const toggleConfirmPassword = () => {
    setEncryptConfirmPassword(!encryptConfirmPassword);
  };
  /**
   * country and state validations when user mark on term and conditions
   */
  useEffect(() => {
    if (formInput.toggleCheckBox) {
      if (countryData.countryIndex === 0 && stateData.stateName === selectState) {
        setFormInput({
          ...formInput,
          countryError: required,
          stateError: required,
        });
      } else if (countryData.countryIndex !== 0 && stateData.stateName === selectState) {
        setFormInput({
          ...formInput,
          stateError: required,
        });
      } else if (countryData.countryIndex === 0 && stateData.stateName !== selectState) {
        setFormInput({
          ...formInput,
          countryError: required,
        });
      } else {
        setFormInput({
          ...formInput,
          countryError: '',
          stateError: '',
        });
      }
    }
  }, [formInput.toggleCheckBox]);
  /**
   * function that change phone number to required pattern
   * @param value phone number
   */
  const setPhonePattern = (value: any) => {
    const cleaned = `${value}`.replace(VALIDATION_REGEX.checkPhone, '');
    const match = cleaned.match(VALIDATION_REGEX.phonePattern);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      const number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

      setFormInput({
        ...formInput,
        phone: number,
        phoneError: '',
        phoneNumberLength: 14,
      });
      return;
    }
    if (value) {
      if (value.length < 11) {
        setFormInput({
          ...formInput,
          phone: value,
          phoneError: minDigit,
          phoneNumberLength: 10,
        });
      } else if (value.length > 10) {
        setFormInput({
          ...formInput,
          phone: value,
          phoneError: localStrings.maxDigit,
          phoneNumberLength: 10,
        });
      } else {
        setFormInput({
          ...formInput,
          phone: value,
          phoneError: '',
          phoneNumberLength: 10,
        });
      }
    } else {
      setFormInput({
        ...formInput,
        phone: value,
        phoneNumberLength: 10,
      });
    }
  };

  /**
   * Form validation start
   */
  const validateFirstName = () => {
    const errorMsg = formInput.firstName === '' ? firstNameRequired : '';
    const spaceCheck = formInput.firstName !== '' ? extraSpaceRemove(formInput.firstName) : '';
    setFormInput({
      ...formInput,
      firstNameError: errorMsg,
      firstName: spaceCheck,
    });
  };
  const onChangeFirstName = (text: string) => {
    const spaceCheck = VALIDATION_REGEX.spaceCheckInStarting.test(text[0]);
    const firstNameNew = text.replace(VALIDATION_REGEX.textCheck, '');
    if (text && spaceCheck === false) {
      setFormInput({
        ...formInput,
        firstName: firstNameNew,
        firstNameError: '',
      });
    } else {
      setFormInput({
        ...formInput,
        firstName: '',
        firstNameError: firstNameRequired,
      });
    }
  };
  const validateLastName = () => {
    const errorMsg = formInput.lastName === '' ? lastNameRequired : '';
    const spaceCheck = formInput.firstName !== '' ? extraSpaceRemove(formInput.lastName) : '';
    setFormInput({
      ...formInput,
      lastNameError: errorMsg,
      lastName: spaceCheck,
    });
  };
  const onChangeLastName = (text: string) => {
    const spaceCheck = VALIDATION_REGEX.spaceCheckInStarting.test(text[0]);
    const lastNameNew = text.replace(VALIDATION_REGEX.textCheck, '');
    if (text && spaceCheck === false) {
      setFormInput({
        ...formInput,
        lastName: lastNameNew,
        lastNameError: '',
      });
    } else {
      setFormInput({
        ...formInput,
        lastName: '',
        lastNameError: lastNameRequired,
      });
    }
  };

  const checkEmail = () => {
    const reqParams = {
      email: formInput.email,
      usertype: PROFESSIONAL,
    };
    pCallEmailExitsAPI(reqParams).then(res => {
      if (res?.StatusKey) {
        setLoginModal(true);
      }
    });
  };

  const validateEmail = () => {
    const errorMsg = isEmailOrPhoneValid(formInput.email);
    setFormInput({
      ...formInput,
      emailError: errorMsg,
    });
    if (errorMsg === '') {
      checkEmail();
    }
  };

  const getUserDetails = text => {
    setLoader(true);
    setProPassword(text);
    const {deviceToken} = myGlobal;
    pCallProLoginAPI({email: formInput.email, password: text, userType: PROFESSIONAL, deviceToken})
      .then(async res => {
        await AsyncStorage.setItem(ASYNC_CONST.accessToken, res.AccessToken);
        if (res?.Success) {
          const reqParams = {
            email: formInput.email,
            usertype: HOMEOWNER,
          };
          pCallProUserDetails(reqParams);
          setIsAutoFill(true);
        } else {
          setLoader(false);
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const onChangeEmail = (text: string) => {
    if (text) {
      setFormInput({
        ...formInput,
        email: text,
      });
    } else {
      setFormInput({
        ...formInput,
        email: '',
        emailError: emailIsRequired,
      });
    }
  };
  const validatePassword = () => {
    if (formInput.password === '') {
      setFormInput({
        ...formInput,
        passwordError: passwordIsRequired,
      });
    }
  };
  const onChangePassword = (text: string) => {
    if (text) {
      const errorMsg = checkValidPassword(formInput.password);

      if (errorMsg !== '') {
        setFormInput({
          ...formInput,
          password: text,
          passwordError: errorMsg,
        });
      } else {
        setFormInput({
          ...formInput,
          password: text,
          passwordError: '',
        });
      }
    } else {
      setFormInput({
        ...formInput,
        password: '',
        passwordError: passwordIsRequired,
      });
    }
  };
  useEffect(() => {
    if (formInput.email !== '') {
      const errorMsg = isEmailOrPhoneValid(formInput.email);
      setFormInput({
        ...formInput,
        emailError: errorMsg,
      });
    }
  }, [formInput.email]);
  useEffect(() => {
    if (formInput.password !== '') {
      const errorMsg = checkValidPassword(formInput.password);
      setFormInput({
        ...formInput,
        passwordError: errorMsg,
      });
    }
  }, [formInput.password]);
  const validateConfirmPassword = () => {
    if (formInput.confirmPassword === '') {
      setFormInput({
        ...formInput,
        confirmPasswordError: passwordIsRequired,
      });
    }
  };
  const onChangeConfirmPassword = (text: string) => {
    if (text) {
      setFormInput({
        ...formInput,
        confirmPassword: text,
      });
    } else {
      setFormInput({
        ...formInput,
        confirmPassword: '',
        confirmPasswordError: passwordIsRequired,
      });
    }
  };
  useEffect(() => {
    if (formInput.password !== '' && formInput.confirmPassword !== '') {
      const errorMsg = equalPasswordAndConfirm(formInput.password, formInput.confirmPassword);
      setFormInput({
        ...formInput,
        confirmPasswordError: errorMsg,
      });
    }
  }, [formInput.password, formInput.confirmPassword]);
  const onAddressChange = (text: string) => {
    if (text) {
      setFormInput({
        ...formInput,
        address: text,
        addressError: '',
      });
    } else {
      setFormInput({
        ...formInput,
        address: '',
        addressError: addressIsRequired,
      });
    }
  };
  const validateCity = () => {
    const errorMsg = formInput.city === '' ? required : '';
    setFormInput({
      ...formInput,
      cityError: errorMsg,
    });
  };
  const onCityChange = (text: string) => {
    const cityNew = text.replace(VALIDATION_REGEX.textCheck, '');
    if (text) {
      setFormInput({
        ...formInput,
        city: cityNew,
        cityError: '',
      });
    } else {
      setFormInput({
        ...formInput,
        city: '',
        cityError: required,
      });
    }
  };
  const validateZipCode = () => {
    const errorMsg = formInput.zipCode === '' ? required : '';
    setFormInput({
      ...formInput,
      zipCodeError: errorMsg,
    });
  };
  const onChangeZipCode = (text: string) => {
    if (text) {
      setFormInput({
        ...formInput,
        zipCode: text,
        zipCodeError: '',
      });
    } else {
      setFormInput({
        ...formInput,
        zipCode: '',
        zipCodeError: required,
      });
    }
  };
  const onChangeSuiteAddress = (text: string) => {
    const suiteAddressNew = text.replace(VALIDATION_REGEX.textCheck, '');
    if (text) {
      setFormInput({
        ...formInput,
        suiteAddress: suiteAddressNew,
      });
    } else {
      setFormInput({
        ...formInput,
        suiteAddress: '',
      });
    }
  };
  /**
   * Form validation end
   */

  /**
   * Already floated label style
   */
  const labelStyle = {
    position: 'absolute' as const,
    paddingHorizontal: rw(5),
    marginTop: rh(5),
    backgroundColor: colors.white,
    marginLeft: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [rh(5), -rh(15)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [1, 1],
      outputRange: [rpx(16), rpx(16)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.skipColor, colors.skipColor],
    }),
  };

  /**
   * Component that contain State dropdown.
   */
  const StateDropDown = () => (
    <>
      <DropDownView>
        <Animated.Text style={labelStyle}>{strings.state}</Animated.Text>
        <ModalDropdown
          testID={strings.modelButton}
          defaultValue={stateData.stateName}
          defaultIndex={stateData.stateIndex}
          options={stateList.length !== 0 ? stateList : [selectState]}
          dropdownStyle={styles.fullWidthDropDownModal}
          style={styles.fullWidthDropDownStyle}
          textStyle={styles.fullWidthDropDownText}
          dropdownTextStyle={styles.dropDownModalText}
          renderRightComponent={() => <DownArrow />}
          onSelect={(index: string, text: string) => {
            onSelectState(Number(index), text);
          }}
        />
      </DropDownView>
    </>
  );

  const navigateToLogin = () => {
    setFormInput({
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      phone: '',
      address: '',
      suiteAddress: '',
      addressError: '',
      city: '',
      cityError: '',
      zipCode: '',
      zipCodeError: '',
      toggleCheckBox: false,
      country: '',
      state: '',
      countryError: '',
      stateError: '',
      checkBoxError: '',
      latitude: '',
      longitude: '',
      phoneNumberLength: 10,
      phoneError: '',
    });
    setIsAutoFill(false);
    navigation?.navigate(NAV_LOGIN);
  };

  /**
   * Component that Check box.
   */
  const CheckBoxContainer = () => (
    <CheckBoxRowContainer>
      <CheckBox
        testID={strings.addressModelBtn}
        disabled={false}
        value={formInput.toggleCheckBox}
        onValueChange={newValue => {
          setFormInput({
            ...formInput,
            toggleCheckBox: newValue,
            checkBoxError: '',
          });
        }}
        boxType="square"
        style={styles.checkBox}
        tintColors={{false: colors.skipColor}}
        lineWidth={2}
      />
      <TextContainer>
        <NormalText>{strings.iAgreeTo}</NormalText>
        <TouchableOpacity
          onPress={() =>
            InAppBrowser?.open(URLS.termAndConditions, {
              dismissButtonStyle: 'cancel',
              showInRecents: true,
            })
          }>
          <UnderlineText>{strings.termsAndConditions}</UnderlineText>
        </TouchableOpacity>
      </TextContainer>
    </CheckBoxRowContainer>
  );

  return (
    <SignUpContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <LogoContainer>
        <LogoImage source={require('../../assets/images/bildsy_logo/bildsy_logo.png')} />
      </LogoContainer>
      <KeyboardAvoidingView
        behavior={isIOS() ? 'padding' : 'height'}
        style={styles.keyBoardView}
        keyboardVerticalOffset={isIOS() ? 20 : 0}>
        <MainBodyScroll>
          <BottomContainer>
            <BoldTitle>{strings.signUp}</BoldTitle>
            <FormContainer>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.userFirstName}
                  onChangeText={(text: string) => {
                    onChangeFirstName(text);
                  }}
                  maxLength={strings.nameLimit}
                  inputValue={formInput.firstName}
                  label={strings.firstName}
                  onBlurHandler={() => validateFirstName()}
                  errorText={formInput.firstNameError}
                  isFocus={isAutoFill}
                  enableFocus={formInput.firstName !== ''}
                />
              </InputFieldContainer>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.userLastName}
                  inputValue={formInput.lastName}
                  onChangeText={(text: string) => {
                    onChangeLastName(text);
                  }}
                  maxLength={strings.nameLimit}
                  label={strings.lastName}
                  onBlurHandler={() => validateLastName()}
                  errorText={formInput.lastNameError}
                  isFocus={isAutoFill}
                  enableFocus={formInput.lastName !== ''}
                />
              </InputFieldContainer>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.userEmail}
                  inputValue={formInput.email}
                  onChangeText={(text: string) => {
                    onChangeEmail(text);
                  }}
                  autoCapitalize="none"
                  label={strings.emailAddress2}
                  onBlurHandler={() => validateEmail()}
                  errorText={formInput.emailError}
                  isFocus={isAutoFill}
                  editable={!isAutoFill}
                />
              </InputFieldContainer>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.password}
                  encrypt={encryptPassword}
                  inputValue={formInput.password}
                  onChangeText={(text: string) => {
                    onChangePassword(text);
                  }}
                  label={strings.password2}
                  onBlurHandler={() => validatePassword()}
                  errorText={formInput.passwordError}
                  isShowOpenEye={true}
                  onPressRightIcon={() => togglePassword()}
                  enableFocus={formInput.password !== ''}
                  isFocus={isAutoFill}
                  editable={!isAutoFill}
                />
              </InputFieldContainer>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.userNewConfirmPassword}
                  enableFocus={formInput.confirmPassword !== ''}
                  encrypt={encryptConfirmPassword}
                  inputValue={formInput.confirmPassword}
                  onChangeText={(text: string) => {
                    onChangeConfirmPassword(text);
                  }}
                  label={strings.reEnterPassword}
                  onBlurHandler={() => validateConfirmPassword()}
                  errorText={formInput.confirmPasswordError}
                  isShowOpenEye={true}
                  onPressRightIcon={() => toggleConfirmPassword()}
                  isFocus={isAutoFill}
                  editable={!isAutoFill}
                />
              </InputFieldContainer>
              <InputFieldContainerPressable
                onPress={() => {
                  openAddressModal();
                }}>
                <BlankInputView pointerEvents="none">
                  <FloatingLabelInput
                    testID={strings.userAddress}
                    enableFocus={formInput.address !== ''}
                    editable={false}
                    inputValue={formInput.address}
                    onChangeText={(text: string) => {
                      onAddressChange(text);
                    }}
                    label={strings.address}
                    errorText={formInput.addressError}
                  />
                </BlankInputView>
              </InputFieldContainerPressable>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.userSuiteAddress}
                  label={strings.suiteAddress}
                  onChangeText={(text: string) => {
                    onChangeSuiteAddress(text);
                  }}
                  inputValue={formInput.suiteAddress}
                  maxLength={50}
                />
              </InputFieldContainer>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.userCity}
                  inputValue={formInput.city}
                  onChangeText={(text: string) => {
                    onCityChange(text);
                  }}
                  enableFocus={formInput.city !== ''}
                  label={strings.city}
                  onBlurHandler={() => validateCity()}
                  errorText={formInput.cityError}
                />
              </InputFieldContainer>
              <InputFieldContainer>
                <DropDownRowContainer>
                  <DropDownSubContainer>
                    <StateDropDown />
                  </DropDownSubContainer>
                </DropDownRowContainer>
                {formInput.stateError !== '' && (
                  <ErrorContainer>
                    <ErrorMessageView>
                      <ErrorMessage>{formInput.stateError}</ErrorMessage>
                    </ErrorMessageView>
                  </ErrorContainer>
                )}
              </InputFieldContainer>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.userZipCode}
                  inputValue={formInput.zipCode}
                  onChangeText={(text: string) => {
                    onChangeZipCode(text);
                  }}
                  label={strings.zipCode}
                  enableFocus={formInput.zipCode !== ''}
                  onBlurHandler={() => validateZipCode()}
                  errorText={formInput.zipCodeError}
                  keyboardType="number-pad"
                />
              </InputFieldContainer>
              <InputFieldContainer>
                <FloatingLabelInput
                  testID={strings.userPhone}
                  inputValue={formInput.phone}
                  onChangeText={(value: string) => {
                    setPhonePattern(value.replace(VALIDATION_REGEX.phoneNumber, ''));
                  }}
                  caretHidden={!isIOS()}
                  contextMenuHidden={false}
                  textContentType="telephoneNumber"
                  label={strings.phone}
                  keyboardType={'number-pad'}
                  maxLength={formInput.phoneNumberLength}
                  errorText={
                    formInput.phone && formInput.phone.length !== formInput.phoneNumberLength
                      ? formInput.phoneError
                      : ''
                  }
                  isFocus={isAutoFill}
                  enableFocus={formInput.phone !== ''}
                />
              </InputFieldContainer>
              <InputCheckFieldContainer>
                <CheckBoxContainer />
              </InputCheckFieldContainer>
              {formInput.checkBoxError !== '' && (
                <ErrorContainer>
                  <ErrorMessage>{formInput.checkBoxError}</ErrorMessage>
                </ErrorContainer>
              )}
              <SubmitButton
                testID={strings.signUpButton}
                selected={isValidForm}
                disabled={!isValidForm}
                onPress={() => onSignUp()}>
                <ButtonText>
                  {!isAPIinProgress && !isSignUpAPIinProgress && strings.signUp}
                  {(isAPIinProgress || isSignUpAPIinProgress) && (
                    <ActivityIndicator size="small" color={colors.white} />
                  )}
                </ButtonText>
              </SubmitButton>
              <SocialLoginContainer>
                <TouchableOpacity
                  testID={strings.googleBtn}
                  onPress={() => {
                    onGoogleSignUp();
                  }}>
                  <GoogleIcon />
                </TouchableOpacity>
                {isIOS() && (
                  <IconContainer>
                    <TouchableOpacity
                      testID={strings.appleBtn}
                      onPress={() => {
                        onAppleSignUp();
                      }}>
                      <AppleIcon />
                    </TouchableOpacity>
                  </IconContainer>
                )}
                <IconContainer>
                  <TouchableOpacity
                    testID={strings.facebookBtn}
                    onPress={() => {
                      onFacebookSignUp();
                    }}>
                    <FaceBookIcon />
                  </TouchableOpacity>
                </IconContainer>
              </SocialLoginContainer>
              <TextCenterComponent>
                <NormalText>{strings.alreadyHaveAnAccount}</NormalText>
                <TouchableOpacity testID={strings.loginButton} onPress={() => navigateToLogin()}>
                  <UnderlineText>{strings.signIn}</UnderlineText>
                </TouchableOpacity>
              </TextCenterComponent>
            </FormContainer>
          </BottomContainer>
        </MainBodyScroll>
        <ModalView
          modalHeaderText={signUpSuccessfully}
          visible={showModal}
          modalMessage={pleaseCheckYourEmail}
          testID={strings.navigationButton}
          onPress={() => {
            setShowModal(false);
            navigation?.navigate(NAV_LOGIN);
          }}
          modalPrimaryBtnName={ok}
        />
      </KeyboardAvoidingView>
      <LoginModalView
        visible={loginModal}
        onModalClose={() => {
          setLoginModal(false);
        }}
        email={formInput.email}
        onPress={text => getUserDetails(text)}
        isLoading={loader}
      />
    </SignUpContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  socialSignInResponse: store.auth.payload,
  isAPIinProgress: store.auth.isApiInProgress,
  isUserSignedIn: store.auth.isLogin,
  isSignUpAPIinProgress: store.signUpAuth.isSignUpApiInProgress,
  proUserDetails: store?.proUserDetails?.payload,
});

const mapDispatchToProps = {
  callGetStateAPI,
  callSignUpAPI,
  callSocialSignUpAPI,
  callEmailExitsAPI,
  callProLoginAPI,
  callProUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
