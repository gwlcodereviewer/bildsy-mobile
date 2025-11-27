import React from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import moment from 'moment';
import {
  AboutMeText,
  HeaderModalView,
  HorizontalView,
  ImageContainer,
  NameTextModal,
  ParentViewContainer,
  SmallText,
  SubView,
  TextModalView,
  TransparentView,
  BadgeContainerProfile,
} from './modalStyled';
import {rpx, rw} from '../../style/Dimen';
import colors from '../../style/colors';
import Badge from '../../assets/svg/Badge';
import {strings} from '../../constants/strings';
import {SubmitButton, ButtonText} from '../../style';
import {localStrings} from '../../localization/localStrings';
import pngImages from '../../assets/images/pngImages';

interface propType {
  changeToggleValue: () => void;
  toggle: boolean;
  data: any;
  inviteBitActive: boolean;
  onSelectProfessional: (id: number) => void;
}

const CloseIcon = () => <Icon name="close" size={rpx(20)} color={colors.black} />;
const ProfessionalModel = (props: propType) => {
  const {data} = props;
  if (data === undefined) {
    return <></>;
  }
  return (
    <>
      <Modal transparent={true} visible={props.toggle}>
        <TransparentView>
          <ParentViewContainer>
            <HeaderModalView>
              <TextModalView>{strings.professionals}</TextModalView>
              <TouchableOpacity onPress={() => props.changeToggleValue()}>
                <CloseIcon />
              </TouchableOpacity>
            </HeaderModalView>
            <ImageContainer
              source={{
                uri: data?.CompanyLogo,
              }}
            />
            <BadgeContainerProfile>
              <Badge />
            </BadgeContainerProfile>
            <NameTextModal>{data?.FullName}</NameTextModal>
            <AboutMeText>{strings.aboutMe}</AboutMeText>
            <SmallText color={colors.black}>{data?.AboutMe}</SmallText>
            <HorizontalView>
              <SubView>
                <SmallText color={colors.grey}>{strings.companyName}</SmallText>
                <SmallText color={colors.black}>{data?.Company}</SmallText>
              </SubView>
              <SubView>
                <SmallText color={colors.grey}>{strings.memberSince}</SmallText>
                <SmallText color={colors.black}>{moment(data?.CreatedOn).format('LL')}</SmallText>
              </SubView>
            </HorizontalView>
            <SmallText color={colors.grey}>{strings.localAddress}</SmallText>
            <SmallText color={colors.black}>{data?.StreetAddress}</SmallText>
            {!props.inviteBitActive && (
              <SubmitButton
                selected={true}
                disabled={false}
                onPress={() => {
                  props.onSelectProfessional(data.Id);
                }}>
                <ButtonText>{localStrings.add}</ButtonText>
              </SubmitButton>
            )}
          </ParentViewContainer>
        </TransparentView>
      </Modal>
    </>
  );
};

export default ProfessionalModel;
