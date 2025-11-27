import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';
import colors from '../../style/colors';
import {ErrorText, InputContainer, InputHeader, InputWrapper, Required, SimpleLabel, SimpleView} from './styled';
import {rh, rpx, rw} from '../../style/Dimen';
import InputBox from '../inputBox';
import {RowView} from '../../style';

interface Props {
  testID?: string;
  label?: string;
  placeHolderText?: string;
  inputValue: any;
  floatingLabel?: boolean;
  encrypt?: boolean;
  errorText?: string;
  onChangeText?: (text: string) => void;
  onBlurHandler?: () => void;
  onPressIn?: () => void;
  onFocusHandler?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  isShowRightIcon?: boolean;
  rightIcon?: JSX.Element;
  onPressRightIcon?: () => void;
  editable?: boolean;
  isShowLeftIcon?: boolean;
  leftIcon?: JSX.Element;
  onPressLeftIcon?: () => void;
  onSubmitEditing?: () => void;
  width?: any;
  height?: any;
  borderColor?: string;
  showRightButton?: boolean;
  rightButtonText?: string;
  onPressRightButton?: () => void;
  keyboardType?: any;
  headerText?: string;
  isRequired?: boolean;
  maxLength?: number;
  isBottomBorderOnly?: boolean;
  isShowOpenEye?: boolean;
  textContentType?: any;
  enableFocus?: boolean;
  contextMenuHidden?: boolean;
  caretHidden?: boolean;
  onKeyPress?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  isFocus?: boolean;
}

const FloatingLabelInput = (props: Props) => {
  const {
    label,
    inputValue,
    floatingLabel = true,
    encrypt,
    errorText = '',
    onBlurHandler,
    onPressIn,
    onFocusHandler,
    multiline,
    numberOfLines,
    isShowOpenEye,
    rightIcon,
    onPressRightIcon,
    editable = true,
    isShowLeftIcon,
    leftIcon,
    onPressLeftIcon,
    width,
    height,
    borderColor,
    showRightButton,
    rightButtonText = '',
    onPressRightButton,
    keyboardType = 'default',
    headerText,
    isRequired = false,
    maxLength,
    placeHolderText,
    onChangeText,
    enableFocus,
    isBottomBorderOnly,
    textContentType,
    contextMenuHidden = false,
    autoCapitalize = 'sentences',
    caretHidden = false,
    onKeyPress,
    isFocus = false,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(isFocus);
  const [animatedIsFocused] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused]);
  useEffect(() => {
    if (enableFocus !== undefined && enableFocus !== isFocused) setIsFocused(enableFocus);
  }, [enableFocus]);
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocusHandler) {
      onFocusHandler();
    }
  };

  const handleBlur = () => {
    if (floatingLabel) {
      if (inputValue !== '') {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }
    }
    if (onBlurHandler) {
      onBlurHandler();
    }
  };
  const onPress = () => {
    if (onPressIn) onPressIn();
  };
  const labelStyle = {
    position: 'absolute' as const,
    paddingHorizontal: isBottomBorderOnly ? rw(5) : rw(15),
    marginTop: isBottomBorderOnly ? 0 : rh(5),
    backgroundColor: colors.white,
    marginLeft: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 5],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [rh(10), -rh(15)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [rpx(16), rpx(16)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.skipColor, colors.skipColor],
    }),
  };

  const FloatingLabel = () => (
    <SimpleView>
      {floatingLabel ? <Animated.Text style={labelStyle}>{label}</Animated.Text> : <SimpleLabel>{label}</SimpleLabel>}
    </SimpleView>
  );
  const ErrorView = () => <SimpleView>{errorText !== '' && <ErrorText>{errorText}</ErrorText>}</SimpleView>;

  const Header = () => (
    <SimpleView>
      {headerText && (
        <RowView>
          <InputHeader>{headerText}</InputHeader>
          {isRequired && <Required>{'*'}</Required>}
        </RowView>
      )}
    </SimpleView>
  );
  return (
    <InputContainer>
      <Header />
      <InputWrapper
        multiline={multiline === undefined ? false : multiline === true}
        height={height}
        width={width}
        borderColor={borderColor}
        backgroundColor={colors.white}
        isBottomBorderOnly={isBottomBorderOnly}>
        <FloatingLabel />
        <InputBox
          placeHolderText={placeHolderText}
          encrypt={encrypt}
          onChangeText={onChangeText}
          inputValue={inputValue}
          onFocusHandler={handleFocus}
          onBlurHandler={handleBlur}
          numberOfLines={numberOfLines}
          multiline={multiline === undefined ? false : multiline === true}
          editable={editable}
          isShowLeftIcon={isShowLeftIcon}
          isShowRightIcon={isShowOpenEye}
          keyboardType={keyboardType}
          height={height}
          isBottomBorderOnly={isBottomBorderOnly}
          showRightButton={showRightButton}
          rightButtonText={rightButtonText}
          onPressRightIcon={onPressRightIcon}
          maxLength={maxLength}
          contextMenuHidden={contextMenuHidden}
          autoCapitalize={autoCapitalize}
          textContentType={textContentType}
          rightIcon={rightIcon || undefined}
          leftIcon={leftIcon}
          onPressIn={onPress}
          caretHidden={caretHidden}
          onKeyPress={onKeyPress}
          {...rest}
        />
      </InputWrapper>
      <ErrorView />
    </InputContainer>
  );
};

export default FloatingLabelInput;
