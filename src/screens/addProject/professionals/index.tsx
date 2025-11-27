import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, Switch, TouchableOpacity, View} from 'react-native';
import {Popable} from 'react-native-popable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import pngImages from '../../../assets/images/pngImages';
import Badge from '../../../assets/svg/Badge';
import NotSelectedRadio from '../../../assets/svg/NotSelectedRadio';
import OrangeRadio from '../../../assets/svg/OrangeRadio';
import {strings} from '../../../constants/strings';
import {PROJECT_DATA} from '../../../helpers/constants';
import {localStrings} from '../../../localization/localStrings';
import {callGetProjectTypeDetails, callSearchProfessionals, callUpdateProfessional} from '../../../redux/actions/auth';
import {IProjectProfessionals, IStore, IUpdateProjectProfessionals, navigation} from '../../../redux/types';
import colors from '../../../style/colors';
import styles from '../../../style/style';
import {INavigation, ProjectProfessionalsDataResponse, ProjectProfessionalsResponseType} from '../../../types';
import {showToastMessage} from '../../../utils';
import {ToggleWrapper} from '../modalStyled';
import ProfessionalModel from '../ProfessionalModel';
import {
  BadgeContainer,
  BottomCardContainer,
  BottomContainer,
  ButtonsContainer,
  ButtonSubContainer,
  CheckBoxContainer,
  CompanyCardView,
  CompanyDetails,
  ContactTextList,
  ControlContainer,
  DetailsText,
  DetailsTitle,
  EmptyContainer,
  FullWidthBottomCardContainer,
  FullWidthDetailsText,
  FullWidthDetailsTitle,
  ListCheckView,
  ListContainerView,
  LogoImage,
  MainWrapper,
  NextBtnView,
  NextText,
  ProfessionalListText,
  ProfessionalListView,
  ProfessionalsText,
  ProName,
  RadioButtonText,
  RadioExtraView,
  SkipBtnView,
  SpaceInList,
  SupportArea,
  SupportAreaView,
  ToggleContainer,
  ToggleView,
  TopContainer,
  ValueText,
} from '../styled';
import {ButtonText2, SubmitButtonWithBorder} from '../../../style';

