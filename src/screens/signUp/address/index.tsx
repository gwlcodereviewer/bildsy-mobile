/* eslint-disable camelcase */
import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Animated, ActivityIndicator} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {connect} from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {countryId} from '../../../constants/utils/constantData';
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
  InputFieldContainerPressable,
  BlankInputView,
  ErrorContainer,
  ErrorMessage,
  ErrorMessageView,
} from '../styled';
import {strings} from '../../../constants/strings';
import {isIOS, showToastMessage, VALIDATION_REGEX} from '../../../utils';
import {rh, rpx, rw} from '../../../style/Dimen';
import colors from '../../../style/colors';
import styles from '../../../style/style';
import {localStrings} from '../../../localization/localStrings';
import {SubmitButton, ButtonText} from '../../../style';
import FloatingLabelInput from '../../../components/floatingLabelInput';
import DownArrow from '../../../assets/svg/DownArrow';
import {INavigation, ICountryStateResponse} from '../../../style/types';
import {NAV_DRAWER_SCREEN, NAV_DASHBOARD_SCREEN} from '../../../navigation/navConstants';
import {callGetStateAPI, callHomeownerAdvanceAPI, callSocialSignUpAPI} from '../../../redux/actions/auth';
import {IAuthStateType, IStore, ISocialMediaPayload} from '../../../redux/types';
import {ASYNC_CONST} from '../../../helpers/constants';
import {ILoginAPIResponse, IGoogleUserResponseType} from '../../../types';
import pngImages from '../../../assets/images/pngImages';

interface Props {
  navigation?: INavigation;
  callGetStateAPI: (param: number) => Promise<any>;
  callHomeownerAdvanceAPI: any;
  auth?: IAuthStateType;
  callSocialSignUpAPI: (param: ISocialMediaPayload) => Promise<any>;
  isAPIinProgress: boolean;
  socialSignInResponse: ILoginAPIResponse;
  isUserSignedIn: boolean;
  isSignUpAPIinProgress: boolean;
}
interface IFormInput {
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
  latitude: string;
  longitude: string;
}
const myGlobal: any = global;
const AddressScreen: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    callGetStateAPI: pCallGetStateAPI,
    callHomeownerAdvanceAPI: pCallHomeownerAdvanceAPI,
    callSocialSignUpAPI: pCallSocialSignUpAPI,
    isAPIinProgress,
    socialSignInResponse,
    isUserSignedIn,
    isSignUpAPIinProgress,
  } = props;
  const {selectCountry, selectState, addressIsRequired, required, pleaseCheckYourEmail, ok, signUpSuccessfully} =
    localStrings;
  const [formInput, setFormInput] = useState<IFormInput>({
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
    latitude: '',
    longitude: '',
  });
  const [stateResponse, setStateResponse] = useState<ICountryStateResponse[]>([]);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [animatedIsFocused] = useState(new Animated.Value(0));
  const [selectedStateId, setSelectedStateId] = useState<number>(0);
  const [countryData, setCountryData] = useState({
    countryIndex: 0,
    countryName: selectCountry,
  });
  const [stateList, setStateList] = useState<string[]>([]);
  const [stateData, setStateData] = useState({
    stateIndex: 0,
    stateName: selectState,
  });
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
    if (formInput.address && formInput.city && formInput.zipCode && stateData.stateName !== selectState) {
      setIsValidForm(true);
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
      setSelectedStateId(stateResponse[index - 1].id);
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
    if (socialSignInResponse?.Success && socialSignInResponse?.Data?.IsAddressCapture) {
      if (isUserSignedIn) {
        storeData(socialSignInResponse);
      }
    }
  }, [socialSignInResponse]);
  /**
   * function for calling API
   */
  const onSignUp = () => {
    const {address, city, zipCode, suiteAddress} = formInput;
    pCallHomeownerAdvanceAPI({
      homeOwnerAddress: address,
      homeOwnerCity: city,
      homeOwnerZipCode: zipCode,
      homeOwnerCountryId: countryId,
      homeOwnerStateId: selectedStateId,
      homeOwnerLongitude: formInput.longitude,
      homeOwnerLatitude: formInput.latitude,
      CustomerId: socialSignInResponse?.Data?.CustomerId,
      suite: suiteAddress,
    })
      .then((res: {Success: boolean; Message: string}) => {
        if ((!res.Message || res.Message === null) && res.Success === true) {
          // setShowModal(true);
          myGlobal.userSuccessfullyLoggedInThroughFacebook = true;
          myGlobal.userSuccessfullyLoggedInThroughGoogle = true;
          myGlobal.userSuccessfullyLoggedInThroughApple = true;
          props?.navigation?.navigate(NAV_DRAWER_SCREEN);
        }
      })
      .catch((error: {message: string}) => {
        showToastMessage(strings.error, error.message);
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

  return (
    <SignUpContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <LogoContainer>
        <LogoImage source={require('../../../assets/images/bildsy_logo/bildsy_logo.png')} />
      </LogoContainer>
      <KeyboardAvoidingView
        behavior={isIOS() ? 'padding' : 'height'}
        style={styles.keyBoardView}
        keyboardVerticalOffset={isIOS() ? 20 : 0}>
        <MainBodyScroll>
          <BottomContainer>
            <BoldTitle>{strings.signUp}</BoldTitle>
            <FormContainer>
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
              <SubmitButton
                testID={strings.signUpBtn}
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
            </FormContainer>
          </BottomContainer>
        </MainBodyScroll>
      </KeyboardAvoidingView>
    </SignUpContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  socialSignInResponse: store.auth.payload,
  isAPIinProgress: store.auth.isApiInProgress,
  isUserSignedIn: store.auth.isLogin,
  isSignUpAPIinProgress: store.signUpAuth.isSignUpApiInProgress,
});
const mapDispatchToProps = {
  callGetStateAPI,
  callHomeownerAdvanceAPI,
  callSocialSignUpAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);
