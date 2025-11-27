import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, Keyboard, TouchableOpacity} from 'react-native';
import {WrapperContainer, InputFieldContainer, SubmitButton, ButtonText} from '../../style';
import BackIcon from '../../assets/svg/BackIcon';
import {PageTitleContainer, PageTitle, ButtonContainer, MainBody} from './styled';
import {localStrings} from '../../localization/localStrings';
import FloatingLabelInput from '../../components/floatingLabelInput';
import {strings} from '../../constants/strings';
import {checkValidPassword, equalNewPasswordAndConfirm, isValidPassword, showToastMessage} from '../../utils';
import {INavigation} from '../../types';
import {NAV_LOGIN} from '../../navigation/navConstants';
import {IChangePasswordPayload, IStore} from '../../redux/types';
import {callResetPasswordAPI} from '../../redux/actions/auth';
import colors from '../../style/colors';
import pngImages from '../../assets/images/pngImages';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  callResetPasswordAPI: (param: IChangePasswordPayload) => Promise<any>;
}
interface IFormInput {
  newPassword: string;
  newPasswordError: string;
  confirmPassword: string;
  confirmPasswordError: string;
}
const ResetPasswordCreatePassword: React.FC<Props> = (props: Props) => {
  const {navigation, route, callResetPasswordAPI: _callResetPasswordAPI} = props;
  const email: string = route?.params?.email;
  const otp: string = route?.params?.otp;
  const {resetPassword, passwordIsRequired, confirmPasswordIsRequired} = localStrings;
  const [encryptPassword, setEncryptPassword] = useState<boolean>(true);
  const [encryptConfirmPassword, setEncryptConfirmPassword] = useState<boolean>(true);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);

  const [formInput, setFormInput] = useState<IFormInput>({
    newPassword: '',
    newPasswordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
  });
  /**
   * Function for toggle password visibility.
   */
  const togglePassword = () => {
    setEncryptPassword(!encryptPassword);
  };
  /**
   * Function for toggle confirm password visibility.
   */
  const toggleConfirmPassword = () => {
    setEncryptConfirmPassword(!encryptConfirmPassword);
  };
  /**
   * Function for validation in password filed.
   */
  const validatePassword = () => {
    if (formInput.newPassword === '') {
      setFormInput({
        ...formInput,
        newPasswordError: passwordIsRequired,
      });
    }
  };
  /**
   * Function for validation in password filed.
   * @param text value of Password.
   */
  const onChangePassword = (text: string) => {
    if (text) {
      const errorMsg = checkValidPassword(formInput.newPassword);
      if (errorMsg !== '') {
        setFormInput({
          ...formInput,
          newPassword: text,
          newPasswordError: errorMsg,
        });
      } else {
        setFormInput({
          ...formInput,
          newPassword: text,
          newPasswordError: '',
        });
      }
    } else {
      setFormInput({
        ...formInput,
        newPassword: '',
        newPasswordError: passwordIsRequired,
      });
    }
  };
  /**
   * function for validate confirm password filed.
   */
  const validateConfirmPassword = () => {
    if (formInput.confirmPassword === '') {
      setFormInput({
        ...formInput,
        confirmPasswordError: confirmPasswordIsRequired,
      });
    }
  };
  /**
   * function for validate confirm password filed.
   */
  const onChangeConfirmPassword = (text: string) => {
    if (text) {
      setFormInput({
        ...formInput,
        confirmPassword: text,
      });
    } else {
      setFormInput({
        ...formInput,
        confirmPassword: '',
        confirmPasswordError: confirmPasswordIsRequired,
      });
    }
  };
  /**
   * Function for reset password.
   */
  const onResetPassword = () => {
    const {newPassword, confirmPassword} = formInput;
    setIsAPIinProgress(true);
    _callResetPasswordAPI({email, password: newPassword, confirmPassword, otp})
      .then(res => {
        if (res && res.Success === true) {
          setIsAPIinProgress(false);
          navigation?.navigate(NAV_LOGIN);
          showToastMessage(strings.success, res.Message);
        } else if (res.Message && !res.Success) {
          setIsAPIinProgress(false);
        }
        setIsAPIinProgress(false);
      })
      .catch(error => {
        setIsAPIinProgress(false);
        showToastMessage(strings.error, error);
      });
  };
  /**
   * Function for dynamic validation.
   */
  useEffect(() => {
    if (formInput.newPassword !== '') {
      const errorMsg = checkValidPassword(formInput.newPassword);
      setFormInput({
        ...formInput,
        newPasswordError: errorMsg,
      });
    }
  }, [formInput.newPassword]);

  useEffect(() => {
    if (formInput.newPassword !== '' && formInput.confirmPassword !== '') {
      const errorMsg = equalNewPasswordAndConfirm(formInput.newPassword, formInput.confirmPassword);
      setFormInput({
        ...formInput,
        confirmPasswordError: errorMsg,
      });
    }
  }, [formInput.newPassword, formInput.confirmPassword]);
  useEffect(() => {
    if (
      formInput.newPassword &&
      !isValidPassword(formInput.newPassword) &&
      formInput.confirmPassword &&
      !formInput.confirmPasswordError
    ) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  });
  /**
   * Function that contain Page header component.
   */
  const PageHeaderContainer = () => (
    <PageTitleContainer>
      <TouchableOpacity onPress={() => navigation?.navigate(NAV_LOGIN)}>
        <BackIcon />
      </TouchableOpacity>
      <PageTitle>{resetPassword}</PageTitle>
    </PageTitleContainer>
  );

  return (
    <WrapperContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <MainBody onPress={() => Keyboard.dismiss()}>
        <InputFieldContainer>
          <FloatingLabelInput
            testID={strings.mandatoryNewPassword}
            encrypt={encryptPassword}
            inputValue={formInput.newPassword}
            onChangeText={(text: string) => {
              onChangePassword(text);
            }}
            label={strings.newPassword2}
            onBlurHandler={() => validatePassword()}
            errorText={formInput.newPasswordError}
            isShowOpenEye={true}
            onPressRightIcon={() => togglePassword()}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <FloatingLabelInput
            testID={strings.mandatoryConfirmNewPassword}
            encrypt={encryptConfirmPassword}
            inputValue={formInput.confirmPassword}
            onChangeText={(text: string) => {
              onChangeConfirmPassword(text);
            }}
            label={strings.confirmNewPassword2}
            onBlurHandler={() => validateConfirmPassword()}
            errorText={formInput.confirmPasswordError}
            isShowOpenEye={true}
            onPressRightIcon={() => toggleConfirmPassword()}
          />
        </InputFieldContainer>
        <ButtonContainer>
          <SubmitButton
            testID={strings.resetPassword}
            selected={isValidForm}
            disabled={!isValidForm}
            onPress={() => onResetPassword()}>
            <ButtonText>
              {!isAPIinProgress && strings.resetPassword}
              {isAPIinProgress && <ActivityIndicator size="small" color={colors.white} />}
            </ButtonText>
          </SubmitButton>
        </ButtonContainer>
      </MainBody>
    </WrapperContainer>
  );
};
const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callResetPasswordAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordCreatePassword);
