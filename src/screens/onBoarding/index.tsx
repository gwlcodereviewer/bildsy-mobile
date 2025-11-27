import {View, Pressable, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {IndicatorViewPager, PagerDotIndicator} from 'react-native-best-viewpager';
import ViewPager from '@react-native-community/viewpager';
import ViewPage from './ViewPage';
import {rh, rw} from '../../style/Dimen';
import {
  BottomPanelContainer,
  NextText,
  SkipText,
  PagerIndicator,
  PagerIndicatorSelected,
  PagerIndicatorNormal,
} from './styled';
import {INavigation} from '../../types';
import {NAV_LOGIN} from '../../navigation/navConstants';
import {strings} from '../../constants/strings';

interface Props {
  navigation?: INavigation;
}

const OnBoarding: React.FC<Props> = (props: Props) => {
  const viewPager = useRef<ViewPager | null>();
  const [currentPage, setCurrentPage] = useState(0);

  const renderDotIndicator = () => (
    <PagerDotIndicator
      pageCount={2}
      dotStyle={styles.dotStyle}
      selectedDotStyle={styles.selectedDotStyle}
      style={styles.pageStyle}
    />
  );
  const onNextPress = () => {
    if (viewPager && viewPager.current) viewPager.current.setPage(currentPage === 0 ? 1 : 0);

    setCurrentPage(currentPage === 0 ? 1 : 0);
  };

  const skipPage = () => {
    props?.navigation?.navigate(NAV_LOGIN);
  };
  return (
    <View style={styles.container}>
      <ViewPager
        initialPage={0}
        onPageSelected={(e: any) => {
          setCurrentPage(e.nativeEvent.position);
        }}
        ref={(ref: any) => {
          viewPager.current = ref;
        }}
        style={styles.indicatorViewPager}>
        <View>
          <ViewPage pageNo={0} />
        </View>
        <View>
          <ViewPage pageNo={1} />
        </View>
      </ViewPager>

      <BottomPanelContainer>
        <Pressable testID={strings.skipButton} onPress={skipPage}>
          <SkipText>Skip</SkipText>
        </Pressable>
        {currentPage === 1 ? (
          <PagerIndicator>
            <PagerIndicatorNormal />
            <PagerIndicatorSelected />
          </PagerIndicator>
        ) : (
          <PagerIndicator>
            <PagerIndicatorSelected />
            <PagerIndicatorNormal />
          </PagerIndicator>
        )}
        <Pressable testID={strings.pageChangeButton} onPress={currentPage === 0 ? onNextPress : skipPage}>
          <NextText>{currentPage === 0 ? 'Next' : 'Done'}</NextText>
        </Pressable>
      </BottomPanelContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  indicatorViewPager: {height: '100%'},
  selectedDotStyle: {
    backgroundColor: '#ed772f',
    height: rh(7),
    width: rw(7),
  },
  pageStyle: {
    backgroundColor: 'red',
    position: 'absolute',
    top: '90%',
    left: '50%',
    right: '50%',
  },
  dotStyle: {
    height: rh(7),
    width: rw(7),
    backgroundColor: '#828282',
  },
});

export default OnBoarding;
