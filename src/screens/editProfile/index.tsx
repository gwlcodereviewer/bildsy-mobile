import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, KeyboardAvoidingView, Animated, ActivityIndicator, TouchableOpacity} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import RNGooglePlaces from 'react-native-google-places';
import {connect} from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IHomeOwnerEditDetailPayload, IStoreUserProfileDetails} from '../../redux/types';
import {localStrings} from '../../localization/localStrings';
import {strings} from '../../constants/strings';
import FloatingLabelInput from '../../components/floatingLabelInput';
import {
  imagePickerOptions,
  countryId,
  townConst,
  areaConst,
  nearestRoadConst,
  nameCityConst,
  streetNumberConst,
} from '../../constants/utils/constantData';
import {BlankInputView, CancelButtonText, CancelButton, DropDownView, MainLoaderContainer} from '../../style';

import {callGetStateAPI, callEditDetailAPI, callGetUserProfileAPI} from '../../redux/actions/auth';
import {
  isValidEmail,
  isIOS,
  isEmailOrPhoneValid,
  showToastMessage,
  openDeviceCamera,
  onImageLibraryPress,
  extraSpaceRemove,
  VALIDATION_REGEX,
} from '../../utils';
import {
  InputFieldWrapper,
  Container,
  Header,
  NormalText,
  LogoImage,
  BackButtonContainer,
  BottomContainer,
  BottomElementsContainer,
  ProfileImage,
  ProfileEditIcon,
  AddAttachmentView,
  DropDownSubContainer,
  ButtonContainer,
  ErrorContainer,
  ErrorMessage,
  ErrorMessageView,
  InputFieldContainerPressable,
  ProfileImageContainer,
  SaveButtonContainer,
  SaveButtonText,
  DropDownRowContainer,
} from './styled';
import {INavigation, ICountryStateResponse} from '../../style/types';
import styles from '../../style/style';
import DownArrow from '../../assets/svg/DownArrow';
import {rw, rh, rpx} from '../../style/Dimen';
import colors from '../../style/colors';
import {NAV_PROFILE_DETAILS} from '../../navigation/navConstants';
import pngImages from '../../assets/images/pngImages';
import {ASYNC_CONST} from '../../helpers/constants';
import {IUserDetailAPIResponse} from '../../types';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  callGetStateAPI: (param: number) => Promise<any>;
  userDetailResponse: IUserDetailAPIResponse;
  callGetUserProfileAPI: () => Promise<any>;
  callEditDetailAPI: (param: IHomeOwnerEditDetailPayload) => Promise<any>;
}

interface IFormInput {
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
  emailAddress: string;
  emailAddressError: string;
  address: string;
  addressError: string;
  suiteAddress: string;
  country: string;
  countryError: string;
  state: string;
  stateError: string;
  city: string;
  cityError: string;
  zipCode: string;
  zipCodeError: string;
  phone: string;
  phoneError: string;
  stateIndex: number;
  latitude: number;
  longitude: number;
  phoneNumberLength: number;
  countryIndex: number;
  projectTypeIndex: number;
  areaIndex: number;
  selectProjectIdApi: number;
  selectAreaPerSquareIdApi: number;
  selectedCountryApi: number;
  selectedStateIdApi: number;
}

interface IAddProjectInfo {
  projectId: number;
  locationId: number;
}

