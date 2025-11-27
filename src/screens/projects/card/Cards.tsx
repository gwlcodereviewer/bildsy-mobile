import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, LogBox, Modal, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {connect} from 'react-redux';
import {localStrings} from '../../../localization/localStrings';
import {callArchiveAPI, callMarkComplete} from '../../../redux/actions/auth';
import colors from '../../../style/colors';
import styles from '../../../style/style';
import {makeCall, showToastMessage} from '../../../utils';

import MoreIcon from '../../../assets/svg/MoreIcon';
import {strings} from '../../../constants/strings';
import {
  BID_STATUS_BID_PENDING,
  complaintRedirectOption,
  projectPickerOptions,
  PROJECT_STATUS_ARCHIVED,
  PROJECT_STATUS_AWARDED,
  PROJECT_STATUS_BIDDING,
  PROJECT_STATUS_COMPLETED,
  PROJECT_STATUS_DRAFT,
  PROJECT_STATUS_UN_FULL_FILLED,
} from '../../../constants/utils/constantData';
import {PROJECT_DATA} from '../../../helpers/constants';
import {NAV_ADD_REVIEW_SCREEN, NAV_INFO_TABS} from '../../../navigation/navConstants';
import {IStore} from '../../../redux/types';
import {CallButton} from '../../../style';
import {
  AwardContainer,
  AwardSubView,
  BidTag,
  BidTagText,
  BlackText,
  BudgetContainer,
  CallText,
  CancelText,
  CardBottomContainer,
  CardTop,
  CenterSubView,
  CompletedText,
  DateContainer,
  GrayText,
  OptionString,
  ProjectId,
  ProjectLocation,
  ProjectName,
  TextContainer,
  TopRow,
  TransparentView,
  ViewContainer,
  ViewMain,
} from '../styled';

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
interface Props {
  callMarkComplete: (param: number) => Promise<any>;
  callArchiveAPI: (param: number) => Promise<any>;
}

