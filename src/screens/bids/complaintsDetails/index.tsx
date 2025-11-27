import React, {useState, useEffect, useRef} from 'react';
import {LogBox, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet';
import {IStore, IComplaintConversation, IDeleteDocuments} from '../../../redux/types';
import {
  callGetComplaintDetails,
  callComplaintConversation,
  callComplaintChatAPI,
  callResolveComplaintAPI,
  callDeleteDocuments,
} from '../../../redux/actions/auth';
import {
  INavigation,
  ComplaintDocument,
  ComplaintsCustomerConversation,
  DocumentResponse,
  HOComplainDetailData,
  IHoComplaintDetailsData,
} from '../../../types';
import {
  showToastMessage,
  isIOS,
  openDeviceCamera,
  pickDocument,
  attachmentDownload,
  ProgressCircleView,
  onSelectGalleyPress,
  checkProjectDeleted,
  VALIDATION_REGEX,
} from '../../../utils';
import {localStrings} from '../../../localization/localStrings';

import {
  CardView,
  CardsViewContainer,
  TitleText,
  TopBackContainer,
  MainContainer,
  CardTitleText,
  CardRowContainer,
  CardHeaderTitle,
  DescriptionText,
  ReplyContainer,
  InputContainer,
  InputView,
  IconContainer,
  ButtonContainer,
  PendingContainer,
  ConversationTagSection,
  ConversationTag,
  ConversationDateText,
  ConversationText,
  SelectedImageContainer,
  MainLoaderContainer,
  AttachmentTouchable,
  CustomerName,
} from './styled';
import {
  AttachmentList,
  AttachmentImageContainer,
  AttachmentName,
  TouchableContainer,
  BottomCardContainer,
  DetailsText,
  DetailsTitle,
  DetailsTitleName,
  ColumnContainer,
  SubmitButton,
  ButtonText,
  AttachmentListMainContainer,
  PageTitle,
} from '../../../style';
import {PageTitleContainer2, ProjectTitleSubContainer, ToggleWrapper} from '../styled';
import BackIcon from '../../../assets/svg/BackIcon';
import SendIcon from '../../../assets/svg/SendIcon';
import colors from '../../../style/colors';
import {rw, rh} from '../../../style/Dimen';
import Close from '../../../assets/svg/Close';
import Document from '../../../assets/svg/Document';
import {
  actionSheetOptions,
  complaintEntityName,
  COMPLAINT_RESOLVED,
  ImageExtension,
} from '../../../constants/utils/constantData';
import AttachedPinIcon from '../../../assets/svg/AttachedPin';
import styles from '../../../style/style';
import {strings} from '../../../constants/strings';
import {ASYNC_CONST} from '../../../helpers/constants';
import {ProfileImage} from '../complaints/complaintsStyles';
import ImageModel from '../../../components/imageModeView';

interface Props {
  navigation?: INavigation;
  callGetComplaintDetails: (param: number) => Promise<any>;
  callComplaintConversation: (param: IComplaintConversation) => Promise<any>;
  callComplaintChatAPI: (param: number) => Promise<any>;
  callResolveComplaintAPI: (param: number) => Promise<any>;
  onChange?: (pager: number, projectId: number, locationId: number) => void;
  callDeleteDocuments: (param: IDeleteDocuments) => Promise<any>;
  id?: number;
  complaintId: number;
  fromNotification: boolean;
  hideComplaintDetails: () => void;
  isComplaintResolvedValue: boolean;
  complaintDetailsResponseData?: IHoComplaintDetailsData;
  customerIdValue?: number;
  fileDataProps: ComplaintDocument[];
  chatData?: any[];
  getComplaintDetailAPIInProgress?: boolean;
}
const {
  information,
  projectId2,
  raisedAgainst,
  budget,
  raisedOn,
  issueDescription,
  typeAMessage,
  projectName,
  resolve,
  status,
  conversation,
  downloadInProgress,
  complaint2,
  chat,
} = localStrings;
const ComplaintsDetails = (props: Props) => {
  const {
    callGetComplaintDetails: pCallGetComplaintDetails,
    complaintId,
    fromNotification,
    callComplaintConversation: pCallComplaintConversation,
    callComplaintChatAPI: pCallComplaintChatAPI,
    callResolveComplaintAPI: pCallResolveComplaintAPI,
    callDeleteDocuments: pCallDeleteDocuments,
    complaintDetailsResponseData,
    fileDataProps,
    chatData,
    isComplaintResolvedValue,
    getComplaintDetailAPIInProgress,
    customerIdValue,
    navigation,
  } = props;
  const actionSheet = useRef<any>();
  const [fileData, setFileData] = useState<ComplaintDocument[]>(fileDataProps);
  const [responseData, setResponseData] = useState<IHoComplaintDetailsData>(complaintDetailsResponseData || {});
  const [attachmentsData, setAttachmentData] = useState<ComplaintDocument[]>([]);
  const [conversationText, setConversationText] = useState<string>('');
  const [customerId, setCustomerId] = useState<number>(customerIdValue || 0);
  const [chatResponse, setChatResponse] = useState<ComplaintsCustomerConversation[]>(chatData || []);
  const [isResolveAPIInProgress, setResolveAPIInProgress] = useState<boolean>(false);
  const [chatImages, setChatImages] = useState<DocumentResponse[]>(fileDataProps);
  const [getComplaintAPIInProgress, setGetComplaintAPIInProgress] = useState<boolean>(
    getComplaintDetailAPIInProgress || false,
  );
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [sendMessageAPIInProgress, setSendMessageAPIInProgress] = useState<boolean>(false);
  const [isComplaintResolved, setIsComplaintResolved] = useState<boolean>(isComplaintResolvedValue || false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [imageData, setImageData] = useState();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<any>();

  /**
   * Called for getting complaint details.
   */
  useEffect(() => {
    getComplaintDetails();
  }, [complaintId]);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_CONST.customerId)
      .then(userStatus => {
        setCustomerId(Number(userStatus));
      })
      .catch(error => {});
  }, [props]);

  const getComplaintDetails = () => {
    pCallGetComplaintDetails(complaintId)
      .then(res => {
        checkProjectDeleted(res?.Data?.ProjectIsDeleted, navigation);
        if (res?.Message === strings.complaintNotFound) {
          if (navigation) navigation.goBack();
          showToastMessage(strings.error, localStrings.projectCompletedMessage);
          return;
        }
        if (res?.Data?.ComplaintsStatusId === COMPLAINT_RESOLVED) {
          setIsComplaintResolved(true);
        }
        setResponseData(res?.Data);
        setFileData(res.Data.ComplaintDocuments);
        setGetComplaintAPIInProgress(false);
        getChats();
        setChatImages([]);
      })
      .catch(error => {
        setGetComplaintAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };
  /**
   * For ignoring warning.
   */
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
      if (scrollViewRef && scrollViewRef?.current) scrollViewRef?.current?.scrollToEnd({animated: true});
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  /**
   * Called for getting chats.
   */
  const getChats = () => {
    pCallComplaintChatAPI(complaintId)
      .then(res => {
        setChatResponse(res?.Data?.ComplaintsCustomerConversations);
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };
  const showActionSheet = () => {
    actionSheet?.current?.show();
  };
  /** *
   * Resolve API integration
   */
  const onResolve = () => {
    setResolveAPIInProgress(true);
    pCallResolveComplaintAPI(complaintId)
      .then(res => {
        if (res.Success) {
          setIsComplaintResolved(true);
        }
        setResolveAPIInProgress(false);
      })
      .catch(error => {
        setIsComplaintResolved(false);
        setResolveAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };
  /** *
   * Send message API integration.
   */
  const onSendMessage = () => {
    setSendMessageAPIInProgress(true);
    if (conversationText) {
      pCallComplaintConversation({
        complaintId,
        message: conversationText,
        fileBase64String: chatImages[0]?.fileBase64Path || '',
        fileName: chatImages[0]?.fileName || '',
        fileType: chatImages[0]?.fileType || '',
      })
        .then(res => {
          if (res.Success) {
            setSelectedFileName('');
            setConversationText('');
            setChatImages([]);
            setSendMessageAPIInProgress(false);
            getChats();
          }
        })
        .catch(error => {
          setSendMessageAPIInProgress(false);
          showToastMessage(strings.error, error.message);
        });
    } else if (chatImages[0]?.fileName) {
      setSendMessageAPIInProgress(false);
      showToastMessage(strings.information, localStrings.complaintMessageRequired);
    } else {
      setSendMessageAPIInProgress(false);
      showToastMessage(strings.information, localStrings.messageMustBeRequired);
    }
  };
  /**
   * Function for download the file.
   * @param res contain full response.
   * @param idx index
   * @param type contain file type.
   */
  const downloadFunction = (res: any, idx: number, type: string) => {
    if (type === complaint2) {
      if (!fileData[idx].isDownloading) {
        let newArray = [...fileData];
        newArray[idx].isDownloading = true;
        setAttachmentData(newArray);
        attachmentDownload(
          res?.FilePath,
          res?.FileName,
          () => {
            newArray = [...fileData];
            newArray[idx].isDownloading = false;
            setAttachmentData(newArray);
          },
          (percent: number) => {
            newArray = [...fileData];
            newArray[idx].percent = percent;
            setAttachmentData(newArray);
          },
        );
      } else {
        showToastMessage(strings.information, downloadInProgress);
      }
    } else if (type === chat) {
      if (!chatResponse[idx].ComplaintDocuments[0].isDownloading) {
        let newArray = [chatResponse[idx].ComplaintDocuments[0]];
        newArray[0].isDownloading = true;
        setAttachmentData(newArray);
        attachmentDownload(
          res?.FilePath,
          res?.FileName,
          () => {
            newArray = [chatResponse[idx].ComplaintDocuments[0]];
            newArray[0].isDownloading = false;
            setAttachmentData(newArray);
          },
          (percent: number) => {
            newArray = [chatResponse[idx].ComplaintDocuments[0]];
            newArray[0].percent = percent;
            setAttachmentData(newArray);
          },
        );
      } else {
        showToastMessage(strings.information, downloadInProgress);
      }
    }
  };

  /**
   * Called when user start to enter text in text field.
   * @param text contains the text entered by user.
   */
  const onTextChange = (text: string) => {
    const textNew = text?.replace(VALIDATION_REGEX.textCheck, '');
    const spaceCheck = VALIDATION_REGEX.spaceCheckInStarting.test(text[0]);
    if (text && spaceCheck === false) {
      setConversationText(textNew);
    } else {
      setConversationText('');
    }
  };
  const onAddAttachment = (index: number) => {
    const selectMultiple = false;
    if (index === 0) {
      openDeviceCamera(chatImages)
        .then((res: any) => {
          const response = [...res];
          if (res.length >= 1) {
            response.splice(0, response.length - 1);
            setSelectedFileName(response[0].fileName);
            setChatImages(response);
          } else {
            setChatImages([]);
            setSelectedFileName('');
          }
        })
        .catch(() => {
          setSelectedFileName('');
        });
    } else if (index === 1) {
      onSelectGalleyPress(chatImages, selectMultiple)
        .then((res: any) => {
          if (res.length >= 1) {
            const response = res;
            response.splice(0, response.length - 1);
            setSelectedFileName(response[0].fileName);
            setChatImages(response);
          } else {
            setSelectedFileName('');
            setChatImages([]);
          }
        })
        .catch(() => {
          setSelectedFileName('');
        });
    } else if (index === 2) {
      pickDocument(chatImages, selectMultiple)
        .then(res => {
          if (res.length >= 1) {
            const response = res;
            response.splice(0, response.length - 1);
            setSelectedFileName(response[0].fileName);
            setChatImages(response);
          } else {
            setSelectedFileName('');
            setChatImages([]);
          }
        })
        .catch(() => {
          setSelectedFileName('');
        });
    }
  };
  /**
   * Function for removing document.
   * @param index index of doc.
   * @param documentId contain id of document.
   */
  const removeDoc = (index: number, documentId: number) => {
    if (documentId) {
      pCallDeleteDocuments({
        entityId: responseData?.EntityId,
        entityName: complaintEntityName,
        documentId,
      })
        .then((res: {Success: boolean}) => {
          if (res.Success) {
            getComplaintDetails();
          }
        })
        .catch((error: {message: string | undefined}) => {
          showToastMessage(strings.error, error.message);
        });
    } else {
      fileData.splice(index, 1);
      const updatedData = [...fileData];
      setFileData(updatedData);
    }
  };
  const PageHeaderContainer = (complaintDetail: string | undefined) => (
    <PageTitleContainer2>
      <TouchableOpacity
        testID={strings.backButton}
        onPress={() => {
          props.hideComplaintDetails();
        }}>
        <BackIcon />
      </TouchableOpacity>
      <ProjectTitleSubContainer>
        <PageTitle>{complaintDetail}</PageTitle>
      </ProjectTitleSubContainer>
    </PageTitleContainer2>
  );
  const changeToggleValue = () => {
    setToggle(!toggle);
  };

  const toggleModal = async (res: any) => {
    await setImageData(res);
    changeToggleValue();
  };

  /**
   * Function for removing Image.
   */
  const removeImage = () => {
    setChatImages([]);
    setSelectedFileName('');
  };
  return (
    <>
      <ImageModel changeToggleValue={changeToggleValue} toggle={toggle} data={imageData} />
      <KeyboardAvoidingView
        behavior={isIOS() ? 'padding' : 'height'}
        style={styles.keyBoardView}
        keyboardVerticalOffset={isIOS() ? 125 : -100}>
        {fromNotification && PageHeaderContainer(responseData ? responseData.ComplaintsReason : '')}
        <MainContainer ref={scrollViewRef}>
          {getComplaintAPIInProgress ? (
            <MainLoaderContainer>
              <ActivityIndicator size="large" color={colors.primaryThemeColor} />
            </MainLoaderContainer>
          ) : (
            <>
              {!fromNotification && (
                <TopBackContainer>
                  <TouchableOpacity testID={strings.backButton} onPress={() => props.hideComplaintDetails()}>
                    <BackIcon color={colors.black} width={rw(16)} height={rh(16)} />
                  </TouchableOpacity>
                  <TitleText>{responseData?.ComplaintsReason}</TitleText>
                </TopBackContainer>
              )}
              <CardsViewContainer>
                <CardView>
                  <CardHeaderTitle>{information}</CardHeaderTitle>
                  <ColumnContainer>
                    <BottomCardContainer>
                      <DetailsText>{projectId2}</DetailsText>
                      <DetailsTitle>{responseData?.ProjectUniqueId}</DetailsTitle>
                    </BottomCardContainer>
                    <BottomCardContainer>
                      <DetailsText>{projectName}</DetailsText>
                      <DetailsTitle>{responseData?.ProjectName}</DetailsTitle>
                    </BottomCardContainer>
                  </ColumnContainer>
                  <ColumnContainer>
                    <BottomCardContainer>
                      <DetailsText>{budget}</DetailsText>
                      <DetailsTitle>{responseData?.Budget}</DetailsTitle>
                    </BottomCardContainer>
                    <BottomCardContainer>
                      <DetailsText>{raisedAgainst}</DetailsText>
                      <DetailsTitleName numberOfLines={1} ellipsizeMode="tail">
                        {responseData?.RaisedAgainst}
                      </DetailsTitleName>
                    </BottomCardContainer>
                  </ColumnContainer>
                  <ColumnContainer>
                    <BottomCardContainer>
                      <DetailsText>{raisedOn}</DetailsText>
                      <DetailsTitle>{moment(responseData?.CreatedOn).format('LL')}</DetailsTitle>
                    </BottomCardContainer>
                    <BottomCardContainer>
                      <DetailsText>{status}</DetailsText>
                      <DetailsTitle>{responseData?.ComplaintsStatus}</DetailsTitle>
                    </BottomCardContainer>
                  </ColumnContainer>
                  {!isComplaintResolved &&
                    customerId === responseData?.CreatedBy &&
                    responseData?.ComplaintsStatus !== strings.rejected && (
                      <ButtonContainer>
                        <SubmitButton testID={strings.showResolvedButton} selected={true} onPress={() => onResolve()}>
                          <ButtonText>
                            {!isResolveAPIInProgress && resolve}
                            {isResolveAPIInProgress && <ActivityIndicator size="small" color={colors.white} />}
                          </ButtonText>
                        </SubmitButton>
                      </ButtonContainer>
                    )}
                </CardView>
                <CardView>
                  <CardHeaderTitle paddingBottom={2}>{issueDescription}</CardHeaderTitle>
                  <CardRowContainer>
                    <CardTitleText flex={1}>{responseData?.ComplaintsReason}</CardTitleText>
                  </CardRowContainer>
                  <CardRowContainer>
                    <DescriptionText>{responseData?.Description}</DescriptionText>
                  </CardRowContainer>
                </CardView>
                <PendingContainer>
                  {fileData?.map((res: any, idx: number) => (
                    <AttachmentListMainContainer key={idx}>
                      <AttachmentList>
                        <AttachmentTouchable
                          testID={strings.downloadFileDataButton}
                          onPress={() => {
                            downloadFunction(res, idx, complaint2);
                          }}>
                          <AttachmentImageContainer>
                            {ImageExtension.includes(res.fileType) || ImageExtension.includes(res.FileExtension) ? (
                              <>
                                <ToggleWrapper
                                  testID={strings.fileDataToggleButton}
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
                          <AttachmentName numberOfLines={1} ellipsizeMode="middle">
                            {res?.FileName ? res?.FileName : res?.fileName}
                          </AttachmentName>
                        </AttachmentTouchable>
                        {customerId === responseData?.CreatedBy && (
                          <AttachmentImageContainer>
                            {fileData[idx].isDownloading ? (
                              ProgressCircleView(fileData[idx].percent * 100)
                            ) : (
                              <TouchableContainer
                                testID={strings.removeFileDataImageButton}
                                onPress={() => {
                                  removeDoc(idx, res.Id);
                                }}>
                                <Close />
                              </TouchableContainer>
                            )}
                          </AttachmentImageContainer>
                        )}
                      </AttachmentList>
                    </AttachmentListMainContainer>
                  ))}
                </PendingContainer>
              </CardsViewContainer>
              <ConversationTagSection>
                <ConversationTag>{conversation}</ConversationTag>
              </ConversationTagSection>
              {/* ****************** Chat Section ********************** */}
              <CardsViewContainer>
                {chatResponse.map((res: any, idx: number) => (
                  <CardView key={idx}>
                    <CustomerName paddingBottom={2} numberOfLines={1} ellipsizeMode="tail">
                      {res.CustomerFullName}
                    </CustomerName>
                    <ConversationDateText>{moment(res.CreatedOn).format('LL, h:mm A')}</ConversationDateText>
                    <ConversationText>{res.Message}</ConversationText>
                    <>
                      {chatResponse[idx].ComplaintDocuments?.map((data: any, key: number) => (
                        <AttachmentListMainContainer key={key}>
                          <AttachmentList>
                            <AttachmentTouchable
                              testID={strings.downloadConversationDocumentButton}
                              onPress={() => {
                                downloadFunction(data, idx, chat);
                              }}>
                              <AttachmentImageContainer>
                                {ImageExtension.includes(data.fileType) ||
                                ImageExtension.includes(data.FileExtension) ? (
                                  <>
                                    <ToggleWrapper
                                      testID={strings.chatToggleButton}
                                      onPress={() => {
                                        toggleModal(data);
                                      }}>
                                      <ProfileImage
                                        source={data?.FilePath ? {uri: data?.FilePath} : {uri: data?.uri}}
                                        resizeMode="cover"
                                      />
                                    </ToggleWrapper>
                                  </>
                                ) : (
                                  <Document />
                                )}
                              </AttachmentImageContainer>
                              <AttachmentName numberOfLines={1} ellipsizeMode="middle">
                                {data?.fileName ? data?.fileName : data.FileName}
                              </AttachmentName>
                            </AttachmentTouchable>
                            {customerId === res?.CreatedBy && (
                              <AttachmentImageContainer>
                                {data.isDownloading ? (
                                  ProgressCircleView(chatResponse[idx].ComplaintDocuments[key].percent * 100)
                                ) : (
                                  <TouchableContainer
                                    testID={strings.removeDocumentButton}
                                    onPress={() => {
                                      removeDoc(idx, data.Id);
                                    }}>
                                    <Close />
                                  </TouchableContainer>
                                )}
                              </AttachmentImageContainer>
                            )}
                          </AttachmentList>
                        </AttachmentListMainContainer>
                      ))}
                    </>
                  </CardView>
                ))}
              </CardsViewContainer>
              <ReplyContainer>
                <InputContainer style={{marginBottom: isKeyboardVisible ? 10 : 0}}>
                  <InputView
                    testID={strings.messageInputBox}
                    value={conversationText}
                    placeholder={typeAMessage}
                    placeholderTextColor={colors.black}
                    onChangeText={(text: string) => {
                      onTextChange(text);
                    }}
                  />
                  {/* <EmojiIcon /> */}
                </InputContainer>
                <IconContainer>
                  <TouchableContainer testID={strings.showActionSheetButton} onPress={showActionSheet}>
                    <AttachedPinIcon />
                  </TouchableContainer>
                </IconContainer>
                <ActionSheet
                  ref={actionSheet}
                  options={actionSheetOptions}
                  cancelButtonIndex={3}
                  destructiveButtonIndex={3}
                  onPress={(index: number) => {
                    onAddAttachment(index);
                  }}
                />
                {sendMessageAPIInProgress ? (
                  <ActivityIndicator size="small" color={colors.primaryThemeColor} />
                ) : (
                  <TouchableContainer testID={strings.sendMessageButton} onPress={onSendMessage}>
                    <SendIcon />
                  </TouchableContainer>
                )}
              </ReplyContainer>
              {/* ****************** Selected Image Container *************** */}
              <SelectedImageContainer>
                {chatImages?.map((res: any, idx: number) => (
                  <AttachmentList key={idx}>
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
                    <AttachmentName numberOfLines={1} ellipsizeMode="middle">
                      {res?.FileName ? res?.FileName : res?.fileName}
                    </AttachmentName>
                    <AttachmentImageContainer>
                      <TouchableContainer testID={strings.removeSelectedImageButton} onPress={removeImage}>
                        <Close />
                      </TouchableContainer>
                    </AttachmentImageContainer>
                  </AttachmentList>
                ))}
              </SelectedImageContainer>
            </>
          )}
        </MainContainer>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callGetComplaintDetails,
  callComplaintConversation,
  callComplaintChatAPI,
  callResolveComplaintAPI,
  callDeleteDocuments,
};
export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsDetails);
