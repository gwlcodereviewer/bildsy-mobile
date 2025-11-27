/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {act} from '@testing-library/react-hooks';
import moxios from 'moxios';
import Cards from './Cards';
import {localStrings} from '../../../localization/localStrings';
import {strings} from '../../../constants/strings';
import {projectListData} from '../../../../jest/dummyData';
import {navigation} from '../../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const callGetProjectTypeAPIMethod = jest.fn();
const locationListMethod = jest.fn();
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initialEmptyState = {
  callGetProjectTypeAPI: callGetProjectTypeAPIMethod,
  locationList: locationListMethod,
};

let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <Cards navigation={navigation} item={projectListData} toggleArchiveValue={true} />
      </Provider>,
    );
    it('should renders correctly Project view', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
    it('should toggle button event', () => {
      act(() => {
        const toggleIconButton = wrapper.root.findByProps({testID: strings.toggleButton});
        toggleIconButton.props.onPress();
        expect(toggleIconButton).toBeTruthy();
      });
    });
    it('should mark complete button event', () => {
      act(() => {
        const completeButton = wrapper.root.findByProps({testID: strings.completeButton});
        completeButton.props.onPress();
        expect(completeButton).toBeTruthy();
      });
    });
    it('should archive toggle button event', () => {
      act(() => {
        const archiveToggleButton = wrapper.root.findByProps({testID: strings.archiveToggleButton});
        archiveToggleButton.props.onPress();
        expect(archiveToggleButton).toBeTruthy();
      });
    });
    it('should archive button event', () => {
      act(() => {
        const archiveToggleButton = wrapper.root.findByProps({testID: localStrings.archiveButton});
        archiveToggleButton.props.onPress();
        expect(archiveToggleButton).toBeTruthy();
      });
    });
    it('should select project button event', () => {
      act(() => {
        const projectButton = wrapper.root.findByProps({testID: localStrings.project});
        projectButton.props.onPress();
        expect(projectButton).toBeTruthy();
      });
    });
    it('should set toggle button event', () => {
      act(() => {
        const toggleMenuButton = wrapper.root.findByProps({testID: strings.toggleMenuButton});
        toggleMenuButton.props.onPress();
        expect(toggleMenuButton).toBeTruthy();
      });
    });
  });
});
