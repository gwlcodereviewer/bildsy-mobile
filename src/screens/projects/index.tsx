/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Search from '../../assets/svg/Search';
import pngImages from '../../assets/images/pngImages';
import {FilterType, IStore, projectListType, searchFilterProjectListType} from '../../redux/types';
import {NAV_ADD_PROJECT, NAV_ADD_REVIEW_SCREEN} from '../../navigation/navConstants';
import {PROJECT_DATA} from '../../helpers/constants';

import {
  MenuElement,
  ProjectContainer,
  BottomContainer,
  CenterContainer,
  Menu,
  MenuText,
  SearchView,
  SearchContainer,
  BtnContainer,
  MainLoaderContainer,
  NoProjectText,
  PageTitleContainer2,
  TagWrapContainer,
  TagWrap,
  TagText,
  InputBox,
  Divider,
  Hr,
  TransparentView,
  ViewContainer,
  ViewMain,
  TextContainer,
  OptionString,
  AwardContainer,
  AwardSubView,
  CenterSubView,
  CancelText,
  CompletedText,
} from './styled';
import {INavigation, IProjectListdata} from '../../types';
import {PageTitle} from '../../style';
import DrawerIcon from '../../assets/svg/drawer/DrawerIcon';
import {localStrings} from '../../localization/localStrings';
import Project from '../../assets/svg/Project';
import Filter from '../../assets/svg/Filter';
import AddFloatingBtn from '../../assets/svg/AddFloatingBtn';
import styles from '../../style/style';
import colors from '../../style/colors';
import {projectList, searchFilterProjectList, filter} from '../../redux/actions/auth';
import {showToastMessage, VALIDATION_REGEX} from '../../utils';
import Cards from './card/Cards';
import {rpx} from '../../style/Dimen';
import {strings} from '../../constants/strings';
import {MAX_BUDGET_RANGE, MINIMUM_BUDGET_RANGE} from '../../constants/utils/constantData';

const {myProject, draft, completedProject, archiveProject, selectAll} = localStrings;

interface Props {
  navigation?: INavigation;
  projectList: (param: projectListType) => Promise<any>;
  searchFilterProjectList: (param: searchFilterProjectListType) => Promise<any>;
  filter: (param: FilterType) => Promise<any>;
  route?: INavigation;
  projectListDataProps?: any;
  isAPIInProgressProps?: boolean;
}

interface objType {
  projectStatusId?: number;
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  projectTypeId?: number;
  location?: string;
  exRate?: string;
  startDate?: string;
  endDate?: string;
}

const CloseIcon = () => <Icon name="close" size={rpx(20)} color={colors.midnight} />;