const Cards = (props: any) => {
  const actionSheet = useRef<any>();
  const {
    markComplete,
    cancel,
    yes,
    project,
    projectType,
    budget,
    expectedStartDate2,
    dueDate,
    location,
    questionModel,
    markArchive,
    archiveModel,
    archiveButton,
    archive,
    call,
  } = localStrings;
  const {toggleMenuButton, makeCallButton, success, toggleButton, completeButton, archiveToggleButton} = strings;
  const {item, navigation, callMarkComplete: _callMarkComplete, callArchiveAPI: _callArchiveAPI, updateApi} = props;
  const {CountryName, StateProvinceName} = item?.Address;
  const [isMarkAPIInProgress, setIsMarkAPIInProgress] = useState<boolean>(false);
  const draft = item.ProjectStatus === localStrings.draft;
  const bidding = item.ProjectStatus === localStrings.bidding;
  const [toggle, setToggle] = useState(false);
  const [toggleArchive, setArchiveToggle] = useState(false);

  const newDate = item.ExpectedCompleteDateUTC.split('T')[0];
  let monthVal;
  const myArr = newDate.split('-');
  if (myArr[1].startsWith('0')) {
    const numberString = myArr[1].charAt(myArr[1].length - 1);
    const numInt = Number(numberString);
    monthVal = month[numInt];
  } else {
    const numInt2 = Number(myArr[1]);
    monthVal = month[numInt2];
  }
  const newDateString = moment(item.ExpectedCompleteDateUTC).format('LL');
  const startDate = item.ExpectedStartDateUTC.split('T')[0];
  const newStartDateString = moment(startDate).format('LL');
  const {ProjectStatusId} = item;
  let color;
  let statusColor;
  if (
    ProjectStatusId === 40 ||
    ProjectStatusId === PROJECT_STATUS_DRAFT ||
    ProjectStatusId === PROJECT_STATUS_BIDDING ||
    ProjectStatusId === PROJECT_STATUS_ARCHIVED
  ) {
    color = colors.lightYellow;
    statusColor = colors.darkYellow;
  } else if (ProjectStatusId === PROJECT_STATUS_UN_FULL_FILLED) {
    color = colors.athens_Gray;
    statusColor = colors.darkGrey;
  } else if (ProjectStatusId === PROJECT_STATUS_AWARDED || ProjectStatusId === PROJECT_STATUS_COMPLETED) {
    color = colors.lightGreen;
    statusColor = colors.darkGreen;
  } else {
    color = colors.lightPink;
    statusColor = colors.redPink;
  }

  const onSelectProject = async (projectId: number, statusName: string, statusId: number) => {
    const projectDate = {
      id: projectId,
      projectStatus: statusName,
    };
    await AsyncStorage.setItem(PROJECT_DATA.setProjectData, JSON.stringify(projectDate))
      .then(() => {
        navigation.navigate(NAV_INFO_TABS, {
          id: projectId,
          projectStatus: statusId,
          status: statusId,
          addComplaint: false,
          showComplaintsTab: item.IsComplaintVisible,
        });
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };

  const onMarkComplete = (projectId: number) => {
    setIsMarkAPIInProgress(true);
    _callMarkComplete(projectId)
      .then((res: {Success: boolean; Message: string}) => {
        if (res.Success) {
          setIsMarkAPIInProgress(false);
          showToastMessage(success, res.Message);
          setToggle(false);
          updateApi(item);
        }
      })
      .catch((error: {message: string}) => {
        setIsMarkAPIInProgress(false);
        showToastMessage(strings.error, error.message);
        setToggle(false);
      });
  };

  const onArchiveAPI = (projectId: number) => {
    setIsMarkAPIInProgress(true);
    _callArchiveAPI(projectId)
      .then((res: {Success: boolean; Message: string}) => {
        if (res.Success) {
          item.IsArchived = true;
          setIsMarkAPIInProgress(false);
          showToastMessage(success, res.Message);
          setArchiveToggle(false);
          updateApi(item);
        }
      })
      .catch((error: {message: string}) => {
        setIsMarkAPIInProgress(false);
        showToastMessage(strings.error, error.message);
        setToggle(false);
      });
  };

  const showActionSheet = () => {
    actionSheet?.current?.show();
  };

  const onPressOnActionSheet = (index: number) => {
    if (index === 0) {
      if (item.IsComplaintVisible) {
        navigation.navigate(NAV_INFO_TABS, {
          addComplaint: true,
          id: item.Id,
          projectStatus: item.ProjectActualStatus,
          showComplaintsTab: item.IsComplaintVisible,
        });
      } else {
        setArchiveToggle(true);
      }
    }
  };

  const ShowModel = () => (
    <Modal transparent={true} visible={toggle}>
      <TransparentView>
        <ViewContainer>
          <ViewMain>
            <TextContainer>{markComplete}</TextContainer>
            <OptionString>{questionModel}</OptionString>
          </ViewMain>
          <AwardContainer>
            <AwardSubView testID={toggleButton} color={colors.white} onPress={() => setToggle(false)}>
              <CenterSubView>
                <CancelText>{cancel}</CancelText>
              </CenterSubView>
            </AwardSubView>
            <AwardSubView testID={completeButton} color={colors.primaryBlue} onPress={() => onMarkComplete(item.Id)}>
              <CompletedText color={colors.white}>
                {!isMarkAPIInProgress ? markComplete : ''}
                {isMarkAPIInProgress && <ActivityIndicator size="small" color={colors.white} />}
              </CompletedText>
            </AwardSubView>
          </AwardContainer>
        </ViewContainer>
      </TransparentView>
    </Modal>
  );

  const ShowArchiveModel = () => (
    <Modal transparent={true} visible={toggleArchive}>
      <TransparentView>
        <ViewContainer>
          <ViewMain>
            <TextContainer>{markArchive}</TextContainer>
            <OptionString>{archiveModel}</OptionString>
          </ViewMain>
          <AwardContainer>
            <AwardSubView testID={archiveToggleButton} color={colors.white} onPress={() => setArchiveToggle(false)}>
              <CenterSubView>
                <CancelText>{cancel}</CancelText>
              </CenterSubView>
            </AwardSubView>
            <AwardSubView testID={archiveButton} color={colors.primaryBlue} onPress={() => onArchiveAPI(item.Id)}>
              <CompletedText color={colors.white}>
                {!isMarkAPIInProgress && archive}
                {isMarkAPIInProgress && <ActivityIndicator size="small" color={colors.white} />}
              </CompletedText>
            </AwardSubView>
          </AwardContainer>
        </ViewContainer>
      </TransparentView>
    </Modal>
  );

  return (
    <>
      <ShowModel />
      <ShowArchiveModel />
      <View style={styles.projectCard}>
        <CardTop>
          <TopRow>
            <BidTag color={color}>
              <BidTagText statusColor={statusColor}>
                {ProjectStatusId === BID_STATUS_BID_PENDING ? 'Bidding' : item.ProjectStatus}
              </BidTagText>
            </BidTag>
            {((!item.IsArchived && item.IsActiveArchived && item.ProjectStatusId !== 20) ||
              item.IsComplaintVisible) && (
              <TouchableOpacity
                onPress={() => {
                  showActionSheet();
                }}>
                <MoreIcon />
              </TouchableOpacity>
            )}
          </TopRow>
          <TouchableOpacity
            testID={project}
            onPress={() => onSelectProject(item.Id, item.ProjectStatus, item.ProjectStatusId)}>
            <ProjectName>{item.Name}</ProjectName>
            <ProjectId>{`${projectType}: ${item.ProjectType}`}</ProjectId>
            <ProjectLocation>{`${location} ${StateProvinceName}, ${CountryName}`}</ProjectLocation>
            <CardBottomContainer>
              <BudgetContainer>
                <GrayText>{budget}</GrayText>
                <BlackText>{item.Budget}</BlackText>
              </BudgetContainer>
              <DateContainer>
                <GrayText>{draft || bidding ? expectedStartDate2 : dueDate}</GrayText>
                <BlackText>{draft || bidding ? newStartDateString : newDateString}</BlackText>
              </DateContainer>
            </CardBottomContainer>
          </TouchableOpacity>
        </CardTop>
        {item.ProjectStatusId === 20 && item.IsComplaintVisible && (
          <AwardContainer>
            <AwardSubView color={colors.white}>
              <CenterSubView>
                <CallButton
                  selected={item.ProfessionalPhone !== null}
                  disabled={item?.ProfessionalPhone === null}
                  testID={makeCallButton}
                  onPress={() => makeCall(item?.ProfessionalPhone)}>
                  <CallText>{call}</CallText>
                </CallButton>
              </CenterSubView>
            </AwardSubView>
            <AwardSubView testID={toggleMenuButton} color={colors.primaryBlue} onPress={() => setToggle(true)}>
              <CompletedText color={colors.white}>{markComplete}</CompletedText>
            </AwardSubView>
          </AwardContainer>
        )}
        <ActionSheet
          ref={actionSheet}
          options={item.IsComplaintVisible ? complaintRedirectOption : projectPickerOptions}
          cancelButtonIndex={1}
          destructiveButtonIndex={1}
          onPress={(index: number) => {
            onPressOnActionSheet(index);
          }}
        />
      </View>
    </>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});

const mapDispatchToProps = {
  callMarkComplete,
  callArchiveAPI,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
