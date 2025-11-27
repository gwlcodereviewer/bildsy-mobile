import React from 'react';
import {Keyboard, Modal} from 'react-native';
import FloatingLabelInput from '../../../components/floatingLabelInput';
import {localStrings} from '../../../localization/localStrings';
import {ButtonText, SubmitButton} from '../../../style';
import styles from '../../../style/style';
import {
  CancelButton,
  DeleteMessage,
  DoubleButtonContainer,
  InputFieldWrapper,
  ModalHeaderContainer,
  ModalHeaderText,
  ModalMainContainer,
  ModalMessage,
  ModalMessageContainer,
  ModalSubContainer,
  SecondaryText,
  SubContainer,
  SubmitButtonContainer,
  TouchableView,
} from './styled';

interface Props {
  modalHeaderText?: string;
  modalPrimaryBtnName?: string;
  onPress?: () => void;
  visible?: boolean;
  isDoubleButton?: boolean;
  secondaryBtnText?: string;
  isHeaderCentered?: boolean;
  onModalClose?: () => void;
  placeHolder?: string;
  onChangeValue?: (text: string) => void;
  inputValue?: string;
  errorText?: string;
}
const DeleteModal: React.FC<Props> = (props: Props) => {
  const {
    modalHeaderText,
    modalPrimaryBtnName,
    onPress,
    visible,
    isDoubleButton,
    secondaryBtnText = localStrings.cancel,
    isHeaderCentered = true,
    onModalClose,
    placeHolder = '',
    onChangeValue,
    inputValue = '',
    errorText = '',
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
      <TouchableView onPress={Keyboard.dismiss}>
        <ModalMainContainer>
          <ModalSubContainer>
            <SubContainer>
              <ModalHeaderContainer isCenter={isHeaderCentered}>
                <ModalHeaderText>{modalHeaderText}</ModalHeaderText>
              </ModalHeaderContainer>
            </SubContainer>
            <ModalMessageContainer>
              <ModalMessage>
                {localStrings.type} <DeleteMessage>{localStrings.delete}</DeleteMessage> {localStrings.inBox}
              </ModalMessage>
            </ModalMessageContainer>
            <InputFieldWrapper>
              <FloatingLabelInput
                label={placeHolder}
                inputValue={inputValue}
                onChangeText={(text: string) => {
                  if (onChangeValue) {
                    onChangeValue(text.trim());
                  }
                }}
                testID={placeHolder}
                numberOfLines={1}
                errorText={errorText}
              />
            </InputFieldWrapper>
            {getButtonView()}
          </ModalSubContainer>
        </ModalMainContainer>
      </TouchableView>
    </Modal>
  );
};
export default DeleteModal;
