import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {ActivityIndicator, Keyboard} from 'react-native';
import {WrapperContainer, InputFieldContainer, SubmitButton, ButtonText} from '../../style';
import BackIcon from '../../assets/svg/BackIcon';
import {PageTitleContainer, PageTitle, LabelText, ButtonContainer, MainBody} from './styled';
import {localStrings} from '../../localization/localStrings';
import FloatingLabelInput from '../../components/floatingLabelInput';
import {strings} from '../../constants/strings';
import {isEmailOrPhoneValid, isValidEmail, showToastMessage} from '../../utils';
import {INavigation, IResetPasswordSendEmailResponse} from '../../types';
import {NAV_RESET_PASSWORD_VERIFICATION_CODE, NAV_LOGIN} from '../../navigation/navConstants';
import {callResetPasswordEmailSendAPI} from '../../redux/actions/auth';
import {IStoreResetPassword, ISendEmailPayload} from '../../redux/types';
import colors from '../../style/colors';
import pngImages from '../../assets/images/pngImages';

interface Props {
  navigation: INavigation;
  callResetPasswordEmailSendAPI: (param: ISendEmailPayload) => Promise<any>;
  resetPasswordSendEmail: IResetPasswordSendEmailResponse;
}
const ResetPasswordSendEmail: React.FC<Props> = (props: Props) => {
  const {navigation, callResetPasswordEmailSendAPI: pCallResetPasswordEmailSendAPI} = props;
  const {resetPassword, enterEmail, emailIsRequired} = localStrings;
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);

  /**
   * Function for sending mail
   */
  const onRecover = () => {
    setIsAPIinProgress(true);
    pCallResetPasswordEmailSendAPI({email})
      .then((res: IResetPasswordSendEmailResponse) => {
        if (res.Data && res.Success) {
          setEmail('');
          setIsAPIinProgress(false);
          navigation.navigate(NAV_RESET_PASSWORD_VERIFICATION_CODE, {email: res.Data.Email});
        }
        setIsAPIinProgress(false);
      })
      .catch(() => {
        setIsAPIinProgress(false);
      });
  };

  /**
   * Function for validate email field.
   * @param text value of Email
   */
  const onEmailChange = (text: string) => {
    if (text) {
      setEmail(text);
    } else {
      setEmail('');
      setEmailError(emailIsRequired);
    }
  };
  /**
   * Function for dynamic validation
   */
  useEffect(() => {
    if (email !== '') {
      const errorMsg = isEmailOrPhoneValid(email);
      setEmailError(errorMsg);
    }
    if (!isValidEmail(email)) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [email]);
  /**
   * Function that contain screen header.
   */
  const PageHeaderContainer = () => (
    <PageTitleContainer>
      <TouchableOpacity
        testID={strings.backIconBtn}
        onPress={() => {
          setEmail('');
          navigation.navigate(NAV_LOGIN);
        }}>
        <BackIcon />
      </TouchableOpacity>
      <PageTitle>{resetPassword}</PageTitle>
    </PageTitleContainer>
  );

  return (
    <WrapperContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <MainBody testID={strings.keyboardDismissButton} onPress={() => Keyboard.dismiss()}>
        <LabelText>{enterEmail}</LabelText>
        <InputFieldContainer>
          <FloatingLabelInput
            testID={strings.userEmail}
            inputValue={email}
            onChangeText={(text: string) => {
              onEmailChange(text);
            }}
            label={strings.emailAddress}
            errorText={emailError}
            autoCapitalize="none"
          />
        </InputFieldContainer>
        <ButtonContainer>
          <SubmitButton
            selected={isValidForm}
            disabled={!isValidForm}
            testID={strings.recoverButton}
            onPress={() => onRecover()}>
            <ButtonText>
              {!isAPIinProgress && strings.recover}
              {isAPIinProgress && <ActivityIndicator size="small" color={colors.white} />}
            </ButtonText>
          </SubmitButton>
        </ButtonContainer>
      </MainBody>
    </WrapperContainer>
  );
};
const mapStateToProps = (store: IStoreResetPassword) => ({
  resetPasswordSendEmail: store.resetPassword.payload,
});
const mapDispatchToProps = {
  callResetPasswordEmailSendAPI,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordSendEmail);
