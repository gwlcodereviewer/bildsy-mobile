import {ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IStore} from '../../redux/types';
import Bids from './bid/bids';
import pngImages from '../../assets/images/pngImages';
import {
  MenuElement,
  ProjectContainer,
  BottomContainer,
  Menu,
  MenuText,
  MainLoaderContainer,
  PageTitleContainer2,
  EditTouch,
  ProjectTitleSubContainer,
  Divider,
  Hr,
} from './styled';
import {IGetConfiguration, INavigation} from '../../types';
import {PageTitle} from '../../style';
import {localStrings} from '../../localization/localStrings';
import styles from '../../style/style';
import colors from '../../style/colors';
import BackIcon from '../../assets/svg/BackIcon';
import {NAV_DRAWER_SCREEN, NAV_ADD_PROJECT} from '../../navigation/navConstants';
import EditIcon from '../../assets/svg/EditIcon';
import Info from './info/info';
import ComplaintsList from './complaintsList/complaintsList';
import ChatDialogList from './chatDialog/index';
import {initChat, disconnect} from '../chat/QBUtils';
import {ASYNC_CONST} from '../../helpers/constants';
import {
  PROJECT_STATUS_AWARDED,
  BID_STATUS_BID_PLACED,
  PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO,
  PROJECT_STATUS_COMPLETED,
  PUSH_TYPE_PROJECT_REVIEW,
} from '../../constants/utils/constantData';
import {dummyComplaintListResponse} from '../../../jest/dummyData';
import Reviews from './reviews';

const {info, bids, complaint, chats, reviews} = localStrings;

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  getQBConfigResponse: IGetConfiguration | undefined;
}

const InfoTabs: React.FC<Props> = (props: Props) => {
  const {navigation, route, getQBConfigResponse} = props;
  const projectId = route?.params?.id;
  const showComplaintTab = route?.params?.showComplaintsTab;
  const openCreateComplaint = route?.params?.createComplaint;
  const projectStatus = route?.params?.projectStatus;
  let addComplaint = route?.params?.addComplaint;
  const [isAPIInProgress, setAPIInProgress] = useState<boolean>(false);
  const [select, setSelect] = useState<string>(info);
  const [addComplaintState, setAddComplaintState] = useState<boolean>(addComplaint);

  const handlePage = () => {
    if (select === info) {
      return <Info ProjectProfessionalsResponse={[]} attachmentDataResponse={[]} id={projectId} {...props} />;
    }
    if (select === bids) {
      return <Bids id={projectId} status={projectStatus} {...props} />;
    }
    if (select === complaint) {
      return (
        <ComplaintsList
          complaintListResponse={[]}
          id={projectId}
          status={projectStatus}
          addComplaint={addComplaintState}
          {...props}
        />
      );
    }
    if (select === chats) {
      return <ChatDialogList id={projectId} status={projectStatus} {...props} />;
    }
    if (select === reviews) {
      return <Reviews id={projectId} {...props} />;
    }
    return <Bids id={projectId} status={projectStatus} {...props} />;
  };

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_CONST.qbLogin)
      .then(qbLogin => {
        const returnString = qbLogin as string;
        initChat(returnString, 'quickblox', getQBConfigResponse?.Data, () => {});
      })
      .catch(error => {});
  }, [getQBConfigResponse]);

  useEffect(() => {
    const {EntityType} = route?.params;
    setSelect(openCreateComplaint ? complaint : info);
    setTimeout(() => {
      if (EntityType) {
        if (EntityType === BID_STATUS_BID_PLACED) {
          setSelect(bids);
        }
        if (EntityType === PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO) {
          setSelect(complaint);
        }
        if (EntityType === PUSH_TYPE_PROJECT_REVIEW) {
          setSelect(reviews);
        }
      } else if (addComplaint) {
        setSelect(complaint);
      } else {
        setSelect(openCreateComplaint ? complaint : info);
      }
    }, 100);
  }, [route]);
  const PageHeaderContainer = () => (
    <PageTitleContainer2>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate(NAV_DRAWER_SCREEN, {isFocusedOnDashboard: true});
        }}>
        <BackIcon />
      </TouchableOpacity>
      <ProjectTitleSubContainer>
        <PageTitle>{localStrings.projects}</PageTitle>
        {projectStatus !== 80 && projectStatus !== 10 && !showComplaintTab && (
          <EditTouch
            onPress={() => navigation?.navigate(NAV_ADD_PROJECT, {pager: 0, id: projectId, status: projectStatus})}>
            <EditIcon />
          </EditTouch>
        )}
      </ProjectTitleSubContainer>
    </PageTitleContainer2>
  );

  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <BottomContainer>
        <>
          <Menu>
            <ScrollView horizontal={true} style={styles.scrollMenu}>
              <MenuElement
                onPress={async () => {
                  await setSelect(info);
                }}
                select={select}
                title={info}>
                <MenuText select={select} title={info}>
                  {info}
                </MenuText>
              </MenuElement>
              <Divider source={pngImages.dividerMenu} />
              <MenuElement
                onPress={async () => {
                  await setSelect(bids);
                }}
                select={select}
                title={bids}>
                <MenuText select={select} title={bids}>
                  {bids}
                </MenuText>
              </MenuElement>
              {projectStatus === PROJECT_STATUS_AWARDED && showComplaintTab && (
                <>
                  <Divider source={pngImages.dividerMenu} />
                  <MenuElement
                    onPress={async () => {
                      addComplaint = false;
                      await setAddComplaintState(false);
                      await setSelect(complaint);
                    }}
                    select={select}
                    title={complaint}>
                    <MenuText select={select} title={complaint}>
                      {complaint}
                    </MenuText>
                  </MenuElement>
                </>
              )}
              <Divider source={pngImages.dividerMenu} />
              <MenuElement
                onPress={async () => {
                  await setSelect(chats);
                }}
                select={select}
                title={chats}>
                <MenuText select={select} title={chats}>
                  {chats}
                </MenuText>
              </MenuElement>
              <Divider source={pngImages.dividerMenu} />
              {projectStatus === PROJECT_STATUS_COMPLETED && (
                <MenuElement
                  onPress={async () => {
                    await setSelect(reviews);
                  }}
                  select={select}
                  title={reviews}>
                  <MenuText select={select} title={reviews}>
                    {reviews}
                  </MenuText>
                </MenuElement>
              )}
            </ScrollView>
            <Hr />
          </Menu>
          {isAPIInProgress && (
            <MainLoaderContainer>
              <ActivityIndicator size="large" color={colors.midnight} style={styles.activityIndicator} />
            </MainLoaderContainer>
          )}
          <>{handlePage()}</>
        </>
      </BottomContainer>
    </ProjectContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
  getQBConfigResponse: store?.qbConfigKey?.payload,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(InfoTabs);
