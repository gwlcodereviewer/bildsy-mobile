import React, {useState, useEffect} from 'react';
import {Modal, ActivityIndicator, LogBox, TouchableOpacity, Linking, Platform} from 'react-native';
import moment from 'moment';
import ReadMore from 'react-native-read-more-text';
import {connect} from 'react-redux';
import {strings} from '../../../../constants/strings';
import {IStoreBidDetail, IUpdateStatusConversation} from '../../../../redux/types';
import colors from '../../../../style/colors';
import ProfessionalsModelView from '../../../../components/professionalsModalView';
import {
  SubmitButton,
  ButtonText,
  RowContainer,
  ListContainerView2,
  LogoImage,
  ListCheckView,
  BidTag,
  BidTagText,
  BottomCardContainer,
  MainLoaderContainer,
  PageTitle,
  ShowMoreLessText,
} from '../../../../style/index';
import {
  callGetBidsDetail,
  callUpdateBidStatus,
  callProfessionalDetailById,
  callGetProjectUsersAPI,
} from '../../../../redux/actions/auth';

import {
  ControlContainer,
  InputFieldContainer,
  SpaceBetweenText,
  SpaceInList,
  DetailsText,
  DetailsTitle,
  CompanyDetails,
  ProName,
  CompanyCardView,
  DetailsTextContainer,
  CardDetailsContainer,
  ColumnContainer,
  ValueText,
  TransparentView,
  ViewContainer,
  TextContainer,
  OptionString,
  ViewMain,
  CancelText,
  AwardContainer,
  AwardSubView,
  CompletedText,
  CenterSubView,
  ToggleWrapper,
  Image,
} from '../bidsStyled';
import {
  BidAttachment,
  DialogRecord,
  IBidDetailData,
  IBidDetailRoot,
  IBidsProfessionalsResponseTypeRoot,
  IChatUser,
  ICommonResponse,
  IFileData,
  INavigation,
  IRootUser,
  IUser,
  IUserRoot,
} from '../../../../types';
import {
  showToastMessage,
  bidStatusArray,
  attachmentDownload,
  ProgressCircleView,
  checkProjectDeleted,
  VALIDATION_REGEX,
} from '../../../../utils';
import {localStrings} from '../../../../localization/localStrings';
import Document from '../../../../assets/svg/Document';
import InfoIcon from '../../../../assets/svg/InfoIcon';
import styles from '../../../../style/style';
import {
  BidTagRowContainer,
  PageTitleContainer2,
  ProjectTitleSubContainer,
  ProjectContainer,
  AttachmentList,
  AttachmentName,
  AttachmentListContainer,
  AttachmentImageContainer,
  InfoText,
  InfoImageContainer,
  InfoViewContainer,
} from '../../styled';
import Call from '../../../../assets/svg/Call';
import Badge from '../../../../assets/svg/Badge';
import BackIcon from '../../../../assets/svg/BackIcon';
import {NAV_BIDS_PROFILE, NAV_CHAT_MESSAGE} from '../../../../navigation/navConstants';
import {rw} from '../../../../style/Dimen';
import pngImages from '../../../../assets/images/pngImages';
import {getDialogs, getUsers} from '../../../chat/QBUtils';
import {
  BID_STATUS_BID_AWARDED,
  BID_STATUS_BID_DECLINED,
  BID_STATUS_BID_PLACED,
  ImageExtension,
} from '../../../../constants/utils/constantData';
import ImageModel from '../../../../components/imageModeView';

interface Props {
  navigation?: INavigation;
  callGetBidsDetail: (param: number) => Promise<IBidDetailRoot>;
  callUpdateBidStatus: (param: IUpdateStatusConversation) => Promise<ICommonResponse>;
  callProfessionalDetailById: (param: number) => Promise<IBidsProfessionalsResponseTypeRoot>;
  callGetProjectUsersAPI: (param: number) => Promise<IUserRoot>;
  route?: INavigation;
  id?: number;
  status?: string;
  bidsDetailResponse: IBidDetailRoot;
  isApiInProgress: boolean;
  fileDataProps?: IFileData;
}

const renderTruncatedFooter = (handlePress: any) => (
  <ShowMoreLessText onPress={handlePress}>{localStrings.readMore}</ShowMoreLessText>
);
const renderRevealedFooter = (handlePress: any) => (
  <ShowMoreLessText onPress={handlePress}>{localStrings.readLess}</ShowMoreLessText>
);

const handleTextReady = () => {};

