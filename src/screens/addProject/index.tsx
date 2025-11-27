import React, {useState, useEffect} from 'react';
import {BackHandler, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddProjectView from './projectDetail/index';
import ProfessionalView from './professionals/index';
import ConfirmView from './confirm/index';
import {strings} from '../../constants/strings';
import {showToastMessage} from '../../utils';
import {
  Container,
  Header,
  NormalText,
  ControlContainer,
  ProgressBarLineView,
  RoundButtonNormal,
  SpaceBetweenText,
  ProgressBarContainer,
  ProjectDetail,
  Professionals,
  Confirm,
  ProgressBarTxtContainer,
  LogoImage,
  BackButtonContainer,
  ProgressLine,
  RoundButtonGrey,
  RoundButtonBlue,
  ProgressLineBlue,
  HeaderContainer,
} from './styled';
import {INavigation} from '../../types';
import {NAV_DASHBOARD_SCREEN} from '../../navigation/navConstants';
import styles from '../../style/style';
import {PROJECT_DATA} from '../../helpers/constants';
import {dummyFileDataProps, dummyProfessionalListResponse} from '../../../jest/dummyData';
import BackIcon from '../../assets/svg/BackIcon';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
}

interface IAddProjectInfo {
  projectId: number;
  locationId: number;
}

const AddProject: React.FC<Props> = (props: Props) => {
  const {route} = props;
  const [pager, setPager] = useState<number>(0);
  const projectId = route?.params?.id;
  const [pageChange, setPageChange] = useState<boolean>(false);
  const [addProjectData, setAddProjectData] = useState<IAddProjectInfo>({
    projectId: 0,
    locationId: 0,
  });
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [screenTitle, setScreenTitle] = useState<string>(strings.addProject);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (projectId > 0) {
      if (route?.params.status === 50) {
        setScreenTitle(strings.addProject);
      } else {
        setScreenTitle(strings.editProject);
      }
      onChangePager(0, 0, 0);
    } else {
      AsyncStorage.removeItem(PROJECT_DATA.setProjectData)
        .then(() => {
          setScreenTitle(strings.addProject);
          onChangePager(0, 0, 0);
        })
        .catch(error => {
          showToastMessage(strings.error, error.message);
        });
    }
  }, [route?.params?.pager]);

  const onChangePager = (pagerNumber: number, id: number, locationId: number) => {
    setAddProjectData({projectId: id, locationId});
    setPager(pagerNumber);
    setPageChange(false);
  };

  const showBtnStyle = (show: boolean) => {
    setShowBtn(show);
  };

  const handlePage = () => {
    if (pager === 0) {
      return <AddProjectView fileDataProps={[]} onChange={onChangePager} pageChange={pageChange} {...props} />;
    }
    if (pager === 1) {
      return (
        <ProfessionalView
          professionalListResponseProps={[]}
          onChange={onChangePager}
          pageChange={pageChange}
          {...props}
          showBtnStyle={showBtnStyle}
        />
      );
    }
    return (
      <ConfirmView fileDataProps={dummyFileDataProps} onChange={onChangePager} pageChange={pageChange} {...props} />
    );
  };

  const handleBar = () => {
    if (pager === 0) {
      return (
        <ProgressBarContainer>
          <ProgressBarLineView>
            <RoundButtonGrey />
            <ProgressLine />
            <RoundButtonNormal />
            <ProgressLine />
            <RoundButtonNormal />
          </ProgressBarLineView>
          <ProgressBarTxtContainer>
            <ProjectDetail>{strings.projectDetails}</ProjectDetail>
            <Professionals>{strings.professionals}</Professionals>
            <Confirm>{strings.confirm}</Confirm>
          </ProgressBarTxtContainer>
        </ProgressBarContainer>
      );
    }
    if (pager === 1) {
      return (
        <ProgressBarContainer>
          <ProgressBarLineView>
            <RoundButtonBlue />
            <ProgressLineBlue />
            <RoundButtonGrey />
            <ProgressLine />
            <RoundButtonNormal />
          </ProgressBarLineView>
          <ProgressBarTxtContainer>
            <ProjectDetail>{strings.projectDetails}</ProjectDetail>
            <Professionals>{strings.professionals}</Professionals>
            <Confirm>{strings.confirm}</Confirm>
          </ProgressBarTxtContainer>
        </ProgressBarContainer>
      );
    }
    return (
      <>
        <ProgressBarContainer>
          <ProgressBarLineView>
            <RoundButtonBlue />
            <ProgressLineBlue />
            <RoundButtonBlue />
            <ProgressLineBlue />
            <RoundButtonGrey />
          </ProgressBarLineView>
          <ProgressBarTxtContainer>
            <ProjectDetail>{strings.projectDetails}</ProjectDetail>
            <Professionals>{strings.professionals}</Professionals>
            <Confirm>{strings.confirm}</Confirm>
          </ProgressBarTxtContainer>
        </ProgressBarContainer>
      </>
    );
  };

  const onPressPrevious = () => {
    if (pager === 0) {
      setPageChange(true);
      props.navigation?.navigate(NAV_DASHBOARD_SCREEN);
    } else if (route?.params.status === 20) {
      setPageChange(true);
      setPager(0);
    } else {
      setPageChange(true);
      setPager(pager - 1);
    }
  };
  return (
    <Container source={require('../../assets/images/combined_shape.png')} resizeMode="cover">
      <Header>
        <BackButtonContainer>
          <TouchableOpacity testID={strings.backIconBtn} onPress={() => onPressPrevious()}>
            <BackIcon />
          </TouchableOpacity>
        </BackButtonContainer>
        <NormalText>{screenTitle}</NormalText>
      </Header>
      <ControlContainer>
        <HeaderContainer>{handleBar()}</HeaderContainer>
        <ScrollView contentContainerStyle={pager === 1 && showBtn ? styles.addProjectScrollView : {}}>
          {handlePage()}
        </ScrollView>
        <SpaceBetweenText />
      </ControlContainer>
    </Container>
  );
};
export default AddProject;
