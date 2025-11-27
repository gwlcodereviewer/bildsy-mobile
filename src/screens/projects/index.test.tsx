/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {act} from '@testing-library/react-hooks';
import moxios from 'moxios';
import ProjectScreen from './index';
import {localStrings} from '../../localization/localStrings';
import {strings} from '../../constants/strings';
import {dummyProjectListData} from '../../../jest/dummyData';
import {navigation, route} from '../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initialEmptyState = {
  projectStatusId: 10,
};

let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <ProjectScreen
          navigation={navigation}
          route={route}
          projectListDataProps={dummyProjectListData}
          isAPIInProgressProps={false}
        />
      </Provider>,
    );
    it('should renders correctly Project view', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
    it('should check back button event', () => {
      act(() => {
        const backIconButton = wrapper.root.findByProps({testID: strings.backIconButton});
        backIconButton.props.onPress();
        expect(backIconButton).toBeTruthy();
      });
    });
    it('should check project tab event', () => {
      act(() => {
        const projectTab = wrapper.root.findByProps({testID: localStrings.projects});
        projectTab.props.onPress();
        expect(projectTab).toBeTruthy();
      });
    });
    it('should check draft tab event', () => {
      act(() => {
        const projectTab = wrapper.root.findByProps({testID: localStrings.draftButton});
        projectTab.props.onPress();
        expect(projectTab).toBeTruthy();
      });
    });
    it('should check complete project tab event', () => {
      act(() => {
        const projectTab = wrapper.root.findByProps({testID: localStrings.completeButton});
        projectTab.props.onPress();
        expect(projectTab).toBeTruthy();
      });
    });
    it('should check archive project tab event', () => {
      act(() => {
        const projectTab = wrapper.root.findByProps({testID: localStrings.archiveButton});
        projectTab.props.onPress();
        expect(projectTab).toBeTruthy();
      });
    });
    it('should add project button event', () => {
      act(() => {
        const projectTab = wrapper.root.findByProps({testID: strings.addProjectPlan});
        projectTab.props.onPress();
        expect(projectTab).toBeTruthy();
      });
    });
    it('check search Input Box ', () => {
      expect(wrapper.root.findAllByProps({testID: strings.search})).toBeTruthy();
    });
    it('should set search value on change', async () => {
      await act(async () => {
        const inputBoxSearch = wrapper.root.findByProps({testID: strings.search});
        const tempInputSearch = '';
        await inputBoxSearch.props.onChangeText(tempInputSearch);
        expect(inputBoxSearch.props.value).toBe(tempInputSearch);
      });
    });
  });
});
