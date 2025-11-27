import {TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Image, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {BlogPostListType, SearchBlogPostType, IStoreBlogDetails} from '../../redux/types';
import pngImages from '../../assets/images/pngImages';
import {
  MenuElement,
  ProjectContainer,
  BottomContainer,
  Box,
  Menu,
  MenuText,
  MainLoaderContainer,
  SearchView,
  SearchContainer,
  InputBox,
  CenterContainer,
  NoProjectText,
  Hr,
  MainCardContainer,
  MenuController,
} from './styled';
import {INavigation, IBlogCategoryAPIResponse, IBlogCategoryData} from '../../types';
import {PageTitleContainer} from '../../style';
import DrawerIcon from '../../assets/svg/drawer/DrawerIcon';
import {localStrings} from '../../localization/localStrings';
import styles from '../../style/style';
import {getBlogCategory, getBlogPostList, searchBlogPost} from '../../redux/actions/auth';
import {showToastMessage, VALIDATION_REGEX} from '../../utils';
import Cards from './Cards';
import colors from '../../style/colors';
import Search from '../../assets/svg/Search';
import {strings} from '../../constants/strings';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  getBlogCategory: () => Promise<any>;
  blogCategoryResponse: IBlogCategoryAPIResponse;
  getBlogPostList: (param: BlogPostListType) => Promise<any>;
  searchBlogPost: (param: SearchBlogPostType) => Promise<any>;
  blogCategoryData?: IBlogCategoryData[];
  blogPostListData?: any;
  inProgressProps?: boolean;
}
const myGlobal: any = global;

