import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {DialogRecord, IChatUser, IGetConfiguration, INavigation, IRootUser, IUser, IUserRoot} from '../../../types';
import styles from '../../../style/style';
import {getDialogs, getUsers, isConnected, loginQB} from '../../chat/QBUtils';
import {DialogBottomContainer} from '../styled';
import ChatDialogItem from './ChatDialogItem';
import {IStore} from '../../../redux/types';
import {callGetProjectUsersAPI} from '../../../redux/actions/auth';
import {showToastMessage} from '../../../utils';
import {ASYNC_CONST, ASYNC_CONST_QB} from '../../../helpers/constants';
import {MainLoaderContainer} from '../../../style';
import colors from '../../../style/colors';
import {strings} from '../../../constants/strings';
import {NoBidsAvailable, NoBidsAvailableText} from '../bid/bidsStyled';
import {localStrings} from '../../../localization/localStrings';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  id: number;
  status: string;
  getQBConfigResponse: IGetConfiguration | undefined;
  callGetProjectUsersAPI: (param: number) => Promise<IUserRoot>;
}
const ChatDialogList = (props: Props) => {
  const {navigation, route, id, callGetProjectUsersAPI: callGetProjectUsersAPIProps} = props;
  const [showNoChatSection, setShowNoChatSection] = useState<boolean>(false);

  const listDialogs = (savedUserId: string) => {
    const users: IUser[] = [];
    getDialogs(id, (response: any) => {
      let occupantsIds: string[] = [];
      // eslint-disable-next-line array-callback-return
      response.dialogs.map((item: DialogRecord) => {
        occupantsIds = [...occupantsIds, ...item.occupantsIds];
      });
      /* eslint-disable no-param-reassign */
      setTimeout(() => {
        getUsers(occupantsIds, (result: IRootUser) => {
          result.users.map((userItem: IUser) => {
            response.dialogs.map((item: DialogRecord) => {
              if (item.occupantsIds.includes(userItem.id)) {
                userItem.dialogId = item.id;
                userItem.unreadMessagesCount = item.unreadMessagesCount;
                userItem.lastMessageDateSent = item.lastMessageDateSent;

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
            if (!isAvailable && element.id !== savedUserId) {
              uniqueArray.push(element);
            }
          });
          getAdminUsers(uniqueArray);
        });
      }, 700);
    });
  };
  const getAdminUsers = (uniqueArray: IUser[]) => {
    callGetProjectUsersAPIProps(id)
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
            if (element.QuickBloxUserId == null) element.QuickBloxUserId = '';
            if (newElement.id.toString() === element.QuickBloxUserId.toString()) {
              newItem = element;
              newItem.dialogId = newElement.dialogId;
              newItem.id = newElement.id;
              newItem.unreadMessagesCount = newElement.unreadMessagesCount ? newElement.unreadMessagesCount : 0;
              newItem.lastMessageDateSent = newElement.lastMessageDateSent ? newElement.lastMessageDateSent : 0;

              isAvailable = true;
            }
          });
          if (isAvailable) {
            newArray.push(newItem);
          }
        });
        newArray.sort((a, b) => {
          const x = a.lastMessageDateSent;
          const y = b.lastMessageDateSent;
          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
        setDialogList(newArray);
        setLoading(false);
        if (newArray) {
          if (newArray?.length === 0 && newArray?.length === 0) {
            setShowNoChatSection(true);
          } else {
            setShowNoChatSection(false);
          }
        }
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
        setLoading(false);
      });
  };
  const callApi = () => {
    AsyncStorage.getItem(ASYNC_CONST_QB.loggedInUserInfoQb)
      .then(data => {
        if (data != null) {
          const loggedInUserInfoQb = JSON.parse(data || '');
          isConnected((b: boolean) => {
            if (b) {
              listDialogs(loggedInUserInfoQb.session.userId);
            } else {
              AsyncStorage.getItem(ASYNC_CONST.qbLogin)
                .then(qbLogin => {
                  const returnString = qbLogin as string;
                  loginQB(returnString, 'quickblox', (res: string) => {
                    listDialogs(loggedInUserInfoQb.session.userId);
                  });
                })
                .catch(error => {});
            }
          });
        }
      })
      .catch(error => {});
  };

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, [route]),
  );

  useEffect(() => {
    setLoading(true);
    callApi();
  }, [id]);

  const [dialogList, setDialogList] = useState<IChatUser[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <DialogBottomContainer>
      {showNoChatSection ? (
        <NoBidsAvailable>
          <NoBidsAvailableText>{localStrings.ChatRoomNotAvailable}</NoBidsAvailableText>
        </NoBidsAvailable>
      ) : (
        <FlatList
          style={styles.myProjectList}
          data={dialogList}
          renderItem={({item}) => (
            <ChatDialogItem
              testID={localStrings.onItemClick}
              navigation={navigation}
              route={route}
              itemArray={dialogList}
              item={item}
              projectId={id}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
      {loading && (
        <MainLoaderContainer>
          <ActivityIndicator size="large" color={colors.primaryThemeColor} style={styles.activityIndicator} />
        </MainLoaderContainer>
      )}
    </DialogBottomContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
  getQBConfigResponse: store?.qbConfigKey?.payload,
});
const mapDispatchToProps = {
  callGetProjectUsersAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatDialogList);
