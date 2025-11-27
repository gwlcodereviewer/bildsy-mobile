import QB from 'quickblox-react-native-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ASYNC_CONST_QB} from '../../helpers/constants';
import {GetConfigurationData, IFileData} from '../../types';

export const USER_IS_TYPING = '@QB/USER_IS_TYPING';
export const MESSAGE_DELIVERED = '@QB/MESSAGE_DELIVERED';
export const MESSAGE_READ = '@QB/MESSAGE_READ';
export const USER_STOPPED_TYPING = '@QB/USER_STOPPED_TYPING';

export const appSettings = {
  accountKey: 'B6xtvT-3c_J-TzfFToS2',
  apiEndpoint: '',
  appId: '95848',
  authKey: '8cywXFfmthWkKcm',
  authSecret: 'aUJWTOHQwW27cJr',
  chatEndpoint: '',
};
export const initSdkChat = () => {
  QB.settings.init(appSettings);
};
export const initChat = (login: string, password: string, config: GetConfigurationData | undefined, callback: any) => {
  if (config) {
    appSettings.accountKey = config.AccountKey;
    appSettings.appId = config.ApplicationId;
    appSettings.authKey = config.AuthKey;
    appSettings.authSecret = config.AuthorizationSecret;
  }

  QB.settings
    .init(appSettings)
    .then(() => {
      // SDK initialized successfully

      loginQB(login, password, (res: any) => callback(res));
    })
    .catch(() => {
      callback('error');
    });
};

export const loginQB = (login: string, password: string, callback: any) => {
  QB.chat.isConnected().then(b => {
    if (b) {
      callback('');
    } else {
      QB.auth
        .login({
          login,
          password,
        })
        .then(info => {
          storeData(info);
          connect(info.session.userId, password, (res: any) => callback(res));
        })
        .catch(() => {
          callback('');
        });
    }
  });
};

const storeData = async (res: any) => {
  await AsyncStorage.setItem(ASYNC_CONST_QB.loggedInUserInfoQb, JSON.stringify(res));
};

export const connect = (userIda: any, password: any, callback: any) => {
  QB.chat.isConnected().then(b => {
    if (b) {
      callback('');
    } else {
      QB.chat
        .connect({
          userId: userIda,
          password,
        })
        .then(response => {
          callback('');
        })
        .catch(e => {
          callback('');
        });
    }
  });
};
export const sendMessages = (dialogIdV: any, bodyV: any, attachments: IFileData[], callback: any) => {
  const message = {
    dialogId: dialogIdV,
    body: bodyV,
    saveToHistory: true,
    attachments,
  };
  QB.chat
    .sendMessage(message)
    .then(() => {
      callback(message);
    })
    .catch(() => {
      callback('error');
    });
};
export const getMessages = (dialogIdV: string, callback: any) => {
  const getDialogMessagesParams = {
    dialogId: dialogIdV,
    markAsRead: true,
    limit: 1000,
  };

  QB.chat
    .getDialogMessages(getDialogMessagesParams)
    .then(result => {
      callback(result);
    })
    .catch(() => {
      callback('error');
    });
};

export const updateChat = (chatArray: any[]) => {
  const tempArray: any[] = [];
  chatArray.map(el => {
    const chatItem = {
      _id: el.id,
      text: el.body === '[attachment]' ? '' : el.body,
      createdAt: new Date(el.dateSent),
      attachments: el.attachments,
      sent: true,
      received: el.properties.all_read === true || el.properties.all_read === 'true',
      pending: el.deliveredIds.length <= 1,
      user: {
        _id: el.senderId,
        name: '',
        avatar: '',
        attachments: el.attachments,
      },
    };
    tempArray.push(chatItem);
    return true;
  });
  return tempArray;
};
export const updateChatItem = (chatItem: any) => {
  const newChatItem = {
    _id: chatItem.id,
    text: chatItem.body === '[attachment]' ? '' : chatItem.body,
    createdAt: new Date(),
    attachments: chatItem.attachments,
    sent: true,
    // eslint-disable-next-line camelcase
    received: chatItem.properties?.all_read === 'true',
    pending: chatItem.deliveredIds.length <= 1,
    user: {
      _id: chatItem.senderId,
      name: '',
      avatar: '',
      attachments: chatItem.attachments,
    },
  };
  return newChatItem;
};

export const getDialogs = (projectId: number, callback: any) => {
  const filter = {
    field: QB?.chat?.DIALOGS_FILTER.FIELD?.NAME,
    operator: QB?.chat?.DIALOGS_FILTER.OPERATOR?.CTN,
    value: `HP-${projectId}`,
  };
  const sort = {
    field: QB?.chat?.DIALOGS_SORT.FIELD?.LAST_MESSAGE_DATE_SENT,
    ascending: true,
  };

  const getDialogsQuery = {
    filter,
    limit: 10,
    skip: 0,
    sort,
  };

  QB?.chat
    .getDialogs()
    .then(result => {
      callback(result);
    })
    .catch(e => {
      // handle error
    });
};

