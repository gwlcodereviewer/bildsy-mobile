import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal} from 'react-native';
import FloatingLabelInput from '../../../components/floatingLabelInput';
import {strings} from '../../../constants/strings';
import {localStrings} from '../../../localization/localStrings';
import {ButtonText, SubmitButton} from '../../../style';
import colors from '../../../style/colors';
import styles from '../../../style/style';
import {checkValidPassword} from '../../../utils';
import {
  CancelButton,
  DoubleButtonContainer,
  InputFieldWrapper,
  ModalHeaderContainer,
  ModalHeaderText,
  ModalMainContainer,
  ModalSubContainer,
  SecondaryText,
} from './styled';

interface Props {
  modalPrimaryBtnName?: string;
  onPress?: (text: string) => void;
  visible?: boolean;
  secondaryBtnText?: string;
  onModalClose?: () => void;
  email: string;
  isLoading?: boolean;
}

interface PasswordInput {
  text: string;
  errorText: string;
}

const LoginModalView: React.FC<Props> = (props: Props) => {
  const {
    modalPrimaryBtnName = strings.submit,
    onPress,
    visible,
    secondaryBtnText = localStrings.cancel,
    onModalClose,
    email = '',
    isLoading = false,
  } = props;
  const [encryptPassword, setEncryptPassword] = useState<boolean>(true);
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);
  const [password, setPassword] = useState<PasswordInput>({
    text: '',
    errorText: '',
  });

  useEffect(() => {
    setIsButtonDisable(true);
    setPassword({
      text: '',
      errorText: '',
    });
  }, [visible]);

  /**
   * Function to execute on cancel press
   */
  const onCancel = () => {
    if (onModalClose) {
      onModalClose();
    }
  };
  /**
   * function that toggle password.
   */
  const togglePassword = () => {
    setEncryptPassword(!encryptPassword);
  };

  const onChangePassword = (text: string) => {
    if (text) {
      const errorMsg = checkValidPassword(text);
      if (errorMsg !== '') {
        setPassword({
          text,
          errorText: errorMsg,
        });
        setIsButtonDisable(true);
      } else {
        setPassword({
          text,
          errorText: '',
        });
        setIsButtonDisable(false);
      }
    } else {
      setPassword({
        text: '',
        errorText: localStrings.passwordIsRequired,
      });
      setIsButtonDisable(true);
    }
  };

  const validatePassword = () => {
    if (password.text === '') {
      setPassword({
        text: '',
        errorText: localStrings.passwordIsRequired,
      });
      setIsButtonDisable(true);
    }
  };

  /**
   * Function Render Button view
   */
  const getButtonView = () => (
    <DoubleButtonContainer>
      <CancelButton onPress={() => onCancel()} style={styles.modalButton}>
        <SecondaryText>{secondaryBtnText}</SecondaryText>
      </CancelButton>
      <SubmitButton
        onPress={() => {
          if (onPress) {
            onPress(password.text);
          }
        }}
        style={styles.modalButton}
        disabled={isButtonDisable}
        selected={!isButtonDisable}>
        {!isLoading && <ButtonText>{modalPrimaryBtnName}</ButtonText>}
        {isLoading && <ActivityIndicator size="small" color={colors.white} />}
      </SubmitButton>
    </DoubleButtonContainer>
  );

  /**
   * Function Render Middle view Text or Input box
   */
  const getMiddleView = () => (
    <React.Fragment>
      <InputFieldWrapper>
        <FloatingLabelInput isFocus={true} inputValue={email} label={strings.email} editable={false} />
      </InputFieldWrapper>
      <InputFieldWrapper>
        <FloatingLabelInput
          encrypt={encryptPassword}
          inputValue={password}
          onChangeText={(text: string) => {
            onChangePassword(text);
          }}
          label={strings.password}
          onBlurHandler={() => validatePassword()}
          errorText={password.errorText}
          isShowOpenEye={true}
          onPressRightIcon={() => togglePassword()}
        />
      </InputFieldWrapper>
    </React.Fragment>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <ModalMainContainer>
        <ModalSubContainer>
          <ModalHeaderContainer>
            <ModalHeaderText>{localStrings.alreadyRegistered}</ModalHeaderText>
          </ModalHeaderContainer>
          {getMiddleView()}
          {getButtonView()}
        </ModalSubContainer>
      </ModalMainContainer>
    </Modal>
  );
};
export default LoginModalView;
