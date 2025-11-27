/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {act} from '@testing-library/react-hooks';
import BlogScreen from './index';
import {strings} from '../../constants/strings';
import {blogCategoryDummyData, blogCategoryResponseDummyData, blogPostListDummyData} from '../../../jest/dummyData';
import {localStrings} from '../../localization/localStrings';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const getBlogCategoryMethod = jest.fn();
const initialEmptyState = {
  auth: {isApiInProgress: true},
  blogDetail: {payload: blogCategoryResponseDummyData},
  getBlogCategoryApi: getBlogCategoryMethod,
  inProgressProps: false,
};
let wrapper: renderer.ReactTestRenderer;
const navigation = {
  reset: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  setOptions: jest.fn(),
  dispatch: jest.fn(),
  route: jest.fn(),
  state: {},
  toggleDrawer: jest.fn(),
};
const route = {
  reset: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  setOptions: jest.fn(),
  dispatch: jest.fn(),
  route: jest.fn(),
  state: {},
  params: {
    locationId: 'test',
    startDate: new Date(),
    endDate: new Date(),
  },
};

describe('Renders correctly', () => {
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <BlogScreen
          navigation={navigation}
          route={route}
          blogCategoryData={blogCategoryDummyData}
          blogPostListData={blogPostListDummyData}
          inProgressProps={false}
        />
      </Provider>,
    );
    it('Renders correctly BlogScreen view', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
  it('Check toggle drawer event', () => {
    act(() => {
      const DrawerBtnButton = wrapper.root.findByProps({testID: strings.toggleMenuButton});
      DrawerBtnButton.props.onPress();
      expect(DrawerBtnButton).toBeTruthy();
    });
  });
  it('Check blog list event', async () => {
    await act(async () => {
      const blogListBtnButton = wrapper.root.findByProps({testID: localStrings.blogList});
      await blogListBtnButton.props.onEndReached();
      expect(blogListBtnButton).toBeTruthy();
    });
  });
});