const ProjectScreen: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    projectList: _projectList,
    searchFilterProjectList: _searchFilterProjectList,
    route,
    filter: _filter,
    projectListDataProps,
    isAPIInProgressProps,
  } = props;
  const [lowBudgetValue, setLowBudgetValue] = useState<number>(MINIMUM_BUDGET_RANGE);
  const [highBudgetValue, setHighBudgetValue] = useState<number>(MAX_BUDGET_RANGE);

  const [projectListData, setProjectListData] = useState<any[]>(projectListDataProps || []);
  const [apiParamCount, setApiParamCount] = useState<number>(1);
  const [next, setNext] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [projectStatusId, setProjectStatusId] = useState<number>(0);
  const [text, setText] = useState<{value: string}>({value: ''});
  const [result, setResult] = useState<boolean>(false);

  const [isAPIInProgress, setAPIInProgress] = useState<boolean>(isAPIInProgressProps || false);
  const [isFilterAPIInProgress, setIsFilterAPIInProgress] = useState<boolean>(false);
  const [projectTypeId, setProjectTypeId] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [exRate, setExRate] = useState<string>(`${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [select, setSelect] = useState<string>(myProject);
  const [myProjectSearch, setMyProjectSearch] = useState<string>('');
  const [draftSearch, setDraftSearch] = useState<string>('');
  const [completeSearch, setCompleteSearch] = useState<string>('');
  const [archiveSearch, setArchiveSearch] = useState<string>('');
  const [reviewToggle, setReviewToggle] = useState(false);
  const [projectID, setProjectID] = useState(0);
  let searchingTerm = '';
  const [projectTypeData, setProjectTypeData] = useState({
    projectTypeIndex: 0,
    projectTypeName: selectAll,
  });
  const [locationTypeData, setLocationTypeData] = useState({
    locationTypeIndex: 0,
    locationTypeName: selectAll,
  });
  const {reviewButton, laterButton} = strings;
  const {review, reviewDescription, later, reviewNow} = localStrings;

  const [obj, setObj] = useState<objType>({
    projectStatusId,
    pageNumber: 1,
    pageSize: 15,
    searchTerm: searchingTerm || '',
    projectTypeId,
    location: '',
    exRate,
    startDate,
    endDate,
  });

  useEffect(() => {
    getProjectList(projectStatusId, 1, 15);
  }, []);

  const initialRender = useRef(true);
  const getProjectList = (id: number, page: number, size: number) => {
    setAPIInProgress(true);
    _projectList({
      projectStatusId: id,
      pageNumber: page,
      pageSize: size,
    })
      .then(async res => {
        if (res.Success) {
          setProjectListData(res.Data.ProjectOverviews);
          setApiParamCount(res.Data.PagingFilteringContext.PageNumber + 1);
          await setNext(res.Data.PagingFilteringContext.HasNextPage);
          setLoader(false);
          setAPIInProgress(false);
        }
      })
      .catch(() => {
        setAPIInProgress(false);
        setLoader(false);
      });
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (
      route?.params === undefined ||
      projectTypeId === 0 ||
      location === '' ||
      exRate === `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}` ||
      startDate === '' ||
      endDate === ''
    ) {
      setIsFilterAPIInProgress(true);
      setAPIInProgress(true);
      _filter({
        projectStatusId,
        pageNumber: 1,
        pageSize: 15,
        searchTerm: text.value || '',
        projectTypeId: projectTypeId || 0,
        location: location || '',
        exRate: exRate || `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
        startDate: startDate || '',
        endDate: endDate || '',
      })
        .then(async res => {
          if (res.Success) {
            await setProjectListData(res.Data.ProjectOverviews);
            await setApiParamCount(res.Data.PagingFilteringContext.PageNumber + 1);
            await setNext(res.Data.PagingFilteringContext.HasNextPage);
            setLoader(false);
            setAPIInProgress(false);
            setIsFilterAPIInProgress(true);
          }
        })
        .catch(() => {
          setLoader(false);
          setAPIInProgress(false);
          setIsFilterAPIInProgress(false);
        });
    }
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('FilterData')
      .then(async data => {
        const projectData = JSON.parse(`${data}` || '');
        if (projectData !== null) {
          setLowBudgetValue(projectData.low);
          setHighBudgetValue(projectData.high);
        }
      })
      .catch(() => {});
    if (route?.params !== undefined) {
      setAPIInProgress(true);
      setIsFilterAPIInProgress(true);
      setProjectTypeId(route?.params.projectTypeId);
      setLocation(route?.params.locationId || '');
      setExRate(route?.params.exRate);
      setStartDate(route?.params.startDate);
      setEndDate(route?.params.endDate);
      setProjectTypeData(route?.params?.projectTypeData);
      setLocationTypeData(route?.params?.locationTypeData);
      setObj({
        projectStatusId: 0,
        pageNumber: 1,
        pageSize: 15,
        searchTerm: searchingTerm || '',
        projectTypeId: route?.params.projectTypeId,
        location: route?.params.locationId || '',
        exRate: route?.params.exRate,
        startDate: route?.params.startDate || '',
        endDate: route?.params.endDate || '',
      });
      _filter({
        projectStatusId: projectStatusId || 0,
        pageNumber: 1,
        pageSize: 15,
        searchTerm: searchingTerm || '',
        projectTypeId: route?.params.projectTypeId ? route?.params.projectTypeId : 0,
        location: route?.params.locationId ? route?.params.locationId : '',
        exRate: route?.params.exRate ? route?.params.exRate : `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
        startDate: route?.params.startDate ? route?.params.startDate : '',
        endDate: route?.params.endDate ? route?.params.endDate : '',
      })
        .then((res: any) => {
          setProjectListData(res.Data.ProjectOverviews);
          setAPIInProgress(false);
          setIsFilterAPIInProgress(false);
          setApiParamCount(res.Data.PagingFilteringContext.PageNumber + 1);
          setNext(res.Data.PagingFilteringContext.HasNextPage);
        })
        .catch(() => {
          setLoader(false);
          setAPIInProgress(false);
          setIsFilterAPIInProgress(false);
        });
    }
  }, [route?.params]);

  const fetchMoreData = () => {
    next &&
      (() => {
        setLoader(true);
        _filter({
          projectStatusId: projectStatusId || 0,
          pageNumber: apiParamCount,
          pageSize: 15,
          searchTerm: searchingTerm || '',
          projectTypeId: projectTypeId || 0,
          location: location || '',
          exRate: exRate || `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
          startDate: startDate || '',
          endDate: endDate || '',
        })
          .then(async res => {
            if (res.Success) {
              const data = [...projectListData, ...res.Data.ProjectOverviews];
              setProjectListData(data);
              await setApiParamCount(res.Data.PagingFilteringContext.PageNumber + 1);
              await setNext(res.Data.PagingFilteringContext.HasNextPage);
            }
            setLoader(false);
          })
          .catch(() => {
            setLoader(false);
          });
      })();
  };

  const onAddProject = async () => {
    const projectDate = {
      id: false,
    };
    await AsyncStorage.setItem(PROJECT_DATA.setProjectData, JSON.stringify(projectDate))
      .then(() => {
        navigation?.navigate(NAV_ADD_PROJECT, {pager: 0});
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };

  const handleOnSearch = async (textVal: string) => {
    const testNew = textVal.replace(VALIDATION_REGEX.textCheck, '');
    if (select === myProject) {
      setText({...text, value: testNew || ''});
      await setMyProjectSearch(testNew);
    } else if (select === draft) {
      setText({...text, value: testNew || ''});
      await setDraftSearch(testNew);
    } else if (select === completedProject) {
      setText({...text, value: testNew || ''});
      await setCompleteSearch(testNew);
    } else if (select === archiveProject) {
      setText({...text, value: testNew || ''});
      await setArchiveSearch(testNew);
    } else {
      searchData2(testNew);
    }
    await searchData2(testNew);
  };

  const searchData2 = (searchValue: string) => {
    setAPIInProgress(true);
    _searchFilterProjectList({
      projectStatusId,
      pageNumber: 1,
      pageSize: 15,
      searchTerm: searchValue || '',
      projectTypeId: projectTypeId || 0,
      location: location || '',
      exRate: exRate || `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
      startDate: startDate || '',
      endDate: endDate || '',
    })
      .then(async res => {
        if (res.Success) {
          await setProjectListData(res.Data.ProjectOverviews);
          res.Data.ProjectOverviews.length === 0 ? setResult(true) : setResult(false);
          setAPIInProgress(false);
          await setApiParamCount(res.Data.PagingFilteringContext.PageNumber + 1);
          await setNext(res.Data.PagingFilteringContext.HasNextPage);
        }
      })
      .catch(() => {
        setAPIInProgress(false);
      });
  };

  useEffect(() => {
    setAPIInProgress(true);
    _searchFilterProjectList({
      projectStatusId,
      pageNumber: 1,
      pageSize: 15,
      searchTerm: searchingTerm || '',
      projectTypeId: projectTypeId || 0,
      location: location || '',
      exRate: exRate || `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
      startDate: startDate || '',
      endDate: endDate || '',
    })
      .then(async res => {
        if (res.Success) {
          setProjectListData(res.Data.ProjectOverviews);
          res.Data.ProjectOverviews.length === 0 ? setResult(true) : setResult(false);
          setAPIInProgress(false);
          await setApiParamCount(res.Data.PagingFilteringContext.PageNumber + 1);
          await setNext(res.Data.PagingFilteringContext.HasNextPage);
        }
      })
      .catch(() => {
        setAPIInProgress(false);
      });
  }, [projectStatusId]);

  const updateUI = (param: any) => {
    setAPIInProgress(true);
    _filter({...obj, ...param})
      .then(async res => {
        if (res.Success) {
          await setProjectListData(res.Data.ProjectOverviews);
          await setApiParamCount(res.Data.PagingFilteringContext.PageNumber + 1);
          await setNext(res.Data.PagingFilteringContext.HasNextPage);
          setAPIInProgress(false);
        }
      })
      .catch(() => {
        setAPIInProgress(false);
      });
  };
  const onChangeMenu = (pageName: string) => {
    setSelect(pageName);
    if (pageName === myProject) {
      setProjectStatusId(0);
      updateUI({
        ...obj,
        searchTerm: myProjectSearch || '',
        projectStatusId: 0,
        projectTypeId: 0,
        location: '',
        exRate: `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
        startDate: '',
        endDate: '',
        pageNumber: 1,
      });
    } else if (pageName === draft) {
      setProjectStatusId(50);
      updateUI({
        ...obj,
        searchTerm: draftSearch || '',
        projectStatusId: 50,
        projectTypeId: 0,
        location: '',
        exRate: `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
        startDate: '',
        endDate: '',
        pageNumber: 1,
      });
    } else if (pageName === completedProject) {
      setProjectStatusId(10);
      updateUI({
        ...obj,
        searchTerm: completeSearch || '',
        projectStatusId: 10,
        projectTypeId: 0,
        location: '',
        exRate: `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
        startDate: '',
        endDate: '',
        pageNumber: 1,
      });
    } else {
      setProjectStatusId(80);
      updateUI({
        ...obj,
        searchTerm: archiveSearch || '',
        projectStatusId: 80,
        projectTypeId: 0,
        location: '',
        exRate: `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
        startDate: '',
        endDate: '',
        pageNumber: 1,
      });
    }
  };

  const onAddReview = () => {
    setReviewToggle(false);
    navigation?.navigate(NAV_ADD_REVIEW_SCREEN, {
      id: projectID,
    });
  };

  const ShowReviewModal = () => (
    <Modal transparent={true} visible={reviewToggle}>
      <TransparentView>
        <ViewContainer>
          <ViewMain>
            <TextContainer>{review}</TextContainer>
            <OptionString>{reviewDescription}</OptionString>
          </ViewMain>
          <AwardContainer>
            <AwardSubView testID={laterButton} color={colors.white} onPress={() => setReviewToggle(false)}>
              <CenterSubView>
                <CancelText>{later}</CancelText>
              </CenterSubView>
            </AwardSubView>
            <AwardSubView color={colors.primaryBlue} onPress={() => onAddReview()}>
              <CompletedText color={colors.white}>{reviewNow}</CompletedText>
            </AwardSubView>
          </AwardContainer>
        </ViewContainer>
      </TransparentView>
    </Modal>
  );

  const PageHeaderContainer = () => {
    if (select === myProject) {
      searchingTerm = myProjectSearch;
    } else if (select === draft) {
      searchingTerm = draftSearch;
    } else if (select === completedProject) {
      searchingTerm = completeSearch;
    } else if (select === archiveProject) {
      searchingTerm = archiveSearch;
    } else {
      searchingTerm = '';
    }
    return (
      <PageTitleContainer2>
        <TouchableOpacity
          testID={strings.backIconButton}
          onPress={() => {
            Keyboard.dismiss();
            navigation?.toggleDrawer();
          }}>
          <DrawerIcon />
        </TouchableOpacity>
        {projectListData.length !== 0 || projectStatusId !== 0 || text.value !== '' || route?.params !== undefined ? (
          <>
            <SearchView>
              <SearchContainer>
                <Search />
              </SearchContainer>
              <InputBox
                testID={strings.search}
                autoFocus={text.value !== ''}
                placeholder={localStrings.search}
                placeholderTextColor={colors.white}
                value={searchingTerm || ''}
                onChangeText={handleOnSearch}
              />
            </SearchView>
            {projectStatusId === 0 && (
              <TouchableOpacity onPress={() => navigation?.navigate('FILTER')}>
                <Filter />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <PageTitle>{localStrings.projects}</PageTitle>
        )}
      </PageTitleContainer2>
    );
  };
  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      {PageHeaderContainer()}
      <BottomContainer>
        {projectListData.length > 0 || projectStatusId !== 0 || text.value !== '' || route?.params !== undefined ? (
          <>
            <Menu>
              <ScrollView horizontal={true} style={styles.scrollMenu}>
                <MenuElement
                  testID={localStrings.projects}
                  onPress={async () => {
                    onChangeMenu(myProject);
                  }}
                  select={select}
                  title={myProject}>
                  <MenuText select={select} title={myProject}>
                    {myProject}
                  </MenuText>
                </MenuElement>
                <Divider source={pngImages.dividerMenu} />
                <MenuElement
                  testID={localStrings.draftButton}
                  onPress={async () => {
                    onChangeMenu(draft);
                  }}
                  select={select}
                  title={draft}
                  width={125}
                  paddingLeft={27}
                  alignItems="center">
                  <MenuText select={select} title={draft}>
                    {draft}
                  </MenuText>
                </MenuElement>
                <Divider source={pngImages.dividerMenu} />
                <MenuElement
                  testID={localStrings.completeButton}
                  onPress={async () => {
                    onChangeMenu(completedProject);
                  }}
                  select={select}
                  title={completedProject}>
                  <MenuText select={select} title={completedProject}>
                    {completedProject}
                  </MenuText>
                </MenuElement>
                <Divider source={pngImages.dividerMenu} />
                <MenuElement
                  testID={localStrings.archiveButton}
                  onPress={async () => {
                    onChangeMenu(archiveProject);
                  }}
                  select={select}
                  title={archiveProject}>
                  <MenuText select={select} title={archiveProject}>
                    {archiveProject}
                  </MenuText>
                </MenuElement>
              </ScrollView>
              <Hr />
            </Menu>

            {projectStatusId === 0 && (
              <TagWrapContainer>
                {projectTypeData && projectTypeId !== 0 && (
                  <>
                    <TagWrap>
                      <TagText>{projectTypeData.projectTypeName}</TagText>
                      <TouchableOpacity
                        onPress={async () => {
                          setProjectTypeData({projectTypeIndex: 0, projectTypeName: selectAll});
                          setProjectTypeId(0);
                          setApiParamCount(1);
                          setObj({...obj, projectTypeId: 0, pageNumber: 1});
                          updateUI({projectTypeId: 0, pageNumber: 1});
                          const setDataObject = {
                            date: startDate,
                            eXCompletionDate: endDate,
                            projectTypeId: 0,
                            locationId: locationTypeData.locationTypeIndex,
                            projectTypeData: {projectTypeIndex: 0, projectTypeName: selectAll},
                            locationTypeData,
                            low: lowBudgetValue,
                            high: highBudgetValue,
                          };
                          const stringObj = await JSON.stringify(setDataObject);
                          AsyncStorage.setItem('FilterData', stringObj);
                        }}>
                        <CloseIcon />
                      </TouchableOpacity>
                    </TagWrap>
                  </>
                )}
                {locationTypeData &&
                  locationTypeData?.locationTypeName !== selectAll &&
                  locationTypeData?.locationTypeIndex !== 0 && (
                    <>
                      <TagWrap>
                        <TagText>{locationTypeData?.locationTypeName}</TagText>

                        <TouchableOpacity
                          onPress={async () => {
                            setLocationTypeData({locationTypeIndex: 0, locationTypeName: selectAll});
                            setLocation('');
                            setApiParamCount(1);
                            setObj({...obj, pageNumber: 1, location: ''});
                            updateUI({
                              pageNumber: 1,
                              location: '',
                            });
                            const setDataObject = {
                              date: startDate,
                              eXCompletionDate: endDate,
                              projectTypeId,
                              locationId: '',
                              projectTypeData,
                              locationTypeData: {locationTypeIndex: 0, locationTypeName: selectAll},
                              low: lowBudgetValue,
                              high: highBudgetValue,
                            };
                            const stringObj = await JSON.stringify(setDataObject);
                            AsyncStorage.setItem('FilterData', stringObj);
                          }}>
                          <CloseIcon />
                        </TouchableOpacity>
                      </TagWrap>
                    </>
                  )}
                {exRate !== undefined && exRate !== '' && exRate !== `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}` && (
                  <TagWrap>
                    <TagText>
                      ${lowBudgetValue} - ${highBudgetValue}
                    </TagText>
                    <TouchableOpacity
                      onPress={async () => {
                        setExRate(`${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`);
                        setApiParamCount(1);
                        setObj({...obj, exRate: `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`});
                        updateUI({
                          pageNumber: 1,
                          exRate: `${MINIMUM_BUDGET_RANGE},${MAX_BUDGET_RANGE}`,
                        });
                        setLowBudgetValue(MINIMUM_BUDGET_RANGE);
                        setHighBudgetValue(MAX_BUDGET_RANGE);
                        const setDataObject = {
                          date: startDate,
                          eXCompletionDate: endDate,
                          projectTypeId,
                          locationId: locationTypeData.locationTypeIndex,
                          projectTypeData,
                          locationTypeData,
                          low: MINIMUM_BUDGET_RANGE,
                          high: MAX_BUDGET_RANGE,
                        };
                        const stringObj = await JSON.stringify(setDataObject);
                        AsyncStorage.setItem('FilterData', stringObj);
                      }}>
                      <CloseIcon />
                    </TouchableOpacity>
                  </TagWrap>
                )}
                {startDate !== undefined && startDate !== '' && endDate !== '' && (
                  <TagWrap>
                    <TagText>
                      {startDate} - {endDate}
                    </TagText>
                    <TouchableOpacity
                      onPress={async () => {
                        setStartDate('');
                        setEndDate('');
                        setApiParamCount(1);
                        setObj({...obj, startDate: '', endDate: ''});
                        updateUI({
                          pageNumber: 1,
                          startDate: '',
                          endDate: '',
                        });
                        const setDataObject = {
                          date: '',
                          eXCompletionDate: '',
                          projectTypeId,
                          locationId: locationTypeData.locationTypeIndex,
                          projectTypeData,
                          locationTypeData,
                          low: lowBudgetValue,
                          high: highBudgetValue,
                        };
                        const stringObj = await JSON.stringify(setDataObject);
                        AsyncStorage.setItem('FilterData', stringObj);
                      }}>
                      <CloseIcon />
                    </TouchableOpacity>
                  </TagWrap>
                )}
              </TagWrapContainer>
            )}
            <SafeAreaView style={styles.safeAreaOfMyProject}>
              {isAPIInProgress && (
                <MainLoaderContainer>
                  <ActivityIndicator size="large" color={colors.primaryThemeColor} style={styles.activityIndicator} />
                </MainLoaderContainer>
              )}
              {projectListData.length > 0 && (
                <FlatList
                  testID={localStrings.projectList}
                  onEndReachedThreshold={0.4}
                  onEndReached={fetchMoreData}
                  style={styles.myProjectList}
                  data={projectListData}
                  renderItem={({item}) => (
                    <Cards
                      item={item}
                      navigation={navigation}
                      updateApi={(res: any) => {
                        const newArray = [...projectListData];
                        const index = newArray.findIndex(childItem => childItem.Id === res.Id);
                        newArray.splice(index, 1);
                        setProjectListData(newArray);
                        const timerValue = setTimeout(() => {
                          clearTimeout(timerValue);
                          setProjectID(res.Id);
                          setReviewToggle(true);
                        }, 2000);
                      }}
                    />
                  )}
                  keyExtractor={item => item.Id}
                />
              )}
              {loader && <ActivityIndicator size="large" color={colors.midnight} style={styles.activityIndicator} />}
              {projectListData.length === 0 &&
                isAPIInProgress === false &&
                (projectStatusId === 10 ||
                  projectStatusId === 80 ||
                  projectStatusId === 50 ||
                  result === true ||
                  (route?.params !== undefined && projectStatusId === 0)) && (
                  <CenterContainer>
                    <Image source={require('../../assets/images/projectIcon/projectIcon.png')} />
                    <NoProjectText>{localStrings.noProject}</NoProjectText>
                  </CenterContainer>
                )}
            </SafeAreaView>
            <BtnContainer>
              <TouchableOpacity
                testID={strings.addProjectPlan}
                onPress={() => {
                  onAddProject();
                }}>
                <AddFloatingBtn />
              </TouchableOpacity>
            </BtnContainer>
          </>
        ) : (
          <>
            {!isAPIInProgress && (
              <>
                <CenterContainer>
                  <Project />
                  <NoProjectText>{localStrings.startProject}</NoProjectText>
                </CenterContainer>
                <BtnContainer>
                  <TouchableOpacity
                    testID={strings.addProject}
                    onPress={() => {
                      onAddProject();
                    }}>
                    <AddFloatingBtn />
                  </TouchableOpacity>
                </BtnContainer>
              </>
            )}
            {isAPIInProgress && (
              <MainLoaderContainer>
                <ActivityIndicator size="large" color={colors.midnight} style={styles.activityIndicator} />
              </MainLoaderContainer>
            )}
          </>
        )}
      </BottomContainer>
      <ShowReviewModal />
    </ProjectContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  projectList,
  searchFilterProjectList,
  filter,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen);
