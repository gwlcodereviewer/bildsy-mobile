/**
 * @format
 */
import configureStore from 'redux-mock-store';
import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {act} from '@testing-library/react-hooks';
import EditProfile from '.';
import {strings} from '../../constants/strings';
import {navigation, route} from '../../redux/types';

const middleWares = [thunk];
const mockStore = configureStore(middleWares);

const callGetStateAPI = jest.fn();
const callEditDetailAPI = jest.fn();
const initialEmptyState = {
  userDetailResponse: {isApiInProgress: false},
  callGetStateAPI,
  callEditDetailAPI,
};
let wrapper: renderer.ReactTestRenderer;

// Note: test renderer must be required after react-native.
describe('renders correctly', () => {
  beforeEach(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <EditProfile navigation={navigation} route={route} />
      </Provider>,
    );
  });
  it('should renders correctly Edit profile view ', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('should check first name Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userFirstName})).toBeTruthy();
  });
  it('should check last name Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userLastName})).toBeTruthy();
  });
  it('should check email Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userEmail})).toBeTruthy();
  });
  it('should check Address Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userAddress})).toBeTruthy();
  });
  it('should check Suite Address Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userSuiteAddress})).toBeTruthy();
  });
  it('should check City Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userCity})).toBeTruthy();
  });

  it('should set first name value on change', async () => {
    await act(async () => {
      const tempFirstName = 'test';
      const inputBoxFirstName = wrapper.root.findByProps({testID: strings.userFirstName});
      await inputBoxFirstName.props.onChangeText(tempFirstName);
      expect(inputBoxFirstName.props.inputValue).toBe(tempFirstName);
    });
  });
  it('should set last name value on change', async () => {
    await act(async () => {
      const tempLastName = 'test';
      const inputBoxLastName = wrapper.root.findByProps({testID: strings.userLastName});
      await inputBoxLastName.props.onChangeText(tempLastName);
      expect(inputBoxLastName.props.inputValue).toBe(tempLastName);
    });
  });
  it('should set address value on change', async () => {
    await act(async () => {
      const tempUserAddress = 'test';
      const inputBoxUserAddress = wrapper.root.findByProps({testID: strings.userAddress});
      await inputBoxUserAddress.props.onChangeText(tempUserAddress);
      expect(inputBoxUserAddress.props.inputValue).toBe(tempUserAddress);
    });
  });
  it('should set SuiteAddress value on change', async () => {
    await act(async () => {
      const tempSuiteAddress = 'test';
      const inputBoxSuiteAddress = wrapper.root.findByProps({testID: strings.userSuiteAddress});
      await inputBoxSuiteAddress.props.onChangeText(tempSuiteAddress);
      expect(inputBoxSuiteAddress.props.inputValue).toBe(tempSuiteAddress);
    });
  });
  it('should set city value on change', async () => {
    await act(async () => {
      const tempCity = 'test';
      const inputBoxCity = wrapper.root.findByProps({testID: strings.userCity});
      await inputBoxCity.props.onChangeText(tempCity);
      expect(inputBoxCity.props.inputValue).toBe(tempCity);
    });
  });
  it('should set Zip Code value on change', async () => {
    await act(async () => {
      const tempZipCode = '564879';
      const inputBoxZipCode = wrapper.root.findByProps({testID: strings.userZipCode});
      await inputBoxZipCode.props.onChangeText(tempZipCode);
      expect(inputBoxZipCode.props.inputValue).toBe(tempZipCode);
    });
  });
  it('should set phone value on change', async () => {
    await act(async () => {
      const inputBoxPhone = wrapper.root.findByProps({testID: strings.userPhone});
      const tempPhone = '91548678958';
      await inputBoxPhone.props.onChangeText(tempPhone);
      expect(inputBoxPhone.props.inputValue).toBe(tempPhone);
    });
  });
  it('should check blur handler on first name field', async () => {
    await act(async () => {
      const firstNameInput = wrapper.root.findByProps({testID: strings.userFirstName});
      await firstNameInput.props.onBlurHandler();
      expect(firstNameInput).toBeTruthy();
    });
  });
  it('should check blur handler on last name field', async () => {
    await act(async () => {
      const lastNameInput = wrapper.root.findByProps({testID: strings.userLastName});
      await lastNameInput.props.onBlurHandler();
      expect(lastNameInput).toBeTruthy();
    });
  });
  it('should check blur handler on city field', async () => {
    await act(async () => {
      const cityInput = wrapper.root.findByProps({testID: strings.userCity});
      await cityInput.props.onBlurHandler();
      expect(cityInput).toBeTruthy();
    });
  });
  it('should check blur handler on zip code field', async () => {
    await act(async () => {
      const zipCodeInput = wrapper.root.findByProps({testID: strings.userZipCode});
      await zipCodeInput.props.onBlurHandler();
      expect(zipCodeInput).toBeTruthy();
    });
  });
  it('should check back button event', async () => {
    await act(async () => {
      const backButtonWrapper = wrapper.root.findByProps({testID: strings.backIconButton});
      await backButtonWrapper.props.onPress();
      expect(backButtonWrapper).toBeTruthy();
    });
  });
  it('should check edit profile button event', async () => {
    await act(async () => {
      const editProfileButtonWrapper = wrapper.root.findByProps({testID: strings.editProfileButton});
      await editProfileButtonWrapper.props.onPress();
      expect(editProfileButtonWrapper).toBeTruthy();
    });
  });
  it('should check Previous button event', async () => {
    await act(async () => {
      const previousButtonWrapper = wrapper.root.findByProps({testID: strings.previewsButton});
      await previousButtonWrapper.props.onPress();
      expect(previousButtonWrapper).toBeTruthy();
    });
  });
});
