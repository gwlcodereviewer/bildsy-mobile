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
  AboutMeContainer,
} from './styled';
import {rpx} from '../../style/Dimen';
import colors from '../../style/colors';
import Badge from '../../assets/svg/Badge';
import {strings} from '../../constants/strings';
import {localStrings} from '../../localization/localStrings';

interface propType {
  changeToggleValue: () => void;
  toggle: boolean;
  data: any;
}

const CloseIcon = () => <Icon name="close" size={rpx(24)} color={colors.black} />;
const ProfessionalsModelView = (props: propType) => {
  const {data} = props;
  return (
    <>
      <Modal transparent={true} visible={props.toggle}>
        <TransparentView>
          <ParentViewContainer>
            <HeaderModalView>
              <TextModalView>{localStrings.profile}</TextModalView>
              <TouchableOpacity
                onPress={() => {
                  props.changeToggleValue();
                }}>
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
            <NameTextModal>{data?.ProfessionalName}</NameTextModal>
            <AboutMeContainer>
              <AboutMeText>{strings.aboutMe}</AboutMeText>
              <SmallText color={colors.black}>{data?.AboutMe}</SmallText>
            </AboutMeContainer>

            <HorizontalView>
              <SubView>
                <SmallText color={colors.grey}>{strings.companyName}</SmallText>
                <SmallText color={colors.black}>{data?.CompanyName}</SmallText>
              </SubView>
              <SubView>
                <SmallText color={colors.grey}>{strings.memberSince}</SmallText>
                <SmallText color={colors.black}>{moment(data?.CustomerSince).format('LL')}</SmallText>
              </SubView>
            </HorizontalView>
            <SmallText color={colors.grey}>{strings.addressWithoutAsterixSign}</SmallText>
            <SmallText color={colors.black}>{data?.StreetAddress}</SmallText>
          </ParentViewContainer>
        </TransparentView>
      </Modal>
    </>
  );
};
export default ProfessionalsModelView;