export const isConnected = (callback: any) => {
  QB.chat.isConnected().then(b => {
    callback(b);
  });
};

export const uploadImage = (path: string, callback: any) => {
  const contentUploadParams = {
    url: path, // path to file in local file system
    public: false,
  };

  QB.content
    .upload(contentUploadParams)
    .then(file => {
      callback(file);
    })
    .catch(() => {
      /* handle file upload error */
    });
};
export const getPrivateURL = (id: any, callback: any) => {
  // received message
  const contentGetFileUrlParams = {uid: id};
  QB.content
    .getPrivateURL(contentGetFileUrlParams)
    .then((url /* you download file using obtained url */) => callback(url))
    .catch(e => {
      /* handle error */
    });
};
export const getFileInfo = (id: any, callback: any) => {
  const params = {id};
  QB.content
    .getInfo(params)
    .then(file => {
      // process result
      callback(file);
    })
    .catch(e => {
      // handle error
    });
};
export const sendIsTyping = (dialogId: string) => {
  return;
  const isTypingParams = {dialogId};

  QB.chat
    .sendIsTyping(isTypingParams)
    .then(() => {
      /* sent successfully */
    })
    .catch(e => {
      /* handle error */
    });
};

export const sendStoppedTyping = (dialogId: string) => {
  const isTypingParams = {dialogId};

  QB.chat
    .sendStoppedTyping(isTypingParams)
    .then(() => {
      /* sent successfully */
    })
    .catch(e => {
      /* handle error */
    });
};

export const markMessageRead = (messageId: string, dialogId: string, senderId: number) => {
  const markMessageReadParams = {
    message: {
      id: messageId,
      dialogId,
      senderId,
      attachments: [],
      dateSent: 0,
      delayed: false,
      markable: true,
    },
  };
  QB.chat.markMessageRead(markMessageReadParams);
};
export const markAllMessageRead = (dialogId: string, messages: QB.Message[]) => {
  messages.forEach(item => {
    markMessageRead(item.id, dialogId, item?.senderId || 0);
  });
};
export const getUsers = (occupantsIds: any, callback: any) => {
  const filter = {
    field: QB.users.USERS_FILTER.FIELD.ID,
    type: QB.users.USERS_FILTER.TYPE.NUMBER,
    operator: QB.users.USERS_FILTER.OPERATOR.IN,
    value: occupantsIds.join(),
  };
  const getUsersQuery = {filter};
  QB.users
    .getUsers(getUsersQuery)
    .then(result => callback(result))
    .catch(e => {
      // handle error
    });
};

export const getOnlineUsers = (dialogId: any, callback: any) => {
  const param = {dialogId};

  QB.chat
    .getOnlineUsers(param)
    .then(result => callback(result))
    .catch(e => {
      // handle error
    });
};
export const pingUser = (userId: string, callback: any) => {
  if (QB?.chat)
    QB.chat
      .pingUser({userId})
      .then(() => {
        callback('success');
      })
      .catch(() => {
        callback('error');
      });
};
export const disconnect = () => {
  QB.chat.disconnect();
};
export const joinDialog = (dialogId: string) => {
  const joinDialogParam = {dialogId};
  QB.chat
    .joinDialog(joinDialogParam)
    .then(() => {
      /* joined successfully */
    })
    .catch(e => {
      /* handle error */
    });
};
export const leaveDialog = (dialogId: string) => {
  const joinDialogParam = {dialogId};
  QB.chat
    .leaveDialog(joinDialogParam)
    .then(() => {
      /* joined successfully */
    })
    .catch(e => {
      /* handle error */
    });
};

export const sendPush = (title: string, message: string, payload: any, senderId: number, recipientsIds: number[]) => {
  const event = {
    notificationType: QB.events.NOTIFICATION_TYPE.PUSH,
    payload: {
      ios_voip: 1, // to send VoIP push notification (https://docs.quickblox.com/reference/push-notifications#push-notification-formats)
      message,
      body: message,
      title,
      key: JSON.stringify(payload),
    },
    item: payload,
    recipientsIds, // users' IDs to deliver notification
    senderId, // ID of the user who created the event
    type: QB.events.NOTIFICATION_EVENT_TYPE.ONE_SHOT,
  };

  /*
  TODO: Need to comment while creating PR. Working on it to find the fix for it.
  */
  // QB.events.create(event);
};

export const disConnectQB = () => {
  QB?.chat?.isConnected().then(b => {
    if (b) {
      disconnect();
    }
  });
};

export const removeSubscription = (subscriptionId: number) => {
  const subscriptionsRemoveParams = {id: subscriptionId};
  QB.subscriptions.remove(subscriptionsRemoveParams);
};

export const logoutQB = () => {
  QB.auth.logout();
};
