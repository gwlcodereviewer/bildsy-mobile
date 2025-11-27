import React, {useState, useEffect, useRef} from 'react';
import {Modal, TouchableOpacity, ActivityIndicator, Animated, LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import ReadMore from 'react-native-read-more-text';
import {Popable} from 'react-native-popable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FloatingLabelInput from '../../../components/floatingLabelInput';
import {strings} from '../../../constants/strings';
import {
  actionSheetOptions,
  ImageExtension,
  MAX_BUDGET_RANGE,
  projectEntityName,
} from '../../../constants/utils/constantData';
import {
  IUpdateProjectDetails,
  IUpdateSpecifications,
  IFileUpload,
  IDeleteDocuments,
  IStoreProjectDetails,
} from '../../../redux/types';
import colors from '../../../style/colors';
import {rh, rpx, rw} from '../../../style/Dimen';
import {
  EmptyViewContainer,
  SubmitButton,
  ButtonText,
  RowContainer,
  NoProjectAvailable,
  NoProjectAvailableText,
} from '../../../style/index';
import DownArrow from '../../../assets/svg/DownArrow';
import {
  callGetProjectDetails,
  callGetProjectProfessionalList,
  callUpdateProjectDetails,
  callGetProjectAreasAPI,
  callUpdateSpecificationsAPI,
  callUploadFilesAPI,
  callDeleteDocuments,
  callSaveProject,
  callProfessionalDetailById,
} from '../../../redux/actions/auth';
import {
  ControlContainer,
  InputFieldContainer,
  SpaceBetweenText,
  ConfirmContainerView,
  ProjectDetailText,
  ListConfirmContainerView,
  TypeAnsList,
  EditImage,
  ProjectDetailView,
  DescriptionText,
  ShowMoreLessText,
  ProfessionalDetailView,
  ProfessionalDetailText,
  ProfessionalContainer,
  EditTouch,
  NextText,
  PopUpLabel,
  SaveButtonContainer,
  DropDownRowContainer,
  FullWidthDropDown,
  NextButtonContainer,
  SpaceInList,
  CalenderImage,
  AttachmentListContainer,
  AttachmentListContainerPopUp,
  AttachmentList,
  AttachmentImageContainer,
  AttachmentName,
  TouchableContainer,
  BottomCardContainer,
  DetailsText,
  DetailsTitle,
  ProName,
  CompanyDetails,
  CompanyLogoImage,
  ValueText,
  AddAttachmentText,
  AddAttachmentModalView,
  MainLoaderContainer,
  FullWidthDetailsText,
  DetailsTextContainer,
  BudgetRowContainer,
  ToggleWrapper,
  ProfileImage,
  AttachmentNameContainer,
} from '../styled';
import {
  INavigation,
  IProjectDetailsResponseType,
  ISelectedProfessionalResponse,
  IBidsProfessionalsResponseTypeRoot,
  AttachmentResponse,
} from '../../../types';
import {
  showToastMessage,
  openDeviceCamera,
  pickDocument,
  attachmentDownload,
  onSelectGalleyPress,
  VALIDATION_REGEX,
} from '../../../utils';
import {localStrings} from '../../../localization/localStrings';
import {PROJECT_DATA} from '../../../helpers/constants';
import {CenteredView, CenteredViewCheck, ModalView, ScrollViewContainer} from '../modalStyled';
import Document from '../../../assets/svg/Document';
import Close from '../../../assets/svg/Close';
import AddFloatingBtn from '../../../assets/svg/AddFloatingBtn';
import styles from '../../../style/style';
import pngImages from '../../../assets/images/pngImages';
import ProfessionalsModelView from '../../../components/professionalsModalView';
import ImageModel from '../../../components/imageModeView';

interface Props {
  navigation?: INavigation;
  callGetProjectDetails: (param: number) => Promise<any>;
  callGetProjectProfessionalList: (param: number) => Promise<any>;
  callUpdateProjectDetails: (param: IUpdateProjectDetails) => Promise<any>;
  callGetProjectAreasAPI: () => Promise<any>;
  callUpdateSpecificationsAPI: (param: IUpdateSpecifications) => Promise<any>;
  onChange?: (pager: number, projectId: number, locationId: number) => void;
  callUploadFilesAPI: (param: IFileUpload) => Promise<any>;
  callDeleteDocuments: (param: IDeleteDocuments) => Promise<any>;
  callProfessionalDetailById: (param: number) => Promise<IBidsProfessionalsResponseTypeRoot>;
  callSaveProject: (param: number) => Promise<any>;
  projectDetailsResponseData: IProjectDetailsResponseType;
  selectedProfessionalsData: ISelectedProfessionalResponse;
  projectDetailsAPIInProgress: boolean;
  isSelectProfessionAPIInProgress: boolean;
  pageChange: boolean;
  fileDataProps: AttachmentResponse[];
}
interface IFormInput {
  projectName: string;
  projectNameError: string;
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
  area: number;
  areaError: string;
  budget: string;
  budgetError: string;
  latitude: string;
  longitude: string;
  phoneNumberLength: number;
  suiteAddress: string;
  showLeftIcon: boolean;
  file: [];
}
const ConfirmView = (props: Props) => {
  const {
    callGetProjectDetails: pCallGetProjectDetails,
    callGetProjectProfessionalList: pCallGetProjectProfessionalList,
    callUpdateProjectDetails: pCallUpdateProjectDetails,
    callGetProjectAreasAPI: pCallGetProjectAreasAPI,
    callUpdateSpecificationsAPI: pCallUpdateSpecificationsAPI,
    callProfessionalDetailById: pCallProfessionalDetailById,
    callUploadFilesAPI: pCallUploadFilesAPI,
    callDeleteDocuments: pCallDeleteDocuments,
    callSaveProject: pCallSaveProject,
    projectDetailsResponseData,
    selectedProfessionalsData,
    projectDetailsAPIInProgress,
    isSelectProfessionAPIInProgress,
    fileDataProps,
  } = props;
  const {
    required,
    checkCharacter,
    min,
    characters,
    expectedDateError,
    maxBudgetError,
    requiredAboveZero,
    attachmentUploadStatus,
  } = localStrings;
  const actionSheet = useRef<any>();
  const [animatedIsFocused] = useState(new Animated.Value(1));
  const [specificationVisible, setSpecificationVisible] = useState(false);
  const [projectDetailVisible, setProjectDetailVisible] = useState(false);
  const [descriptionVisible, setDescriptionsVisible] = useState(false);
  const [attachmentVisible, setAttachmentVisible] = useState(false);
  const [imageUploadStatus, setImageUploadStatus] = useState(false);
  const [isUpdateDetailsAPIInProgress, setUpdateDetailsAPIInProgress] = useState<boolean>(false);
  const [getProfessionalAPIInProg, setGetProfessionalAPIInProg] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [EXCompletionDate, setEXCompletionDate] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [imageToggle, setImageToggle] = useState<boolean>(false);
  const [projectTypeList, setProjectTypeList] = useState<string[]>([]);
  const [areaTypeResponse, setAreaTypeResponse] = useState([]);
  const [imageData, setImageData] = useState();
  const [selectedAreaSqFeetId, setSelectedAreaSqFeetId] = useState<number>(0);
  const [isConfirmAPIInProgress, setConfirmAPIInProgress] = useState<boolean>(false);
  const [isSpecificationAPIInProgress, setSpecificationAPIInProgress] = useState<boolean>(false);
  const [isUploadAPIInProgress, setUploadAPIInProgress] = useState<boolean>(false);
  const [fileData, setFileData] = useState<any[]>([]);
  const [proData, setProData] = useState<any>();
  const [selectBtn1, setSelectBtn1] = useState<boolean>(false);
  const [selectBtn3, setSelectBtn3] = useState<boolean>(false);
  const [isGetDetailsAPIInProgress, setIsGetDetailsAPIInProgress] = useState<boolean>(false);
  const [projectStatusId, setProjectStatusId] = useState<number>(0);
  const descriptionLines = 3;
  const [projectTypeData, setProjectTypeData] = useState({
    projectTypeIndex: 0,
    projectTypeName: 'Project Type',
  });
  const [areaData, setAreaData] = useState({
    areaIndex: 0,
    areasText: 'Area (Sq.ft *)',
  });
  const [countryData, setCountryData] = useState({
    countryIndex: 0,
    countryName: localStrings.selectCountry,
  });
  const [stateData, setStateData] = useState({
    stateIndex: 0,
    stateName: localStrings.selectState,
  });
  const [attachmentsData, setAttachmentData] = useState<AttachmentResponse[]>(fileDataProps);
  const attachmentFileData: any[] = [];
  const [areaList, setAreaList] = useState<string[]>([]);
  const [projectInfo, setProjectInfo] = useState({
    id: 0,
  });

  const [formInput, setFormInput] = useState<IFormInput>({
    projectName: '',
    projectNameError: '',
    expectedStartDate: '',
    expectedStartDateError: '',
    expectedCompletionDate: '',
    expectedCompletionDateError: '',
    description: '',
    descriptionError: '',
    address: '',
    addressError: '',
    country: '',
    countryError: '',
    state: '',
    stateError: '',
    city: '',
    cityError: '',
    zipCode: '',
    zipCodeError: '',
    phone: '',
    phoneError: '',
    projectType: '',
    projectTypeError: '',
    area: 0,
    areaError: '',
    budget: '',
    budgetError: '',
    latitude: '',
    longitude: '',
    phoneNumberLength: 10,
    suiteAddress: '',
    showLeftIcon: false,
    file: [],
  });

  /**
   * function for enabling project info. button.
   */
  useEffect(() => {
    if (
      formInput.projectName.length !== 0 &&
      formInput.projectName.length <= 50 &&
      date.length !== 0 &&
      EXCompletionDate.length !== 0 &&
      formInput.description.length >= 200 &&
      formInput.expectedCompletionDateError === ''
    ) {
      setSelectBtn1(true);
    } else {
      setSelectBtn1(false);
    }
  }, [
    formInput.projectName,
    date,
    EXCompletionDate,
    formInput.description,
    stateData.stateName,
    formInput.expectedCompletionDateError,
  ]);

  /**
   * function for selecting specifications.
   */
  useEffect(() => {
    if (
      areaData.areaIndex !== 0 &&
      projectTypeData.projectTypeIndex !== 0 &&
      projectTypeData.projectTypeName !== '' &&
      Number(formInput.budget) > 0 &&
      Number(formInput.budget) <= MAX_BUDGET_RANGE
    ) {
      setSelectBtn3(true);
    } else {
      setSelectBtn3(false);
    }
  }, [projectTypeData, areaData, formInput.budget]);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  /**
   * Function for animated.
   */
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  /**
   * Function for getting project id.
   */
  useEffect(() => {
    AsyncStorage.getItem(PROJECT_DATA.setProjectData)
      .then(data => {
        const projectData = JSON.parse(data || '');
        setProjectInfo({
          id: projectData.id,
        });
        getProjectDetails(projectData.id);
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  }, []);

  useEffect(() => {
    pCallGetProjectAreasAPI()
      .then((res: any) => {
        const arrAreaList: string[] = [];
        if (res != null && res.Data.length > 1) {
          setAreaTypeResponse(res.Data);
          for (let i = 0; i < res.Data.length; ) {
            arrAreaList.push(res.Data[i].Text);
            i += 1;
          }
          setAreaList(arrAreaList);
        }
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  }, [specificationVisible]);
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
  /**
   * validation of start and completion date.
   */
  useEffect(() => {
    if (EXCompletionDate && date) {
      if (date > EXCompletionDate) {
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
  }, [date, EXCompletionDate]);
  /**
   * function for getting project details.
   * @param id projectId
   */
  useEffect(() => {
    if (projectDetailsResponseData?.Success) {
      const response = projectDetailsResponseData?.Data;
      const address = projectDetailsResponseData?.Data?.Address;
      if (projectInfo.id !== 0) getProfessionalList(projectInfo.id);

      setAttachmentData(response.Attachments);
      setProjectStatusId(response.ProjectStatusId);
      setFormInput({
        ...formInput,
        projectName: response.Name,
        description: response.Description,
        address: `${address.Address1}`,
        suiteAddress: address.Suite,
        city: address.City,
        zipCode: address.ZipPostalCode,
        phone: address.PhoneNumber,
        budget: String(response.BudgetAmount),
      });
      setDate(response.ExpectedStartDateUTC.split('T')[0]);
      setEXCompletionDate(response.ExpectedCompleteDateUTC.split('T')[0]);
      setCountryData({countryIndex: address?.CountryId, countryName: address?.CountryName || ''});
      setStateData({
        stateIndex: address?.StateProvinceId,
        stateName: address?.StateProvinceName,
      });
      setProjectTypeData({projectTypeIndex: response.ProjectTypeId, projectTypeName: response.ProjectType});
      setAreaData({areaIndex: response.AreaSqFeetId, areasText: response.AreaSqFeet});
    }
    setIsGetDetailsAPIInProgress(projectDetailsAPIInProgress);
  }, [projectDetailsResponseData]);

  const getProjectDetails = (id: number) => {
    pCallGetProjectDetails(id);
  };
  /**
   * function for getting professionals list.
   * @param id project Id
   */
  const getProfessionalList = (id: number) => {
    pCallGetProjectProfessionalList(id);
    setIsGetDetailsAPIInProgress(isSelectProfessionAPIInProgress);
  };
  /**
   * Function called on save details.
   */
  const onConfirm = () => {
    setConfirmAPIInProgress(true);
    pCallSaveProject(projectInfo.id)
      .then(res => {
        if (res.Success) {
          props.navigation?.navigate('Projects');
        }
        setConfirmAPIInProgress(false);
      })
      .catch(error => {
        setConfirmAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * remove document
   */
  const removeDoc = (id: number, documentId: number) => {
    if (documentId) {
      pCallDeleteDocuments({
        entityId: projectInfo.id,
        entityName: 'Project',
        documentId,
      })
        .then(res => {
          if (res.Success) {
            getProjectDetails(projectInfo.id);
          }
        })
        .catch(error => {
          showToastMessage(strings.error, error.message);
        });
    } else {
      attachmentsData.splice(id, 1);
      const updatedAttachmentsData = [...attachmentsData];
      setAttachmentData(updatedAttachmentsData);
    }
  };
  /**
   * Save Project details API calling
   */
  const onSaveProjectDetails = () => {
    setUpdateDetailsAPIInProgress(true);
    pCallUpdateProjectDetails({
      projectId: projectInfo.id,
      name: formInput.projectName.trim().split(/ +/).join(' '),
      startDateUTC: date,
      completeDateUTC: EXCompletionDate,
      description: formInput.description,
    })
      .then((res: {Success: boolean}) => {
        if (res.Success) {
          setUpdateDetailsAPIInProgress(false);
          setProjectDetailVisible(false);
          setDescriptionsVisible(false);
          getProjectDetails(projectInfo.id);
        }
      })
      .catch(error => {
        setUpdateDetailsAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * For open calendar.
   * @param changeDate
   */
  const OpenCalender = (changeDate: {
    (value: React.SetStateAction<string>): void;
    (value: React.SetStateAction<string>): void;
    (arg0: string): void;
  }) => {
    const today = new Date().toISOString().split('T')[0];
    return (
      <DatePicker
        style={styles.datePickerStyle}
        mode="date"
        format="YYYY-MM-DD"
        minDate={today}
        maxDate="2099-12-31"
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
  const data = projectDetailsResponseData?.Data || {};
  const {Name, ExpectedCompleteDateUTC, ExpectedStartDateUTC, Description, ProjectType, AreaSqFeet, Budget} = data;
  const {Address1, Suite, StateProvinceName, City, ZipPostalCode} = projectDetailsResponseData?.Data?.Address || '';
  let suiteAdd = '';
  if (Suite !== null) {
    suiteAdd = projectDetailsResponseData?.Data?.Address?.Suite;
  }
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

  const OpenProjectDetailPopUp = () => {
    /**
     * Form validation start.
     */
    const validateProjectName = () => {
      const errorMsg = formInput.projectName === '' ? required : '';
      setFormInput({
        ...formInput,
        projectNameError: errorMsg,
      });
    };
    const onChangeProjectName = (text: string) => {
      const spaceCheck = VALIDATION_REGEX.spaceCheckInStarting.test(text[0]);
      const projectNameNew = text.replace(VALIDATION_REGEX.textCheck, '');
      if (text && spaceCheck === false) {
        if (text.length > 50) {
          setFormInput({
            ...formInput,
            projectName: projectNameNew,
            projectNameError: checkCharacter,
          });
        } else {
          setFormInput({
            ...formInput,
            projectName: projectNameNew,
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

    return (
      <CenteredView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={projectDetailVisible}
          onRequestClose={() => {
            setProjectDetailVisible(!projectDetailVisible);
          }}>
          <CenteredViewCheck>
            <ModalView style={styles.modalView}>
              <InputFieldContainer>
                <PopUpLabel>{strings.projectDetails}</PopUpLabel>
                <SpaceBetweenText />
                <FloatingLabelInput
                  testID={strings.projectName}
                  label={strings.projectName}
                  onChangeText={(text: string) => {
                    onChangeProjectName(text);
                  }}
                  inputValue={formInput.projectName}
                  onBlurHandler={() => validateProjectName()}
                  errorText={formInput.projectNameError}
                  enableFocus={true}
                />
                <SpaceBetweenText />
                <FloatingLabelInput
                  testID={strings.expectedStartDate}
                  enableFocus={true}
                  editable={false}
                  label={strings.expectedStartDate}
                  placeHolderText={strings.mmddyy}
                  isShowOpenEye={true}
                  rightIcon={OpenCalender(setDate)}
                  inputValue={date}
                />
                <SpaceBetweenText />
                <FloatingLabelInput
                  testID={strings.desiredCompletionDate}
                  enableFocus={true}
                  editable={false}
                  label={strings.desiredCompletionDate}
                  placeHolderText={strings.mmddyy}
                  isShowOpenEye={true}
                  rightIcon={OpenCalender(setEXCompletionDate)}
                  inputValue={EXCompletionDate}
                  errorText={formInput.expectedCompletionDateError}
                />
                <SpaceBetweenText />
                <SaveButtonContainer
                  disabled={!selectBtn1}
                  testID={strings.saveProjectDetail}
                  onPress={() => onSaveProjectDetails()}
                  selected={selectBtn1}>
                  <NextText>
                    {!isUpdateDetailsAPIInProgress && strings.save}
                    {isUpdateDetailsAPIInProgress && <ActivityIndicator size="small" color={colors.white} />}
                  </NextText>
                </SaveButtonContainer>
              </InputFieldContainer>
            </ModalView>
          </CenteredViewCheck>
        </Modal>
      </CenteredView>
    );
  };
  const OpenDescriptionModal = () => {
    const validateDescription = () => {
      const errorMsg = formInput.description === '' ? required : '';
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
    return (
      <CenteredView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={descriptionVisible}
          onRequestClose={() => {
            setDescriptionsVisible(!descriptionVisible);
          }}>
          <CenteredViewCheck>
            <ModalView style={styles.modalView}>
              <InputFieldContainer>
                <PopUpLabel>{strings.projectDetails}</PopUpLabel>
                <SpaceBetweenText />
                <SpaceBetweenText />
                <FloatingLabelInput
                  testID={strings.description}
                  label={strings.description}
                  inputValue={formInput.description}
                  enableFocus={true}
                  onChangeText={(text: string) => {
                    onChangeDescription(text);
                  }}
                  numberOfLines={8}
                  errorText={formInput.descriptionError}
                  multiline={true}
                  onBlurHandler={() => validateDescription()}
                />
                <SaveButtonContainer
                  disabled={!selectBtn1}
                  testID={strings.saveProjectDetail2}
                  onPress={() => onSaveProjectDetails()}
                  selected={selectBtn1}>
                  <NextText>
                    {!isUpdateDetailsAPIInProgress && strings.save}
                    {isUpdateDetailsAPIInProgress && <ActivityIndicator size="small" color={colors.white} />}
                  </NextText>
                </SaveButtonContainer>
              </InputFieldContainer>
            </ModalView>
          </CenteredViewCheck>
        </Modal>
      </CenteredView>
    );
  };
  const OpenAttachmentPopUp = () => {
    const selectMultiple = true;
    const showActionSheet = () => {
      actionSheet?.current?.show();
    };
    const onPressOnActionSheet = (index: number) => {
      let emptyDoc = [];
      if (index === 0) {
        openDeviceCamera(attachmentFileData)
          .then((res: any) => {
            setFileData(res);
            if (res.length >= 1) {
              emptyDoc = [...res];
              const attachmentData = [...attachmentsData, ...emptyDoc];
              setAttachmentData(attachmentData);
            } else {
              setFileData([]);
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
      } else if (index === 1) {
        const selectMultipleImage = false;
        onSelectGalleyPress(attachmentFileData, selectMultipleImage)
          .then((res: any) => {
            if (res.length >= 1) {
              emptyDoc = [...res];
              const attachmentData = [...attachmentsData, ...emptyDoc];
              setFileData(fileData.concat(emptyDoc));
              setAttachmentData(attachmentData);
            } else {
              setFileData([]);
            }
          })
          .catch((error: any) => {
            console.log('error', error);
          });
      } else if (index === 2) {
        pickDocument(attachmentFileData, selectMultiple)
          .then((res: any) => {
            if (res.length >= 1) {
              emptyDoc = [...res];
              const attachmentData = [...attachmentsData, ...emptyDoc];
              setFileData(fileData.concat(emptyDoc));
              setAttachmentData(attachmentData);
            } else {
              setFileData([]);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    };

    const onUploadFile = async (projectId: number) => {
      if (attachmentsData.length >= 1) {
        setUploadAPIInProgress(true);
        for (let i = 0; i < attachmentsData.length; ) {
          if (!attachmentsData[i].Id) {
            // eslint-disable-next-line no-await-in-loop
            await pCallUploadFilesAPI({
              fileBase64String: attachmentsData[i].fileBase64Path,
              fileName: attachmentsData[i].fileName,
              fileType: attachmentsData[i].fileType,
              entityName: projectEntityName,
              entityId: projectId,
            })
              .then((res: {Success: boolean}) => {
                if (res.Success) {
                  setImageUploadStatus(true);
                  setFileData([]);
                }
              })
              .catch((error: {message: string}) => {
                showToastMessage(strings.error, error.message);
              });
            i += 1;
          } else {
            i += 1;
            setUploadAPIInProgress(true);
          }
        }
        if (imageUploadStatus) {
          showToastMessage(strings.success, attachmentUploadStatus);
        }
        setUploadAPIInProgress(false);
        setAttachmentVisible(!attachmentVisible);
        getProjectDetails(projectId);
      } else {
        setUploadAPIInProgress(false);
        setAttachmentVisible(!attachmentVisible);
      }
    };

    return (
      <CenteredView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={attachmentVisible}
          onRequestClose={() => {
            setAttachmentVisible(!attachmentVisible);
          }}>
          <CenteredViewCheck>
            <ModalView style={styles.modalView}>
              <ScrollViewContainer>
                <SpaceBetweenText>
                  <ProjectDetailView>
                    <ProjectDetailText>{strings.addAttachment}</ProjectDetailText>
                  </ProjectDetailView>
                  {attachmentsData?.map((res: any, idx: number) => (
                    <AttachmentListContainerPopUp key={idx}>
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
                        <AttachmentImageContainer>
                          <TouchableContainer
                            testID={strings.removeButton}
                            onPress={() => {
                              removeDoc(idx, res.Id);
                            }}>
                            <Close />
                          </TouchableContainer>
                        </AttachmentImageContainer>
                      </AttachmentList>
                    </AttachmentListContainerPopUp>
                  ))}

                  <AddAttachmentModalView onPress={showActionSheet}>
                    <AddFloatingBtn />
                    <AddAttachmentText>{strings.addProjectPlan}</AddAttachmentText>
                  </AddAttachmentModalView>
                  <ActionSheet
                    ref={actionSheet}
                    options={actionSheetOptions}
                    cancelButtonIndex={3}
                    destructiveButtonIndex={3}
                    onPress={(index: number) => {
                      onPressOnActionSheet(index);
                    }}
                  />
                  <NextButtonContainer onPress={() => onUploadFile(projectInfo.id)}>
                    <NextText>
                      {isUploadAPIInProgress ? <ActivityIndicator size="small" color={colors.white} /> : strings.save}
                    </NextText>
                  </NextButtonContainer>
                  <SpaceBetweenText />
                </SpaceBetweenText>
              </ScrollViewContainer>
            </ModalView>
          </CenteredViewCheck>
        </Modal>
      </CenteredView>
    );
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
   * Component that contain Country dropdown.
   */
  const ProjectTypeDropDown = () => (
    <>
      <EmptyViewContainer>
        <Animated.Text style={labelStyle}>{strings.projectType}</Animated.Text>
      </EmptyViewContainer>

      <ModalDropdown
        defaultValue={projectTypeData.projectTypeName}
        disabled={true}
        defaultIndex={projectTypeData.projectTypeIndex}
        options={projectTypeList}
        dropdownStyle={styles.fullWidthDropDownModal}
        style={styles.fullWidthDropDownStyle}
        textStyle={styles.fullWidthDropDownText}
        dropdownTextStyle={styles.dropDownModalText}
        renderRightComponent={() => <DownArrow />}
      />
    </>
  );
  const AreaDropDown = () => {
    /**
     * function for getting selected area ID.
     * @param index of selected Area.
     */
    const onSelectArea = (index: number, text: string) => {
      setAreaData({areaIndex: index, areasText: text});
      const areaId: any = areaTypeResponse[index];
      setSelectedAreaSqFeetId(Number(areaId.Value));
    };
    return (
      <>
        <EmptyViewContainer>
          <Animated.Text style={labelStyle}>{strings.areaSqFit}</Animated.Text>
        </EmptyViewContainer>
        <ModalDropdown
          defaultValue={areaData.areasText}
          defaultIndex={areaData.areaIndex}
          options={areaList}
          dropdownStyle={styles.dropDownModal}
          style={styles.fullWidthDropDownStyle}
          textStyle={styles.fullWidthDropDownText}
          dropdownTextStyle={styles.dropDownModalText}
          onSelect={(index: string, text: string) => {
            onSelectArea(Number(index), text);
          }}
          renderRightComponent={() => <DownArrow />}
        />
      </>
    );
  };
  /**
   * Component that contain State dropdown.
   */
  const OpenSpecificationPopUp = () => {
    /**
     * validations for specifications popup.
     * @param text value of budget
     */
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
    const onSaveSpecifications = () => {
      setSpecificationAPIInProgress(true);
      pCallUpdateSpecificationsAPI({
        projectId: projectInfo.id,
        projectTypeId: projectTypeData.projectTypeIndex,
        areaSqFeetId: areaData.areaIndex,
        budget: Number(formInput.budget),
      })
        .then(res => {
          if (res.Success) {
            setSpecificationVisible(!specificationVisible);
            getProjectDetails(projectInfo.id);
          } else if (!res.Success && res.Message) {
            showToastMessage(strings.error, res.Message);
          }
          setSpecificationAPIInProgress(false);
        })
        .catch(error => {
          setSpecificationAPIInProgress(false);
          showToastMessage(strings.error, error.message);
        });
    };

    return (
      <CenteredView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={specificationVisible}
          onRequestClose={() => {
            setSpecificationVisible(!specificationVisible);
          }}>
          <CenteredViewCheck>
            <ModalView style={styles.modalView}>
              <InputFieldContainer>
                <PopUpLabel>{strings.specification}</PopUpLabel>
                <SpaceBetweenText />
                <SpaceBetweenText />
                <DropDownRowContainer>
                  <FullWidthDropDown>
                    <ProjectTypeDropDown />
                  </FullWidthDropDown>
                </DropDownRowContainer>
                <SpaceBetweenText />
                <DropDownRowContainer>
                  <FullWidthDropDown>
                    <AreaDropDown />
                  </FullWidthDropDown>
                </DropDownRowContainer>
                <SpaceBetweenText />
                <FloatingLabelInput
                  enableFocus={formInput.budget !== ''}
                  label={strings.budget}
                  inputValue={formInput.budget}
                  errorText={formInput.budgetError}
                  onChangeText={(text: string) => {
                    onChangeBudget(text);
                  }}
                  keyboardType="decimal-pad"
                  isShowLeftIcon={formInput.showLeftIcon}
                  onBlurHandler={() => validateBudget()}
                  onFocusHandler={() => onFocusOnBudget()}
                />
                <SaveButtonContainer
                  disabled={!selectBtn3}
                  selected={selectBtn3}
                  onPress={() => onSaveSpecifications()}>
                  <NextText>
                    {isSpecificationAPIInProgress ? (
                      <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                      strings.save
                    )}
                  </NextText>
                </SaveButtonContainer>
              </InputFieldContainer>
            </ModalView>
          </CenteredViewCheck>
        </Modal>
      </CenteredView>
    );
  };
  const changePager = () => {
    if (props?.onChange) props?.onChange(1, 0, 0);
  };

  const changeToggleValue = () => {
    setToggle(!toggle);
  };

  const changeImageToggleValue = () => {
    setImageToggle(!imageToggle);
  };

  const toggleModal = async (res: any) => {
    await setImageData(res);
    changeImageToggleValue();
  };

  const getProfessionalData = (res: any) => {
    setGetProfessionalAPIInProg(true);
    pCallProfessionalDetailById(res.Id)
      .then(response => {
        setGetProfessionalAPIInProg(false);
        setProData(response.Data);
        setToggle(!toggle);
      })
      .catch(error => {
        setGetProfessionalAPIInProg(false);
        showToastMessage(strings.error, error.message);
      });
  };

  const downloadFunction = (res: {FilePath: string; FileName: string}, idx: number) => {
    if (!attachmentsData[idx].isDownloading) {
      let newArray = [...attachmentsData];
      newArray[idx].isDownloading = true;
      setAttachmentData(newArray);
      attachmentDownload(
        res?.FilePath,
        res?.FileName,
        () => {
          newArray = [...attachmentsData];
          newArray[idx].isDownloading = false;
          setAttachmentData(newArray);
        },
        (percent: number) => {
          newArray = [...attachmentsData];
          newArray[idx].percent = percent;
          setAttachmentData(newArray);
        },
      );
    } else {
      showToastMessage(strings.information, localStrings.downloadInProgress);
    }
  };

  /**
   * Read more/ Read less.
   */

  const renderTruncatedFooter = (handlePress: any) => (
    <ShowMoreLessText onPress={handlePress}>{localStrings.readMore}</ShowMoreLessText>
  );
  const renderRevealedFooter = (handlePress: any) => (
    <ShowMoreLessText onPress={handlePress}>{localStrings.readLess}</ShowMoreLessText>
  );
  const handleTextReady = () => {};
  return (
    <ControlContainer>
      <ProfessionalsModelView data={proData} changeToggleValue={changeToggleValue} toggle={toggle} />
      <ImageModel changeToggleValue={changeImageToggleValue} toggle={imageToggle} data={imageData} />
      {OpenProjectDetailPopUp()}
      {OpenSpecificationPopUp()}
      {OpenAttachmentPopUp()}
      {OpenDescriptionModal()}
      {projectDetailsAPIInProgress ? (
        <MainLoaderContainer>
          <ActivityIndicator size="large" color={colors.primaryThemeColor} />
        </MainLoaderContainer>
      ) : (
        <>
          <InputFieldContainer>
            <ConfirmContainerView>
              <ProjectDetailView>
                <ProjectDetailText>{strings.projectDetails}</ProjectDetailText>
                <EditTouch
                  testID={strings.setProjectDetailVisible}
                  onPress={() => {
                    setProjectDetailVisible(true);
                  }}>
                  <EditImage source={pngImages.editIcon} />
                </EditTouch>
              </ProjectDetailView>

              <ListConfirmContainerView>
                <BottomCardContainer>
                  <DetailsText numberOfLines={1} lineHeight={20}>
                    {strings.projectNameWithoutAsterixSign}
                  </DetailsText>
                  <DetailsTitle lineHeight={20}>{Name}</DetailsTitle>
                </BottomCardContainer>
              </ListConfirmContainerView>
              <ListConfirmContainerView>
                <BottomCardContainer>
                  <DetailsText numberOfLines={1} lineHeight={20}>
                    {strings.startDate}
                  </DetailsText>
                  <DetailsTitle lineHeight={20}>
                    <Moment element={DetailsTitle} format="LL" date={ExpectedStartDateUTC} />
                  </DetailsTitle>
                </BottomCardContainer>
                <BottomCardContainer>
                  <DetailsText numberOfLines={1} fontSize={14} lineHeight={20}>
                    {strings.completionDate}
                  </DetailsText>
                  <DetailsTitle lineHeight={20}>
                    <Moment element={DetailsTitle} format="LL" date={ExpectedCompleteDateUTC} />
                  </DetailsTitle>
                </BottomCardContainer>
              </ListConfirmContainerView>
              <SpaceBetweenText />
            </ConfirmContainerView>
            <SpaceBetweenText />
            {/* ****************Project Description******************** */}
            <ConfirmContainerView>
              <ProjectDetailView>
                <ProjectDetailText>{strings.description}</ProjectDetailText>
                <EditTouch
                  testID={strings.setDescriptionVisible}
                  onPress={() => {
                    setDescriptionsVisible(true);
                  }}>
                  <EditImage source={pngImages.editIcon} />
                </EditTouch>
              </ProjectDetailView>
              <DetailsTextContainer>
                <ReadMore
                  numberOfLines={descriptionLines}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}
                  onReady={handleTextReady}>
                  <DescriptionText>{Description}</DescriptionText>
                </ReadMore>
              </DetailsTextContainer>
              <SpaceBetweenText />
            </ConfirmContainerView>
            <SpaceBetweenText />
            {/* ****************Project Location******************** */}
            <ConfirmContainerView>
              <ProjectDetailView>
                <ProjectDetailText>{strings.projectLocation}</ProjectDetailText>
                <EditTouch
                  testID={strings.changeLocationButton}
                  onPress={() => {
                    if (props?.onChange) props?.onChange(0, 0, 0);
                  }}>
                  <EditImage source={pngImages.editIcon} />
                </EditTouch>
              </ProjectDetailView>

              <ListConfirmContainerView>
                <TypeAnsList>{`${Address1}, ${suiteAdd}${
                  suiteAdd ? ',' : ''
                } ${City}, ${StateProvinceName}, ${ZipPostalCode}`}</TypeAnsList>
              </ListConfirmContainerView>
              <SpaceBetweenText />
            </ConfirmContainerView>
            <SpaceBetweenText />
            {/* ****************Specification******************** */}
            <ConfirmContainerView>
              <ProjectDetailView>
                <ProjectDetailText>{strings.specification}</ProjectDetailText>
                <EditTouch
                  testID={strings.setSpecificationVisible}
                  onPress={() => {
                    setSpecificationVisible(true);
                  }}>
                  <EditImage source={pngImages.editIcon} />
                </EditTouch>
              </ProjectDetailView>
              <ListConfirmContainerView>
                <BottomCardContainer>
                  <DetailsText numberOfLines={1} lineHeight={20}>
                    {strings.type}
                  </DetailsText>
                  <DetailsTitle lineHeight={20}>{ProjectType}</DetailsTitle>
                </BottomCardContainer>
                <BottomCardContainer>
                  <DetailsText numberOfLines={1} fontSize={14} lineHeight={20}>
                    {strings.areaSgFt}
                  </DetailsText>
                  <DetailsTitle lineHeight={20}>{AreaSqFeet}</DetailsTitle>
                </BottomCardContainer>
              </ListConfirmContainerView>
              <ListConfirmContainerView>
                <BottomCardContainer>
                  <FullWidthDetailsText numberOfLines={1} lineHeight={20}>
                    {strings.budgetText}
                  </FullWidthDetailsText>
                  <BudgetRowContainer>
                    <Popable content={strings.budgetInfoText}>
                      <Ionicons name="information-circle-outline" style={styles.budgetInfoIcon} />
                    </Popable>
                    <DetailsTitle lineHeight={20}>{Budget}</DetailsTitle>
                  </BudgetRowContainer>
                </BottomCardContainer>
              </ListConfirmContainerView>
              <SpaceBetweenText />
            </ConfirmContainerView>
            <SpaceBetweenText />
            {/* ****************Professionals******************** */}

            <ProfessionalContainer>
              <ConfirmContainerView>
                <ProjectDetailView>
                  <ProjectDetailText>{strings.professionals}</ProjectDetailText>
                  {projectStatusId !== 20 && (
                    <EditTouch testID={strings.changePageButton} onPress={changePager}>
                      <EditImage source={pngImages.editIcon} />
                    </EditTouch>
                  )}
                </ProjectDetailView>
                <DescriptionText>{localStrings.youHaveInvited}</DescriptionText>
                <SpaceBetweenText />
              </ConfirmContainerView>
              {selectedProfessionalsData?.Data?.ProfessionalModel?.map((res: any, idx: number) => (
                <EmptyViewContainer key={idx}>
                  <ProfessionalDetailView>
                    <ListConfirmContainerView>
                      <ProfessionalDetailText>{`${strings.professional} ${idx + 1}`}</ProfessionalDetailText>
                    </ListConfirmContainerView>
                    <ListConfirmContainerView>
                      <TouchableOpacity
                        testID={strings.professionalList}
                        onPress={() => {
                          getProfessionalData(res);
                        }}>
                        <CompanyLogoImage
                          source={res.CompanyLogo ? {uri: res.CompanyLogo} : pngImages.defaultCompanyLogo}
                        />
                      </TouchableOpacity>
                      <RowContainer>
                        <CompanyDetails>
                          <DetailsText numberOfLines={1}>{localStrings.company}</DetailsText>
                          <ValueText numberOfLines={1}>{res.Company}</ValueText>
                        </CompanyDetails>
                      </RowContainer>
                    </ListConfirmContainerView>
                    <ListConfirmContainerView>
                      <BottomCardContainer>
                        <TouchableOpacity
                          onPress={() => {
                            getProfessionalData(res);
                          }}>
                          <DetailsText numberOfLines={1} lineHeight={20}>
                            {strings.contact}
                          </DetailsText>
                          <ProName lineHeight={20} numberOfLines={1} ellipsizeMode="tail">
                            {res?.FullName}
                          </ProName>
                        </TouchableOpacity>
                      </BottomCardContainer>

                      <BottomCardContainer>
                        <DetailsText numberOfLines={1}>{localStrings.specialist}</DetailsText>
                        <DetailsTitle>{ProjectType}</DetailsTitle>
                      </BottomCardContainer>
                    </ListConfirmContainerView>
                    <ListConfirmContainerView>
                      <DetailsText>{strings.addressText}</DetailsText>
                      <ValueText>{res?.StreetAddress}</ValueText>
                    </ListConfirmContainerView>
                    <SpaceBetweenText />
                  </ProfessionalDetailView>
                  {selectedProfessionalsData?.Data?.ProfessionalModel?.length - 1 !== idx && <SpaceInList />}
                </EmptyViewContainer>
              ))}
            </ProfessionalContainer>

            <SpaceBetweenText />
            <ConfirmContainerView>
              {/* ********************* Attachment View ******************** */}
              <ProjectDetailView>
                <ProjectDetailText>{strings.attachments}</ProjectDetailText>
                <EditTouch
                  onPress={() => {
                    setAttachmentVisible(true);
                  }}>
                  <EditImage source={pngImages.editIcon} />
                </EditTouch>
              </ProjectDetailView>
              {projectDetailsResponseData?.Data?.Attachments?.length === 0 && (
                <NoProjectAvailable>
                  <NoProjectAvailableText>{localStrings.thereIsNoProjects}</NoProjectAvailableText>
                </NoProjectAvailable>
              )}

              {attachmentsData?.map((res: any, idx: number) => (
                <EmptyViewContainer key={idx}>
                  {res?.FileName && (
                    <AttachmentListContainer
                      key={idx}
                      onPress={() => {
                        downloadFunction(res, idx);
                      }}>
                      <AttachmentList>
                        <AttachmentImageContainer>
                          {ImageExtension.includes(res.fileType) || ImageExtension.includes(res.FileExtension) ? (
                            <>
                              <ToggleWrapper
                                testID={strings.submitBtn}
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
                            {res?.FileName}
                          </AttachmentName>
                        </AttachmentNameContainer>
                        <AttachmentImageContainer>
                          <TouchableContainer
                            onPress={() => {
                              removeDoc(idx, res.Id);
                            }}>
                            <Close />
                          </TouchableContainer>
                        </AttachmentImageContainer>
                      </AttachmentList>
                    </AttachmentListContainer>
                  )}
                </EmptyViewContainer>
              ))}

              <SpaceBetweenText />
            </ConfirmContainerView>
            <SpaceBetweenText />
          </InputFieldContainer>
          <SubmitButton selected={true} style={{marginHorizontal: rw(24)}} onPress={() => onConfirm()}>
            <ButtonText>
              {!isConfirmAPIInProgress && strings.confirm}
              {isConfirmAPIInProgress && <ActivityIndicator size="small" color={colors.white} />}
            </ButtonText>
          </SubmitButton>
        </>
      )}
    </ControlContainer>
  );
};

const mapStateToProps = (store: IStoreProjectDetails) => ({
  projectDetailsResponseData: store?.projectDetails?.payload,
  projectDetailsAPIInProgress: store?.projectDetails?.isApiInProgress,
  selectedProfessionalsData: store?.selectedProfessionalDetails?.payload,
  isSelectProfessionAPIInProgress: store?.selectedProfessionalDetails?.isApiInProgress,
});
const mapDispatchToProps = {
  callGetProjectDetails,
  callGetProjectProfessionalList,
  callUpdateProjectDetails,
  callGetProjectAreasAPI,
  callUpdateSpecificationsAPI,
  callUploadFilesAPI,
  callDeleteDocuments,
  callSaveProject,
  callProfessionalDetailById,
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmView);