const BidsDetail: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    callGetBidsDetail: callGetBidsDetailProps,
    callUpdateBidStatus: callUpdateBidStatusProps,
    callProfessionalDetailById: callProfessionalDetailByIdProps,
    bidsDetailResponse,
    isApiInProgress,
    callGetProjectUsersAPI: callGetProjectUsersAPIProps,
    route,
    fileDataProps,
  } = props;
  const {estimatedStartDate, estimatedCompletion, amount, company, contact, placedOn, descriptions} = localStrings;
  const [proData, setProData] = useState<any>();
  const [fileData, setFileData] = useState<IFileData[]>([]);
  const [getProfessionalAPIInProg, setGetProfessionalAPIInProg] = useState<boolean>(false);
  const [attachmentsData, setAttachmentData] = useState<BidAttachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [showProfessionalPopup, setShowProfessionalPopup] = useState(false);
  const [bidId, setBidId] = useState(Number);
  const [timeout, setTimeout] = useState(false);
  const [imageData, setImageData] = useState();
  const [imageToggle, setImageToggle] = useState<boolean>(false);
  const [userDeleted, setUserDeleted] = useState<boolean>(false);
  const descriptionLines = 3;

  /**
   * Function for opening dialer.
   * @param mobileNumber mobile number given by professional.
   */
  const makeCall = (mobileNumber: string) => {
    let PhoneNumber = '';
    let theNumber = '';
    theNumber = mobileNumber.replace(VALIDATION_REGEX.phoneNumber, '');
    if (Platform.OS === 'android') {
      PhoneNumber = `tel:${theNumber}`;
    } else {
      PhoneNumber = `telprompt:${theNumber}`;
    }
    Linking.openURL(PhoneNumber);
  };

  const isBidDeclined = () => bidsDetailResponse?.Data?.Status === BID_STATUS_BID_DECLINED;

  const ShowModel = () => (
    <Modal transparent={true} visible={toggle}>
      <TransparentView>
        <ViewContainer>
          <ViewMain>
            <TextContainer>{localStrings.confirmation}</TextContainer>
            <OptionString>{localStrings.confirmModal}</OptionString>
          </ViewMain>
          <AwardContainer>
            <AwardSubView
              color={colors.white}
              onPress={() => {
                setToggle(false);
              }}>
              <CenterSubView>
                <CancelText>{localStrings.cancel}</CancelText>
              </CenterSubView>
            </AwardSubView>
            <AwardSubView
              color={colors.primaryBlue}
              onPress={() => {
                UpdateBidStatus(bidsDetailResponse?.Data?.BidId, 70);
                setToggle(false);
              }}>
              <CompletedText color={colors.white}>{localStrings.yes}</CompletedText>
            </AwardSubView>
          </AwardContainer>
        </ViewContainer>
      </TransparentView>
    </Modal>
  );

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  useEffect(() => {
    if (bidsDetailResponse?.Data) {
      checkProjectDeleted(bidsDetailResponse?.Data?.ProjectIsDeleted, navigation);
      setFileData(bidsDetailResponse?.Data?.BidAttachments);
      setAttachmentData(bidsDetailResponse?.Data?.BidAttachments);
      setTimeout(bidsDetailResponse?.Data?.TimeOut);
      setUserDeleted(false);
    } else {
      setUserDeleted(true);
    }
  }, [bidsDetailResponse]);

  useEffect(() => {
    setBidId(route?.params?.bidId);
    getBidsDetail(route?.params?.bidId);
  }, [route?.params?.bidId]);
  /**
   * function for getting professionals list.
   * @param id project Id
   */
  const getBidsDetail = (bidsId: number) => {
    callGetBidsDetailProps(bidsId);
  };

  const onSubmit = () => {
    setToggle(true);
  };
  const UpdateBidStatus = (bidsId: number, bidStatusId: number) => {
    callUpdateBidStatusProps({
      bidId: bidsId,
      bidStatusId,
    })
      .then(res => {
        if (res.Success) {
          showToastMessage(strings.success, res.Message);
          navigation?.goBack();
        } else if (res.Message === localStrings.allocated_five_minute_message) {
          setTimeout(true);
        }
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };

  const PageHeaderContainer = () => (
    <PageTitleContainer2>
      <TouchableOpacity
        testID={strings.backButton}
        onPress={() => {
          navigation?.goBack();
        }}>
        <BackIcon />
      </TouchableOpacity>
      <ProjectTitleSubContainer>
        <PageTitle>{localStrings.bids}</PageTitle>
      </ProjectTitleSubContainer>
    </PageTitleContainer2>
  );
  const varBidsArray = bidsDetailResponse?.Data?.Status ? bidsDetailResponse?.Data?.Status : 30;
  const {color} = bidStatusArray[varBidsArray];
  const {statusColor} = bidStatusArray[varBidsArray];
  const {statusValue} = bidStatusArray[varBidsArray];
  const callbackFun = () => {
    getBidsDetail(bidsDetailResponse?.Data?.BidId);
  };

  const downloadFunction = (res: IFileData, idx: number) => {
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
      showToastMessage(strings.information, localStrings.downloadingIsInProgress);
    }
  };
  const isShowButton = () => {
    if (bidsDetailResponse?.Data?.Status === BID_STATUS_BID_AWARDED && timeout === false) {
      return true;
    }
    if (bidsDetailResponse?.Data?.Status === BID_STATUS_BID_PLACED) {
      return true;
    }
    return false;
  };
  const isShowInfo = () => {
    if (bidsDetailResponse?.Data?.Status === BID_STATUS_BID_AWARDED && timeout === false) {
      return true;
    }
    return false;
  };

  const changeProfessionalPopupValue = () => {
    setShowProfessionalPopup(!showProfessionalPopup);
  };
  const getProfessionalData = (res: IBidDetailData) => {
    setGetProfessionalAPIInProg(true);
    callProfessionalDetailByIdProps(res.ProfessionalId)
      .then(response => {
        setGetProfessionalAPIInProg(false);
        setProData(response.Data);
      })
      .catch(error => {
        setGetProfessionalAPIInProg(false);
        showToastMessage(strings.error, error.message);
      });
  };
  const getAdminUsers = (projectId: number, uniqueArray: IUser[]) => {
    callGetProjectUsersAPIProps(projectId)
      .then(res => {
        const newArray: IChatUser[] = [];

        const responseArray = [...res.Data.Professionals, ...res.Data.Administrators];
        responseArray.forEach(element => {
          let isAvailable = false;
          let newItem = {
            dialogId: '',
            id: '',
            unreadMessagesCount: 0,
            lastMessageDateSent: 0,
            CustomerId: 0,
            CustomerName: '',
            AvatarUrl: '',
            CustomerType: '',
            Email: '',
            CompanyName: '',
            QuickBloxUserId: '',
            fullName: element.fullName,
            login: element.login,
          };
          uniqueArray.forEach((newElement: IUser) => {
            if (newElement.id.toString() === element.QuickBloxUserId.toString()) {
              newItem = element;
              newItem.dialogId = newElement.dialogId;
              newItem.id = newElement.id;
              newItem.unreadMessagesCount = newElement.unreadMessagesCount;
              isAvailable = true;
            }
          });
          if (isAvailable) {
            newArray.push(newItem);
          }
        });
        const foundItem = newArray.find(element => element.CustomerId === bidsDetailResponse.Data.ProfessionalId);
        if (foundItem) {
          navigation?.navigate(NAV_CHAT_MESSAGE, {
            id: foundItem?.dialogId,
            data: newArray,
            name: foundItem?.CustomerName,
            QuickBloxUserId: foundItem?.QuickBloxUserId,
          });
        } else {
          showToastMessage(strings.error, localStrings.ChatRoomNotAvailable);
        }
        setLoading(false);
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
        setLoading(false);
      });
  };

  const changeImageToggleValue = () => {
    setImageToggle(!imageToggle);
  };

  const toggleModal = async (res: any) => {
    await setImageData(res);
    changeImageToggleValue();
  };

  const listDialogs = (projectId: number) => {
    const users: IUser[] = [];
    setLoading(true);
    getDialogs(projectId, (response: any) => {
      let occupantsIds: string[] = [];
      // eslint-disable-next-line array-callback-return
      response.dialogs.map((item: DialogRecord) => {
        occupantsIds = [...occupantsIds, ...item.occupantsIds];
      });
      /* eslint-disable no-param-reassign */
      getUsers(occupantsIds, (result: IRootUser) => {
        result.users.map((userItem: IUser) => {
          response.dialogs.map((item: DialogRecord) => {
            if (item.occupantsIds.includes(userItem.id)) {
              userItem.dialogId = item.id;
              userItem.unreadMessagesCount = item.unreadMessagesCount;
              users.push(userItem);
            }
            return true;
          });
          return true;
        });
        const uniqueArray: IUser[] = [];
        users.forEach(element => {
          let isAvailable = false;
          uniqueArray.forEach(newElement => {
            if (newElement.id.toString() === element.id.toString()) {
              isAvailable = true;
            }
          });
          if (!isAvailable) {
            uniqueArray.push(element);
          }
        });
        getAdminUsers(projectId, uniqueArray);
      });
    });
  };
  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <ShowModel />
      <ImageModel changeToggleValue={changeImageToggleValue} toggle={imageToggle} data={imageData} />
      <ProfessionalsModelView
        changeToggleValue={changeProfessionalPopupValue}
        toggle={showProfessionalPopup}
        data={proData}
      />
      <ControlContainer>
        {isApiInProgress ? (
          <MainLoaderContainer>
            <ActivityIndicator size="large" color={colors.primaryThemeColor} />
          </MainLoaderContainer>
        ) : (
          !userDeleted &&
          bidsDetailResponse?.Success && (
            <InputFieldContainer>
              <ListContainerView2>
                <ListCheckView marginBottom={0}>
                  <RowContainer>
                    <BidTagRowContainer>
                      <BidTag color={color}>
                        <BidTagText statusColor={statusColor}>{statusValue}</BidTagText>
                      </BidTag>
                      {bidsDetailResponse?.Data?.Phone !== undefined && bidsDetailResponse?.Data?.Phone !== null ? (
                        <TouchableOpacity
                          testID={strings.makeCallButton}
                          onPress={() => makeCall(`${bidsDetailResponse?.Data?.Phone}`)}>
                          <Call color={colors.primaryThemeColor} />
                        </TouchableOpacity>
                      ) : (
                        <Call color={colors.disabledPrimaryTheme} />
                      )}
                    </BidTagRowContainer>
                  </RowContainer>
                </ListCheckView>
                <CompanyCardView>
                  <BidTagRowContainer>
                    <>
                      <LogoImage
                        style={styles.companyLogo}
                        source={
                          bidsDetailResponse?.Data?.CompanyLogo
                            ? {uri: bidsDetailResponse?.Data?.CompanyLogo}
                            : pngImages.bitMapGroup6
                        }
                      />
                      <CompanyDetails>
                        <DetailsText numberOfLines={1}>{company}</DetailsText>
                        <DetailsTitle numberOfLines={1} ellipsizeMode="tail">
                          {bidsDetailResponse?.Data?.CompanyName}
                        </DetailsTitle>
                      </CompanyDetails>
                    </>
                    <Badge />
                  </BidTagRowContainer>
                </CompanyCardView>
                <SpaceInList marginTop={1} />
                <CardDetailsContainer>
                  <DetailsTextContainer>
                    <ColumnContainer>
                      <BottomCardContainer>
                        <TouchableOpacity
                          testID={strings.getProfessionalDataButton}
                          onPress={() => {
                            setShowProfessionalPopup(true);
                            getProfessionalData(bidsDetailResponse.Data);
                          }}>
                          <DetailsText numberOfLines={1} lineHeight={20}>
                            {contact}
                          </DetailsText>
                          <ProName numberOfLines={1} ellipsizeMode="tail">
                            {bidsDetailResponse?.Data?.ProfessionalName}
                          </ProName>
                        </TouchableOpacity>
                      </BottomCardContainer>
                      <BottomCardContainer>
                        <DetailsText>{placedOn}</DetailsText>
                        <DetailsTitle>
                          {isBidDeclined() ? localStrings.blankDash : bidsDetailResponse?.Data?.BidPlacedOn}
                        </DetailsTitle>
                      </BottomCardContainer>
                    </ColumnContainer>
                    {!isBidDeclined() && (
                      <ColumnContainer>
                        <BottomCardContainer>
                          <DetailsText>{estimatedStartDate}</DetailsText>
                          <DetailsTitle>
                            {isBidDeclined()
                              ? localStrings.blankDash
                              : moment(bidsDetailResponse?.Data?.ProjectStartOnUTC).format('LL')}
                          </DetailsTitle>
                        </BottomCardContainer>
                        <BottomCardContainer>
                          <DetailsText>{estimatedCompletion}</DetailsText>
                          <DetailsTitle>
                            {isBidDeclined()
                              ? localStrings.blankDash
                              : moment(bidsDetailResponse?.Data?.ProjectDeliveredOnUTC).format('LL')}
                          </DetailsTitle>
                        </BottomCardContainer>
                      </ColumnContainer>
                    )}
                    <ColumnContainer>
                      <BottomCardContainer>
                        <DetailsText>{amount}</DetailsText>
                        <DetailsTitle>
                          {isBidDeclined() ? localStrings.blankDash : bidsDetailResponse?.Data?.BidPrice}
                        </DetailsTitle>
                      </BottomCardContainer>
                    </ColumnContainer>
                  </DetailsTextContainer>
                </CardDetailsContainer>
                <SpaceInList marginTop={1} />
                {!isBidDeclined() && (
                  <CardDetailsContainer>
                    <ColumnContainer>
                      <DetailsTextContainer>
                        <DetailsText>{descriptions}</DetailsText>
                        <ReadMore
                          numberOfLines={descriptionLines}
                          renderTruncatedFooter={renderTruncatedFooter}
                          renderRevealedFooter={renderRevealedFooter}
                          onReady={handleTextReady}>
                          <ValueText>{bidsDetailResponse?.Data?.ProposalDescription}</ValueText>
                        </ReadMore>
                      </DetailsTextContainer>
                    </ColumnContainer>
                  </CardDetailsContainer>
                )}
                {fileData?.length > 0 && (
                  <CardDetailsContainer>
                    <ColumnContainer>
                      <DetailsTextContainer>
                        <DetailsText>{strings.attachments}</DetailsText>
                        {fileData?.map((res: IFileData, idx: number) => (
                          <AttachmentListContainer
                            testID={strings.downloadButton}
                            key={idx}
                            onPress={() => {
                              downloadFunction(res, idx);
                            }}>
                            <AttachmentList>
                              <AttachmentImageContainer>
                                {ImageExtension.includes(res.fileType) || ImageExtension.includes(res.FileExtension) ? (
                                  <>
                                    <ToggleWrapper
                                      onPress={() => {
                                        toggleModal(res);
                                      }}>
                                      <Image
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
                                {res?.fileName ? res?.fileName : res?.FileName}
                              </AttachmentName>
                              <AttachmentImageContainer />
                              {attachmentsData[idx].isDownloading
                                ? ProgressCircleView(attachmentsData[idx].percent * 100)
                                : null}
                            </AttachmentList>
                          </AttachmentListContainer>
                        ))}
                      </DetailsTextContainer>
                    </ColumnContainer>
                  </CardDetailsContainer>
                )}
                {isShowButton() && (
                  <SubmitButton
                    testID={strings.submitButton}
                    disabled={false}
                    onPress={() => {
                      if (bidsDetailResponse?.Data?.Status === BID_STATUS_BID_AWARDED) {
                        onSubmit();
                      } else {
                        navigation?.navigate(NAV_BIDS_PROFILE, {
                          data: bidsDetailResponse?.Data,
                          callback: () => callbackFun(),
                        });
                      }
                    }}
                    selected={true}
                    style={{marginHorizontal: rw(24)}}>
                    <ButtonText>
                      {bidsDetailResponse?.Data?.Status === BID_STATUS_BID_AWARDED
                        ? strings.UnawardProject
                        : strings.takeAction}
                      {isApiInProgress && <ActivityIndicator size="small" color={colors.white} />}
                    </ButtonText>
                  </SubmitButton>
                )}
                <SubmitButton
                  disabled={loading}
                  testID={strings.listDialogButton}
                  onPress={() => {
                    listDialogs(bidsDetailResponse?.Data?.ProjectId);
                  }}
                  selected={true}
                  style={{marginHorizontal: rw(24)}}>
                  <ButtonText>
                    {loading ? <ActivityIndicator size="small" color={colors.white} /> : localStrings.Chat}
                  </ButtonText>
                </SubmitButton>
                {isShowInfo() && (
                  <CardDetailsContainer style={{marginBottom: 15}}>
                    <ColumnContainer>
                      <DetailsTextContainer>
                        <InfoViewContainer>
                          <InfoImageContainer>
                            <InfoIcon />
                          </InfoImageContainer>
                          <InfoText numberOfLines={5} ellipsizeMode={'tail'}>
                            {strings.info_string}
                          </InfoText>
                          <SpaceBetweenText />
                        </InfoViewContainer>
                      </DetailsTextContainer>
                    </ColumnContainer>
                  </CardDetailsContainer>
                )}
              </ListContainerView2>
              <SpaceBetweenText />
            </InputFieldContainer>
          )
        )}
      </ControlContainer>
    </ProjectContainer>
  );
};

const mapStateToProps = (store: IStoreBidDetail) => ({
  bidsDetailResponse: store?.bidDetail?.payload,
  isApiInProgress: store?.bidDetail?.isApiInProgress,
});
const mapDispatchToProps = {
  callGetBidsDetail,
  callUpdateBidStatus,
  callProfessionalDetailById,
  callGetProjectUsersAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(BidsDetail);
