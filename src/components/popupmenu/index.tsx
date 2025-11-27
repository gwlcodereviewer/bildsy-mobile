import React from 'react';
import {ModalSubContainer, RowContainer, PopupText} from './styled';
import Delivered from '../../assets/svg/chat/Delivered';
import Sent from '../../assets/svg/chat/Sent';
import Read from '../../assets/svg/chat/Read';
import {localStrings} from '../../localization/localStrings';

const ChatInfoModalView: React.FC = () => (
  <ModalSubContainer>
    <RowContainer>
      <Sent />
      <PopupText>{localStrings.messageSent}</PopupText>
    </RowContainer>
    <RowContainer>
      <Delivered />
      <PopupText>{localStrings.messageDelivered}</PopupText>
    </RowContainer>
    <RowContainer>
      <Read />
      <PopupText>{localStrings.messageRead}</PopupText>
    </RowContainer>
  </ModalSubContainer>
);

export default ChatInfoModalView;
