/* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, LogBox, TouchableOpacity, View} from 'react-native';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import ReadMore from 'react-native-read-more-text';
import {Popable} from 'react-native-popable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {strings} from '../../../constants/strings';
import {IDeleteDocuments, IStoreProjectDetails} from '../../../redux/types';
import colors from '../../../style/colors';
import {EmptyViewContainer, RowContainer, BidTag, BidTagText} from '../../../style/index';
import {
  callGetProjectDetails,
  callGetProjectProfessionalList,
  callDeleteDocuments,
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
  ProjectDetailView,
  DescriptionText,
  ProfessionalDetailView,
  ProfessionalDetailText,
  ProfessionalContainer,
  SpaceInList,
  AttachmentListContainer,
  AttachmentList,
  AttachmentImageContainer,
  AttachmentName,
  BottomCardContainer,
  DetailsText,
  DetailsTitle,
  CompanyDetails,
  CompanyLogoImage,
  ValueText,
  MainLoaderContainer,
  FullRowText,
  BidTagContainer,
  ShowMoreLessText,
  NoProjectAvailable,
  NoProjectAvailableText,
  TouchableContainer,
  ToggleWrapper,
  ProfileImage,
} from './infoStyled';
import {
  INavigation,
  IProjectDetailsResponseType,
  AttachmentsDataType,
  BidsProfessionalsResponseType,
  IBidsProfessionalsResponseTypeRoot,
  ProjectProfessionalsDataResponse,
} from '../../../types';
import Close from '../../../assets/svg/Close';
import {showToastMessage, attachmentDownload, ProgressCircleView, checkProjectDeleted} from '../../../utils';
import {localStrings} from '../../../localization/localStrings';
import Document from '../../../assets/svg/Document';
import pngImages from '../../../assets/images/pngImages';
import styles from '../../../style/style';
import ProfessionalsModelView from '../../../components/professionalsModalView';
import ImageModel from '../../../components/imageModeView';
import {
  ImageExtension,
  PROJECT_STATUS_BIDDING,
  PROJECT_STATUS_AWARDED,
  PROJECT_STATUS_DRAFT,
  PROJECT_STATUS_UN_FULL_FILLED,
  PROJECT_STATUS_COMPLETED,
  PROJECT_STATUS_ARCHIVED,
} from '../../../constants/utils/constantData';

interface Props {
  navigation?: INavigation;
  callGetProjectDetails: (param: number) => Promise<any>;
  callGetProjectProfessionalList: (param: number) => Promise<any>;
  callProfessionalDetailById: (param: number) => Promise<IBidsProfessionalsResponseTypeRoot>;
  onChange?: (pager: number, projectId: number, locationId: number) => void;
  route?: INavigation;
  id: number;
  projectDetailsResponseData: IProjectDetailsResponseType;
  ProjectProfessionalsResponse: ProjectProfessionalsDataResponse[];
  callDeleteDocuments: (param: IDeleteDocuments) => Promise<any>;
  attachmentDataResponse: AttachmentsDataType[];
}
interface IFormInput {
  projectName: string;
  expectedStartDate: string;
  expectedCompletionDate: string;
  description: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  phone: string;
  projectType: string;
  area: number;
  budget: string;
  latitude: string;
  longitude: string;
  phoneNumberLength: number;
  suiteAddress: string;
}
const Info = (props: Props) => {
  const {
    callGetProjectDetails: pCallGetProjectDetails,
    callGetProjectProfessionalList: pCallGetProjectProfessionalList,
    callProfessionalDetailById: pCallProfessionalDetailById,
    id,
    projectDetailsResponseData,
    callDeleteDocuments: pCallDeleteDocuments,
    navigation,
    ProjectProfessionalsResponse,
    attachmentDataResponse,
  } = props;
  const {specialist} = localStrings;
  const {route} = props;
  const projectInfoId = route?.params?.id;
  const fromNotification = route?.params?.fromNotification;
  const [professionalListResponse, setProfessionalListResponse] = useState<ProjectProfessionalsDataResponse[]>(
    ProjectProfessionalsResponse || [],
  );
  const [isGetDetailsAPIInProgress, setIsGetDetailsAPIInProgress] = useState<boolean>(false);
  const [attachmentsData, setAttachmentData] = useState<AttachmentsDataType[]>(attachmentDataResponse || []);
  const [getProfessionalAPIInProg, setGetProfessionalAPIInProg] = useState<boolean>(false);
  const [professionalType, setProfessionalType] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [descriptionLines, setDescriptionLines] = useState<number>(3);
  const [proData, setProData] = useState<BidsProfessionalsResponseType>();
  const [imageToggle, setImageToggle] = useState<boolean>(false);
  const [imageData, setImageData] = useState();

  const [formInput, setFormInput] = useState<IFormInput>({
    projectName: '',
    expectedStartDate: '',
    expectedCompletionDate: '',
    description: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    phone: '',
    projectType: '',
    area: 0,
    budget: '',
    latitude: '',
    longitude: '',
    phoneNumberLength: 10,
    suiteAddress: '',
  });

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  useEffect(() => {
    getProjectDetails(projectInfoId);
  }, [projectInfoId]);
  useEffect(() => {
    if (projectDetailsResponseData?.Success) {
      if (fromNotification) {
        checkProjectDeleted(projectDetailsResponseData?.Data?.ProjectIsDeleted, navigation);
      }
      setProfessionalType(projectDetailsResponseData?.Data?.ProjectType);
      const response = projectDetailsResponseData?.Data;
      const address = projectDetailsResponseData?.Data?.Address;
      setAttachmentData(response?.Attachments);
      setFormInput({
        ...formInput,
        projectName: response.Name,
        description: response.Description,
        address: `${address.Address1}`,
        suiteAddress: address?.Suite,
        city: address.City,
        zipCode: address.ZipPostalCode,
        phone: address.PhoneNumber,
        budget: String(response.BudgetAmount),
      });
      setIsGetDetailsAPIInProgress(false);
      getProfessionalList();
    }
  }, [projectDetailsResponseData]);
  /**
   * function for getting project details.
   * @param id projectId
   */
  const getProjectDetails = (projectId: number) => {
    setIsGetDetailsAPIInProgress(true);
    pCallGetProjectDetails(projectId);
  };
  /**
   * function for getting professionals list.
   * @param id project Id
   */
  const getProfessionalList = () => {
    pCallGetProjectProfessionalList(id)
      .then(res => {
        if (res.Success) {
          setIsGetDetailsAPIInProgress(false);
          setProfessionalListResponse(res?.Data?.ProfessionalModel);
        }
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };

  const data: any = projectDetailsResponseData?.Data || {};
  const {
    Name,
    ExpectedCompleteDateUTC = '',
    ExpectedStartDateUTC,
    Description,
    ProjectType,
    AreaSqFeet,
    Budget,
    ProjectStatus,
    ProjectStatusId,
  } = data;
  const {Address1, Suite, StateProvinceName, City, ZipPostalCode} = projectDetailsResponseData?.Data?.Address || {};
  let suiteAdd = '';
  if (Suite !== null) {
    suiteAdd = projectDetailsResponseData?.Data?.Address?.Suite || '';
  }

  const renderTruncatedFooter = (handlePress: any) => (
    <ShowMoreLessText testID={strings.readMoreBtn} onPress={handlePress}>
      {localStrings.readMore}
    </ShowMoreLessText>
  );
  const renderRevealedFooter = (handlePress: any) => (
    <ShowMoreLessText onPress={handlePress}>{localStrings.readLess}</ShowMoreLessText>
  );

  const handleTextReady = () => {};

  let color;
  let statusColor;
  const status = ProjectStatusId;
  if (
    ProjectStatusId === 40 ||
    ProjectStatusId === PROJECT_STATUS_DRAFT ||
    ProjectStatusId === PROJECT_STATUS_BIDDING ||
    ProjectStatusId === PROJECT_STATUS_ARCHIVED
  ) {
    color = colors.lightYellow;
    statusColor = colors.darkYellow;
  } else if (status === PROJECT_STATUS_AWARDED || status === PROJECT_STATUS_COMPLETED) {
    color = colors.lightGreen;
    statusColor = colors.darkGreen;
  } else if (status === PROJECT_STATUS_UN_FULL_FILLED || status === PROJECT_STATUS_ARCHIVED) {
    color = colors.athens_Gray;
    statusColor = colors.darkGrey;
  } else {
    color = colors.lightPink;
    statusColor = colors.redPink;
  }

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
   * remove document
   */
  const removeDoc = (docId: number, documentId: number) => {
    if (documentId) {
      pCallDeleteDocuments({
        entityId: projectInfoId,
        entityName: 'Project',
        documentId,
      })
        .then(res => {
          if (res.Success) {
            getProjectDetails(projectInfoId);
          }
        })
        .catch(error => {
          showToastMessage(strings.error, error.message);
        });
    } else {
      attachmentsData.splice(documentId, 1);
      const updatedAttachmentsData = [...attachmentsData];
      setAttachmentData(updatedAttachmentsData);
    }
  };

  const changeToggleValue = () => {
    setToggle(!toggle);
  };

  const getProfessionalData = (res: BidsProfessionalsResponseType) => {
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

  const changeImageToggleValue = () => {
    setImageToggle(!imageToggle);
  };

  const toggleModal = async (res: any) => {
    await setImageData(res);
    changeImageToggleValue();
  };
  return (
    <ControlContainer>
      <ProfessionalsModelView data={proData} changeToggleValue={changeToggleValue} toggle={toggle} />
      <ImageModel changeToggleValue={changeImageToggleValue} toggle={imageToggle} data={imageData} />
      {isGetDetailsAPIInProgress ? (
        <MainLoaderContainer>
          <ActivityIndicator size="large" color={colors.primaryThemeColor} />
        </MainLoaderContainer>
      ) : (
        <>
          <InputFieldContainer>
            <RowContainer>
              <BidTagContainer>
                <BidTag color={color}>
                  <BidTagText statusColor={statusColor}>
                    {ProjectStatusId === 40 ? localStrings.bidding : ProjectStatus}
                  </BidTagText>
                </BidTag>
              </BidTagContainer>
            </RowContainer>
            <ConfirmContainerView>
              <ProjectDetailView>
                <ProjectDetailText>{strings.projectDetails}</ProjectDetailText>
              </ProjectDetailView>

              <ListConfirmContainerView>
                <BottomCardContainer>
                  <DetailsText numberOfLines={1} lineHeight={20}>
                    {strings.projectNameWithoutAsterixSign}
                  </DetailsText>
                  <ValueText>{Name}</ValueText>
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
              </ProjectDetailView>
              <ProjectDetailView>
                <ReadMore
                  numberOfLines={descriptionLines}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}
                  onReady={handleTextReady}>
                  <DescriptionText>{Description}</DescriptionText>
                </ReadMore>
              </ProjectDetailView>
              <SpaceBetweenText />
            </ConfirmContainerView>
            <SpaceBetweenText />
            {/* ****************Project Location******************** */}
            <ConfirmContainerView>
              <ProjectDetailView>
                <ProjectDetailText>{strings.projectLocation}</ProjectDetailText>
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
                  <FullRowText>{strings.budgetText}</FullRowText>
                  <View style={styles.budgetContainer}>
                    <Popable content={strings.budgetInfoText}>
                      <Ionicons name="information-circle-outline" style={styles.budgetInfoIcon} />
                    </Popable>
                    <DetailsTitle lineHeight={20}>{Budget}</DetailsTitle>
                  </View>
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
                </ProjectDetailView>
                <DescriptionText>{localStrings.youHaveInvited}</DescriptionText>
                <SpaceBetweenText />
              </ConfirmContainerView>
              {professionalListResponse?.map((res: any, idx: number) => (
                <EmptyViewContainer key={idx}>
                  <ProfessionalDetailView>
                    <ListConfirmContainerView>
                      <ProfessionalDetailText>{`${strings.professional} ${idx + 1}`}</ProfessionalDetailText>
                    </ListConfirmContainerView>
                    <ListConfirmContainerView>
                      <TouchableOpacity
                        testID={strings.getProfessionalDataButton}
                        onPress={() => {
                          getProfessionalData(res);
                        }}>
                        <CompanyLogoImage source={res.CompanyLogo ? {uri: res.CompanyLogo} : pngImages.bitMapGroup6} />
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
                          testID={strings.getProfessionalDataButton2}
                          onPress={() => {
                            getProfessionalData(res);
                          }}>
                          <DetailsText numberOfLines={1}>{strings.contact}</DetailsText>
                          <DetailsTitle numberOfLines={1} ellipsizeMode="tail">
                            {res?.FullName}
                          </DetailsTitle>
                        </TouchableOpacity>
                      </BottomCardContainer>
                      <BottomCardContainer>
                        <DetailsText numberOfLines={1}>{specialist}</DetailsText>
                        <DetailsTitle>{professionalType}</DetailsTitle>
                      </BottomCardContainer>
                    </ListConfirmContainerView>
                    <ListConfirmContainerView>
                      <BottomCardContainer>
                        <DetailsText>{strings.addressText}</DetailsText>
                        <ValueText>{res?.StreetAddress}</ValueText>
                      </BottomCardContainer>
                    </ListConfirmContainerView>
                    <SpaceBetweenText />
                  </ProfessionalDetailView>
                  <SpaceInList />
                </EmptyViewContainer>
              ))}
            </ProfessionalContainer>

            <SpaceBetweenText />
            <ConfirmContainerView>
              {/* ********************* Attachment View ******************** */}
              <ProjectDetailView>
                <ProjectDetailText>{strings.attachments}</ProjectDetailText>
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
                      testID={strings.downloadButton}
                      onPress={() => {
                        downloadFunction(res, idx);
                      }}>
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
                        <AttachmentName numberOfLines={1} ellipsizeMode="middle">
                          {res?.FileName}
                        </AttachmentName>
                        {attachmentsData[idx].isDownloading ? (
                          ProgressCircleView(attachmentsData[idx].percent * 100)
                        ) : (
                          <AttachmentImageContainer>
                            <TouchableContainer
                              onPress={() => {
                                removeDoc(idx, res.Id);
                              }}>
                              <Close />
                            </TouchableContainer>
                          </AttachmentImageContainer>
                        )}
                      </AttachmentList>
                    </AttachmentListContainer>
                  )}
                </EmptyViewContainer>
              ))}

              <SpaceBetweenText />
            </ConfirmContainerView>
            <SpaceBetweenText />
          </InputFieldContainer>
        </>
      )}
    </ControlContainer>
  );
};
const mapStateToProps = (store: IStoreProjectDetails) => ({
  projectDetailsResponseData: store?.projectDetails?.payload,
});
const mapDispatchToProps = {
  callGetProjectDetails,
  callGetProjectProfessionalList,
  callDeleteDocuments,
  callProfessionalDetailById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
