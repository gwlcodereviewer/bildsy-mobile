import React, {useState, useEffect} from 'react';
import {INavigation} from '../../../types';
import {NAV_CHAT_MESSAGE} from '../../../navigation/navConstants';
import {
  ChatDialogDescContainer,
  ChatDialogImage,
  ChatDialogRowContainer,
  ChatDialogView,
  ChatElementsContainer,
  DialogNameText,
  LastMessageText,
  OfflineDotView,
  OnlineDotView,
  UnreadCountText,
  UnreadCountView,
  MainView,
} from '../styled';
import {pingUser} from '../../chat/QBUtils';
import pngImages from '../../../assets/images/pngImages';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  item: any;
  itemArray: any[];
  testID: string;
  projectId: number;
}
const ChatDialogItem = (props: Props) => {
  const {navigation, projectId, item, itemArray} = props;
  const [isOnline, setIsOnline] = useState(false);

  const pingFun = () => {
    pingUser(item.id, (message: string) => {
      if (message === 'success') {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    });
  };
  useEffect(() => {
    pingFun();
    const interval = setInterval(() => {
      pingFun();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainView>
      <ChatElementsContainer>
        <ChatDialogRowContainer
          testID={props.testID}
          onPress={() => {
            navigation?.navigate(NAV_CHAT_MESSAGE, {
              id: item.dialogId,
              data: itemArray,
              name: item.CustomerName,
              QuickBloxUserId: item.QuickBloxUserId,
              CustomerType: item.CustomerType,
              ProjectId: projectId,
            });
          }}>
          <ChatDialogView>
            <ChatDialogImage
              source={item.AvatarUrl ? {uri: item.AvatarUrl} : pngImages.defaultUserImage}
              resizeMode="cover"
            />
            {isOnline ? <OnlineDotView /> : <OfflineDotView />}
          </ChatDialogView>
          <ChatDialogDescContainer>
            <LastMessageText numberOfLines={1}>{item.CompanyName ? item.CompanyName : ''}</LastMessageText>
            <DialogNameText>{item.CustomerName}</DialogNameText>
          </ChatDialogDescContainer>
        </ChatDialogRowContainer>
        {item.unreadMessagesCount && item.unreadMessagesCount > 0 ? (
          <UnreadCountView>
            <UnreadCountText>{item.unreadMessagesCount}</UnreadCountText>
          </UnreadCountView>
        ) : null}
      </ChatElementsContainer>
    </MainView>
  );
};

export default ChatDialogItem;