const EditProfile: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    route,
    callGetStateAPI: pCallGetStateAPI,
    callEditDetailAPI: pCallEditDetailAPI,
    callGetUserProfileAPI: pCallGetUserProfileAPI,
    userDetailResponse,
  } = props;
  const [animatedIsFocused] = useState(new Animated.Value(1));
  const {required, firstNameRequired, lastNameRequired, selectState, selectCountry, addressIsRequired} = localStrings;
  let selectedStateIndex: number;
  const [formInput, setFormInput] = useState<IFormInput>({
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    emailAddress: '',
    emailAddressError: '',
    address: '',
    addressError: '',
    suiteAddress: '',
    country: selectCountry,
    countryError: '',
    state: selectState,
    stateError: '',
    city: '',
    cityError: '',
    zipCode: '',
    zipCodeError: '',
    phone: '',
    phoneError: '',
    stateIndex: 2,
    latitude: 0,
    longitude: 0,
    phoneNumberLength: 14,
    countryIndex: 0,
    projectTypeIndex: 0,
    areaIndex: 0,
    selectProjectIdApi: 0,
    selectAreaPerSquareIdApi: 0,
    selectedCountryApi: 0,
    selectedStateIdApi: 0,
  });
  const actionSheet = useRef<any>();
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [stateList, setStateList] = useState<string[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<number>(0);
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);
  const [stateResponse, setStateResponse] = useState<ICountryStateResponse[]>([]);
  const [imageUri, setImageUri] = useState<string>('');
  const [fileData, setFileData] = useState<any>();
  const [cameraImageData, setCameraImageData] = useState<any[]>([]);
  const [getUserDataAPIInProgress, setGetUserDataAPIInProgress] = useState<boolean>(false);
  const [placeData, setPlaceData] = useState<any>();
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

  const [stateData, setStateData] = useState({
    stateIndex: 0,
    stateName: selectState,
  });

  useEffect(() => {
    if (userDetailResponse?.Success) {
      setFormInput({
        ...formInput,
        emailAddress: userDetailResponse.Data.Email,
        firstName: userDetailResponse.Data.FirstName,
        lastName: userDetailResponse.Data.LastName,
        address: userDetailResponse.Data.Address1,
        phone: userDetailResponse.Data.Phone,
        city: userDetailResponse.Data.City,
        zipCode: userDetailResponse.Data.ZipPostalCode,
        suiteAddress: userDetailResponse?.Data?.Suite ? userDetailResponse?.Data?.Suite : '',
        latitude: userDetailResponse.Data.Latitude,
        longitude: userDetailResponse.Data.Longitude,
      });
      selectedStateIndex = stateResponse.findIndex(ele => ele.name === userDetailResponse.Data?.StateProvinceName);
      setStateData({
        stateIndex: selectedStateIndex + 1,
        stateName: userDetailResponse.Data?.StateProvinceName,
      });
      setImageUri(userDetailResponse.Data.AvatarUrl);
      setSelectedStateId(userDetailResponse.Data.StateProvinceId);
      setGetUserDataAPIInProgress(false);
    }
  }, [userDetailResponse]);

  useEffect(() => {
    if (formInput.emailAddress !== '') {
      const errorMsg = isEmailOrPhoneValid(formInput.emailAddress);
      setFormInput({
        ...formInput,
        emailAddressError: errorMsg,
      });
    }
  }, [formInput.emailAddress]);
  useEffect(() => {
    pCallGetUserProfileAPI();
  }, []);

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

  const validateLastName = () => {
    const errorMsg = formInput.lastName === '' ? lastNameRequired : '';
    const spaceCheck = formInput.firstName !== '' ? extraSpaceRemove(formInput.lastName) : '';
    setFormInput({
      ...formInput,
      lastNameError: errorMsg,
      lastName: spaceCheck,
    });
  };

  /**
   * function that change phone number to required pattern
   * @param value phone number
   */
  const setPhonePattern = (value: string) => {
    if (value.length === 0 || VALIDATION_REGEX.checkNumber.test(value)) {
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
            phoneError: localStrings.minDigit,
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
          phoneError: '',
          phoneNumberLength: 10,
        });
      }
    } else {
      setFormInput({
        ...formInput,
        phone: value,
        phoneError: localStrings.numberOnly,
        phoneNumberLength: 10,
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
  const onPressPrevious = () => {
    navigation?.navigate(NAV_PROFILE_DETAILS);
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
        selectedStateIdApi: stateResponse[index - 1].id,
      });
    } else {
      setFormInput({
        ...formInput,
        stateError: required,
      });
    }
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
          onSelect={(index: number, text: string) => {
            onSelectState(index, text);
          }}
        />
      </DropDownView>
    </>
  );

  /**
   * function for calling API
   */
  const onEditDetails = () => {
    setIsAPIinProgress(true);
    const {firstName, lastName, phone, address, city, zipCode, suiteAddress, latitude, longitude} = formInput;
    pCallEditDetailAPI({
      firstName: extraSpaceRemove(firstName),
      lastName: extraSpaceRemove(lastName),
      phone,
      address,
      city,
      zipPostalCode: zipCode,
      stateProvinceId: selectedStateId,
      suite: suiteAddress,
      fileBase64String: fileData?.fileBase64Path || cameraImageData[0]?.fileBase64Path || '',
      fileName: fileData?.fileName || cameraImageData[0]?.fileName || '',
      latitude: placeData?.location?.latitude || latitude,
      longitude: placeData?.location?.longitude || longitude,
    })
      .then((res: {Success: boolean}) => {
        setIsAPIinProgress(false);
        if (res.Success) {
          storeData();
          navigation?.goBack();
          setTimeout(() => {
            route?.params.callback();
          }, 100);
        }
      })
      .catch((error: {message: string}) => {
        setIsAPIinProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * Stored data
   */
  const storeData = async () => {
    const loginData = {
      userEmail: formInput.emailAddress,
      firstName: formInput.firstName,
      lastName: formInput.lastName,
      userAvatar: imageUri,
    };
    await AsyncStorage.setItem(ASYNC_CONST.loggedInUserInfo, JSON.stringify(loginData));
  };
  useEffect(() => {
    if (
      formInput.firstName &&
      formInput.lastName &&
      formInput.emailAddress &&
      !isValidEmail(formInput.emailAddress) &&
      formInput.address &&
      formInput.city &&
      formInput.zipCode &&
      stateData.stateName !== selectState
    ) {
      if ((formInput.phone && formInput.phone.length === formInput.phoneNumberLength) || formInput.phoneError === '') {
        setIsValidForm(true);
      } else {
        setIsValidForm(false);
      }
    } else {
      setIsValidForm(false);
    }
  });

  useEffect(() => {
    getStateList();
  }, []);

  /**
   * function for getting list of states according to the selected country.
   * @param index of selected country.
   */
  const getStateList = () => {
    const arrStateNameList: string[] = [];
    pCallGetStateAPI(countryId)
      .then(res => {
        if (res != null && res.model.length > 1) {
          arrStateNameList.push(selectState);
          setStateResponse(res.model);
          const element = res.model.find((ele: {name: string}) => ele.name === formInput.state);
          if (element) {
            setSelectedStateId(element.id);
          }
          for (let i = 0; i < res.model.length; ) {
            arrStateNameList.push(res.model[i].name);
            i += 1;
          }
          setStateList(arrStateNameList);
        } else if (res != null && res.model.length === 1) {
          setStateResponse(res.model);
          arrStateNameList.push(res.model[1].name);
          setStateList(arrStateNameList);
          setStateData({stateIndex: 0, stateName: arrStateNameList[0]});
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const placeAddressComponent = {
    ZIP_CODE: localStrings.postalCode,
    COUNTRY: localStrings.country,
    STATE: localStrings.State,
    CITY: localStrings.locality,
    TOWN: townConst,
    AREA: areaConst,
    NEAREST_ROAD: nearestRoadConst,
    NAME: nameCityConst,
    STREET_NUMBER: streetNumberConst,
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
    selectedStateIndex = stateResponse.findIndex(ele => ele.name === stateData.stateName);
    setStateData({
      stateIndex: selectedStateIndex + 1,
      stateName: stateData.stateName,
    });
  }, [stateData.stateName]);

  const openAddressModal = () => {
    RNGooglePlaces.openAutocompleteModal({country: 'US', type: 'address'})
      .then((place: {addressComponents: any[]; address: any; location: any}) => {
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
        setPlaceData(place);
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
        selectedStateIndex = stateResponse.findIndex(ele => ele.name === state);
        setStateData({
          stateIndex: selectedStateIndex + 1,
          stateName: state,
        });
      })
      .catch(error => {
        console.log(JSON.stringify(error.message));
      });
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
   * open action sheet for profile image upload.
   */
  const showActionSheet = () => {
    actionSheet?.current?.show();
  };
  const onPress = (index: number) => {
    if (index === 0) {
      openDeviceCamera(cameraImageData)
        .then((res: any) => {
          const response = [...res];
          if (res) {
            setImageUri(res[0].fileUri);
            setCameraImageData(response);
          } else {
            setImageUri('');
            setCameraImageData([]);
          }
        })
        .catch((error: {message: string}) => {
          console.log('error camera', error.message);
        });
    } else if (index === 1) {
      onImageLibraryPress()
        .then((res: any) => {
          if (res) {
            const selectedImageUri = res.fileUri;
            setImageUri(selectedImageUri);
            setFileData(res);
          } else {
            setImageUri('');
            setFileData('');
            setCameraImageData([]);
          }
        })
        .catch((error: {message: string}) => {
          console.log('error camera', error.message);
        });
    }
  };

  return (
    <Container source={pngImages.backgroundThemeImage} resizeMode="cover">
      <Header>
        <BackButtonContainer>
          <TouchableOpacity testID={strings.backIconButton} onPress={() => onPressPrevious()}>
            <LogoImage source={pngImages.backButtonIcon} />
          </TouchableOpacity>
        </BackButtonContainer>
        <NormalText>{strings.editProfile}</NormalText>
      </Header>
      <BottomContainer>
        {getUserDataAPIInProgress ? (
          <MainLoaderContainer>
            <ActivityIndicator size="large" color={colors.primaryThemeColor} style={styles.activityIndicator} />
          </MainLoaderContainer>
        ) : (
          <KeyboardAvoidingView
            behavior={isIOS() ? 'padding' : 'height'}
            style={styles.keyBoardView}
            keyboardVerticalOffset={isIOS() ? 125 : 0}>
            <ScrollView horizontal={false} keyboardShouldPersistTaps={'always'}>
              <>
                <ProfileImageContainer>
                  <ProfileImage source={imageUri ? {uri: imageUri} : pngImages.defaultUserImage} resizeMode="cover" />
                  <AddAttachmentView testID={strings.editProfileImageButton} onPress={showActionSheet}>
                    <ProfileEditIcon source={pngImages.newImage} resizeMode="cover" />
                  </AddAttachmentView>
                </ProfileImageContainer>
                <ActionSheet
                  ref={actionSheet}
                  options={imagePickerOptions}
                  cancelButtonIndex={2}
                  destructiveButtonIndex={2}
                  onPress={(index: number) => {
                    onPress(index);
                  }}
                />
                <BottomElementsContainer>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.userFirstName}
                      enableFocus={formInput.firstName !== ''}
                      label={strings.firstName}
                      onChangeText={(text: string) => {
                        onChangeFirstName(text);
                      }}
                      maxLength={strings.nameLimit}
                      inputValue={formInput.firstName}
                      onBlurHandler={() => validateFirstName()}
                      errorText={formInput.firstNameError}
                    />
                  </InputFieldWrapper>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.userLastName}
                      enableFocus={formInput.lastName !== ''}
                      label={strings.lastName}
                      onChangeText={(text: string) => {
                        onChangeLastName(text);
                      }}
                      maxLength={strings.nameLimit}
                      inputValue={formInput.lastName}
                      onBlurHandler={() => validateLastName()}
                      errorText={formInput.lastNameError}
                    />
                  </InputFieldWrapper>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.userEmail}
                      enableFocus={formInput.emailAddress !== ''}
                      inputValue={formInput.emailAddress}
                      editable={false}
                      autoCapitalize="none"
                      label={strings.emailAddress2}
                      errorText={formInput.emailAddressError}
                    />
                  </InputFieldWrapper>
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
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.userSuiteAddress}
                      enableFocus={formInput.suiteAddress !== ''}
                      label={strings.suiteAddress}
                      onChangeText={(text: string) => {
                        onChangeSuiteAddress(text);
                      }}
                      inputValue={formInput.suiteAddress}
                      maxLength={50}
                    />
                  </InputFieldWrapper>
                  <InputFieldWrapper>
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
                  </InputFieldWrapper>
                  <InputFieldWrapper>
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
                  </InputFieldWrapper>
                  <InputFieldWrapper>
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
                  </InputFieldWrapper>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.userPhone}
                      enableFocus={formInput.phone !== ''}
                      inputValue={formInput.phone}
                      onChangeText={(value: string) => {
                        setPhonePattern(value.replace(VALIDATION_REGEX.phoneNumber, ''));
                      }}
                      contextMenuHidden={false}
                      textContentType="telephoneNumber"
                      label={strings.phone}
                      keyboardType={'number-pad'}
                      maxLength={formInput.phoneNumberLength}
                      errorText={formInput.phoneError}
                    />
                  </InputFieldWrapper>
                  <ButtonContainer>
                    <TouchableOpacity testID={strings.previewsButton} onPress={() => onPressPrevious()}>
                      <CancelButton>
                        <CancelButtonText>{strings.cancel}</CancelButtonText>
                      </CancelButton>
                    </TouchableOpacity>
                    <SaveButtonContainer
                      testID={strings.editProfileButton}
                      selected={isValidForm}
                      disabled={!isValidForm}
                      onPress={onEditDetails}>
                      <SaveButtonText>
                        {isAPIinProgress ? <ActivityIndicator size="small" color={colors.white} /> : strings.save}
                      </SaveButtonText>
                    </SaveButtonContainer>
                  </ButtonContainer>
                </BottomElementsContainer>
              </>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </BottomContainer>
    </Container>
  );
};

const mapStateToProps = (store: IStoreUserProfileDetails) => ({
  userDetailResponse: store?.userProfile?.payload,
});
const mapDispatchToProps = {
  callGetStateAPI,
  callEditDetailAPI,
  callGetUserProfileAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
