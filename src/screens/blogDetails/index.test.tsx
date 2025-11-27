/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {act} from '@testing-library/react-hooks';
import BlogDetailScreen from './index';
import {blogCategoryResponseDummyData} from '../../../jest/dummyData';
import {strings} from '../../constants/strings';
import {navigation, route} from '../../redux/types';

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
  blogDetail: {payload: blogCategoryResponseDummyData},
  getBlogCategoryApi: getBlogCategoryMethod,
};
let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <BlogDetailScreen navigation={navigation} route={route} />
      </Provider>,
    );
    it('should renders correctly BlogDetailScreen view', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});
