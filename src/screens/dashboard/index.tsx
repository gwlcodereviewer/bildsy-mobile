/* eslint-disable import/no-unresolved */
import {TouchableOpacity, Dimensions, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import QB from 'quickblox-react-native-sdk';
import {
  BottomContainer,
  CreateProjectContainer,
  CreateProjectText,
  DashBoardContainer,
  FirstProjectText,
  IllustrationImage,
  ImageContainerRight,
  RecentArticlePanel,
  RecentArticleText,
  TextContainer,
  ViewAllText,
  MainContainer,
  ProjectName,
  ProjectListCardMainContainer,
  ProjectDetails,
  TextWrapper,
  ProjectMainContainer,
  ListContainer,
  BlogView,
} from './styled';
import {strings} from '../../constants/strings';
import CarousalList from './CarouselList';
import AdvertiseList from './advertiseList';
import {IStore} from '../../redux/types';
import DrawerIcon from '../../assets/svg/drawer/DrawerIcon';
import {
  PageTitleContainer,
  PageTitle,
  SubmitButton,
  ButtonText,
  EmptyViewContainer,
  BidTag,
  BidTagText,
} from '../../style';
import {INavigation, DashboardProjectListDataType, IGetConfiguration, IUserRoot} from '../../types';
import {localStrings} from '../../localization/localStrings';
import {
  NAV_ADD_PROJECT,
  NAV_PROJECTS_SCREEN,
  NAV_INFO_TABS,
  NAV_BLOGS_SCREEN,
  NAV_BLOG_DETAILS,
  NAV_COMPLAINTS_DETAILS,
  NAV_BIDS_DETAIL,
  NAV_DASHBOARD_SCREEN,
  NAV_CHANGE_PASSWORD,
  NAV_CHAT_MESSAGE,
  NAV_LOGIN,
} from '../../navigation/navConstants';
import {ASYNC_CONST, PROJECT_DATA} from '../../helpers/constants';
import pngImages from '../../assets/images/pngImages';
import {rh} from '../../style/Dimen';
import {
  callProjectActivity,
  callGetConfigurationKeyAPI,
  callGetProjectUsersAPI,
  callSignOutAPI,
} from '../../redux/actions/auth';
import colors from '../../style/colors';
import {fcmService} from '../../push-notification/FCMService';
import {localNotificationService} from '../../push-notification/LocalNotificationService';
import {initChat} from '../chat/QBUtils';
import {
  PUSH_TYPE_BID_REJECTED,
  PUSH_TYPE_BID_DECLINED,
  PUSH_TYPE_BID_PLACED,
  PUSH_TYPE_BLOG_PUBLISHED,
  PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO,
  PUSH_TYPE_DRAFT,
  PUSH_TYPE_PROJECT_REVIEW,
  PROJECT_STATUS_COMPLETED,
} from '../../constants/utils/constantData';
import {clearUserData, isIOS} from '../../utils';

interface Props {
  navigation?: INavigation;
  callProjectActivity: () => Promise<any>;
  callGetConfigurationKeyAPI: () => Promise<any>;
  onChange?: (pager: number, projectId: number, locationId: number) => void;
  isFocusedOnDashboard?: boolean;
  getQBConfigResponse: IGetConfiguration | undefined;
  route?: INavigation;
  callGetProjectUsersAPI: (param: number) => Promise<IUserRoot>;
  callSignOutAPI: () => Promise<any>;
}
const myGlobal: any = global;
myGlobal.uniqueID = 1;

const DashBoardScreen: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    callProjectActivity: _callProjectActivity,
    route,
    getQBConfigResponse,
    callSignOutAPI: pCallSignOutAPI,
  } = props;

  const {dashboard, firstProjectText, projectNow} = localStrings;
  const sliderWidth = Dimensions.get('window').width;
  const [projectList, setProjectList] = useState<DashboardProjectListDataType[]>([]);
  const [isGetProjectAPIInProgress, setGetProjectAPIInProgress] = useState<boolean>(true);
  const onNotification = (notify: any) => {
    const option = {
      soundName: 'default',
      playSound: true,
    };
    if (notify.data && !notify.notification) {
      const title = notify.data && notify.data.title !== undefined ? notify.data.title : notify.data.message;
      localNotificationService.showNotification(0, title, notify.data.message, notify.data, option);
    } else {
      const title =
        notify && notify.notification && notify.notification.title !== undefined ? notify.notification.title : '';
      localNotificationService.showNotification(myGlobal.uniqueID, title, notify.notification.body, notify, option);
      myGlobal.uniqueID += 1;
    }
  };
  const subscribeDeviceToken = (deviceToken: string) => {
    const config = {
      deviceToken,
    };
    QB.subscriptions
      .create(config)
      .then(async (subscriptions: any) => {
        await AsyncStorage.setItem(ASYNC_CONST.quickbloxSubscription, JSON.stringify(subscriptions[0]));
      })
      .catch(e => {
        console.log('subscriptions error', e);
      });
  };
  useEffect(() => {
    AsyncStorage.getItem(ASYNC_CONST.qbLogin)
      .then(qbLogin => {
        const returnString = qbLogin as string;
        initChat(returnString, 'quickblox', getQBConfigResponse?.Data, () => {
          if (isIOS()) {
            messaging()
              .getAPNSToken()
              .then((apnsToken: any) => {
                subscribeDeviceToken(apnsToken || myGlobal.deviceToken);
              });
          } else {
            subscribeDeviceToken(myGlobal.deviceToken);
          }
        });
      })
      .catch(() => {});
  }, [getQBConfigResponse]);

  const pushRedirection = (item: any) => {
    if (navigation && item) {
      const payload = JSON.parse(item);
      const EntityType = payload.entityType;
      const EntityId = payload.entityId;
      if (EntityType === PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO) {
        myGlobal.tab = NAV_BLOGS_SCREEN;
        navigation.navigate(NAV_COMPLAINTS_DETAILS, {id: EntityId, projectStatus: true, fromNotification: true});
      } else if (EntityType === PUSH_TYPE_BID_PLACED || EntityType === PUSH_TYPE_BID_DECLINED) {
        navigation.navigate(NAV_BIDS_DETAIL, {bidId: EntityId, fromNotification: true});
      } else if (EntityType === PUSH_TYPE_BLOG_PUBLISHED) {
        myGlobal.tab = NAV_BLOGS_SCREEN;
        setTimeout(() => {
          navigation.navigate(NAV_DASHBOARD_SCREEN, {params: {screenName: NAV_BLOGS_SCREEN}});
        }, 500);
      } else if (EntityType === PUSH_TYPE_DRAFT) {
        navigation.navigate(NAV_INFO_TABS, {id: EntityId, fromNotification: true});
      } else if (EntityType === PUSH_TYPE_PROJECT_REVIEW) {
        navigation.navigate(NAV_INFO_TABS, {
          id: EntityId,
          projectStatus: PROJECT_STATUS_COMPLETED,
          fromNotification: true,
          EntityType,
        });
      }
    }
  };
  const onOpenNotification = (notification: any) => {
    if (notification && notification.data && notification.data.data && notification.data.data.payload) {
      const item = notification.data.data.payload;
      if (navigation && item) {
        const payload = JSON.parse(item);
        const EntityType = payload.entityType;
        const EntityId = payload.entityId;
        if (EntityType === PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO) {
          myGlobal.tab = NAV_BLOGS_SCREEN;
          navigation.navigate(NAV_COMPLAINTS_DETAILS, {id: EntityId, projectStatus: true, fromNotification: true});
        } else if (EntityType === PUSH_TYPE_BID_PLACED || EntityType === PUSH_TYPE_BID_DECLINED) {
          navigation.navigate(NAV_BIDS_DETAIL, {bidId: EntityId, fromNotification: true});
        } else if (EntityType === PUSH_TYPE_BLOG_PUBLISHED) {
          myGlobal.tab = NAV_BLOGS_SCREEN;
          setTimeout(() => {
            navigation.navigate(NAV_DASHBOARD_SCREEN, {params: {screenName: NAV_BLOGS_SCREEN}});
          }, 500);
        } else if (EntityType === PUSH_TYPE_PROJECT_REVIEW) {
          navigation.navigate(NAV_INFO_TABS, {
            id: EntityId,
            projectStatus: PROJECT_STATUS_COMPLETED,
            fromNotification: true,
            EntityType,
          });
        }
      }
      pushRedirection(item);
    } else if (notification && notification.data) {
      const item = notification.data.payload;
      pushRedirection(item);
    } else if (notification && notification?.data && notification.data.user_id) {
      navigation?.navigate(NAV_CHAT_MESSAGE, {
        ProjectId: notification.data.ProjectId,
        ProfessionalId: notification.data.user_id,
      });
    } else if (notification && notification?.data && notification.data.ProfessionalId) {
      navigation?.navigate(NAV_CHAT_MESSAGE, {
        ProjectId: notification.data.ProjectId,
        ProfessionalId: notification.data.ProfessionalId,
      });
    } else if (notification && notification?.data && notification.data.key) {
      const key = JSON.parse(notification.data.key);
      navigation?.navigate(NAV_CHAT_MESSAGE, {
        id: key.id,
        name: key.name,
        data: key?.dataArray,
        QuickBloxUserId: key.QuickBloxUserId,
      });
    } else if (notification && notification.payload) {
      const item = notification.payload;
      if (navigation && item) {
        const payload = JSON.parse(item);
        const EntityType = payload.entityType;
        const EntityId = payload.entityId;
        if (EntityType === PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO) {
          navigation.navigate(NAV_COMPLAINTS_DETAILS, {id: EntityId, projectStatus: true, fromNotification: true});
        } else if (
          EntityType === PUSH_TYPE_BID_REJECTED ||
          EntityType === PUSH_TYPE_BID_PLACED ||
          EntityType === PUSH_TYPE_BID_DECLINED
        ) {
          navigation.navigate(NAV_BIDS_DETAIL, {bidId: EntityId, fromNotification: true});
        } else if (EntityType === PUSH_TYPE_BLOG_PUBLISHED) {
          myGlobal.tab = NAV_BLOGS_SCREEN;
          setTimeout(() => {
            navigation.navigate(NAV_DASHBOARD_SCREEN, {params: {screenName: NAV_BLOGS_SCREEN}});
          }, 500);
        }
      }
      pushRedirection(item);
    }
  };
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_CONST.invitedUser)
      .then(userStatus => {
        const userTypeStatus = JSON.parse(userStatus || '');
        if (userTypeStatus === true) {
          navigation?.navigate(NAV_CHANGE_PASSWORD);
        }
      })
      .catch(error => {});
  }, [props]);
  /**
   * function for calling sign-out API.
   */
  const signOut = () => {
    pCallSignOutAPI()
      .then(async (res: {Success: boolean}) => {
        if (res.Success) {
          clearUserData(() => {
            navigation?.reset({
              index: 0,
              routes: [{name: NAV_LOGIN}],
            });
          });
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    fcmService.fcmCallBack(onNotification, onOpenNotification);
    setGetProjectAPIInProgress(true);

    const unsubscribe = navigation?.addListener('focus', () => {
      _callProjectActivity()
        .then(res => {
          if (res.Success) {
            if (!res?.Data?.IsCustomerActive) {
              signOut();
            } else {
              setProjectList(res?.Data?.AllProjects);
              setGetProjectAPIInProgress(false);
              setRefreshing(false);
            }
          }
        })
        .catch(error => {
          setGetProjectAPIInProgress(false);
          setRefreshing(false);
        });
      props.callGetConfigurationKeyAPI();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [route, myGlobal.tab]);

  const onAddProject = async () => {
    const projectDate = {
      id: false,
    };
    await AsyncStorage.setItem(PROJECT_DATA.setProjectData, JSON.stringify(projectDate)).then(() => {
      navigation?.navigate(NAV_ADD_PROJECT, {pager: 0});
    });
  };

  const PageHeaderContainer = () => (
    <PageTitleContainer>
      <TouchableOpacity
        testID={strings.toggleDrawerButton}
        onPress={() => {
          navigation?.toggleDrawer();
        }}>
        <DrawerIcon />
      </TouchableOpacity>
      <PageTitle>{dashboard}</PageTitle>
    </PageTitleContainer>
  );
  const onRefresh = () => {
    setRefreshing(true);
    _callProjectActivity()
      .then(res => {
        if (res.Success) {
          setProjectList(res.Data.AllProjects);
          setRefreshing(false);
        }
      })
      .catch(error => {
        setRefreshing(false);
      });
  };

  const ProjectListCard = (item: any, index: number) => {
    const onSelectProject = async (projectId: number, status: string) => {
      const projectDate = {
        id: projectId,
        projectStatus: status,
      };
      await AsyncStorage.setItem(PROJECT_DATA.setProjectData, JSON.stringify(projectDate))
        .then(() => {
          navigation?.navigate(NAV_INFO_TABS, {
            id: projectId,
            projectStatus: status,
            showComplaintsTab: item.IsComplaintEnable,
          });
        })
        .catch(error => {});
    };
    let color;
    let statusColor;
    const status = item.Status;
    if (status === 40 || status === 50 || status === 60 || status === 80) {
      color = colors.lightYellow;
      statusColor = colors.darkYellow;
    } else if (status === 30) {
      color = colors.lightBlue;
      statusColor = colors.darkBlue;
    } else if (status === 70) {
      color = colors.athens_Gray;
      statusColor = colors.darkGrey;
    } else if (status === 20 || status === 10) {
      color = colors.lightGreen;
      statusColor = colors.darkGreen;
    } else {
      color = colors.lightPink;
      statusColor = colors.redPink;
    }

    return (
      <ProjectMainContainer>
        <TouchableOpacity onPress={() => onSelectProject(item.ProjectId, item.Status)}>
          <ProjectListCardMainContainer>
            <BidTag color={color}>
              <BidTagText statusColor={statusColor}>
                {status === 40 ? localStrings.bidding : item.ProjectStatus}
              </BidTagText>
            </BidTag>
            <TextWrapper>
              <ProjectName>{item.Name}</ProjectName>
            </TextWrapper>
            <TextWrapper>
              <ProjectDetails>{item.ProjectType}</ProjectDetails>
            </TextWrapper>
            <TextWrapper>
              <ProjectDetails marginTop={0}>{item.ProjectLocation}</ProjectDetails>
            </TextWrapper>
          </ProjectListCardMainContainer>
        </TouchableOpacity>
      </ProjectMainContainer>
    );
  };

  return (
    <>
      <DashBoardContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
        <PageHeaderContainer />
        <BottomContainer
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }>
          {!isGetProjectAPIInProgress && (
            <>
              {projectList.length === 0 ? (
                <MainContainer>
                  <CreateProjectContainer>
                    <TextContainer>
                      <FirstProjectText>{firstProjectText}</FirstProjectText>
                      <CreateProjectText>{projectNow}</CreateProjectText>
                    </TextContainer>
                    <ImageContainerRight>
                      <IllustrationImage source={pngImages.illustration} resizeMode="cover" />
                    </ImageContainerRight>
                  </CreateProjectContainer>
                  <EmptyViewContainer>
                    <SubmitButton marginTop={rh(2)} selected={true} onPress={() => onAddProject()}>
                      <ButtonText>{localStrings.createNewProject}</ButtonText>
                    </SubmitButton>
                  </EmptyViewContainer>
                </MainContainer>
              ) : (
                <ListContainer>
                  <RecentArticlePanel marginTop={1}>
                    <RecentArticleText>{localStrings.myProject}</RecentArticleText>
                    <TouchableOpacity
                      onPress={() => {
                        myGlobal.tab = NAV_PROJECTS_SCREEN;
                        navigation?.navigate(NAV_DASHBOARD_SCREEN, {tab: NAV_PROJECTS_SCREEN});
                      }}>
                      <ViewAllText>{strings.viewAll}</ViewAllText>
                    </TouchableOpacity>
                  </RecentArticlePanel>
                  <Carousel
                    layout={'default'}
                    data={projectList}
                    sliderWidth={sliderWidth - 50}
                    itemWidth={sliderWidth - 100}
                    renderItem={({item, index}: any) => ProjectListCard(item, index)}
                    autoplay={false}
                    activeSlideAlignment="start"
                    inactiveSlideOpacity={1}
                  />
                </ListContainer>
              )}
              <RecentArticlePanel>
                <RecentArticleText>{localStrings.recentBlogs}</RecentArticleText>
                <TouchableOpacity
                  onPress={() => {
                    myGlobal.tab = NAV_BLOGS_SCREEN;
                    navigation?.navigate(NAV_DASHBOARD_SCREEN, {tab: NAV_BLOGS_SCREEN});
                  }}>
                  <ViewAllText>{strings.viewAll}</ViewAllText>
                </TouchableOpacity>
              </RecentArticlePanel>
              <BlogView>{localStrings.blogGuides}</BlogView>
              <CarousalList navigation={navigation} />
              <AdvertiseList navigation={navigation} />
            </>
          )}
        </BottomContainer>
      </DashBoardContainer>
    </>
  );
};
const mapStateToProps = (store: IStore) => ({
  getQBConfigResponse: store?.qbConfigKey?.payload,
});
const mapDispatchToProps = {
  callProjectActivity,
  callGetConfigurationKeyAPI,
  callGetProjectUsersAPI,
  callSignOutAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
