import React, {useState} from 'react';
import {TextInput} from 'react-native';
import colors from '../../style/colors';
import {
  InputSubContainer,
  InputText,
  LeftIconView,
  RightButton,
  RightIconView,
  SmallBorderButton,
  SmallText,
} from './styled';
import ShowPassword from '../../assets/images/inputIcons/showPassword';
import CloseEye from '../../assets/images/inputIcons/closeEye';
import styles from '../../style/style';
import Dollar from '../../assets/svg/Dollar';

interface Props {
  testID?: string;
  height?: number;
  isBottomBorderOnly?: boolean;
  inputValue: string;
  floatingLabel?: boolean;
  encrypt?: boolean;
  onChangeText?: (text: string) => void;
  onBlurHandler?: () => void;
  onPressIn?: () => void;
  onFocusHandler?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  isShowRightIcon?: boolean;
  rightIcon?: any;
  onPressRightIcon?: () => void;
  editable?: boolean;
  isShowLeftIcon?: boolean;
  leftIcon?: any;
  onPressLeftIcon?: () => void;
  showRightButton?: boolean;
  rightButtonText?: string;
  onPressRightButton?: () => void;
  keyboardType?: any;
  textContentType?: any;
  onFocus?: () => void;
  maxLength?: number;
  placeHolderText?: string;
  contextMenuHidden?: boolean;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  enableFocus?: boolean;
  caretHidden?: boolean;
  onKeyPress?: () => void;
}

const InputBox = (props: Props) => {
  const {
    inputValue,
    floatingLabel = true,
    encrypt,
    onBlurHandler,
    onPressIn,
    onFocusHandler,
    multiline = false,
    numberOfLines = 1,
    isShowRightIcon,
    rightIcon,
    onPressRightIcon,
    placeHolderText,
    editable = true,
    isShowLeftIcon,
    leftIcon,
    onPressLeftIcon,
    showRightButton,
    rightButtonText = '',
    onPressRightButton,
    keyboardType = 'default',
    onChangeText,
    caretHidden = false,
    height,
    isBottomBorderOnly,
    textContentType,
    maxLength,
    contextMenuHidden = false,
    autoCapitalize = 'sentences',
    enableFocus,
    onKeyPress,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

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
  const getTextColor = () => {
    let color = '';
    if (editable) {
      color = colors.black;
    } else {
      color = colors.black;
    }
    return color;
  };
  const getRightIcon = (rightIconValue?: boolean, encryptValue?: boolean) => {
    if (rightIconValue) {
      return rightIcon;
    }
    return encryptValue ? <CloseEye /> : <ShowPassword />;
  };
  const getLeftIcon = () => isShowLeftIcon && <Dollar />;
  return (
    <InputSubContainer multiline={multiline}>
      {isShowLeftIcon && (
        <LeftIconView testID="leftIcon" onPress={() => onPressLeftIcon}>
          {getLeftIcon()}
        </LeftIconView>
      )}
      {multiline === true ? (
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={{...styles.textArea, color: getTextColor()}}
          {...rest}
          onChangeText={onChangeText}
          value={inputValue}
          placeholder={placeHolderText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={encrypt}
          editable={editable}
          keyboardType={keyboardType}
          textContentType={textContentType}
          maxLength={maxLength}
          contextMenuHidden={contextMenuHidden}
          autoCapitalize={autoCapitalize}
        />
      ) : (
        <InputText
          {...rest}
          onChangeText={onChangeText}
          value={inputValue}
          placeholder={placeHolderText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={encrypt}
          numberOfLines={numberOfLines}
          editable={editable}
          isRightIcon={isShowRightIcon}
          keyboardType={keyboardType}
          color={getTextColor()}
          height={height}
          isBottomBorderOnly={isBottomBorderOnly}
          textContentType={textContentType}
          maxLength={maxLength}
          contextMenuHidden={contextMenuHidden}
          autoCapitalize={autoCapitalize}
          onPressIn={onPress}
          caretHidden={caretHidden}
          onKeyPress={onKeyPress}
        />
      )}

      {isShowRightIcon && (
        <RightIconView testID="rightIcon" onPress={onPressRightIcon}>
          {getRightIcon(rightIcon, encrypt)}
        </RightIconView>
      )}
      {showRightButton && (
        <RightButton>
          <SmallBorderButton>
            <SmallText>{rightButtonText || ''}</SmallText>
          </SmallBorderButton>
        </RightButton>
      )}
    </InputSubContainer>
  );
};

export default InputBox;
