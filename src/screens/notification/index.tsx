import {RefreshControl, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {IStore, notificationListType, projectListType} from '../../redux/types';

import {
  ProjectContainer,
  BottomContainer,
  NotificationRowContainer,
  DescText,
  HeadingText,
  NotificationDescContainer,
  NotificationImage,
  BottomElementsContainer,
  TimeText,
  MainLoaderContainer,
} from './styled';

import {INavigation, NotificationLog} from '../../types';
import {PageTitleContainer, PageTitle} from '../../style';
import DrawerIcon from '../../assets/svg/drawer/DrawerIcon';
import {localStrings} from '../../localization/localStrings';
import styles from '../../style/style';
import {notificationList} from '../../redux/actions/auth';
import {messageAlert, showToastMessage} from '../../utils';
import {CenterContainer} from '../projects/styled';
import {NAV_BIDS_DETAIL, NAV_BLOG_DETAILS, NAV_COMPLAINTS_DETAILS, NAV_INFO_TABS} from '../../navigation/navConstants';
import {strings} from '../../constants/strings';
import pngImages from '../../assets/images/pngImages';
import {NoBidsAvailable, NoBidsAvailableText} from '../bids/bid/bidsStyled';
import colors from '../../style/colors';
import {
  PUSH_TYPE_BID_DECLINED,
  PUSH_TYPE_BID_PLACED,
  PUSH_TYPE_BID_REJECTED,
  PUSH_TYPE_BLOG_PUBLISHED,
  PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO,
} from '../../constants/utils/constantData';

interface Props {
  navigation: INavigation;
  notificationList: (param: notificationListType) => Promise<any>;
}
const NotificationScreen: React.FC<Props> = (props: Props) => {
  const [notificationListData, setNotificationListData] = useState<any[]>([]);
  const [next, setNext] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [apiParamCount, setApiParamCount] = useState<number>(1);
  const [isAPIInProgress, setAPIInProgress] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const {navigation, notificationList: notificationListProps} = props;
  useEffect(() => {
    getNotificationList(true, 1, 15);
  }, []);

  const getNotificationList = (apiInProgress: boolean, page: number, size: number) => {
    setAPIInProgress(apiInProgress);
    notificationListProps({
      pageNumber: page,
      pageSize: size,
    })
      .then(async res => {
        if (res.Success) {
          await setNotificationListData(res.Data.NotificationLogs);
          setApiParamCount(apiParamCount + 1);
          await setNext(res.Data.PagingFilteringContext.HasNextPage);
          setLoader(false);
          setAPIInProgress(false);
          setRefreshing(false);
        }
      })
      .catch(error => {
        messageAlert(error?.message || '', true);
        setAPIInProgress(false);
        setLoader(false);
        setRefreshing(false);
      });
  };
  const PageHeaderContainer = () => (
    <PageTitleContainer>
      <TouchableOpacity
        style={{zIndex: 1}}
        testID={strings.toggleDrawerButton}
        onPress={() => {
          navigation?.toggleDrawer();
        }}>
        <DrawerIcon />
      </TouchableOpacity>
      <PageTitle>{localStrings.notification}</PageTitle>
    </PageTitleContainer>
  );
  const fetchMoreData = () => {
    next &&
      (() => {
        setLoader(true);
        notificationListProps({
          pageNumber: apiParamCount,
          pageSize: 15,
        })
          .then(async res => {
            if (res.Success) {
              const data = [...notificationListData, ...res.Data.NotificationLogs];
              setNotificationListData(data);
              await setApiParamCount(apiParamCount + 1);
              await setNext(res.Data.PagingFilteringContext.HasNextPage);
            }
            setLoader(false);
          })
          .catch((error: {message: string | undefined}) => {
            setLoader(false);
          });
      })();
  };
  const onRefresh = () => {
    setRefreshing(true);
    getNotificationList(false, 1, 15);
  };
  const NotificationView = (item: NotificationLog) => (
    <BottomElementsContainer>
      <NotificationRowContainer
        onPress={() => {
          if (item.IsProjectActive === undefined) {
            // eslint-disable-next-line no-param-reassign
            item.IsProjectActive = true;
          }
          if (item.EntityType === PUSH_TYPE_BLOG_PUBLISHED) {
            if (item.IsProjectActive) navigation.navigate(NAV_BLOG_DETAILS, {id: item.EntityId});
            else {
              showToastMessage(strings.error, localStrings.screenNotFound);
            }
          } else if (item.EntityType === PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO) {
            if (item.IsProjectActive)
              navigation.navigate(NAV_COMPLAINTS_DETAILS, {
                id: item.EntityId,
                projectStatus: true,
                fromNotification: true,
              });
            else showToastMessage(strings.error, localStrings.screenNotFound);
          } else if (
            item.EntityType === PUSH_TYPE_BID_PLACED ||
            item.EntityType === PUSH_TYPE_BID_REJECTED ||
            item.EntityType === PUSH_TYPE_BID_DECLINED
          ) {
            if (item.IsProjectActive) {
              navigation.navigate(NAV_BIDS_DETAIL, {bidId: item.EntityId, fromNotification: true});
            } else showToastMessage(strings.error, localStrings.screenNotFound);
          }
        }}>
        <NotificationImage
          source={item.PictureUrl ? {uri: item.PictureUrl} : pngImages.bitMapGroup6}
          resizeMode="cover"
        />
        <NotificationDescContainer>
          <HeadingText numberOfLines={2} ellipsizeMode="tail">
            {item.Title}
          </HeadingText>
          <DescText>{item.Message}</DescText>
          <TimeText>{item.TimeAgo}</TimeText>
        </NotificationDescContainer>
      </NotificationRowContainer>
    </BottomElementsContainer>
  );
  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <BottomContainer>
        {!isAPIInProgress && notificationListData.length === 0 && (
          <NoBidsAvailable>
            <NoBidsAvailableText>{localStrings.noNotification}</NoBidsAvailableText>
          </NoBidsAvailable>
        )}
        {notificationListData.length > 0 && (
          <FlatList
            onEndReachedThreshold={2}
            onEndReached={fetchMoreData}
            style={styles.notificationList}
            data={notificationListData}
            renderItem={({item}) => NotificationView(item)}
            keyExtractor={item => item.Id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  onRefresh();
                }}
              />
            }
          />
        )}
        {isAPIInProgress && (
          <MainLoaderContainer>
            <ActivityIndicator size="large" color={colors.primaryThemeColor} style={styles.activityIndicator} />
          </MainLoaderContainer>
        )}
      </BottomContainer>
    </ProjectContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  notificationList,
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
