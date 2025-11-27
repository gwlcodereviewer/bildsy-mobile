import React, {useState, useEffect} from 'react';
import {Modal, ActivityIndicator, LogBox, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {connect} from 'react-redux';
import {strings} from '../../../../constants/strings';
import {IStore, IUpdateStatusConversation} from '../../../../redux/types';
import colors from '../../../../style/colors';
import {
  SubmitButton,
  ButtonText,
  BottomCardContainer,
  SubmitButtonWithBorder,
  ButtonText2,
  DetailsTitle,
  PageTitle,
} from '../../../../style/index';
import {callUpdateBidStatus} from '../../../../redux/actions/auth';

import {
  ControlContainer,
  ProfileDescContainer,
  ProfileRowContainer,
  ProfileImage,
  ProfileName,
  ProfessionalName,
  ViewProfileText,
  ProposalText,
  ProposalDescText,
  ProfileMainContainer,
  ColumnContainer,
  DetailsText,
  CardDetailsContainer,
  DetailsTextContainer,
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
  PhoneRowContainer,
} from '../bidsStyled';
import {INavigation} from '../../../../types';
import {showToastMessage, attachmentDownload, ProgressCircleView, makeCall} from '../../../../utils';
import {localStrings} from '../../../../localization/localStrings';
import Document from '../../../../assets/svg/Document';
import {
  PageTitleContainer2,
  ProjectTitleSubContainer,
  ProjectContainer,
  AttachmentList,
  AttachmentName,
  AttachmentListContainer,
  AttachmentImageContainer,
  AttachmentListContainerBidProfile,
  InfoText,
} from '../../styled';
import BackIcon from '../../../../assets/svg/BackIcon';
import {NAV_BIDS_VIEW_PROFILE} from '../../../../navigation/navConstants';
import {rw} from '../../../../style/Dimen';
import InfoIcon from '../../../../assets/svg/InfoIcon';
import {
  ConfirmContainerView,
  NoProjectAvailable,
  NoProjectAvailableText,
  ProjectDetailText,
  ProjectDetailView,
} from '../../info/infoStyled';
import pngImages from '../../../../assets/images/pngImages';
import {
  BID_STATUS_BID_AWARDED,
  BID_STATUS_BID_REJECTED,
  ImageExtension,
} from '../../../../constants/utils/constantData';
import ImageModel from '../../../../components/imageModeView';
import Call from '../../../../assets/svg/Call';

interface Props {
  navigation?: INavigation;
  callUpdateBidStatus: (param: IUpdateStatusConversation) => Promise<any>;
  route?: INavigation;
  id?: number;
  status?: string;
  bidsDetailResponseProps?: any;
}
const BidsProfile: React.FC<Props> = (props: Props) => {
  const {navigation, callUpdateBidStatus: callUpdateBidStatusProps, id, bidsDetailResponseProps} = props;
  const {
    amount,
    memberSince,
    companyName,
    confirmation,
    confirmModal3,
    confirmModal2,
    cancel,
    yes,
    downloadInProgress,
    profile,
    viewProfile,
    proposal,
    projectName,
    bidPlaced,
    phone,
    thereIsNoProjects,
  } = localStrings;

  const [isGetBidsAPIInProgress, setIsGetBidsAPIInProgress] = useState<boolean>(false);
  const [isAPIInProgress, setIsAPIInProgress] = useState<boolean>(false);

  const [bidsDetailResponse, setBidsDetailResponse] = useState<any>(bidsDetailResponseProps);
  const [attachmentsData, setAttachmentData] = useState<any[]>([]);
  const [modalType, setModalType] = useState<string>('');
  const [imageData, setImageData] = useState();
  const [imageToggle, setImageToggle] = useState<boolean>(false);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  useEffect(() => {
    const {route} = props;
    setBidsDetailResponse(route?.params?.data);
    setAttachmentData(route?.params?.data?.BidAttachments);
  }, [id]);
  /**
   * function for getting professionals list.
   * @param id project Id
   */

  const UpdateBidStatus = (bidId: number, bidStatusId: number) => {
    callUpdateBidStatusProps({
      bidId,
      bidStatusId,
    })
      .then(res => {
        if (res.Success) {
          showToastMessage(strings.success, res.Message);
          navigation?.goBack();
          setTimeout(() => {
            const {route} = props;
            route?.params.callback();
          }, 100);
        }
      })
      .catch(error => {
        setIsGetBidsAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };

  const onSubmit = () => {
    setToggle(true);
  };
  const [toggle, setToggle] = useState(false);

  const ShowModel = () => (
    <Modal transparent={true} visible={toggle}>
      <TransparentView>
        <ViewContainer>
          <ViewMain>
            <TextContainer>{confirmation}</TextContainer>
            <OptionString>{modalType === strings.AwardProject ? confirmModal3 : confirmModal2}</OptionString>
          </ViewMain>
          <AwardContainer>
            <AwardSubView
              testID={strings.showToggleButton}
              color={colors.white}
              onPress={() => {
                setToggle(false);
              }}>
              <CenterSubView>
                <CancelText>{cancel}</CancelText>
              </CenterSubView>
            </AwardSubView>
            <AwardSubView
              color={colors.primaryBlue}
              testID={strings.closeToggleButton}
              onPress={() => {
                setToggle(false);
                if (modalType === strings.AwardProject)
                  UpdateBidStatus(bidsDetailResponse.BidId, BID_STATUS_BID_AWARDED);
                else {
                  UpdateBidStatus(bidsDetailResponse.BidId, BID_STATUS_BID_REJECTED);
                }
              }}>
              <CompletedText color={colors.white}>{yes}</CompletedText>
            </AwardSubView>
          </AwardContainer>
        </ViewContainer>
      </TransparentView>
    </Modal>
  );

  const changeImageToggleValue = () => {
    setImageToggle(!imageToggle);
  };

  const toggleModal = async (res: any) => {
    await setImageData(res);
    changeImageToggleValue();
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
        <PageTitle>{profile}</PageTitle>
      </ProjectTitleSubContainer>
    </PageTitleContainer2>
  );
  const downloadFunction = (res: any, idx: number) => {
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
      showToastMessage(strings.information, downloadInProgress);
    }
  };
  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <ShowModel />
      <ImageModel changeToggleValue={changeImageToggleValue} toggle={imageToggle} data={imageData} />

      <ControlContainer showsVerticalScrollIndicator={false}>
        {bidsDetailResponse && (
          <>
            <ProfileRowContainer>
              <ProfileImage
                source={
                  bidsDetailResponse?.CompanyLogo ? {uri: bidsDetailResponse?.CompanyLogo} : pngImages.bitMapGroup6
                }
                resizeMode="cover"
              />

              <ProfileDescContainer>
                <ProfileName>{bidsDetailResponse.CompanyName}</ProfileName>
                <ProfessionalName>{bidsDetailResponse.ProfessionalName}</ProfessionalName>
                <TouchableOpacity
                  testID={strings.navigationButton}
                  onPress={() => {
                    navigation?.navigate(NAV_BIDS_VIEW_PROFILE, {data: bidsDetailResponse});
                  }}>
                  <ViewProfileText>{viewProfile}</ViewProfileText>
                </TouchableOpacity>
              </ProfileDescContainer>
            </ProfileRowContainer>
            <ProfileMainContainer>
              <ProposalText>{proposal}</ProposalText>
              <ProposalDescText>{bidsDetailResponse?.ProposalDescription}</ProposalDescText>
              <ColumnContainer>
                <BottomCardContainer>
                  <DetailsText>{projectName}</DetailsText>
                  <DetailsTitle>{bidsDetailResponse?.ProjectTitle}</DetailsTitle>
                </BottomCardContainer>
                <BottomCardContainer>
                  <DetailsText>{bidPlaced}</DetailsText>
                  <DetailsTitle>{moment(bidsDetailResponse?.BidPlacedOnTime).format('LL')}</DetailsTitle>
                </BottomCardContainer>
              </ColumnContainer>
              <ColumnContainer>
                <BottomCardContainer>
                  <DetailsText>{amount}</DetailsText>
                  <DetailsTitle>{bidsDetailResponse?.BidPrice}</DetailsTitle>
                </BottomCardContainer>
                <BottomCardContainer>
                  <DetailsText>{companyName}</DetailsText>
                  <DetailsTitle numberOfLines={1} ellipsizeMode="tail">
                    {bidsDetailResponse?.CompanyName}
                  </DetailsTitle>
                </BottomCardContainer>
              </ColumnContainer>
              <ColumnContainer>
                <BottomCardContainer>
                  <DetailsText>{memberSince}</DetailsText>
                  <DetailsTitle>{moment(bidsDetailResponse?.CustomerSince).format('LL')}</DetailsTitle>
                </BottomCardContainer>
                <BottomCardContainer>
                  <DetailsText>{phone}</DetailsText>
                  <TouchableOpacity
                    testID={strings.makeCallButton}
                    onPress={() => {
                      makeCall(bidsDetailResponse?.Phone);
                    }}>
                    <PhoneRowContainer>
                      <Call color={colors.primaryThemeColor} />
                      <DetailsTitle>{bidsDetailResponse?.Phone}</DetailsTitle>
                    </PhoneRowContainer>
                  </TouchableOpacity>
                </BottomCardContainer>
              </ColumnContainer>
              <ColumnContainer>
                <ConfirmContainerView>
                  {/* ********************* Attachment View ******************** */}
                  <ProjectDetailView>
                    <ProjectDetailText>{strings.attachments}</ProjectDetailText>
                  </ProjectDetailView>
                  {bidsDetailResponse?.BidAttachments?.length === 0 && (
                    <NoProjectAvailable>
                      <NoProjectAvailableText>{thereIsNoProjects}</NoProjectAvailableText>
                    </NoProjectAvailable>
                  )}
                  {bidsDetailResponse?.BidAttachments?.map((res: any, idx: number) => (
                    <AttachmentListContainerBidProfile key={idx} onPress={() => downloadFunction(res, idx)}>
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
                          {res?.FileName ? res?.FileName : res?.fileName}
                        </AttachmentName>
                        {attachmentsData && attachmentsData[idx] && attachmentsData[idx].isDownloading
                          ? ProgressCircleView(attachmentsData[idx].percent * 100)
                          : null}
                      </AttachmentList>
                    </AttachmentListContainerBidProfile>
                  ))}
                </ConfirmContainerView>
              </ColumnContainer>
              <SubmitButtonWithBorder
                testID={strings.modalButton}
                disabled={false}
                onPress={() => {
                  setModalType(strings.RejectBid);
                  onSubmit();
                }}
                selected={true}
                style={{marginHorizontal: rw(24)}}>
                <ButtonText2>
                  {!isAPIInProgress && strings.RejectBid}
                  {isAPIInProgress && <ActivityIndicator size="small" color={colors.white} />}
                </ButtonText2>
              </SubmitButtonWithBorder>
              <SubmitButton
                testID={strings.projectAwardButton}
                disabled={false}
                onPress={() => {
                  setModalType(strings.AwardProject);
                  onSubmit();
                }}
                selected={true}
                style={{marginHorizontal: rw(24)}}>
                <ButtonText>
                  {!isAPIInProgress && strings.AwardProject}
                  {isAPIInProgress && <ActivityIndicator size="small" color={colors.white} />}
                </ButtonText>
              </SubmitButton>
              <CardDetailsContainer>
                <ColumnContainer>
                  <DetailsTextContainer>
                    <AttachmentListContainer key={0}>
                      <AttachmentList>
                        <AttachmentImageContainer>
                          <InfoIcon />
                        </AttachmentImageContainer>
                        <InfoText numberOfLines={5} ellipsizeMode={'tail'}>
                          {strings.info_string}
                        </InfoText>
                        <AttachmentImageContainer />
                      </AttachmentList>
                    </AttachmentListContainer>
                  </DetailsTextContainer>
                </ColumnContainer>
              </CardDetailsContainer>
            </ProfileMainContainer>
          </>
        )}
      </ControlContainer>
    </ProjectContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callUpdateBidStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(BidsProfile);