interface Props {
  showBtnStyle: (show: boolean) => void;
  onChange: (pager: number, projectId: number, locationId: number) => void;
  navigation?: INavigation;
  callSearchProfessionals: (param: IProjectProfessionals) => Promise<any>;
  callUpdateProfessional: (param: IUpdateProjectProfessionals) => Promise<any>;
  callGetProjectTypeDetails: (param: number) => Promise<any>;
  professionalListResponseProps: ProjectProfessionalsDataResponse[];
  pageChange: boolean;
}
const ProfessionalView = (props: Props) => {
  const {
    showBtnStyle,
    callSearchProfessionals: pCallSearchProfessionals,
    callUpdateProfessional: pCallUpdateProfessional,
    callGetProjectTypeDetails: pCallGetProjectTypeDetails,
    professionalListResponseProps,
  } = props;

  const {companyName, specialist} = localStrings;
  const [professionalListResponse, setProfessionalListResponse] =
    useState<ProjectProfessionalsDataResponse[]>(professionalListResponseProps);
  const [inviteBidsStatus, setInviteBitStatus] = useState<boolean>(true);
  const [professionalId, setProfessionalId] = useState<number>(0);
  const [isGetAPIInProgress, setIsGetAPIInProgress] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [isUpdateAPIInProgress, setIsUpdateAPIInProgress] = useState<boolean>(false);
  const [locationIdWithoutDuplicate, setLocationIdWithoutDuplicate] = useState<string[]>([]);
  const [isProfessionalAvailable, setProfessionalAvailable] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [projectProfessionalsType, setProjectProfessionalsType] = useState<string>('');
  const [projectId, setProjectId] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [locationId, setLocationId] = useState<number>(0);
  const [data, setData] = useState<ProjectProfessionalsResponseType>();
  const [isQuoteSelected, setIsQuoteSelected] = useState<boolean>(true);
  const [isProjectSelected, setIsProjectSelected] = useState<boolean>(false);
  const [toggleNoProfessionalModal, setToggleNoProfessionalModal] = useState<boolean>(false);
  const inviteBitActive = isQuoteSelected;

  useEffect(() => {
    AsyncStorage.getItem(PROJECT_DATA.setProjectData)
      .then(res => {
        const projectDetails = JSON.parse(res || '');
        setLocationId(projectDetails.locationId);
        setProjectId(projectDetails.id);
        getProfessionals(projectDetails.id);
        getProjectType(projectDetails.id);
      })
      .catch(error => {
        showToastMessage(strings.error, error.Error);
      });
  }, []);

  useEffect(() => {
    if (professionalListResponse?.length === 0) {
      showBtnStyle(true);
      setProfessionalAvailable(false);
    } else {
      showBtnStyle(false);
      setProfessionalAvailable(true);
    }
  }, [professionalListResponse]);

  const getProfessionals = (id: number) => {
    setIsGetAPIInProgress(true);
    const projectData = {
      projectTypeId: 0,
      projectId: id,
    };

    pCallSearchProfessionals(projectData)
      .then((res: any) => {
        if (res.Success) {
          setIsGetAPIInProgress(false);
          const allLocation: string[] = [];
          const locationsId: string[] = [];
          let dropDownData;
          let locationAsString;
          setProfessionalListResponse(res?.Data?.ProfessionalModel);
          res?.Data?.ProfessionalModel.length !== 0
            ? setToggleNoProfessionalModal(false)
            : setToggleNoProfessionalModal(true);
          if (res?.Data?.ProjectInvitationTypeId > 1) {
            if (res?.Data?.ProjectInvitationTypeId === 1) {
              setIsProjectSelected(false);
            } else {
              setIsProjectSelected(true);
            }
          }
          setProfessionalId(res?.Data?.ProfessionalId);
          for (let i = 0; i < res.Data.ProfessionalModel.length; ) {
            const country = res.Data.ProfessionalModel[i].StateName;
            const state = res.Data.ProfessionalModel[i].TwoLetterIsoCode;
            const stateId = res.Data.ProfessionalModel[i].StateProvinceId.toString();
            const countryId = res.Data.ProfessionalModel[i].CountryId.toString();
            dropDownData = country.concat(', ', state);
            allLocation.push(dropDownData);
            locationAsString = stateId.concat('_', countryId);
            locationsId.push(locationAsString);
            i += 1;
          }
          if (count === 0) {
            setLocationIdWithoutDuplicate(locationsId.filter((string, index) => locationsId.indexOf(string) === index));
            setCount(1);
          }
        }
      })
      .catch((error: {message: string}) => {
        setIsGetAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };

  /**
   * Get Project Type.
   */
  const getProjectType = (id: number) => {
    pCallGetProjectTypeDetails(id)
      .then(res => {
        setProjectProfessionalsType(res.Data.ProjectType);
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };

  /**
   * Called when select assign project.
   */
  const onSelectAssignProject = () => {
    setIsProjectSelected(true);
    setIsQuoteSelected(false);
    setInviteBitStatus(false);
    if (professionalId === 0) {
      setBtnDisabled(true);
    }
  };

  /**
   * Called when user select professional from assign Bid.
   * @param id contain professionals id.
   */
  const onSelectProfessional = (id: number) => {
    if (toggle) {
      setToggle(!toggle);
    }
    setProfessionalId(id);
    setBtnDisabled(false);
  };

  /**
   * On Next click
   */
  const onNext = () => {
    setIsUpdateAPIInProgress(true);
    const allProfessionalsId: number[] = [];
    if (inviteBitActive) {
      for (let i = 0; i < professionalListResponse?.length; ) {
        allProfessionalsId.push(professionalListResponse[i].Id);
        i += 1;
      }
    } else {
      allProfessionalsId.push(professionalId);
    }
    const professionalData = {
      projectId,
      projectInvitationTypeId: isProjectSelected ? 2 : 1,
      Ids: allProfessionalsId,
    };
    if (professionalListResponse?.length !== 0) {
      pCallUpdateProfessional(professionalData)
        .then(res => {
          if (res.Success) {
            setIsUpdateAPIInProgress(false);
            props?.onChange(2, projectId, locationId);
          } else {
            setIsUpdateAPIInProgress(false);
          }
        })
        .catch(error => {
          setIsUpdateAPIInProgress(false);
          showToastMessage(strings.error, error.message);
        });
    }
  };

  const changeToggleValue = () => {
    setToggle(!toggle);
  };

  const toggleModal = async (res: any) => {
    await setData(res);
    changeToggleValue();
  };

  /**
   * Toggle action
   */
  const toggleSwitch = () => {
    if (!isProjectSelected) {
      onSelectAssignProject();
    } else {
      setIsProjectSelected(false);
      setIsQuoteSelected(true);
    }
  };

  /**
   * Render Toggle view
   */
  const getToggleView = () => (
    <EmptyContainer>
      <ProfessionalListText>
        {inviteBitActive ? strings.inviteProfessionals : strings.assignProjectDirectly}
      </ProfessionalListText>
      <ProfessionalsText>
        {inviteBitActive ? strings.selectProfessionals : strings.pleaseAssignTheProject}
      </ProfessionalsText>
      <ToggleView>
        <RadioExtraView>
          <RadioButtonText>{strings.requestQuotes}</RadioButtonText>
        </RadioExtraView>
        <Popable content={strings.quoteTootTip}>
          <Ionicons name="information-circle-outline" style={styles.budgetInfoIcon} />
        </Popable>
        <ToggleContainer>
          <Switch
            trackColor={{false: colors.Dusty_Gray, true: colors.infoTooltip}}
            thumbColor={isQuoteSelected ? colors.primaryThemeColor : colors.wild_Sand}
            ios_backgroundColor={colors.Dusty_Gray}
            onValueChange={toggleSwitch}
            value={isQuoteSelected}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
          />
        </ToggleContainer>
      </ToggleView>
      <ToggleView>
        <RadioExtraView>
          <RadioButtonText>{strings.chooseYourPro}</RadioButtonText>
        </RadioExtraView>
        <Popable content={strings.projectToolTip}>
          <Ionicons name="information-circle-outline" style={styles.budgetInfoIcon} />
        </Popable>
        <ToggleContainer>
          <Switch
            trackColor={{false: colors.Dusty_Gray, true: colors.infoTooltip}}
            thumbColor={isProjectSelected ? colors.primaryThemeColor : colors.wild_Sand}
            ios_backgroundColor={colors.Dusty_Gray}
            onValueChange={toggleSwitch}
            value={isProjectSelected}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
          />
        </ToggleContainer>
      </ToggleView>
    </EmptyContainer>
  );

  return (
    <ControlContainer>
      <ProfessionalModel
        changeToggleValue={changeToggleValue}
        toggle={toggle}
        data={data}
        inviteBitActive={inviteBitActive}
        onSelectProfessional={onSelectProfessional}
      />
      <MainWrapper>
        <TopContainer>
          {professionalListResponse?.length !== 0 ? (
            getToggleView()
          ) : (
            <BottomContainer>
              <Modal
                animationType="slide"
                transparent={true}
                visible={toggleNoProfessionalModal && !isUpdateAPIInProgress}
                style={styles.noProfessionalFoundView}>
                <SupportAreaView>
                  <SupportArea>{localStrings.supportArea}</SupportArea>
                  <SubmitButtonWithBorder
                    onPress={() => {
                      setToggleNoProfessionalModal(false);
                      props?.onChange(0, projectId, locationId);
                    }}>
                    <ButtonText2>{localStrings.close}</ButtonText2>
                  </SubmitButtonWithBorder>
                </SupportAreaView>
              </Modal>
            </BottomContainer>
          )}
          {professionalListResponse?.length !== 0 && (
            <ProfessionalListView>
              <ProfessionalListText>{strings.professionalList}</ProfessionalListText>
            </ProfessionalListView>
          )}
          {isGetAPIInProgress && <ActivityIndicator size="small" color={colors.primaryThemeColor} />}
          {professionalListResponse?.map((res: any, idx: number) => (
            <ListContainerView key={idx}>
              <CompanyCardView>
                {!inviteBitActive && (
                  <CheckBoxContainer>
                    <TouchableOpacity
                      testID={strings.selectProject}
                      onPress={() => {
                        onSelectProfessional(res.Id);
                      }}>
                      {professionalId === res.Id ? <OrangeRadio /> : <NotSelectedRadio />}
                    </TouchableOpacity>
                  </CheckBoxContainer>
                )}
                <ToggleWrapper
                  testID={strings.toggleButton}
                  onPress={() => {
                    toggleModal(res);
                  }}>
                  <LogoImage
                    style={styles.companyLogo}
                    source={res.CompanyLogo ? {uri: res.CompanyLogo} : pngImages.defaultCompanyLogo}
                  />
                </ToggleWrapper>
                <CompanyDetails>
                  <DetailsText numberOfLines={1}>{companyName}</DetailsText>
                  <ValueText numberOfLines={1}>{res.Company}</ValueText>
                </CompanyDetails>
                <BadgeContainer>
                  <Badge />
                </BadgeContainer>
              </CompanyCardView>
              <SpaceInList marginTop={1} />
              <ListCheckView>
                <BottomCardContainer>
                  <ToggleWrapper
                    testID={strings.toggleResponseButton}
                    onPress={() => {
                      toggleModal(res);
                    }}>
                    <DetailsText numberOfLines={1}>{localStrings.contact}</DetailsText>
                    <ProName numberOfLines={1} ellipsizeMode="tail">
                      {res.FullName}
                    </ProName>
                  </ToggleWrapper>
                </BottomCardContainer>
                <BottomCardContainer>
                  <DetailsText numberOfLines={1}>{specialist}</DetailsText>
                  <DetailsTitle>{projectProfessionalsType}</DetailsTitle>
                </BottomCardContainer>
              </ListCheckView>
              <ListCheckView marginBottom={20}>
                <FullWidthBottomCardContainer>
                  <FullWidthDetailsText numberOfLines={1}>{strings.location}</FullWidthDetailsText>
                  <FullWidthDetailsTitle>{`${res.City}, ${res.StateName}`}</FullWidthDetailsTitle>
                </FullWidthBottomCardContainer>
              </ListCheckView>
            </ListContainerView>
          ))}
        </TopContainer>
        {isProfessionalAvailable && (
          <BottomContainer>
            <ButtonsContainer>
              <ButtonSubContainer>
                <SkipBtnView
                  testID={strings.removeDocBtn}
                  onPress={() => {
                    props?.onChange(0, projectId, locationId);
                  }}>
                  <ContactTextList>{strings.previous}</ContactTextList>
                </SkipBtnView>
              </ButtonSubContainer>
              <ButtonSubContainer>
                <NextBtnView
                  testID={strings.nextButton}
                  selected={(!btnDisabled || inviteBitActive) && isProfessionalAvailable}
                  disabled={(btnDisabled && !inviteBitActive) || !isProfessionalAvailable}
                  onPress={onNext}>
                  {isUpdateAPIInProgress ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <NextText>{strings.next}</NextText>
                  )}
                </NextBtnView>
              </ButtonSubContainer>
            </ButtonsContainer>
          </BottomContainer>
        )}
      </MainWrapper>
    </ControlContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callSearchProfessionals,
  callUpdateProfessional,
  callGetProjectTypeDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalView);
