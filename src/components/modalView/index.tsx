import React from 'react';
import {Modal} from 'react-native';
import {
  ModalMainContainer,
  ModalSubContainer,
  ModalHeaderContainer,
  ModalHeaderText,
  ModalMessageContainer,
  ModalMessage,
  SubmitButtonContainer,
  DoubleButtonContainer,
  CancelButton,
  SecondaryText,
} from './styled';
import {SubmitButton, ButtonText} from '../../style';
import styles from '../../style/style';
import {localStrings} from '../../localization/localStrings';

interface Props {
  modalHeaderText?: string;
  modalMessage?: string;
  modalPrimaryBtnName?: string;
  onPress?: () => void;
  visible?: boolean;
  testID?: string;
  isDoubleButton?: boolean;
  secondaryBtnText?: string;
  onModalClose?: () => void;
}
const ModalView: React.FC<Props> = (props: Props) => {
  const {
    modalHeaderText,
    modalMessage,
    modalPrimaryBtnName,
    onPress,
    visible,
    testID,
    isDoubleButton = false,
    secondaryBtnText = localStrings.cancel,
    onModalClose,
  } = props;

  /**
   * Function to execute on cancel press
   */
  const onCancel = () => {
    if (onModalClose) {
      onModalClose();
    }
  };

  /**
   * Function Render Button view
   */
  const getButtonView = () => {
    if (isDoubleButton) {
      return (
        <DoubleButtonContainer>
          <CancelButton onPress={() => onCancel()} style={styles.modalButton}>
            <SecondaryText>{secondaryBtnText}</SecondaryText>
          </CancelButton>
          <SubmitButton onPress={onPress} selected={true} style={styles.modalButton}>
            <ButtonText>{modalPrimaryBtnName}</ButtonText>
          </SubmitButton>
        </DoubleButtonContainer>
      );
    }
    return (
      <SubmitButtonContainer>
        <SubmitButton onPress={onPress} selected={true} style={styles.modalButton}>
          <ButtonText>{modalPrimaryBtnName}</ButtonText>
        </SubmitButton>
      </SubmitButtonContainer>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <ModalMainContainer>
        <ModalSubContainer>
          <ModalHeaderContainer>
            <ModalHeaderText>{modalHeaderText}</ModalHeaderText>
          </ModalHeaderContainer>
          <ModalMessageContainer>
            <ModalMessage>{modalMessage}</ModalMessage>
          </ModalMessageContainer>
          {getButtonView()}
        </ModalSubContainer>
      </ModalMainContainer>
    </Modal>
  );
};
export default ModalView;