const BlogScreen: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    getBlogCategory: pGetBlogCategory,
    getBlogPostList: pGetBlogPostList,
    searchBlogPost: pSearchBlogPost,
    blogCategoryResponse,
    route,
    blogCategoryData,
    blogPostListData,
    inProgressProps,
  } = props;

  const [categoryData, setCategoryData] = useState<IBlogCategoryData[]>(blogCategoryData || []);
  const [select, setSelect] = useState<string>('');
  const [blogPostList, setBlogPostList] = useState<any[]>(blogPostListData || []);
  const [hasNextPage, setNextPage] = useState<boolean>(true);
  const [isAPIInProgress, setAPIInProgress] = useState<boolean>(inProgressProps || false);
  const [text, setText] = useState<{value: string}>({value: ''});
  const [obj, setObj] = useState({
    pageNumber: 1,
    pageSize: 15,
    blogCategoryId: 1,
  });
  const fetchMoreData = (arg: any, flag = false, idChanged = false) => {
    if (hasNextPage || idChanged === true) {
      pGetBlogPostList({
        ...arg,
      })
        .then(res => {
          if (res.Success) {
            if (flag === false) {
              setBlogPostList(res.Data.BlogPosts);
              setAPIInProgress(false);
            } else {
              setBlogPostList([...blogPostList, ...res.Data.BlogPosts]);
              setAPIInProgress(false);
            }
            setNextPage(res.Data.PagingFilteringContext.HasNextPage);
            setObj({...arg, pageNumber: res.Data.PagingFilteringContext.PageNumber + 1});
          } else {
            showToastMessage(strings.error, res.Message);
            setAPIInProgress(false);
          }
        })
        .catch(error => {
          setAPIInProgress(false);
          showToastMessage(strings.error, error.Message);
        });
    }
  };

  useEffect(() => {
    if (Object?.keys(blogCategoryResponse)?.length !== 0) {
      const blogCategoryList = [
        {
          Name: localStrings.bildsy,
          DisplayOrder: 0,
          Published: true,
          SeName: null,
          MetaTitle: null,
          MetaKeywords: null,
          MetaDescription: null,
          Id: 0,
        },
      ];

      setObj({...obj, blogCategoryId: blogCategoryResponse?.Data[0]?.Id});
      // eslint-disable-next-line array-callback-return
      blogCategoryResponse?.Data.map(item => {
        blogCategoryList?.push(item);
      });
      setCategoryData(blogCategoryList);
      setSelect(blogCategoryList[0].Name);
      fetchMoreData({...obj, blogCategoryId: blogCategoryList[0].Id, pageNumber: 1}, false, true);
    }
  }, [blogCategoryResponse]);

  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      pGetBlogCategory();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, route, myGlobal.tab]);

  const handleOnSearch = async (textVal: string) => {
    const testNew = textVal.replace(VALIDATION_REGEX.textCheck, '');
    if (textVal === '') {
      setSelect(localStrings.bildsy);
    } else {
      setText({...text, value: testNew});
      await searchData2(testNew);
    }
    setText({...text, value: testNew});
    await searchData2(testNew);
  };

  const searchData2 = (searchValue: string) => {
    setAPIInProgress(true);
    pSearchBlogPost({
      pageNumber: 1,
      pageSize: 15,
      searchTerm: searchValue || '',
    })
      .then(async res => {
        if (res.Success) {
          await setBlogPostList(res.Data.BlogPosts);
          setAPIInProgress(false);
        }
      })
      .catch((error: {message: string | undefined}) => {
        setAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };

  const PageHeaderContainer = () => (
    <PageTitleContainer>
      <TouchableOpacity
        testID={strings.toggleMenuButton}
        onPress={() => {
          Keyboard.dismiss();
          navigation?.toggleDrawer();
        }}>
        <DrawerIcon />
      </TouchableOpacity>
      <SearchView>
        <SearchContainer>
          <Search />
        </SearchContainer>
        <InputBox
          autoFocus={text.value !== ''}
          placeholder={localStrings.search}
          placeholderTextColor={colors.white}
          value={text.value}
          onChangeText={handleOnSearch}
        />
      </SearchView>
    </PageTitleContainer>
  );
  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      {PageHeaderContainer()}
      <BottomContainer textLimit={text.value}>
        {text.value === '' && (
          <Menu>
            <ScrollView horizontal={true} style={styles.scrollMenu}>
              <MenuController>
                {categoryData.length !== 0 &&
                  categoryData.map((res: any) => (
                    <MenuElement
                      key={res.Id}
                      testID={strings.categoryButton}
                      onPress={() => {
                        setSelect(res.Name);
                        fetchMoreData({...obj, blogCategoryId: res.Id, pageNumber: 1}, false, true);
                      }}
                      select={select}
                      title={res.Name}>
                      <Box select={select} title={res.Name}>
                        <MenuText select={select} title={res.Name}>
                          {res.Name}
                        </MenuText>
                      </Box>
                    </MenuElement>
                  ))}
              </MenuController>
            </ScrollView>
            <Hr />
          </Menu>
        )}
        <MainCardContainer>
          {!isAPIInProgress && blogPostList.length !== 0 && (
            <FlatList
              testID={localStrings.blogList}
              onEndReachedThreshold={2}
              onEndReached={() => fetchMoreData(obj, true)}
              style={styles.blogsList}
              data={blogPostList}
              renderItem={({item}) => <Cards item={item} navigation={navigation} />}
              keyExtractor={item => item.Id}
            />
          )}
          {isAPIInProgress && (
            <MainLoaderContainer>
              <ActivityIndicator size="large" color={colors.midnight} style={styles.activityIndicator} />
            </MainLoaderContainer>
          )}
          {!isAPIInProgress && blogPostList.length === 0 && (
            <CenterContainer>
              <Image source={pngImages.projectIcon} />
              {text.value ? (
                <NoProjectText>{localStrings.noBlogOnSearch}</NoProjectText>
              ) : (
                <NoProjectText>{localStrings.noBlog}</NoProjectText>
              )}
            </CenterContainer>
          )}
        </MainCardContainer>
      </BottomContainer>
    </ProjectContainer>
  );
};

const mapStateToProps = (store: IStoreBlogDetails) => ({
  blogCategoryResponse: store?.blogDetail?.payload,
});
const mapDispatchToProps = {
  getBlogCategory,
  getBlogPostList,
  searchBlogPost,
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogScreen);
