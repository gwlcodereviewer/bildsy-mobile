import React, {useState, useEffect, useRef} from 'react';
import {LogBox, Animated, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import ActionSheet from 'react-native-actionsheet';
import {IStore, ISaveComplaintsType, IFileUpload} from '../../../redux/types';
import {callGetCreateComplaintPopup, callCreateComplaint, callUploadFilesAPI} from '../../../redux/actions/auth';
import {INavigation, ComplaintDocument, ProjectAreaTypeData} from '../../../types';
import {showToastMessage, openDeviceCamera, pickDocument, onSelectGalleyPress, VALIDATION_REGEX} from '../../../utils';
import {localStrings} from '../../../localization/localStrings';
import {actionSheetOptions, complaintEntityName, ImageExtension} from '../../../constants/utils/constantData';

import {
  ControlContainer,
  TextTitleContainer,
  TextTitle,
  ScreenMainContainer,
  ToggleWrapper,
  ProfileImage,
} from './complaintsStyles';
import AddFloatingBtn from '../../../assets/svg/AddFloatingBtn';
import {
  DropDownView,
  ModalDropDownContainer,
  DropDownRowContainer,
  DropDownSubContainer,
  InputFieldWrapper,
  ComplaintAddAttachmentView,
  ComplaintAddAttachmentText,
  AttachmentListContainer,
  AttachmentList,
  AttachmentImageContainer,
  SubmitButton,
  ButtonText,
  AttachmentRemoveContainer,
  AttachmentImageName,
} from '../../../style';
import colors from '../../../style/colors';
import {rw, rh, rpx} from '../../../style/Dimen';
import DownArrow from '../../../assets/svg/DownArrow';
import styles from '../../../style/style';
import {strings} from '../../../constants/strings';
import FloatingLabelInput from '../../../components/floatingLabelInput';
import Document from '../../../assets/svg/Document';
import {TouchableContainer} from '../../addProject/styled';
import Close from '../../../assets/svg/Close';
import {ButtonSubContainer, SkipBtnView, ContactTextList} from '../styled';
import ImageModel from '../../../components/imageModeView';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  callGetCreateComplaintPopup: (param: number) => Promise<any>;
  callCreateComplaint: (param: ISaveComplaintsType) => Promise<any>;
  callUploadFilesAPI: (param: IFileUpload) => Promise<any>;
  id: number;
  isComplaintResolvedValue: boolean;
  status: string;
  hideCreateComplaint: () => void;
  fileDataProps: ComplaintDocument[];
}
const Complaints = (props: Props) => {
  const {
    callGetCreateComplaintPopup: pCallGetCreateComplaintPopup,
    callUploadFilesAPI: pCallUploadFilesAPI,
    id,
    callCreateComplaint: pCallCreateComplaint,
    fileDataProps,
  } = props;
  const {reason, complaint} = localStrings;
  const actionSheet = useRef<any>();
  const [animatedIsFocused] = useState(new Animated.Value(0));
  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [fileData, setFileData] = useState<ComplaintDocument[]>(fileDataProps);
  const [reasons, setReasons] = useState<string[]>([]);
  const [reasonsResponse, setReasonsResponse] = useState<ProjectAreaTypeData[]>([]);
  const [reasonId, setReasonId] = useState<number>(10);
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);
  const [imageInProgress, setImageInProgress] = useState<boolean>(false);
  const [showComplaintList, setShowComplaintList] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [imageData, setImageData] = useState();
  const [reasonsData, setReasonsData] = useState({
    reasonsIndex: 0,
    reasonsName: reasons[0],
  });
  const [projectInfo, setProjectInfo] = useState({
    id: 0,
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
    getComplaintDetails();
  }, [id]);

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
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const getComplaintDetails = () => {
    const arrReasonsList: string[] = [];
    pCallGetCreateComplaintPopup(id)
      .then(res => {
        for (let i = 0; i < res?.Data?.AvailableReasons?.length; ) {
          arrReasonsList.push(res?.Data?.AvailableReasons[i].Text);
          i += 1;
        }
        setReasonsResponse(res?.Data?.AvailableReasons);
        setReasonsData({reasonsIndex: 0, reasonsName: arrReasonsList[0]});
        setReasons(arrReasonsList);
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * Function for uploading files on server.
   * @param projectId contain project ID
   */
  const onUploadFile = async (entityId: number) => {
    for (let i = 0; i < fileData.length; ) {
      if (!fileData[i].Id) {
        // eslint-disable-next-line no-await-in-loop
        await pCallUploadFilesAPI({
          fileBase64String: fileData[i].fileBase64Path,
          fileName: fileData[i].fileName,
          fileType: fileData[i].fileType,
          entityName: complaintEntityName,
          entityId,
        })
          .then(res => {
            if (res.Success) {
              console.log('upload file success');
            }
          })
          .catch((error: {message: string}) => {
            setIsAPIinProgress(false);
            showToastMessage(strings.error, error.message);
          });
      }
      i += 1;
    }
    setIsAPIinProgress(false);
    return true;
  };
  /**
   * function for showing actionSheet.
   */
  const showActionSheet = () => {
    actionSheet?.current?.show();
  };
  const validateDescription = () => {
    const errorMsg = description === '' ? localStrings.required : '';
    setDescriptionError(errorMsg);
  };
  const onChangeDescription = (text: string) => {
    const descriptionNew = text?.replace(VALIDATION_REGEX.textCheck, '');
    if (text) {
      if (VALIDATION_REGEX.spaceCheckInStarting.test(text[0])) {
        setDescription('');
        setDescriptionError(localStrings.required);
      } else {
        setDescription(descriptionNew);
        setDescriptionError('');
        setIsButtonDisable(false);
      }
    } else {
      setDescription(descriptionNew);
      setDescriptionError(localStrings.required);
      setIsButtonDisable(true);
    }
  };
  const onSelectMediaOption = (index: number) => {
    const selectMultiple = false;
    if (index === 0) {
      openDeviceCamera(fileData)
        .then((res: any) => {
          setImageInProgress(true);
          if (res.length >= 1) {
            const response = res;
            response.splice(0, response.length - 1);
            setFileData(response);
            setImageInProgress(false);
          } else {
            setFileData([]);
          }
        })
        .catch(() => {});
    } else if (index === 1) {
      onSelectGalleyPress(fileData, selectMultiple)
        .then((res: any) => {
          if (res.length >= 1) {
            setImageInProgress(true);
            const response = res;
            response.splice(0, response.length - 1);
            setImageInProgress(false);
            setFileData(response);
            setImageInProgress(false);
          } else {
            setFileData([]);
          }
        })
        .catch((error: any) => {
          console.log('error', error);
        });
    } else if (index === 2) {
      pickDocument(fileData, selectMultiple)
        .then(res => {
          if (res.length >= 1) {
            setImageInProgress(true);
            const response = res;
            response.splice(0, response.length - 1);
            setImageInProgress(false);
          } else {
            setFileData([]);
          }
        })
        .catch(() => {});
    }
  };
  const onSelectReason = (index: number, text: string) => {
    setReasonsData({reasonsIndex: index, reasonsName: text});
    const selectedReasonId = reasonsResponse.find((ele: {Text: string}) => ele.Text === text);
    setReasonId(Number(selectedReasonId?.Value));
  };
  const saveComplaint = () => {
    setIsAPIinProgress(true);
    pCallCreateComplaint({
      projectId: projectInfo.id || id,
      complaintsReasonsId: reasonId,
      availableReasons: [
        {
          disabled: true,
          group: {
            disabled: true,
            name: '',
          },
          selected: true,
          text: '',
          value: '',
        },
      ],
      description,
    })
      .then(async res => {
        if (res.Success) {
          if (fileData.length > 0) {
            await onUploadFile(res.Data.EntityId);
            if (props.hideCreateComplaint) props.hideCreateComplaint();
          } else {
            if (props.hideCreateComplaint) props.hideCreateComplaint();
            setIsAPIinProgress(false);
          }
        }
      })
      .catch((error: {message: string}) => {
        setIsAPIinProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * Function for removing document.
   * @param id document index
   */
  const removeDoc = (index: number) => {
    fileData.splice(index, 1);
    const updatedData = [...fileData];
    setFileData(updatedData);
    // }
  };

  const cancel = () => {
    setShowComplaintList(true);
    console.log(showComplaintList);
  };
  /**
   * Component that contain Country dropdown.
   */
  const ReasonDropDown = () => (
    <>
      <DropDownView>
        <Animated.Text style={labelStyle}>{reason}</Animated.Text>
      </DropDownView>
      <ModalDropDownContainer>
        <ModalDropdown
          defaultIndex={reasonsData.reasonsIndex}
          defaultValue={reasonsData.reasonsName}
          options={reasons}
          dropdownStyle={styles.fullWidthDropDownModal}
          style={styles.fullWidthDropDownStyle}
          textStyle={styles.fullWidthDropDownText}
          dropdownTextStyle={styles.dropDownModalText}
          onSelect={(index: number, text: string) => {
            onSelectReason(index, text);
          }}
          testID={strings.complaintReasonsDropDown}
          renderRightComponent={() => <DownArrow />}
        />
      </ModalDropDownContainer>
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
        <TextTitleContainer>
          <TextTitle>{complaint}</TextTitle>
        </TextTitleContainer>
        <>
          <ScreenMainContainer>
            <DropDownRowContainer>
              <DropDownSubContainer>
                <ReasonDropDown />
              </DropDownSubContainer>
            </DropDownRowContainer>
            <InputFieldWrapper>
              <FloatingLabelInput
                testID={strings.description}
                label={strings.descriptionWithStar}
                inputValue={description}
                onChangeText={(text: string) => {
                  onChangeDescription(text);
                }}
                numberOfLines={10}
                errorText={descriptionError}
                multiline={true}
                onBlurHandler={() => validateDescription()}
              />
            </InputFieldWrapper>
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
                  <AttachmentImageName numberOfLines={1} ellipsizeMode="middle">
                    {res?.FileName ? res?.FileName : res?.fileName}
                  </AttachmentImageName>
                  <AttachmentRemoveContainer>
                    <TouchableContainer
                      testID={strings.removeDocButton}
                      onPress={() => {
                        removeDoc(idx);
                      }}>
                      <Close />
                    </TouchableContainer>
                  </AttachmentRemoveContainer>
                </AttachmentList>
              </AttachmentListContainer>
            ))}
            <ComplaintAddAttachmentView testID={strings.addIconBtn} onPress={showActionSheet}>
              <AddFloatingBtn />
              <ComplaintAddAttachmentText>{strings.addProjectPlan}</ComplaintAddAttachmentText>
            </ComplaintAddAttachmentView>
            <ActionSheet
              ref={actionSheet}
              options={actionSheetOptions}
              cancelButtonIndex={3}
              destructiveButtonIndex={3}
              onPress={(index: number) => {
                onSelectMediaOption(index);
              }}
            />
          </ScreenMainContainer>
        </>
      </ControlContainer>
      <ButtonSubContainer>
        <SkipBtnView
          testID={strings.hideComplaintButton}
          onPress={() => {
            props?.hideCreateComplaint();
          }}>
          <ContactTextList>{strings.cancel}</ContactTextList>
        </SkipBtnView>
      </ButtonSubContainer>
      <ButtonSubContainer>
        <SubmitButton
          testID={strings.submitButton}
          selected={!isButtonDisable}
          disabled={isButtonDisable}
          onPress={() => saveComplaint()}>
          <ButtonText>
            {isAPIinProgress ? <ActivityIndicator size="small" color={colors.white} /> : strings.save}
          </ButtonText>
        </SubmitButton>
      </ButtonSubContainer>
    </>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callGetCreateComplaintPopup,
  callCreateComplaint,
  callUploadFilesAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(Complaints);
