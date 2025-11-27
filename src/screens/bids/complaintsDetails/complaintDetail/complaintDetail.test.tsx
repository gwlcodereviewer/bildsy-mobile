import configureStore from 'redux-mock-store';
import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import ComplaintsDetail from './complaintsDetail';
import {strings} from '../../../../constants/strings';
import {localStrings} from '../../../../localization/localStrings';
import {dummyFileDataProps} from '../../../../../jest/dummyData';
import {navigation, route} from '../../../../redux/types';

jest.useFakeTimers();
const middleWares = [thunk];
const mockStore = configureStore(middleWares);

const initialEmptyState = {
  auth: {isApiInProgress: true},
  id: 0,
};

// Note: test renderer must be required after react-native.
describe('renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <ComplaintsDetail navigation={navigation} route={route} id={0} />
    </Provider>,
  );
  it('should renders correctly complaint tab view ', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
