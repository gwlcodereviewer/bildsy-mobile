// eslint-disable-next-line no-return-assign
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {localStrings} from '../../localization/localStrings';
import {
  TransparentView,
  ViewContainer,
  TextContainer,
  OptionString,
  ViewMain,
  CancelText,
  AwardContainer,
  AwardSubView,
  CompletedText,
  CenterSubView,
} from '../bids/bid/bidsStyled';
import colors from '../../style/colors';

interface propType {
  changeToggleValue?: (value: boolean) => void;
  toggle?: boolean;
  message: string;
  onConfirm?: () => void;
}
const ConfirmModal: React.FC<propType> = (props: propType) => (
  <Modal
    transparent={true}
    visible={props.toggle}
    onRequestClose={() => {
      if (props.changeToggleValue) props.changeToggleValue(false);
    }}>
    <TransparentView>
      <ViewContainer>
        <ViewMain>
          <TextContainer>{localStrings.confirmation}</TextContainer>
          <OptionString>{props.message}</OptionString>
        </ViewMain>
        <AwardContainer>
          <AwardSubView
            color={colors.white}
            onPress={() => {
              if (props.changeToggleValue) props.changeToggleValue(false);
            }}>
            <CenterSubView>
              <CancelText>{localStrings.cancel}</CancelText>
            </CenterSubView>
          </AwardSubView>
          <AwardSubView
            color={colors.primaryBlue}
            borderColor={colors.primaryBlue}
            onPress={() => {
              if (props.changeToggleValue) props.changeToggleValue(false);
              if (props?.onConfirm) props?.onConfirm();
            }}>
            <CompletedText color={colors.white}>{localStrings.yes}</CompletedText>
          </AwardSubView>
        </AwardContainer>
      </ViewContainer>
    </TransparentView>
  </Modal>
);

export default ConfirmModal;
