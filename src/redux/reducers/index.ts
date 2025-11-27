import {combineReducers} from 'redux';
import bids from './bids';
import qbConfigKey from './qbConfigKey';
import bidDetail from './bidDetail';
import blogDetail from './blogDetail';
import resetPassword from './resetPassword';
import {dashboardProjects} from './dashboard';
import {projectDetails, selectedProfessionalDetails} from './projectDetails';
import {userProfile} from './userProfile';
import signUpAuth from './signUpAuth';
import adsDetail from './ads';
import {auth, emailCheck, proAuth, proUserDetails, removeAccount} from './auth';
import {addProReview, addReviewComment, getProReview} from './review';

const reducers = combineReducers({
  auth,
  bids,
  qbConfigKey,
  bidDetail,
  blogDetail,
  resetPassword,
  dashboardProjects,
  projectDetails,
  selectedProfessionalDetails,
  userProfile,
  signUpAuth,
  adsDetail,
  removeAccount,
  addProReview,
  getProReview,
  addReviewComment,
  emailCheck,
  proAuth,
  proUserDetails,
});

export default reducers;
