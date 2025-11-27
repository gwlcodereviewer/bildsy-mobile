/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsForRegex": ["^bar"] }] */
/* eslint no-underscore-dangle: 0 */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
  NativeEventEmitter,
  StatusBar,
  Keyboard,
} from 'react-native';
import {GiftedChat, Send, Bubble, Time, Composer, IMessage} from 'react-native-gifted-chat';
import {ActivityIndicator} from 'react-native-paper';
import QB from 'quickblox-react-native-sdk';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tooltip from 'react-native-walkthrough-tooltip';
import {callGetProjectUsersAPI, callUpdateMessageAPI} from '../../redux/actions/auth';
import BackIcon from '../../assets/svg/BackIcon';
import {localStrings} from '../../localization/localStrings';
import {
  AttachmentImageContainer,
  AttachmentName,
  ChatAttachmentContainer,
  ChatFooterContainer,
  MainLoaderContainer,
  PageTitle,
  PageTitleWithUpperCase,
  TouchableContainer,
} from '../../style';
import {
  DialogRecord,
  IChatUser,
  IFileData,
  ICommonResponse,
  INavigation,
  IRootUser,
  IUser,
  IUserRoot,
} from '../../types';
import {PageTitleContainer2, ProjectContainer, ProjectTitleSubContainer, ProjectViewContainer} from '../bids/styled';
import {
  sendMessages,
  getMessages,
  updateChat,
  updateChatItem,
  getDialogs,
  loginQB,
  isConnected,
  uploadImage,
  USER_IS_TYPING,
  MESSAGE_DELIVERED,
  MESSAGE_READ,
  sendIsTyping,
  sendStoppedTyping,
  USER_STOPPED_TYPING,
  markMessageRead,
  getUsers,
  sendPush,
  markAllMessageRead,
  pingUser,
} from './QBUtils';
import {ASYNC_CONST, ASYNC_CONST_QB} from '../../helpers/constants';
import CustomActions from './CustomActions';
import Attachment from '../../assets/svg/Attachment';
import Close from '../../assets/svg/Close';
import {openDeviceCameraPath, pickDocument, showToastMessage, onSelectGalleyPress} from '../../utils';
import CustomView from './CustomView';
import {InputToolbarView} from './styled';
import chatStyle from './chatStyle';
import ChatInfoModalView from '../../components/popupmenu';
import InfoIconWhite from '../../assets/svg/InfoIconWhite';
import Delivered from '../../assets/svg/chat/Delivered';
import Sent from '../../assets/svg/chat/Sent';
import Read from '../../assets/svg/chat/Read';
import styles from '../../style/style';
import colors from '../../style/colors';
import pngImages from '../../assets/images/pngImages';
import {strings} from '../../constants/strings';
import {NAV_CHAT_MESSAGE} from '../../navigation/navConstants';
import {IStore, IUpdateMessageParam} from '../../redux/types';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  animationDuration?: number;
  showCloseButton?: boolean;
  showDoneBar?: boolean;
  callGetProjectUsersAPI: (param: number) => Promise<IUserRoot>;
  callUpdateMessageAPI: (param: IUpdateMessageParam) => Promise<ICommonResponse>;
}
const myGlobal: any = global;
const MessageList: React.FC<Props> = (props: Props) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [fileData, setFileData] = useState<IFileData[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userHeaderName, setUserHeaderName] = useState<string>('');
  const [upData, setUpData] = useState<IFileData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const {navigation, route, callGetProjectUsersAPI: callGetProjectUsersAPIProps} = props;
  const [position, setPosition] = useState<string>('absolute');

  function receivedNewMessage(event: any) {
    const {payload} = event;
    const tempArray: any[] = [];
    if (
      (payload?.senderId && `${payload?.senderId}` === `${route?.params.QuickBloxUserId}`) ||
      (payload?.senderId && `${payload?.senderId}` === `${payload?.recipientId}`) ||
      !payload?.recipientId
    ) {
      tempArray.push(updateChatItem(payload));
      const recipientIdArray: number[] = [];
      const customPayload = {
        message: payload?.body,
        id: myGlobal.dialogId,
        name: myGlobal.userHeaderName,
        dataArray: route?.params.data,
        QuickBloxUserId: myGlobal.PushQuickBloxUserId,
        ios_voip: 1,
      };
      recipientIdArray.push(Number(myGlobal.PushQuickBloxUserId));
      let body = '';
      updateMessageStatus(payload.id, payload.dialogId);
      if (payload?.body === '[attachment]') body = localStrings.youHaveNewMessages;
      else body = payload?.body;
      AsyncStorage.getItem(ASYNC_CONST.loggedInUserInfo).then(loggedInUserData => {
        const loggedInUserInfo = JSON.parse(loggedInUserData || '');
        loggedInUserInfo.userName;
        sendPush(loggedInUserInfo.userName, body, customPayload, payload?.senderId, recipientIdArray);
      });

      setMessages(previousMessages => GiftedChat.append(previousMessages, tempArray));
      AsyncStorage.getItem(ASYNC_CONST_QB.loggedInUserInfoQb)
        .then(dataAs => {
          const loggedInUserInfoQb = JSON.parse(dataAs || '');
          if (loggedInUserInfoQb.session.userId !== event.payload.userId) {
            markMessageRead(payload.id, route?.params.id, payload.senderId);
          }
        })
        .catch(error => {});
    } else if (`${event.payload.senderId}` === `${route?.params.ProfessionalId}`) {
      tempArray.push(updateChatItem(payload));
      setMessages(previousMessages => GiftedChat.append(previousMessages, tempArray));
      AsyncStorage.getItem(ASYNC_CONST_QB.loggedInUserInfoQb)
        .then(dataAs => {
          const loggedInUserInfoQb = JSON.parse(dataAs || '');
          if (loggedInUserInfoQb.session.userId !== event.payload.userId) {
            markMessageRead(payload.id, route?.params.id, payload.senderId);
          }
        })
        .catch(error => {});
    }
  }
  function userTypingHandler(event: any) {
    AsyncStorage.getItem(ASYNC_CONST_QB.loggedInUserInfoQb)
      .then(dataAs => {
        const loggedInUserInfoQb = JSON.parse(dataAs || '');
        const {payload} = event;
        const foundItem = route?.params.data.find((element: {id: any}) => element.id === payload.userId);
        setUserName(foundItem.CustomerName);
        if (event.type === USER_IS_TYPING) {
          if (loggedInUserInfoQb.session.userId === event.payload.userId) setIsTyping(false);
          else if (`${event.payload.userId}` !== `${route?.params.QuickBloxUserId}`) {
            setIsTyping(false);
          } else if (`${event.payload.userId}` !== `${route?.params.ProfessionalId}`) {
            setIsTyping(false);
          } else setIsTyping(true);
        } else if (event.type === USER_STOPPED_TYPING && loggedInUserInfoQb.session.userId !== event.payload.userId) {
          setIsTyping(false);
        }
      })
      .catch(error => {});
  }
  function messageStatusHandler(event: any) {
    if (event.type === MESSAGE_DELIVERED) {
      getMessages(route?.params.id, (response: any) => {
        response.messages.reverse();
        setMessages(updateChat(response.messages));
        setLoading(false);
      });
    } else if (event.type === MESSAGE_READ) {
      getMessages(route?.params.id, (response: any) => {
        response.messages.reverse();
        setMessages(updateChat(response.messages));
        setLoading(false);
      });
    }
  }
  const keyboardWillShow = () => {
    if (position !== 'relative') {
      setPosition('relative');
    }
  };

  const keyboardWillHide = () => {
    if (position !== 'absolute') {
      setPosition('absolute');
    }
  };

  const getQbId = (loggedInUserInfoQb: any) => loggedInUserInfoQb.session.userId;

  const updateMessageStatus = (messageId: string, dialogId: string) => {
    if (myGlobal.CustomerType === strings.Administrators) {
      const params = {
        projectId: route?.params.ProjectId,
        dialogId,
        messageId,
        opponentId: myGlobal.PushQuickBloxUserId,
      };

      props.callUpdateMessageAPI(params).then(response => {
        console.log('response', response);
      });
    }
  };

  const getAdminUsers = (projectId: number, uniqueArray: IUser[], professionalId: number) => {
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
        const foundItem = newArray.find(element => element.QuickBloxUserId === `${professionalId}`);
        if (foundItem) {
          navigation?.navigate(NAV_CHAT_MESSAGE, {
            id: foundItem?.dialogId,
            data: newArray,
            name: foundItem?.CustomerName,
          });
          openChat(foundItem?.dialogId, foundItem.QuickBloxUserId, foundItem?.CustomerName);
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

  const listDialogs = (projectId: number, professionalId: number) => {
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
        getAdminUsers(projectId, uniqueArray, professionalId);
      });
    });
  };

  const openChat = (id: string, QuickBloxUserId: string, name: string) => {
    myGlobal.PushQuickBloxUserId = QuickBloxUserId;
    myGlobal.userHeaderName = name;
    myGlobal.dialogId = id;
    markMessageRead('', route?.params.id, 0);
    setUserHeaderName(name);
    AsyncStorage.getItem(ASYNC_CONST_QB.loggedInUserInfoQb)
      .then(dataAs => {
        const loggedInUserInfoQb = JSON.parse(dataAs || '');
        setUserId(loggedInUserInfoQb.session.userId);
      })
      .catch(error => {});
    setLoading(true);
    isConnected((b: boolean) => {
      if (b) {
        getMessages(id, (response: any) => {
          markAllMessageRead(id, response.messages);
          response.messages.reverse();
          setMessages(updateChat(response.messages));
          setLoading(false);
        });
      } else {
        AsyncStorage.getItem(ASYNC_CONST.qbLogin)
          .then(qbLogin => {
            const returnString = qbLogin as string;
            loginQB(returnString, 'quickblox', (res: any) => {
              if (res === 'error') {
                navigation?.goBack();
              } else {
                setLoading(false);
                getMessages(id, (response: {messages: QB.Message[]}) => {
                  markAllMessageRead(id, messages);
                  response.messages.reverse();
                  setMessages(updateChat(response.messages));
                  setLoading(false);
                });
              }
            });
          })
          .catch(() => {});
      }
    });
  };
  useEffect(() => {
    myGlobal.onMessageScreen = true;
    const emitter = new NativeEventEmitter();
    const subscription1 = emitter.addListener(QB.chat.EVENT_TYPE.RECEIVED_NEW_MESSAGE, receivedNewMessage);
    const subscription2 = emitter.addListener(QB.chat.EVENT_TYPE.USER_IS_TYPING, userTypingHandler);
    const subscription3 = emitter.addListener(QB.chat.EVENT_TYPE.USER_STOPPED_TYPING, userTypingHandler);
    const subscription4 = emitter.addListener(QB.chat.EVENT_TYPE.MESSAGE_DELIVERED, messageStatusHandler);
    const subscription5 = emitter.addListener(QB.chat.EVENT_TYPE.MESSAGE_READ, messageStatusHandler);
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    if (route?.params.ProjectId && route?.params.ProfessionalId) {
      listDialogs(route?.params.ProjectId, route?.params.ProfessionalId);
    } else {
      myGlobal.CustomerType = route?.params?.CustomerType;
      openChat(route?.params.id, route?.params.QuickBloxUserId, route?.params.name);
    }
    return () => {
      myGlobal.onMessageScreen = false;
      if (subscription1) subscription1.remove();
      if (subscription2) subscription2.remove();
      if (subscription3) subscription3.remove();
      if (subscription4) subscription4.remove();
      if (subscription5) subscription5.remove();
      if (keyboardWillShowListener) keyboardWillShowListener.remove();
      if (keyboardWillHideListener) keyboardWillHideListener.remove();
    };
  }, [navigation]);

  /* eslint-disable no-param-reassign */

  const onSend = useCallback(
    (messagesVal = []) => {
      if (!uploading) {
        const attachmentsTemp: any[] = [];
        if (upData && upData.length > 0) {
          attachmentsTemp.push({
            id: upData[0]?.uid,
            uid: upData[0]?.uid,
            type: upData[0]?.contentType.includes('image') ? 'image' : 'file',
            contentType: upData[0]?.contentType,
            name: fileData[0]?.name,
            size: fileData[0]?.size,
          });
        }
        if (attachmentsTemp && attachmentsTemp.length > 0) messagesVal[0].attachments = attachmentsTemp;
        sendMessages(route?.params.id, messagesVal[0].text.trim(), [], () => {
          if (attachmentsTemp && attachmentsTemp.length > 0) {
            sendMessages(route?.params.id, '[attachment]', attachmentsTemp, () => {
              setFileData([]);
              setUpData([]);
            });
          }
        });
      } else {
        sendMessages(route?.params.id, messagesVal[0].text, [], () => {});
      }
    },
    [fileData, upData, uploading, route?.params],
  );
  const PageHeaderContainer = () => (
    <PageTitleContainer2>
      <TouchableOpacity
        onPress={() => {
          navigation?.goBack();
        }}>
        <BackIcon />
      </TouchableOpacity>
      <ProjectTitleSubContainer>
        <PageTitleWithUpperCase>{userHeaderName}</PageTitleWithUpperCase>

        <Tooltip
          topAdjustment={Platform.OS === 'android' ? -(StatusBar.currentHeight ? StatusBar.currentHeight : 0) : 0}
          useInteractionManager={true}
          isVisible={infoModalVisible}
          onClose={() => setInfoModalVisible(false)}
          content={<ChatInfoModalView />}
          placement="bottom">
          <Pressable
            onPress={() => {
              setInfoModalVisible(true);
            }}>
            {messages.length === 0 ? <InfoIconWhite /> : null}
          </Pressable>
        </Tooltip>
      </ProjectTitleSubContainer>
    </PageTitleContainer2>
  );

  const renderCustomView = ({currentMessage: {file = {}, attachments = []} = {}}) => {
    if (attachments && attachments[0]) {
      return (
        <View>
          <CustomView attachments={attachments} />
        </View>
      );
    }
    return null;
  };

  const renderFooter = () => {
    if (isTyping) {
      return (
        <ChatFooterContainer>
          <Text style={chatStyle.typing}>{userName} is typing....</Text>
        </ChatFooterContainer>
      );
    }
    if (fileData && fileData.length > 0) {
      return (
        <ChatAttachmentContainer>
          <AttachmentImageContainer>
            <Attachment />
          </AttachmentImageContainer>
          <AttachmentName numberOfLines={1} ellipsizeMode="tail">
            {fileData[0]?.name}
          </AttachmentName>
          <AttachmentImageContainer>
            <TouchableContainer
              onPress={() => {
                setFileData([]);
              }}>
              {uploading ? (
                <MainLoaderContainer>
                  <ActivityIndicator size="small" color={colors.primaryThemeColor} style={styles.activityIndicator} />
                </MainLoaderContainer>
              ) : (
                <Close />
              )}
            </TouchableContainer>
          </AttachmentImageContainer>
        </ChatAttachmentContainer>
      );
    }
    return null;
  };

  const renderSend = (propsMessage: IMessage) => (
    <Send {...propsMessage}>
      <View style={chatStyle.sendContainer}>
        <Image style={chatStyle.sendButton} source={pngImages.Send} resizeMode={'contain'} />
      </View>
    </Send>
  );
  let myInterval = setInterval(myTimer, 4000);

  function myTimer() {
    sendStoppedTyping(route?.params.id);
    myStopFunction();
  }

  function myStopFunction() {
    clearInterval(myInterval);
  }
  function handleInputTextChanged(text: string) {
    if (text.length > 0) {
      sendIsTyping(route?.params.id);
      if (myInterval) myStopFunction();
      myInterval = setInterval(myTimer, 4000);
    }
  }
  const renderTime = (propsMessage: any) => <Time {...propsMessage} timeTextStyle={chatStyle.timeTextStyle} />;
  const renderInputToolbar = (inputToolBarProps: any) => (
    <InputToolbarView position={position}>
      <Composer {...inputToolBarProps} textInputStyle={chatStyle.textInputStyle} />
      <CustomActions
        containerStyle={chatStyle.action}
        pickFile={(index: number) => {
          if (index === 0) {
            openDeviceCameraPath(fileData)
              .then((res: any) => {
                const response = [...res];
                if (response.length >= 1) {
                  const newArrayF = [...response];
                  setFileData(newArrayF);
                  setUploading(true);
                  uploadImage(res[0].uri, (result: any) => {
                    const newArray: any[] = [];
                    newArray.push(result);
                    upData.push(result);
                    setUpData(newArray);
                    setFileData(newArrayF);
                    setUploading(false);
                  });
                } else {
                  setFileData([]);
                }
              })
              .catch();
          } else if (index === 1) {
            const selectMultiple = false;
            onSelectGalleyPress(fileData, selectMultiple)
              .then((res: any) => {
                const response = [...res];
                if (res.length >= 1) {
                  setFileData(response);
                  setUploading(true);
                  uploadImage(res[0].uri, (result: any) => {
                    const newArray: any[] = [];
                    newArray.push(result);
                    setUpData(newArray);
                    setUploading(false);
                  });
                }
              })
              .catch();
          } else if (index === 2) {
            const selectMultiple = false;
            pickDocument(fileData, selectMultiple)
              .then(res => {
                const response = [...res];
                if (res.length >= 1) {
                  setFileData(response);
                  setUploading(true);
                  uploadImage(res[0].uri, (result: any) => {
                    const newArray: any[] = [];
                    newArray.push(result);
                    setUpData(newArray);
                    setUploading(false);
                  });
                }
              })
              .catch();
          }
        }}
      />
      <Send {...inputToolBarProps} containerStyle={chatStyle.sendStyle}>
        <Image style={chatStyle.sendButton} source={require('../../assets/images/Send.png')} />
      </Send>
    </InputToolbarView>
  );
  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      {PageHeaderContainer()}
      <ProjectViewContainer>
        <GiftedChat
          messages={messages}
          onSend={messages_ => onSend(messages_)}
          renderCustomView={renderCustomView}
          renderSend={renderSend}
          renderChatFooter={renderFooter}
          onInputTextChanged={handleInputTextChanged}
          alwaysShowSend={!uploading}
          user={{
            _id: userId,
          }}
          minInputToolbarHeight={Platform.OS === 'android' ? 60 : 75}
          renderInputToolbar={renderInputToolbar}
          // TODO need to uncomment this line while creating Build
          // bottomContainerStyle={chatStyle.bottomContainerStyle}
          renderBubble={propsMessage => (
            <Bubble
              {...propsMessage}
              textStyle={chatStyle.textStyle}
              wrapperStyle={chatStyle.wrapperStyle}
              renderTime={renderTime}
              renderTicks={(renderTickspropss: any) => {
                if (renderTickspropss.user._id === userId) {
                  if (renderTickspropss.received) return <Read />;
                  if (renderTickspropss.sent) return <Delivered />;
                  return <Sent />;
                }
                return null;
              }}
            />
          )}
          isTyping={true}
        />
        {loading && (
          <MainLoaderContainer>
            <ActivityIndicator size="large" color={colors.primaryThemeColor} style={styles.activityIndicator} />
          </MainLoaderContainer>
        )}
      </ProjectViewContainer>
    </ProjectContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callGetProjectUsersAPI,
  callUpdateMessageAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
