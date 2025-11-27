/* eslint-disable global-require */
import React from 'react';
import {View} from 'react-native';
import {
  Container,
  ContainerImage,
  DescText,
  HeadingText,
  ImageIL,
  ImageViewContainer,
  ScreenHolder,
  TransparentView,
} from './styled';

interface Props {
  pageNo: number;
}
const imagesList = [
  require('../../assets/images/Illustration_1.png'),
  require('../../assets/images/Illustration_2.png'),
];

const ContentList = [
  {
    header: 'Create Projects',
    description: 'Looking to update your home? Get \nstarted with Bildsy!',
  },
  {
    header: 'Hire Experts',
    description: 'Search and hire top-rated industry \nprofessionals to collaborate with you \non your projects.',
  },
];
const ViewPage: React.FC<Props> = (props: Props) => (
  <Container>
    <ContainerImage source={require('../../assets/images/combined_shape.png')} resizeMode="cover">
      <TransparentView />
      <ScreenHolder />
      <ImageViewContainer>
        <ImageIL source={imagesList[props.pageNo]} />
        <HeadingText>{ContentList[props.pageNo].header}</HeadingText>
        <DescText>{ContentList[props.pageNo].description}</DescText>
      </ImageViewContainer>
    </ContainerImage>
  </Container>
);
export default ViewPage;
