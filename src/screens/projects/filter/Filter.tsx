import React, {useState, useCallback, useEffect} from 'react';
import {View, Animated} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';

import Slider from 'rn-range-slider';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strings} from '../../../constants/strings';

import {
  ProjectContainer,
  BottomContainer,
  ClearAllText,
  Wrapper,
  SliderLabel,
  WrapperField,
  CalenderImage,
  RowView,
  ApplyButton,
  ButtonText,
} from '../styled';
import {localStrings} from '../../../localization/localStrings';
import {PageTitleContainer, PageTitle} from '../../../style';
import BackIcon from '../../../assets/svg/BackIcon';
import {DropDownRowContainer, FullWidthDropDown, DropDownView} from '../../addProject/styled';
import {rw, rh, rpx} from '../../../style/Dimen';
import colors from '../../../style/colors';
import styles from '../../../style/style';
import {INavigation, LocationType, LocationResponseType, LocationDataType} from '../../../types';
import {showToastMessage} from '../../../utils';
import {IStore} from '../../../redux/types';
import {callGetProjectTypeAPI, locationList} from '../../../redux/actions/auth';
import FloatingLabelInput from '../../../components/floatingLabelInput';
import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import RailSelected from '../Slider/RailSelected';
import Label from '../Slider/Label';
import Notch from '../Slider/Notch';

import DownArrow from '../../../assets/svg/DownArrow';
import pngImages from '../../../assets/images/pngImages';
import {MAX_BUDGET_RANGE, navProjects} from '../../../constants/utils/constantData';

