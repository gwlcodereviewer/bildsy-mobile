import React, {useState, useEffect} from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import CountDown from 'react-native-countdown-component';
import {connect} from 'react-redux';
import {ActivityIndicator, Keyboard, TouchableOpacity} from 'react-native';
import {WrapperContainer, SubmitButton, ButtonText, InputFieldContainer} from '../../style';
import BackIcon from '../../assets/svg/BackIcon';
import pngImages from '../../assets/images/pngImages';
import {
  PageTitleContainer,
  PageTitle,
  LabelText,
  ButtonContainer,
  MainBody,
  LabelTextContainer,
  TitleText,
  ClickableText,
  RowContainer,
} from './styled';
import {localStrings} from '../../localization/localStrings';
import {strings} from '../../constants/strings';
import {INavigation} from '../../types';
import {NAV_RESET_PASSWORD_SEND_EMAIL, NAV_RESET_PASSWORD_CREATE_PASSWORD} from '../../navigation/navConstants';
import styles from '../../style/style';
import {IVerificationPayload, IStore, ISendEmailPayload} from '../../redux/types';
import {callVerificationCodeAPI, callResetPasswordEmailSendAPI} from '../../redux/actions/auth';
import {showToastMessage} from '../../utils';
import colors from '../../style/colors';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  callVerificationCodeAPI: (param: IVerificationPayload) => Promise<any>;
  callResetPasswordEmailSendAPI: (param: ISendEmailPayload) => Promise<any>;
}
const ResetPasswordVerificationCode: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    route,
    callVerificationCodeAPI: pCallVerificationCodeAPI,
    callResetPasswordEmailSendAPI: pCallResetPasswordEmailSend,
  } = props;
  const {resetPassword, weJustSentVerificationCode, enterCode, didNotReceiveACode, resend, running, reStart} =
    localStrings;
  const email: string = route?.params?.email || '';

  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [encryptedEmail, setEncryptedEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [timerStatus, setTimerStatus] = useState<string>(running);
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);
  const [enableResend, setEnableResend] = useState<boolean>(false);
  /**
   * Function that change state.
   * @param text is user otp
   */
  const onCodeValueChange = (text: string) => {
    if (text?.length === 4) {
      setIsValidForm(true);
      setOtp(text);
      Keyboard.dismiss();
    }
  };

  /**
   * Verify code API calling.
   */
  const onVerify = () => {
    const param = {
      email,
      otp,
    };
    setIsAPIinProgress(true);
    pCallVerificationCodeAPI(param)
      .then((res: any) => {
        if (res?.Data && res?.Success) {
          setIsAPIinProgress(false);
          navigation?.navigate(NAV_RESET_PASSWORD_CREATE_PASSWORD, {email: res?.Data?.Email, otp});
        } else if (res?.Message && !res?.Success) {
          setIsAPIinProgress(false);
        }
      })
      .catch(() => {
        setIsAPIinProgress(false);
      });
  };

  /**
   * Function for creating encrypted email pattern.
   */
  useEffect(() => {
    const hiddenEmail = email?.replace(
      /(.{2})(.*)(?=@)/,
      (emailFirstStr: string, emailEncryptedStr: string, emailRestStr: string): string => {
        const pattern = emailEncryptedStr + emailRestStr.replace(/\S/g, '*');
        return pattern;
      },
    );
    setEncryptedEmail(hiddenEmail);
  }, [email]);

  /**
   * Resend Code on Email API call.
   */
  const onResendCode = () => {
    setIsAPIinProgress(true);
    if (timerStatus === running) {
      setTimerStatus(reStart);
    } else {
      setTimerStatus(running);
    }
    pCallResetPasswordEmailSend({email})
      .then((res: any) => {
        if (res?.Data && res?.Success) {
          setEnableResend(false);
          setIsAPIinProgress(false);
          showToastMessage(strings.success, res.Message);
        } else if (res.Message && !res.Success) {
          setIsAPIinProgress(false);
          setEnableResend(true);
          showToastMessage(strings.error, res.Message);
        }
      })
      .catch((error: any) => {
        setIsAPIinProgress(false);
        showToastMessage(strings.error, error);
      });
  };
  /**
   * Method for updating resend button state
   */
  const onTimeFinish = () => {
    setTimeout(() => {
      setEnableResend(true);
    }, 100);
  };
  /**
   * Page title and back navigation component.
   */
  const PageHeaderContainer = () => (
    <PageTitleContainer>
      <TouchableOpacity
        testID={strings.backIconBtn}
        onPress={() => navigation?.navigate(NAV_RESET_PASSWORD_SEND_EMAIL)}>
        <BackIcon />
      </TouchableOpacity>
      <PageTitle>{resetPassword}</PageTitle>
    </PageTitleContainer>
  );

  return (
    <WrapperContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <MainBody>
        <LabelTextContainer>
          <LabelText>{`${weJustSentVerificationCode} ${encryptedEmail}`}</LabelText>
        </LabelTextContainer>
        <TitleText>{enterCode}</TitleText>
        <OTPTextInput
          handleTextChange={(text: string) => onCodeValueChange(text)}
          style={styles.verificationCode}
          containerStyle={styles.verificationCodeContainer}
          keyboardType="number-pad"
          testID={strings.userOtp}
        />
        <InputFieldContainer>
          <CountDown
            until={300}
            id={timerStatus}
            size={20}
            onFinish={() => onTimeFinish()}
            digitStyle={styles.whiteBackground}
            digitTxtStyle={styles.timerTimeColor}
            timeToShow={['M', 'S']}
            timeLabels={{m: '', s: ''}}
            showSeparator
          />
        </InputFieldContainer>
        <RowContainer>
          <TitleText>{didNotReceiveACode}</TitleText>
          <TouchableOpacity disabled={!enableResend} testID={strings.resendBtn} onPress={() => onResendCode()}>
            <ClickableText selected={enableResend}>{resend}</ClickableText>
          </TouchableOpacity>
        </RowContainer>
        <ButtonContainer>
          <SubmitButton
            selected={isValidForm}
            testID={strings.verifyAndProceed}
            disabled={!isValidForm}
            onPress={() => onVerify()}>
            <ButtonText>
              {!isAPIinProgress && strings.verifyAndProceed}
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
  callVerificationCodeAPI,
  callResetPasswordEmailSendAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordVerificationCode);
