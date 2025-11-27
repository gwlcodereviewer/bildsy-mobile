import React from 'react';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';
import {
  BottomElementsContainer,
  CarouselContainer,
  ProductImage,
  DescText,
  ProfileViewContainer,
  ProfileViewImage,
  ProfileDetailsContainer,
  ProfileName,
  ReadMoreLink,
  HeadingText,
  ProfileDate,
} from './carouselStyled';
import {NAV_BLOG_DETAILS} from '../../navigation/navConstants';
import {localStrings} from '../../localization/localStrings';

const Cards = (props: any) => {
  const {item} = props;
  const onBlogDetails = async () => {
    props.navigation.navigate(NAV_BLOG_DETAILS, {id: item.Id});
  };
  return (
    <>
      <CarouselContainer
        onPress={() => {
          onBlogDetails();
        }}>
        <ProductImage
          source={{
            uri: item?.DefaultPictureModel?.FullSizeImageUrl,
          }}
          resizeMode="cover"
        />
        <BottomElementsContainer>
          <HeadingText>{item.Title}</HeadingText>
          <DescText numberOfLines={2} ellipsizeMode="tail">
            {item.BodyOverview}
          </DescText>
          {item.Body.length > 410 && (
            <TouchableOpacity
              onPress={() => {
                onBlogDetails();
              }}>
              <ReadMoreLink>Read More</ReadMoreLink>
            </TouchableOpacity>
          )}
          <ProfileViewContainer>
            <ProfileViewImage
              source={{
                uri: item?.CustomerAvatar,
              }}
              resizeMode="cover"
            />
            <ProfileDetailsContainer>
              <ProfileName>{`${localStrings.by} ${item.CreatedByName}`}</ProfileName>
              <ProfileDate>{moment(item.CreatedOn).format('LL')}</ProfileDate>
            </ProfileDetailsContainer>
          </ProfileViewContainer>
        </BottomElementsContainer>
      </CarouselContainer>
    </>
  );
};
export default Cards;