interface Props {
  navigation: INavigation;
  callGetProjectTypeAPI: () => Promise<any>;
  locationList: () => Promise<any>;
}
const Filter: React.FC<Props> = (props: Props) => {
  const {navigation, callGetProjectTypeAPI: pCallGetProjectTypeAPI, locationList: _locationList} = props;
  const {selectAll, budgetInUSD, startStr, endStr, filterToDateBeGreater, select} = localStrings;
  const {confirm, cancel} = strings;

  const [date, setDate] = useState<string>('');
  const [eXCompletionDate, setEXCompletionDate] = useState<string>('');
  const [projectTypeResponse, setProjectTypeResponse] = useState<LocationDataType[]>([]);
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(MAX_BUDGET_RANGE);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(MAX_BUDGET_RANGE);
  const [projectTypeId, setProjectTypeId] = useState<number>(0);
  const [locationId, setLocationId] = useState<string>('');
  const [floatingLabel] = useState<boolean>(false);
  const [rangeDisabled] = useState<boolean>(false);
  const [projectTypeData, setProjectTypeData] = useState({
    projectTypeIndex: 0,
    projectTypeName: select,
  });
  const [locationTypeData, setLocationTypeData] = useState({
    locationTypeIndex: 0,
    locationTypeName: select,
  });
  const [locationTypeResponse, setLocationTypeResponse] = useState<LocationDataType[]>([]);
  const [locationTypeList, setLocationTypeList] = useState<string[]>([]);
  const [projectTypeList, setProjectTypeList] = useState<string[]>([]);
  const [animatedIsFocused] = useState(new Animated.Value(1));
  let locationIndexNode: LocationType;

  const labelStyle = {
    position: 'absolute' as const,
    paddingHorizontal: rw(5),
    marginTop: rh(5),
    backgroundColor: colors.white,
    marginLeft: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [rh(5), -rh(15)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [1, 1],
      outputRange: [rpx(16), rpx(16)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.skipColor, colors.skipColor],
    }),
  };
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={`$${value}`} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback((lowN: number, highN: number) => {
    setLow(lowN);
    setHigh(highN);
  }, []);
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    _locationList()
      .then((res: LocationResponseType) => {
        setLocationTypeResponse(res.Data);
        const arrLocationTypeList = res.Data.map((e: any, i: number) => {
          if (i === 0) {
            return select;
          }
          return `${res.Data[i].Text}`;
        });
        setLocationTypeList(arrLocationTypeList);
      })
      .catch(() => {});
  }, [props]);

  useEffect(() => {
    pCallGetProjectTypeAPI()
      .then(res => {
        const arrProjectTypeList: string[] = [];
        if (res != null && res?.Data?.length > 1) {
          setProjectTypeResponse(res.Data);
          for (let i = 0; i < res?.Data?.length; ) {
            arrProjectTypeList.push(res.Data[i].Text);
            i += 1;
          }
          arrProjectTypeList[0] = strings.select;
          setProjectTypeList(arrProjectTypeList);
        }
      })
      .catch(() => {});
  }, [props]);

  const onSelectLocationType = (index: number, text: string) => {
    setLocationTypeData({locationTypeIndex: index, locationTypeName: text});
    locationIndexNode = locationTypeResponse[index];
    if (locationIndexNode?.Value === '' || index === 0) {
      setLocationId('');
    } else {
      setLocationId(locationIndexNode?.Value);
    }
  };

  const onSelectProjectType = (index: number, text: string) => {
    setProjectTypeData({projectTypeIndex: index, projectTypeName: text});
    const projectIndexNode: LocationDataType = projectTypeResponse[index];
    setProjectTypeId(Number(projectIndexNode.Value));
  };

  useEffect(() => {
    AsyncStorage.getItem('FilterData')
      .then(async data => {
        const projectData = JSON.parse(`${data}` || '');
        if (projectData !== null) {
          setDate(projectData.date);
          setEXCompletionDate(projectData.eXCompletionDate);
          setProjectTypeId(projectData.projectTypeId || 0);
          setProjectTypeData(projectData.projectTypeData);
          setLocationTypeData(projectData.locationTypeData);
          setLow(projectData.low);
          setHigh(projectData.high);
          if (projectData.projectTypeId === 0) {
            setProjectTypeData({projectTypeIndex: 0, projectTypeName: select});
          }
          if (projectData.locationId === 0) {
            setLocationId('');
          } else {
            setLocationId(locationTypeResponse[projectData.locationId].Value);
          }
        }
      })
      .catch(() => {});
  }, [navigation]);

  const PageHeaderContainer = () => (
    <PageTitleContainer>
      <TouchableOpacity testID={strings.backIconButton} onPress={() => navigation.goBack()}>
        <BackIcon />
      </TouchableOpacity>
      <PageTitle>{localStrings.projects}</PageTitle>
    </PageTitleContainer>
  );

  const onSubmit = async () => {
    const obj = {
      date,
      eXCompletionDate,
      projectTypeId,
      locationId,
      projectTypeData,
      locationTypeData,
      low,
      high,
    };
    const stringObj = await JSON.stringify(obj);
    AsyncStorage.setItem('FilterData', stringObj);

    if (
      projectTypeId === 0 &&
      locationId === '' &&
      date === '' &&
      eXCompletionDate === '' &&
      low === 0 &&
      high === MAX_BUDGET_RANGE
    ) {
      navigation.navigate(navProjects);
    } else {
      navigation.navigate(navProjects, {
        locationId,
        projectTypeId,
        exRate: `${low},${high}`,
        startDate: date,
        endDate: eXCompletionDate,
        projectTypeData,
        locationTypeData,
        low,
        high,
      });
    }
  };
  const clearAll = () => {
    low === 0;
    high === MAX_BUDGET_RANGE;
    setLocationId('');
    setProjectTypeId(0);
    setDate('');
    setEXCompletionDate('');
    setLow(0);
    setHigh(MAX_BUDGET_RANGE);

    setProjectTypeData({
      projectTypeIndex: 0,
      projectTypeName: select,
    });
    setLocationTypeData({
      locationTypeIndex: 0,
      locationTypeName: select,
    });

    (async () => {
      try {
        await AsyncStorage.removeItem('FilterData');
      } catch (e) {
        // remove error
        console.log('error occurred');
      }
    })();
    navigation.navigate(navProjects, {
      locationId: '',
      projectTypeId: 0,
      projectStatusId: 0,
      exRate: '',
      startDate: '',
      endDate: '',
      projectTypeData: {
        projectTypeIndex: 0,
        projectTypeName: select,
      },
      locationTypeData: {
        locationTypeIndex: 0,
        locationTypeName: select,
      },
    });
  };
  const OpenCalender = (
    changeDate: {
      (value: React.SetStateAction<string>): void;
      (value: React.SetStateAction<string>): void;
      (arg0: string): void;
    },
    typeData: string,
  ) => (
    <DatePicker
      style={styles.datePicker2}
      mode="date"
      format={strings.yearDateFormate}
      maxDate="12/31/2099"
      confirmBtnText={confirm}
      cancelBtnText={cancel}
      iconComponent={<CalenderImage source={pngImages.calenderIcon} />}
      customStyles={{
        dateIcon: {
          marginTop: -50,
        },
        dateInput: {
          width: 0,
          height: 0,
          marginLeft: 0,
          borderWidth: 0,
          margin: 0,
        },
      }}
      onDateChange={(startDate: string) => {
        if (typeData === startStr) {
          if (checkDateValidation(startDate, eXCompletionDate)) {
            changeDate(startDate);
          } else {
            showToastMessage(strings.error, filterToDateBeGreater);
          }
        } else if (checkDateValidation(date, startDate)) {
          changeDate(startDate);
        } else {
          showToastMessage(strings.error, filterToDateBeGreater);
        }
      }}
    />
  );

  const LocationDropDown = () => (
    <>
      <DropDownView>
        <Animated.Text style={labelStyle}>{strings.location}</Animated.Text>
      </DropDownView>
      <ModalDropdown
        defaultValue={locationTypeData?.locationTypeName || select}
        defaultIndex={locationTypeData?.locationTypeIndex || 0}
        options={locationTypeList}
        dropdownStyle={styles.fullWidthDropDownModal}
        style={styles.fullWidthDropDownStyle}
        textStyle={styles.fullWidthDropDownText}
        dropdownTextStyle={styles.dropDownModalText}
        testID={strings.projectLocation}
        onSelect={(index: string, text: string) => {
          onSelectLocationType(Number(index), text);
        }}
        renderRightComponent={() => <DownArrow />}
      />
    </>
  );
  const ProjectTypeDropDown = () => (
    <>
      <DropDownView>
        <Animated.Text style={labelStyle}>{strings.projectTypeWithoutAsterixSign}</Animated.Text>
      </DropDownView>
      <ModalDropdown
        defaultValue={projectTypeData?.projectTypeName || select}
        defaultIndex={projectTypeData?.projectTypeIndex || 0}
        options={projectTypeList}
        dropdownStyle={styles.fullWidthDropDownModal}
        style={styles.fullWidthDropDownStyle}
        textStyle={styles.fullWidthDropDownText}
        dropdownTextStyle={styles.dropDownModalText}
        testID={strings.projectType}
        onSelect={async (index: string, text: string) => {
          onSelectProjectType(Number(index), text);
        }}
        renderRightComponent={() => <DownArrow />}
      />
    </>
  );
  return (
    <>
      <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
        <PageHeaderContainer />
        <BottomContainer>
          <Wrapper>
            <ClearAllText testID={strings.clearField} onPress={clearAll}>
              {localStrings.clearAll}
            </ClearAllText>
            <WrapperField>
              <DropDownRowContainer>
                <FullWidthDropDown>
                  <ProjectTypeDropDown />
                </FullWidthDropDown>
              </DropDownRowContainer>
            </WrapperField>
            <WrapperField>
              <DropDownRowContainer>
                <FullWidthDropDown>
                  <LocationDropDown />
                </FullWidthDropDown>
              </DropDownRowContainer>
            </WrapperField>
            <WrapperField>
              <SliderLabel>{budgetInUSD}</SliderLabel>
              <Slider
                min={min}
                max={max}
                step={1000}
                disableRange={rangeDisabled}
                floatingLabel={floatingLabel}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleValueChange}
                low={low}
                high={high}
              />
              <WrapperField>
                <SliderLabel>{`$${low} - $${high}`}</SliderLabel>
              </WrapperField>
            </WrapperField>
            <WrapperField>
              <RowView>
                <View style={styles.smallDateContainer}>
                  <FloatingLabelInput
                    testID={strings.expectedStartDate}
                    enableFocus={date !== ''}
                    editable={false}
                    label={strings.fromDate}
                    isShowOpenEye={true}
                    rightIcon={OpenCalender(setDate, startStr)}
                    inputValue={date}
                    onPressIn={() => OpenCalender(setDate, startStr)}
                    onChangeText={(text: string) => {
                      setDate(text);
                    }}
                  />
                </View>
                <View style={styles.smallDateContainer}>
                  <FloatingLabelInput
                    testID={strings.desiredCompletionDate}
                    enableFocus={eXCompletionDate !== ''}
                    label={strings.toDate}
                    editable={false}
                    isShowOpenEye={true}
                    rightIcon={OpenCalender(setEXCompletionDate, endStr)}
                    inputValue={eXCompletionDate}
                    onPressIn={() => OpenCalender(setEXCompletionDate, endStr)}
                    onChangeText={(text2: string) => {
                      setEXCompletionDate(text2);
                    }}
                  />
                </View>
              </RowView>
            </WrapperField>
          </Wrapper>
          <ApplyButton
            testID={strings.submitButton}
            onPress={onSubmit}
            color={colors.midnight}
            style={{marginHorizontal: rw(24)}}>
            <ButtonText>{strings.apply}</ButtonText>
          </ApplyButton>
        </BottomContainer>
      </ProjectContainer>
    </>
  );
};
const checkDateValidation = (startDate: string, endDate: string) => {
  if (Date.parse(endDate) < Date.parse(startDate)) {
    return false;
  }
  return true;
};
const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callGetProjectTypeAPI,
  locationList,
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
