/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ConfirmView from './index';
import {strings} from '../../../constants/strings';
import {dummyFileDataProps, professionalData} from '../../../../jest/dummyData';
import {navigation} from '../../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initialEmptyState = {
  auth: {isApiInProgress: true},
  projectDetailsAPIInProgress: false,
  projectDetailsResponseData: {},
  isSelectProfessionAPIInProgress: false,
  selectedProfessionalDetails: {isApiInProgress: false, payload: professionalData},
};
let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <ConfirmView navigation={navigation} pageChange={false} fileDataProps={dummyFileDataProps} />
    </Provider>,
  );
  it('should check Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.projectName})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.expectedStartDate})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.desiredCompletionDate})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.description})).toBeTruthy();
  });
  it('should set project name value on change', async () => {
    await act(async () => {
      const inputBoxProjectName = wrapper.root.findByProps({testID: strings.projectName});
      const tempProjectName = 'test project';
      await inputBoxProjectName.props.onChangeText(tempProjectName);
      expect(inputBoxProjectName.props.inputValue).toBe(tempProjectName);
    });
  });
  it('should check blur handler on project name field', async () => {
    await act(async () => {
      const projectNameInput = wrapper.root.findByProps({testID: strings.projectName});
      await projectNameInput.props.onBlurHandler();
      expect(projectNameInput).toBeTruthy();
    });
  });
  it('should set description value on change', async () => {
    await act(async () => {
      const inputBoxDescription = wrapper.root.findByProps({testID: strings.description});
      const tempDescription = 'Test description';
      await inputBoxDescription.props.onChangeText(tempDescription);
      expect(inputBoxDescription.props.inputValue).toBe(tempDescription);
    });
  });
  it('should check blur handler on description field', async () => {
    await act(async () => {
      const descriptionInput = wrapper.root.findByProps({testID: strings.description});
      await descriptionInput.props.onBlurHandler();
      expect(descriptionInput).toBeTruthy();
    });
  });
  it('should check save project detail button event', async () => {
    await act(async () => {
      const saveProjectDetailButtonWrapper = wrapper.root.findByProps({testID: strings.saveProjectDetail});
      await saveProjectDetailButtonWrapper.props.onPress();
      expect(saveProjectDetailButtonWrapper).toBeTruthy();
    });
  });
  it('should check set project detail visible button event', async () => {
    await act(async () => {
      const setProjectDetailVisibleButtonWrapper = wrapper.root.findByProps({testID: strings.setProjectDetailVisible});
      await setProjectDetailVisibleButtonWrapper.props.onPress();
      expect(setProjectDetailVisibleButtonWrapper).toBeTruthy();
    });
  });
  it('should check set description visible button event', async () => {
    await act(async () => {
      const setDescriptionVisibleButtonWrapper = wrapper.root.findByProps({testID: strings.setDescriptionVisible});
      await setDescriptionVisibleButtonWrapper.props.onPress();
      expect(setDescriptionVisibleButtonWrapper).toBeTruthy();
    });
  });
  it('should check location change button event', async () => {
    await act(async () => {
      const changeLocationButtonWrapper = wrapper.root.findByProps({testID: strings.changeLocationButton});
      await changeLocationButtonWrapper.props.onPress();
      expect(changeLocationButtonWrapper).toBeTruthy();
    });
  });
  it('should check set specification visible button event', async () => {
    await act(async () => {
      const setSpecificationVisibleButtonWrapper = wrapper.root.findByProps({testID: strings.setSpecificationVisible});
      await setSpecificationVisibleButtonWrapper.props.onPress();
      expect(setSpecificationVisibleButtonWrapper).toBeTruthy();
    });
  });
  it('should check change page button event', async () => {
    await act(async () => {
      const changeLocationButtonWrapper = wrapper.root.findByProps({testID: strings.changePageButton});
      await changeLocationButtonWrapper.props.onPress();
      expect(changeLocationButtonWrapper).toBeTruthy();
    });
  });
  it('should check toggle button event', async () => {
    await act(async () => {
      const toggleButtonWrapper = wrapper.root.findByProps({testID: strings.toggleButton});
      await toggleButtonWrapper.props.onPress();
      expect(toggleButtonWrapper).toBeTruthy();
    });
  });
  it('should check remove button event', async () => {
    await act(async () => {
      const removeButtonWrapper = wrapper.root.findByProps({testID: strings.removeButton});
      await removeButtonWrapper.props.onPress();
      expect(removeButtonWrapper).toBeTruthy();
    });
  });
  it('should get professional button event', async () => {
    await act(async () => {
      const getProfessionalButtonWrapper = wrapper.root.findByProps({testID: strings.professionalList});
      await getProfessionalButtonWrapper.props.onPress();
      expect(getProfessionalButtonWrapper).toBeTruthy();
    });
  });
});
