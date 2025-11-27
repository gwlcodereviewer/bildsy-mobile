import React, {useState, useEffect, useRef} from 'react';
import {Animated, ActivityIndicator, LogBox} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {connect} from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import moment from 'moment';
import FloatingLabelInput from '../../../components/floatingLabelInput';
import {localStrings} from '../../../localization/localStrings';
import {strings} from '../../../constants/strings';
import {
  InputFieldWrapper,
  ControlContainer,
  DetailText,
  InputFieldContainer,
  DropDownView,
  DropDownRowContainer,
  AddAttachmentText,
  AddAttachmentView,
  FullWidthDropDown,
  CalenderImage,
  AttachmentList,
  AttachmentName,
  AttachmentListContainer,
  AttachmentImageContainer,
  TouchableContainer,
  SpaceBetweenText,
  MainLoaderContainer,
  ProfileImage,
  AttachmentRemoveContainer,
  ToggleWrapper,
  AttachmentNameContainer,
} from '../styled';
import {INavigation, ICountryStateResponse} from '../../../style/types';
import styles from '../../../style/style';
import DownArrow from '../../../assets/svg/DownArrow';
import {rw, rh, rpx} from '../../../style/Dimen';
import colors from '../../../style/colors';
import {
  callGetStateAPI,
  callGetProjectTypeAPI,
  callGetProjectAreasAPI,
  callCreateProjectAPI,
  callUploadFilesAPI,
  callGetProjectDetails,
  callDeleteDocuments,
} from '../../../redux/actions/auth';
import {IAddProjectPayload, IFileUpload, IDeleteDocuments, IStoreProjectDetails} from '../../../redux/types';
import {InputFieldContainerPressable, BlankInputView, SubmitButton, ButtonText} from '../../../style';
import {PROJECT_DATA} from '../../../helpers/constants';
import {
  showToastMessage,
  pickDocument,
  openDeviceCamera,
  extraSpaceRemove,
  onSelectGalleyPress,
  VALIDATION_REGEX,
} from '../../../utils';
import Document from '../../../assets/svg/Document';
import Close from '../../../assets/svg/Close';
import {
  actionSheetOptions,
  countryId,
  projectEntityName,
  statusProjectAwarded,
  ImageExtension,
  MAX_BUDGET_RANGE,
} from '../../../constants/utils/constantData';
import AddFloatingBtn from '../../../assets/svg/AddFloatingBtn';
import {
  AreaType,
  ProjectAreaTypeData,
  DocumentResponse,
  StateResponse,
  IProjectDetailsResponseType,
} from '../../../types';
import ImageModel from '../../../components/imageModeView';

interface Props {
  navigation?: INavigation;
  onChange?: (pager: number, projectId: number, locationId: number) => void;
  callGetStateAPI: (param: number) => Promise<any>;
  callGetProjectTypeAPI: () => Promise<any>;
  callGetProjectAreasAPI: () => Promise<any>;
  callCreateProjectAPI: (param: IAddProjectPayload) => Promise<any>;
  callUploadFilesAPI: (param: IFileUpload) => Promise<any>;
  callGetProjectDetails: (param: number) => Promise<any>;
  callDeleteDocuments: (param: IDeleteDocuments) => Promise<any>;
  projectDetailsResponseData: IProjectDetailsResponseType;
  isGetDetailsAPIInProgress: boolean;
  pageChange: boolean;
  fileDataProps: DocumentResponse[];
}

