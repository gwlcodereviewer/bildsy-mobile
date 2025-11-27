/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import AddProjectView from './index';
import {strings} from '../../../constants/strings';
import {dummyFileDataProps} from '../../../../jest/dummyData';
import {navigation} from '../../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const callGetStateAPIMethod = jest.fn();
const callGetProjectTypeAPIMethod = jest.fn();
const callGetProjectAreasAPIMethod = jest.fn();
const callCreateProjectAPIMethod = jest.fn();
const callUploadFilesAPIMethod = jest.fn();
const callGetProjectDetailsMethod = jest.fn();
const callDeleteDocumentsMethod = jest.fn();
const initialEmptyState = {
  auth: {isApiInProgress: true},
  callGetStateAPI: callGetStateAPIMethod,
  callGetProjectTypeAPI: callGetProjectTypeAPIMethod,
  callGetProjectAreasAPI: callGetProjectAreasAPIMethod,
  callCreateProjectAPI: callCreateProjectAPIMethod,
  callUploadFilesAPI: callUploadFilesAPIMethod,
  callGetProjectDetails: callGetProjectDetailsMethod,
  callDeleteDocuments: callDeleteDocumentsMethod,
  projectDetails: {isGetDetailsAPIInProgress: false},
};
let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <AddProjectView navigation={navigation} pageChange={false} fileDataProps={dummyFileDataProps} />
    </Provider>,
  );
  it('check Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.projectName})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.expectedStartDate})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.desiredCompletionDate})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.description})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userAddress})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userSuiteAddress})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userCity})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.budget})).toBeTruthy();
  });
});

describe('check the events', () => {
  beforeEach(() => {
    wrapper = renderer.create(
      <Provider
        store={mockStore({
          ...initialEmptyState,
          auth: {isApiInProgress: false, isApiDone: true, payload: {isEmailConfirmed: false}},
        })}>
        <AddProjectView navigation={navigation} pageChange={false} fileDataProps={dummyFileDataProps} />
      </Provider>,
    );
  });
  it('Set project name value on change', async () => {
    await act(async () => {
      const inputBoxProjectName = wrapper.root.findByProps({testID: strings.projectName});
      const tempProjectName = 'test project';
      await inputBoxProjectName.props.onChangeText(tempProjectName);
      expect(inputBoxProjectName.props.inputValue).toBe(tempProjectName);
    });
  });
  it('Set expectedStartDate value on change', async () => {
    await act(async () => {
      const inputBoxExpectedStartDate = wrapper.root.findByProps({testID: strings.expectedStartDate});
      const tempExpectedStartDate = '25-04-22';
      await inputBoxExpectedStartDate.props.onChangeText(tempExpectedStartDate);
      expect(inputBoxExpectedStartDate.props.inputValue).toBe(tempExpectedStartDate);
    });
  });
  it('Set desiredCompletionDate value on change', async () => {
    await act(async () => {
      const inputBoxExpectedCompletionDate = wrapper.root.findByProps({testID: strings.desiredCompletionDate});
      const tempExpectedCompletionDate = '25-04-22';
      await inputBoxExpectedCompletionDate.props.onChangeText(tempExpectedCompletionDate);
      expect(inputBoxExpectedCompletionDate.props.inputValue).toBe(tempExpectedCompletionDate);
    });
  });
  it('Set description value on change', () => {
    act(async () => {
      const inputBoxDescription = wrapper.root.findByProps({testID: strings.description});
      const tempDescription = 'Test description';
      inputBoxDescription.props.onChangeText(tempDescription);
      expect(inputBoxDescription.props.inputValue).toBe(tempDescription);
    });
  });
  it('Set city value on change', () => {
    act(async () => {
      const inputCity = wrapper.root.findByProps({testID: strings.userCity});
      const tempCity = 'city';
      inputCity.props.onChangeText(tempCity);
      expect(inputCity.props.inputValue).toBe(tempCity);
    });
  });
  it('Set suite address value on change', async () => {
    act(async () => {
      const inputBoxSuiteAddress = wrapper.root.findByProps({testID: strings.userSuiteAddress});
      const tempSuiteAddress = 'suite address';
      inputBoxSuiteAddress.props.onChangeText(tempSuiteAddress);
      expect(inputBoxSuiteAddress.props.inputValue).toBe(tempSuiteAddress);
    });
  });
  it('Set zip code value on change', () => {
    act(async () => {
      const inputBoxZipCode = wrapper.root.findByProps({testID: strings.userZipCode});
      const tempZipCode = '12345';
      inputBoxZipCode.props.onChangeText(tempZipCode);
      expect(inputBoxZipCode.props.inputValue).toBe(tempZipCode);
    });
  });
  it('Set phone value on change', () => {
    act(async () => {
      const inputBoxPhone = wrapper.root.findByProps({testID: strings.userPhone});
      const tempPhone = '91548678958';
      inputBoxPhone.props.onChangeText(tempPhone);
      expect(inputBoxPhone.props.inputValue).toBe(tempPhone);
    });
  });
  it('Set budget value on change', () => {
    act(async () => {
      const inputBoxBudget = wrapper.root.findByProps({testID: strings.budget});
      const tempBudget = '91548678958';
      inputBoxBudget.props.onChangeText(tempBudget);
      expect(inputBoxBudget.props.inputValue).toBe(tempBudget);
    });
  });
  it('check blur handler on city field', async () => {
    await act(async () => {
      const cityInput = wrapper.root.findByProps({testID: strings.userCity});
      await cityInput.props.onBlurHandler();
      expect(cityInput).toBeTruthy();
    });
  });
  it('check blur handler on zip code field', async () => {
    await act(async () => {
      const zipCodeInput = wrapper.root.findByProps({testID: strings.userZipCode});
      await zipCodeInput.props.onBlurHandler();
      expect(zipCodeInput).toBeTruthy();
    });
  });
  it('check blur handler on Project name field', async () => {
    await act(async () => {
      const lastNameInput = wrapper.root.findByProps({testID: strings.projectName});
      await lastNameInput.props.onBlurHandler();
      expect(lastNameInput).toBeTruthy();
    });
  });
  it('check blur handler on description field', async () => {
    await act(async () => {
      const lastNameInput = wrapper.root.findByProps({testID: strings.description});
      await lastNameInput.props.onBlurHandler();
      expect(lastNameInput).toBeTruthy();
    });
  });
  it('check blur handler on budget field', async () => {
    await act(async () => {
      const budgetInput = wrapper.root.findByProps({testID: strings.budget});
      await budgetInput.props.onBlurHandler();
      expect(budgetInput).toBeTruthy();
    });
  });
  it('check submit button event', async () => {
    await act(async () => {
      const submitBtnWrapper = wrapper.root.findByProps({testID: strings.submitBtn});
      await submitBtnWrapper.props.onPress();
      expect(submitBtnWrapper).toBeTruthy();
    });
  });
  it('check toggle button event', async () => {
    await act(async () => {
      const toggleButtonWrapper = wrapper.root.findByProps({testID: strings.toggleButton});
      await toggleButtonWrapper.props.onPress();
      expect(toggleButtonWrapper).toBeTruthy();
    });
  });
  it('check remove button event', async () => {
    await act(async () => {
      const removeBtnWrapper = wrapper.root.findByProps({testID: strings.removeDocBtn});
      await removeBtnWrapper.props.onPress();
      expect(removeBtnWrapper).toBeTruthy();
    });
  });
});
