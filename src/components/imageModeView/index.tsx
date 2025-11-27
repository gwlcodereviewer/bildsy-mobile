import React from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {HeaderModalView, ImageViewContainer, ParentViewContainer, TextModalView, TransparentView} from './styled';
import {rpx, rw} from '../../style/Dimen';
import colors from '../../style/colors';

interface propType {
  changeToggleValue: () => void;
  toggle: boolean;
  data: any;
}

const CloseIcon = () => <Icon name="close" size={rpx(20)} color={colors.black} />;
const ImageModel = (props: propType) => {
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
              <TextModalView>{data?.FileName ? data?.FileName : data?.fileName}</TextModalView>
              <TouchableOpacity onPress={() => props.changeToggleValue()}>
                <CloseIcon />
              </TouchableOpacity>
            </HeaderModalView>
            <ImageViewContainer source={data?.FilePath ? {uri: data?.FilePath} : {uri: data?.uri}} />
          </ParentViewContainer>
        </TransparentView>
      </Modal>
    </>
  );
};

export default ImageModel;