interface IFormInput {
  projectName: string;
  projectNameError: string;
  projectNameCharacterError: string;
  expectedStartDate: string;
  expectedStartDateError: string;
  expectedCompletionDate: string;
  expectedCompletionDateError: string;
  description: string;
  descriptionError: string;
  address: string;
  addressError: string;
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
  projectType: string;
  projectTypeError: string;
  area: string;
  areaError: string;
  budget: string;
  budgetError: string;
  latitude: string;
  longitude: string;
  phoneNumberLength: number;
  suiteAddress: string;
  suiteAddressError: string;
  countryIndex: number;
  stateIndex: number;
  projectTypeIndex: number;
  areaIndex: number;
  file: any[];
  selectProjectIdApi: number;
  selectAreaPerSquareIdApi: number;
  selectedCountryApi: number;
  selectedStateIdApi: number;
  showLeftIcon: boolean;
}
interface IUserInfo {
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
}
const AddProjectView = (props: Props) => {
  const {
    callGetStateAPI: pCallGetStateAPI,
    callGetProjectTypeAPI: pCallGetProjectTypeAPI,
    callGetProjectAreasAPI: _callGetProjectAreasAPI,
    callCreateProjectAPI: _callCreateProjectAPI,
    callUploadFilesAPI: _callUploadFilesAPI,
    callGetProjectDetails: pCallGetProjectDetails,
    callDeleteDocuments: pCallDeleteDocuments,
    projectDetailsResponseData,
    isGetDetailsAPIInProgress,
    fileDataProps,
  } = props;
  const {
    required,
    checkCharacter,
    selectState,
    selectCountry,
    select,
    min,
    max,
    characters,
    expectedDateError,
    unitedStates,
    requiredAboveZero,
    maxBudgetError,
  } = localStrings;
  const actionSheet = useRef<any>();
  const [formInput, setFormInput] = useState<IFormInput>({
    projectName: '',
    projectNameError: '',
    projectNameCharacterError: '',
    expectedStartDate: '',
    expectedStartDateError: '',
    expectedCompletionDate: '',
    expectedCompletionDateError: '',
    description: '',
    descriptionError: '',
    address: '',
    addressError: '',
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
    projectType: select,
    projectTypeError: '',
    area: select,
    areaError: '',
    budget: '',
    budgetError: '',
    latitude: '',
    longitude: '',
    suiteAddress: '',
    suiteAddressError: '',
    phoneNumberLength: 14,
    countryIndex: 0,
    stateIndex: 0,
    projectTypeIndex: 0,
    areaIndex: 0,
    file: [],
    selectProjectIdApi: 0,
    selectAreaPerSquareIdApi: 0,
    selectedCountryApi: 0,
    selectedStateIdApi: 0,
    showLeftIcon: false,
  });
  const {description, budget, projectName, phone} = formInput;
  const [animatedIsFocused] = useState(new Animated.Value(1));
  const [selectedCountryId, setSelectedCountryId] = useState<number>(237);
  const [selectedStateId, setSelectedStateId] = useState<number>(0);
  const [stateResponse, setStateResponse] = useState<ICountryStateResponse[]>([]);
  const [projectTypeResponse, setProjectTypeResponse] = useState<ProjectAreaTypeData[]>([]);
  const [areaTypeResponse, setAreaTypeResponse] = useState<ProjectAreaTypeData[]>([]);
  const [stateList, setStateList] = useState<string[]>([]);
  const [projectTypeList, setProjectTypeList] = useState<string[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedProjectTypeId, setSelectedProjectTypeId] = useState<number>(0);
  const [selectedAreaSqFeetId, setSelectedAreaSqFeetId] = useState<number>(0);
  const [areaList, setAreaList] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [eXCompletionDate, setEXCompletionDate] = useState<string>('');
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);
  const [fileData, setFileData] = useState<DocumentResponse[]>(fileDataProps);
  const [selectBtn, setSelectBtn] = useState<boolean>(false);
  const [isDeleteAPIInProgress, setDeleteAPIInProgress] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [addressId, setAddressID] = useState<number>(0);
  const [detailsResponse, setDetailsResponse] = useState<any>({});
  const [imageData, setImageData] = useState();
  const countryIndex = 237;
  let selectedStateIndex: number;
  const countryName = unitedStates;
  const [stateData, setStateData] = useState({
    stateIndex: 0,
    stateName: selectState,
  });
  const [projectTypeData, setProjectTypeData] = useState({
    projectTypeIndex: 0,
    projectTypeName: select,
  });
  const [areaData, setAreaData] = useState({
    areaIndex: 0,
    areasText: select,
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: 'testu0989@gmail.com',
    firstName: 'test',
    lastName: 'user',
    userName: 'test user',
  });
  useEffect(() => {
    (async () => {
      const getItem = await AsyncStorage.getItem(PROJECT_DATA.setProjectData);
      const json = JSON.parse(getItem || '');
      json.id === false
        ? (() => {
            setInitialStates();
            return () => {
              setId(0);
              setAddressID(0);
              getStateList();
            };
          })()
        : (() => {
            getProjectDetails(json.id);
          })();
    })();
  }, [props.pageChange]);

  const setInitialStates = async () => {
    setFormInput({
      projectName: '',
      projectNameError: '',
      projectNameCharacterError: '',
      expectedStartDate: '',
      expectedStartDateError: '',
      expectedCompletionDate: '',
      expectedCompletionDateError: '',
      description: '',
      descriptionError: '',
      address: '',
      addressError: '',
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
      projectType: select,
      projectTypeError: '',
      area: select,
      areaError: '',
      budget: '',
      budgetError: '',
      latitude: '',
      longitude: '',
      suiteAddress: '',
      suiteAddressError: '',
      phoneNumberLength: 10,
      countryIndex: 0,
      stateIndex: 0,
      projectTypeIndex: 0,
      areaIndex: 0,
      file: [],
      selectProjectIdApi: 0,
      selectAreaPerSquareIdApi: 0,
      selectedCountryApi: 0,
      selectedStateIdApi: 0,
      showLeftIcon: false,
    });
    getStateList();
  };

  useEffect(() => {
    selectedStateIndex = stateResponse.findIndex(ele => ele.name === stateData.stateName);
    setStateData({
      stateIndex: selectedStateIndex + 1,
      stateName: stateData.stateName,
    });
  }, [stateData.stateName]);

  const setProjectDetails = async () => {
    if (projectDetailsResponseData.Success && id !== 0) {
      const response = projectDetailsResponseData.Data;
      const address = projectDetailsResponseData.Data.Address;
      setDetailsResponse(projectDetailsResponseData.Data);
      await getStateList();
      setAddressID(projectDetailsResponseData.Data.Address.Id);
      setDate(moment(response.ExpectedStartDateUTC).format('MM/DD/YYYY'));
      setEXCompletionDate(moment(response.ExpectedCompleteDateUTC).format('MM/DD/YYYY'));
      selectedStateIndex = stateResponse.findIndex(ele => ele.name === address?.StateProvinceName);
      setStateData({
        stateIndex: selectedStateIndex + 1,
        stateName: address?.StateProvinceName,
      });
      const selectedProjectTypeIndex = projectTypeResponse.findIndex(ele => ele.Text === response?.ProjectType);
      setProjectTypeData({projectTypeIndex: selectedProjectTypeIndex, projectTypeName: response.ProjectType});
      setAreaData({areaIndex: response.AreaSqFeetId, areasText: response.AreaSqFeet});
      setSelectedProjectTypeId(response.ProjectTypeId);
      setSelectedAreaSqFeetId(response.AreaSqFeetId);
      setSelectedCountryId(address?.CountryId);
      setSelectedStateId(address?.StateProvinceId);
      setFileData(response.Attachments);
    }
  };
  useEffect(() => {
    setProjectDetails();
  }, [projectDetailsResponseData]);

  const getProjectDetails = async (projectId: number) => {
    await setId(projectId);
    await pCallGetProjectDetails(projectId);
  };
  useEffect(() => {
    setFormInput({
      ...formInput,
      projectName: detailsResponse?.Name,
      description: detailsResponse?.Description,
      address: `${detailsResponse?.Address?.Address1}`,
      suiteAddress: detailsResponse?.Address?.Suite,
      city: detailsResponse?.Address?.City,
      zipCode: detailsResponse?.Address?.ZipPostalCode,
      phone: detailsResponse?.Address?.PhoneNumber,
      budget: String(detailsResponse?.BudgetAmount),
      showLeftIcon: true,
    });
  }, [detailsResponse]);

  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
      'StatusBarIOS has been merged with StatusBar and will be removed in a future release.',
      'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.',
      'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.',
    ]);
  }, []);
  useEffect(() => {
    if (
      budget.length !== 0 &&
      projectName.length !== 0 &&
      projectName.length <= 50 &&
      description.length >= 200 &&
      date.length !== 0 &&
      eXCompletionDate.length !== 0 &&
      stateData.stateName !== selectState &&
      projectTypeData.projectTypeName !== select &&
      areaData.areasText !== select &&
      formInput.city.length !== 0 &&
      formInput.zipCode.length !== 0 &&
      formInput.expectedCompletionDateError === '' &&
      Number(budget) !== 0 &&
      Number(budget) <= MAX_BUDGET_RANGE
    ) {
      if (formInput.phone && formInput.phone.length === formInput.phoneNumberLength && formInput.phoneError === '') {
        setSelectBtn(true);
      } else if (formInput.phone === '') {
        setSelectBtn(true);
      } else if (formInput.phoneError === '') {
        setSelectBtn(true);
      } else {
        setSelectBtn(false);
      }
    } else {
      setSelectBtn(false);
    }
  }, [
    formInput.zipCode,
    formInput.city,
    budget,
    projectName,
    description,
    phone,
    date,
    eXCompletionDate,
    stateData.stateName,
    projectTypeData,
    areaData,
    formInput.expectedCompletionDateError,
  ]);

  useEffect(() => {
    setFormInput({
      ...formInput,
      projectTypeIndex: projectTypeData.projectTypeIndex,
      projectType: projectTypeData.projectTypeName,
    });
  }, [projectTypeData]);

  useEffect(() => {
    setFormInput({
      ...formInput,
      areaIndex: areaData.areaIndex,
      area: areaData.areasText,
    });
  }, [areaData]);

  useEffect(() => {
    setFormInput({
      ...formInput,
      expectedStartDate: date,
    });
  }, [date]);

  useEffect(() => {
    setFormInput({
      ...formInput,
      country: countryName,
      countryIndex,
    });
  }, [countryIndex]);

  useEffect(() => {
    setFormInput({
      ...formInput,
      state: stateData.stateName,
      stateIndex: stateData.stateIndex,
    });
  }, [stateData]);
  useEffect(() => {
    setFormInput({
      ...formInput,
      expectedCompletionDate: eXCompletionDate,
    });
  }, [eXCompletionDate]);
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    pCallGetProjectTypeAPI()
      .then(res => {
        const arrProjectTypeList: string[] = [];
        if (res != null && res?.Data?.length > 1) {
          const projectTypeListArr = res.Data;
          const removeSelectAll = projectTypeListArr.shift();
          setProjectTypeResponse(projectTypeListArr);
          for (let i = 0; i < res?.Data?.length; ) {
            arrProjectTypeList.push(res.Data[i].Text);
            i += 1;
          }
          setProjectTypeList(arrProjectTypeList);
        }
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    _callGetProjectAreasAPI()
      .then((res: AreaType) => {
        const arrAreaList: string[] = [];
        if (res != null && res?.Data?.length > 1) {
          setAreaTypeResponse(res.Data);
          for (let i = 0; i < res?.Data?.length; ) {
            arrAreaList.push(res.Data[i].Text);
            i += 1;
          }
          setAreaList(arrAreaList);
        }
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    const element = stateResponse.find(ele => ele.name === formInput.state);
    if (element) {
      setSelectedStateId(element.id);
      setFormInput({
        ...formInput,
        selectedStateIdApi: element.id,
      });
      selectedStateIndex = stateResponse.findIndex(ele => ele.name === formInput.state);
      setStateData({
        stateIndex: selectedStateIndex + 1,
        stateName: formInput.state,
      });
    }
  }, [stateResponse]);

  /**
   * validation of start and completion date.
   */
  useEffect(() => {
    const startDate = new Date(date);
    const endDate = new Date(eXCompletionDate);
    if (eXCompletionDate && date) {
      if (startDate > endDate) {
        setFormInput({
          ...formInput,
          expectedCompletionDateError: expectedDateError,
        });
      } else {
        setFormInput({
          ...formInput,
          expectedCompletionDateError: '',
        });
      }
    }
  }, [date, eXCompletionDate]);
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
  const showActionSheet = () => {
    actionSheet?.current?.show();
  };
  const onPress = (index: number) => {
    const selectMultiple = true;
    if (index === 0) {
      openDeviceCamera(fileData)
        .then((res: any) => {
          const response = [...res];
          if (res.length >= 1) {
            setFileData(response);
            setFormInput({
              ...formInput,
              file: response,
            });
          } else {
            setFileData([]);
            setFormInput({
              ...formInput,
              file: [],
            });
          }
        })
        .catch((error: any) => {
          console.log('error', error);
        });
    } else if (index === 1) {
      const selectMultipleImage = false;
      onSelectGalleyPress(fileData, selectMultipleImage)
        .then((res: any) => {
          const response = [...res];
          if (res.length >= 1) {
            setFileData(response);
            setFormInput({
              ...formInput,
              file: response,
            });
          } else {
            setFileData([]);
            setFormInput({
              ...formInput,
              file: [],
            });
          }
        })
        .catch((error: any) => {
          console.log('error', error);
        });
    } else if (index === 2) {
      pickDocument(fileData, selectMultiple)
        .then(res => {
          const response = [...res];
          if (res.length >= 1) {
            setFileData(response);
            setFormInput({
              ...formInput,
              file: response,
            });
          } else {
            setFileData([]);
            setFormInput({
              ...formInput,
              file: [],
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  /**
   * Function for uploading files on server.
   * @param projectId contain project ID
   */
  const onUploadFile = async (projectId: number) => {
    for (let i = 0; i < fileData.length; ) {
      if (!fileData[i].Id) {
        // eslint-disable-next-line no-await-in-loop
        await _callUploadFilesAPI({
          fileBase64String: fileData[i].fileBase64Path,
          fileName: fileData[i].fileName,
          fileType: fileData[i].fileType,
          entityName: projectEntityName,
          entityId: projectId,
        })
          .then(res => {
            if (res.Success) {
              console.log('upload file success');
            }
          })
          .catch((error: {message: string}) => {
            showToastMessage(strings.error, error.message);
          });
      }
      i += 1;
    }
    return true;
  };
  /**
   * Function for removing document.
   * @param id document index
   */
  const removeDoc = (index: number, documentId: number) => {
    if (documentId) {
      pCallDeleteDocuments({
        entityId: id,
        entityName: 'Project',
        documentId,
      })
        .then(res => {
          if (res.Success) {
            setDeleteAPIInProgress(false);
            getProjectDetails(id);
          }
        })
        .catch(error => {
          setDeleteAPIInProgress(false);
          showToastMessage(strings.error, error.message);
        });
    } else {
      fileData.splice(index, 1);
      const updatedData = [...fileData];
      setFileData(updatedData);
    }
  };

  const OpenCalender = (changeDate: {
    (value: React.SetStateAction<string>): void;
    (value: React.SetStateAction<string>): void;
    (arg0: string): void;
  }) => {
    const today = moment().format('MM/DD/YYYY');
    return (
      <DatePicker
        style={styles.datePicker}
        mode="date"
        format="MM/DD/YYYY"
        minDate={today}
        maxDate="12/31/2099"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconComponent={<CalenderImage source={require('../../../assets/images/briefcase/iconsHeaderCalender.png')} />}
        customStyles={{
          dateIcon: {
            marginTop: -50,
          },
          dateInput: {
            width: 0,
            height: 0,
            marginLeft: 0,
            borderWidth: 0,
            margin: 0,
          },
        }}
        onDateChange={(startDate: string) => {
          changeDate(startDate);
        }}
      />
    );
  };
  /** *
   * Google address
   */
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
  const openAddressModal = () => {
    RNGooglePlaces.openAutocompleteModal({country: 'US', type: 'address'})
      .then((place: {addressComponents: any[]; address: any; name: string; location: any}) => {
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
        console.log('error', error);
      });
  };
  /**
   * function for getting selected project type ID
   * @param index of selected Project Type.
   */
  const onSelectProjectType = (index: number, text: string) => {
    setProjectTypeData({projectTypeIndex: index, projectTypeName: text});
    const projectIndexNode: ProjectAreaTypeData = projectTypeResponse[index];
    const projectTypeId = Number(projectIndexNode?.Value);
    setSelectedProjectTypeId(projectTypeId);
    setFormInput({
      ...formInput,
      selectProjectIdApi: projectTypeId,
    });
  };
  /**
   * function for getting selected area ID
   * @param index of selected Area.
   */
  const onSelectArea = (index: number, text: string) => {
    setAreaData({areaIndex: index, areasText: text});
    const areaId: ProjectAreaTypeData = areaTypeResponse[index];
    setSelectedAreaSqFeetId(Number(areaId.Value));
    setFormInput({
      ...formInput,
      selectAreaPerSquareIdApi: Number(areaId.Value),
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
   * function for getting list of states according to the selected country.
   * @param index of selected country.
   */
  const getStateList = () => {
    const arrStateNameList: string[] = [];
    setFormInput({
      ...formInput,
      selectedCountryApi: countryId,
    });
    pCallGetStateAPI(countryId)
      .then((res: StateResponse) => {
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
          setStateData({stateIndex: selectedStateIndex, stateName: arrStateNameList[0]});
        }
      })
      .catch(() => {});
  };

  /**
   * Form validation start
   */
  const validateProjectName = () => {
    const errorMsg = formInput.projectName === '' ? required : '';
    const spaceCheck = formInput.projectName !== '' ? extraSpaceRemove(formInput.projectName) : '';
    setFormInput({
      ...formInput,
      projectNameError: errorMsg,
      projectName: spaceCheck,
    });
  };

  const validateCity = () => {
    const errorMsg = formInput.city === '' ? required : '';
    setFormInput({
      ...formInput,
      cityError: errorMsg,
    });
  };

  const onChangeProjectName = (text: string) => {
    const spaceCheck = VALIDATION_REGEX.spaceCheckInStarting.test(text[0]);
    const testNew = text.replace(VALIDATION_REGEX.textCheck, '');

    if (text && spaceCheck === false) {
      if (text.length > 50) {
        setFormInput({
          ...formInput,
          projectName: testNew,
          projectNameError: checkCharacter,
        });
      } else {
        setFormInput({
          ...formInput,
          projectName: testNew,
          projectNameError: '',
        });
      }
    } else {
      setFormInput({
        ...formInput,
        projectName: '',
        projectNameError: required,
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
    } else if (text.length > 50) {
      setFormInput({
        ...formInput,
        suiteAddress: suiteAddressNew,
        suiteAddressError: `${max} ${text.length} ${characters}`,
      });
    } else {
      setFormInput({
        ...formInput,
        suiteAddress: '',
      });
    }
  };

  const validateDescription = () => {
    let errorMsg = formInput.description === '' ? required : '';

    if (formInput.description === '') {
      errorMsg = required;
    } else if (formInput.description.length < 200) {
      errorMsg = `${min} ${200 - formInput.description.length} ${characters}`;
    }
    setFormInput({
      ...formInput,
      descriptionError: errorMsg,
    });
  };
  const onChangeDescription = (text: string) => {
    const descriptionNew = text.replace(VALIDATION_REGEX.textCheck, '');
    if (text) {
      setFormInput({
        ...formInput,
        description: descriptionNew,
        descriptionError: '',
      });
      if (text.length < 200) {
        setFormInput({
          ...formInput,
          description: descriptionNew,
          descriptionError: `${min} ${200 - text.length} ${characters}`,
        });
      } else {
        setFormInput({
          ...formInput,
          description: descriptionNew,
          descriptionError: '',
        });
      }
    } else {
      setFormInput({
        ...formInput,
        description: '',
        descriptionError: required,
      });
    }
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
  const onChangeBudget = (text: string) => {
    const regex = /^(?=.*\d)\d{0,}(?:\.\d{0,2})?$/;
    const newValue = regex.test(text);
    if (text) {
      if (newValue) {
        setFormInput({
          ...formInput,
          budget: text,
        });
      }
    } else {
      setFormInput({
        ...formInput,
        budget: '',
        budgetError: required,
        showLeftIcon: false,
      });
    }
  };
  useEffect(() => {
    if (formInput.budget) {
      if (Number(formInput.budget) === 0) {
        setFormInput({
          ...formInput,
          budgetError: requiredAboveZero,
          showLeftIcon: true,
        });
      } else if (Number(formInput.budget) > MAX_BUDGET_RANGE) {
        setFormInput({
          ...formInput,
          budgetError: maxBudgetError,
          showLeftIcon: true,
        });
      } else {
        setFormInput({
          ...formInput,
          budgetError: '',
          showLeftIcon: true,
        });
      }
    }
  }, [formInput.budget]);
  const validateBudget = () => {
    const errorMsg = formInput.budget === '' ? required : '';
    if (errorMsg) {
      setFormInput({
        ...formInput,
        budgetError: errorMsg,
        showLeftIcon: false,
      });
    } else if (Number(formInput.budget) === 0) {
      setFormInput({
        ...formInput,
        budgetError: requiredAboveZero,
        showLeftIcon: true,
      });
    } else if (Number(formInput.budget) > MAX_BUDGET_RANGE) {
      setFormInput({
        ...formInput,
        budgetError: maxBudgetError,
        showLeftIcon: true,
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
  /**
   * function that change phone number to required pattern
   * @param value phone number
   */
  const setPhonePattern = async (value: string) => {
    const cleaned = `${value}`.replace(VALIDATION_REGEX.checkPhone, '');
    const match = cleaned.match(VALIDATION_REGEX.phonePattern);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      const number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

      await setFormInput({
        ...formInput,
        phone: number,
        phoneNumberLength: 14,
        phoneError: '',
      });
      return;
    }
    if (value) {
      if (value.length < 12) {
        setFormInput({
          ...formInput,
          phone: value,
          phoneError: localStrings.minDigit,
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
  };

  const onSubmit = () => {
    setIsAPIinProgress(true);
    const {address, city, zipCode, latitude, longitude, suiteAddress} = formInput;
    _callCreateProjectAPI({
      id,
      name: extraSpaceRemove(projectName),
      expectedStartDateUTC: date,
      expectedCompleteDateUTC: eXCompletionDate,
      description,
      customerName: userInfo?.userName || '',
      projectTypeId: selectedProjectTypeId,
      areaSqFeetId: selectedAreaSqFeetId,
      budget: Number(budget),
      budgetCurrencyId: 0,
      completedStep: 0,
      isConfirmed: false,
      address: {
        id: addressId,
        firstName: userInfo?.firstName || '',
        lastName: userInfo?.lastName || '',
        email: userInfo?.email || '',
        company: 'Bildsy',
        countryId: selectedCountryId,
        stateProvinceId: selectedStateId,
        city,
        address1: address,
        zipPostalCode: zipCode,
        phoneNumber: phone,
        longitude: Number(longitude),
        latitude: Number(latitude),
        suite: suiteAddress,
        addressProjectPost: '0',
      },
    })
      .then(res => {
        if (res.Success) {
          storeData(res);
        } else if (!res.Success) {
          showToastMessage(strings.error, res.Message);
        }
      })
      .catch(error => {
        setIsAPIinProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * Stored data
   */
  const storeData = async (res: any) => {
    try {
      const projectDate = {
        id: res.Data.Id,
        randomUniqId: res.Data.RandomUniqId,
        locationId: res.Data.Address.Id,
        projectTypeId: res.Data.ProjectTypeId,
      };
      await AsyncStorage.setItem(PROJECT_DATA.setProjectData, JSON.stringify(projectDate));
      if (fileData) {
        await onUploadFile(res.Data.Id);
      }
      await setIsAPIinProgress(false);
      if (res?.Data?.ProjectStatus === statusProjectAwarded) {
        changePager(2, res.Data.Id, projectDate.locationId);
      } else {
        await changePager(1, res.Data.Id, projectDate.locationId);
      }
    } catch (error: any) {
      showToastMessage('', error.Error);
    }
  };
  const changePager = (pager: number, projectId: number, locationId: number) => {
    if (props.onChange) props?.onChange(pager, projectId, locationId);
  };
  /**
   * function for showing budget icon.
   */
  const onFocusOnBudget = () => {
    setFormInput({
      ...formInput,
      showLeftIcon: true,
    });
  };
  /**
   * Component that contain State dropdown.
   */
  const StateDropDown = () => (
    <>
      <DropDownView>
        <Animated.Text style={labelStyle}>{strings.stateProvinceRegion}</Animated.Text>
        <ModalDropdown
          defaultValue={stateData.stateName}
          defaultIndex={selectedStateIndex || stateData.stateIndex}
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
  /**
   * Component that contain projectType dropdown.
   */
  const ProjectTypeDropDown = () => (
    <>
      <DropDownView>
        <Animated.Text style={labelStyle}>{strings.projectType}</Animated.Text>
      </DropDownView>
      <ModalDropdown
        defaultValue={projectTypeData.projectTypeName}
        defaultIndex={projectTypeData.projectTypeIndex}
        options={projectTypeList}
        dropdownStyle={styles.fullWidthDropDownModal}
        style={styles.fullWidthDropDownStyle}
        textStyle={styles.fullWidthDropDownText}
        dropdownTextStyle={styles.dropDownModalText}
        onSelect={(index: string, text: string) => {
          onSelectProjectType(Number(index), text);
        }}
        renderRightComponent={() => <DownArrow />}
      />
    </>
  );
  const AreaDropDown = () => (
    <>
      <DropDownView>
        <Animated.Text style={labelStyle}>{strings.areaSqFit}</Animated.Text>
      </DropDownView>
      <ModalDropdown
        defaultValue={areaData.areasText}
        defaultIndex={areaData.areaIndex}
        options={areaList}
        dropdownStyle={styles.dropDownModal}
        style={styles.fullWidthDropDownStyle}
        textStyle={styles.fullWidthDropDownText}
        dropdownTextStyle={styles.dropDownModalText}
        onSelect={(index: number, text: string) => {
          onSelectArea(index, text);
        }}
        renderRightComponent={() => <DownArrow />}
      />
    </>
  );

  const changeToggleValue = () => {
    setToggle(!toggle);
  };

  const toggleModal = async (res: any) => {
    await setImageData(res);
    changeToggleValue();
  };
  return (
    <>
      <ControlContainer>
        <ImageModel changeToggleValue={changeToggleValue} toggle={toggle} data={imageData} />
        {isGetDetailsAPIInProgress ? (
          <MainLoaderContainer>
            <ActivityIndicator size="large" color={colors.primaryThemeColor} style={styles.activityIndicator} />
          </MainLoaderContainer>
        ) : (
          <>
            <InputFieldContainer>
              <DetailText>{strings.projectDetails}</DetailText>
              <SpaceBetweenText />
              <InputFieldWrapper>
                <FloatingLabelInput
                  testID={strings.projectName}
                  enableFocus={formInput.projectName !== ''}
                  label={strings.projectName}
                  onChangeText={(text: string) => {
                    onChangeProjectName(text);
                  }}
                  inputValue={formInput.projectName}
                  onBlurHandler={() => validateProjectName()}
                  errorText={formInput.projectNameError}
                />
              </InputFieldWrapper>

              <InputFieldWrapper>
                <FloatingLabelInput
                  testID={strings.expectedStartDate}
                  enableFocus={date !== ''}
                  editable={false}
                  label={strings.expectedStartDate}
                  isShowOpenEye={true}
                  rightIcon={OpenCalender(setDate)}
                  inputValue={date}
                  onChangeText={(text: string) => {
                    setDate(text);
                  }}
                />
              </InputFieldWrapper>

              <InputFieldWrapper>
                <FloatingLabelInput
                  testID={strings.desiredCompletionDate}
                  enableFocus={eXCompletionDate !== ''}
                  editable={false}
                  label={strings.desiredCompletionDate}
                  isShowOpenEye={true}
                  rightIcon={OpenCalender(setEXCompletionDate)}
                  inputValue={eXCompletionDate}
                  onChangeText={(text: string) => {
                    setEXCompletionDate(text);
                  }}
                  errorText={formInput.expectedCompletionDateError}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <FloatingLabelInput
                  testID={strings.description}
                  enableFocus={formInput.description !== ''}
                  label={strings.descriptionWithStar}
                  inputValue={formInput.description}
                  onChangeText={(text: string) => {
                    onChangeDescription(text);
                  }}
                  numberOfLines={10}
                  errorText={formInput.descriptionError}
                  multiline={true}
                  onBlurHandler={() => validateDescription()}
                />
              </InputFieldWrapper>
              <DetailText>{strings.location}</DetailText>
              <SpaceBetweenText />

              <InputFieldWrapper>
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
                      label={strings.address}
                      errorText={formInput.addressError}
                    />
                  </BlankInputView>
                </InputFieldContainerPressable>
              </InputFieldWrapper>
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
                  <FullWidthDropDown>
                    <StateDropDown />
                  </FullWidthDropDown>
                </DropDownRowContainer>
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
                  enableFocus={formInput.phone !== '' && formInput.phone !== null}
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
              <DetailText> {strings.specification}</DetailText>
              <SpaceBetweenText />

              <InputFieldWrapper>
                <DropDownRowContainer>
                  <FullWidthDropDown>
                    <ProjectTypeDropDown />
                  </FullWidthDropDown>
                </DropDownRowContainer>
              </InputFieldWrapper>
              <InputFieldWrapper>
                <DropDownRowContainer>
                  <FullWidthDropDown>
                    <AreaDropDown />
                  </FullWidthDropDown>
                </DropDownRowContainer>
              </InputFieldWrapper>
              <InputFieldWrapper>
                <FloatingLabelInput
                  testID={strings.budget}
                  enableFocus={formInput.budget !== ''}
                  label={strings.budget}
                  keyboardType="decimal-pad"
                  inputValue={formInput.budget}
                  errorText={formInput.budgetError}
                  onChangeText={(text: string) => {
                    onChangeBudget(text);
                  }}
                  onBlurHandler={() => validateBudget()}
                  isShowLeftIcon={formInput.showLeftIcon}
                  onFocusHandler={() => onFocusOnBudget()}
                />
              </InputFieldWrapper>
              <DetailText>{strings.addAttachment}</DetailText>
              <SpaceBetweenText />
            </InputFieldContainer>

            {fileData?.map((res: any, idx: number) => (
              <AttachmentListContainer key={idx}>
                <AttachmentList>
                  <AttachmentImageContainer>
                    {ImageExtension.includes(res.fileType) || ImageExtension.includes(res.FileExtension) ? (
                      <>
                        <ToggleWrapper
                          testID={strings.toggleButton}
                          onPress={() => {
                            toggleModal(res);
                          }}>
                          <ProfileImage
                            source={res?.FilePath ? {uri: res?.FilePath} : {uri: res?.uri}}
                            resizeMode="cover"
                          />
                        </ToggleWrapper>
                      </>
                    ) : (
                      <Document />
                    )}
                  </AttachmentImageContainer>
                  <AttachmentNameContainer>
                    <AttachmentName numberOfLines={1} ellipsizeMode="middle">
                      {res?.FileName ? res?.FileName : res?.fileName}
                    </AttachmentName>
                  </AttachmentNameContainer>
                  <AttachmentRemoveContainer>
                    <TouchableContainer
                      testID={strings.removeDocBtn}
                      onPress={() => {
                        removeDoc(idx, res.Id);
                      }}>
                      <Close />
                    </TouchableContainer>
                  </AttachmentRemoveContainer>
                </AttachmentList>
              </AttachmentListContainer>
            ))}

            <AddAttachmentView testID={strings.showActionSheetButton} onPress={showActionSheet}>
              <AddFloatingBtn />
              <AddAttachmentText>{strings.addProjectPlan}</AddAttachmentText>
            </AddAttachmentView>
            <ActionSheet
              ref={actionSheet}
              options={actionSheetOptions}
              cancelButtonIndex={3}
              destructiveButtonIndex={3}
              onPress={(index: number) => {
                onPress(index);
              }}
            />
            <SubmitButton
              testID={strings.submitBtn}
              disabled={!selectBtn}
              onPress={onSubmit}
              selected={selectBtn}
              style={{marginHorizontal: rw(24)}}>
              <ButtonText>
                {!isAPIinProgress && strings.next}
                {isAPIinProgress && <ActivityIndicator size="small" color={colors.white} />}
              </ButtonText>
            </SubmitButton>
          </>
        )}
      </ControlContainer>
    </>
  );
};

const mapStateToProps = (store: IStoreProjectDetails) => ({
  projectDetailsResponseData: store?.projectDetails?.payload,
  isGetDetailsAPIInProgress: store?.projectDetails?.isApiInProgress,
});
const mapDispatchToProps = {
  callGetStateAPI,
  callGetProjectTypeAPI,
  callGetProjectAreasAPI,
  callCreateProjectAPI,
  callUploadFilesAPI,
  callGetProjectDetails,
  callDeleteDocuments,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProjectView);
