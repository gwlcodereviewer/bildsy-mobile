import {Dispatch} from 'redux';
import {createCRUDActionCreator, createCRUDActionCreatorForAds} from '../../helpers/redux';
import api from '../../helpers/api';
import {REQUEST_METHODS} from '../../helpers/constants';
import {
  ILoginPayload,
  ISignUpPayload,
  IHomeOwnerSignUpPayload,
  IVerificationPayload,
  IChangePasswordPayload,
  ISocialMediaPayload,
  IProjectProfessionals,
  IUpdateProjectProfessionals,
  IAddProjectPayload,
  IFileUpload,
  IUpdateProjectDetails,
  IUpdateLocation,
  IUpdateSpecifications,
  IDeleteDocuments,
  projectListType,
  searchFilterProjectListType,
  FilterType,
  BlogPostListType,
  SearchBlogPostType,
  ISaveComplaintsType,
  IComplaintConversation,
  IHomeOwnerEditDetailPayload,
  IHomeOwnerChangePasswordPayload,
  IUpdateStatusConversation,
  notificationListType,
  ISendEmailPayload,
  IHomeOwnerSignUpAddressPayload,
  IUpdateMessageParam,
  IRemoveAccount,
  IEmailRequest,
} from '../types';
import {API_END_POINTS} from '../../constants/server';
import {
  AUTH_API,
  ADS_API,
  LOGIN_API,
  DASHBOARD_TOP_FIVE_PROJECT_API,
  DASHBOARD_TOP_BLOGS_API,
  SOCIAL_LOGIN_API,
  GET_QB_CONFIG_API,
  GET_BID_DETAIL_API,
  GET_BID_LIST_API,
  BLOG_CATEGORY_API,
  BLOG_LIST_API,
  BLOG_DETAILS_API,
  RESET_PASSWORD_EMAIL_SEND_API,
  PROJECT_DETAILS_API,
  SELECTED_PROFESSIONALS_API,
  USER_PROFILE_DETAILS_API,
  CHANGE_PASSWORD_API,
  SIGN_OUT_AUTH_API,
  SING_UP_AUTH_API,
  SIGN_UP_ADDRESS_AUTH_API,
  UPDATE_MESSAGE_STATUS_API,
  REMOVE_ACCOUNT_API,
  EMAIL_CHECK_API,
  PRO_LOGIN_API,
  PRO_DETAILS_API,
} from '../constants';

const userType = 'HomeOwner';

export const callLoginAPI =
  (param: ILoginPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.userLogin, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: LOGIN_API,
    })(dispatch);

export const callGetCountryAPI = () => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(API_END_POINTS.getCountryList, {
      method: REQUEST_METHODS.GET,
    }),
    suffix: AUTH_API,
  })(dispatch);

export const callGetStateAPI = (params: number) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(API_END_POINTS.getStateList + params, {
      method: REQUEST_METHODS.GET,
    }),
    suffix: AUTH_API,
  })(dispatch);

export const callSignUpAPI =
  (param: IHomeOwnerSignUpPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.userSignUp, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: SING_UP_AUTH_API,
    })(dispatch);

export const callHomeownerAdvanceAPI =
  (param: IHomeOwnerSignUpAddressPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.userSignUpAddress, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: SIGN_UP_ADDRESS_AUTH_API,
    })(dispatch);

export const callFeaturedArticlesAPI =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.featuredArticles, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: DASHBOARD_TOP_BLOGS_API,
    })(dispatch);

export const callResetPasswordEmailSendAPI =
  (param: ISendEmailPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.resetPasswordEmailSend, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: RESET_PASSWORD_EMAIL_SEND_API,
    })(dispatch);

export const callDashboardAdsAPI =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreatorForAds({
      apiCall: api(API_END_POINTS.dashboardAds, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: ADS_API,
    })(dispatch);

export const callVerificationCodeAPI =
  (param: IVerificationPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.verificationCode, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callResetPasswordAPI =
  (param: IChangePasswordPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.resetPassword, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callSocialSignUpAPI =
  (param: ISocialMediaPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.socialSignIn, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: SOCIAL_LOGIN_API,
    })(dispatch);

export const callGetProjectTypeAPI =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.getProjectType, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callGetProjectAreasAPI =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.getProjectAreas, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callGetProjectProfessionalList =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.projectProfessionalList + param, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: SELECTED_PROFESSIONALS_API,
    })(dispatch);
export const callGetProjectDetails =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.projectDetails + param, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: PROJECT_DETAILS_API,
    })(dispatch);
export const callSearchProfessionals = (param: IProjectProfessionals) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(
      `${API_END_POINTS.getSearchProfessionalList}?projectTypeId=${param.projectTypeId}&projectId=${param.projectId}`,
      {
        method: REQUEST_METHODS.GET,
      },
    ),
    suffix: AUTH_API,
  })(dispatch);
export const callUpdateProfessional = (param: IUpdateProjectProfessionals) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(
      `${API_END_POINTS.updateProfessional}?projectId=${param.projectId}&projectInvitationTypeId=${param.projectInvitationTypeId}`,
      {
        method: REQUEST_METHODS.POST,
        params: param.Ids,
      },
    ),
    suffix: AUTH_API,
  })(dispatch);
export const callCreateProjectAPI =
  (param: IAddProjectPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.createProject, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callUploadFilesAPI =
  (param: IFileUpload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.uploadFile, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callUpdateProjectDetails =
  (param: IUpdateProjectDetails) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.updateProjectDetails}?projectId=${param.projectId}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callUpdateLocationAPI =
  (param: IUpdateLocation) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.updateLocation}?projectId=${param.projectId}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callUpdateSpecificationsAPI =
  (param: IUpdateSpecifications) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.updateSpecifications}?projectId=${param.projectId}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callDeleteDocuments =
  (param: IDeleteDocuments) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(
        `${API_END_POINTS.deleteDocument}?entityId=${param.entityId}&entityName=${param.entityName}&documentId=${param.documentId}`,
        {
          method: REQUEST_METHODS.POST,
          params: param,
        },
      ),
      suffix: AUTH_API,
    })(dispatch);
export const callSaveProject =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.saveProject}?projectId=${param}`, {
        method: REQUEST_METHODS.POST,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const projectList =
  (param: projectListType) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(
        `${API_END_POINTS.projectList}?projectStatusId=${param.projectStatusId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`,
        {
          method: REQUEST_METHODS.GET,
        },
      ),
      suffix: AUTH_API,
    })(dispatch);

export const callProjectActivity =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.topFiveProjects}?userType=${userType}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: DASHBOARD_TOP_FIVE_PROJECT_API,
    })(dispatch);
export const callSignOutAPI =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.signOut}`, {
        method: REQUEST_METHODS.POST,
      }),
      suffix: SIGN_OUT_AUTH_API,
    })(dispatch);

export const searchFilterProjectList =
  (param: searchFilterProjectListType) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(
        `${API_END_POINTS.searchFilterProjectList}?projectStatusId=${param.projectStatusId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}&searchTerm=${param.searchTerm}`,
        {
          method: REQUEST_METHODS.GET,
        },
      ),
      suffix: AUTH_API,
    })(dispatch);

export const searchBlogPost =
  (param: SearchBlogPostType) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(
        `${API_END_POINTS.searchBlogPost}?pageNumber=${param.pageNumber}&pageSize=${param.pageSize}&searchTerm=${param.searchTerm}&blogCategoryId=0`,
        {
          method: REQUEST_METHODS.GET,
        },
      ),
      suffix: AUTH_API,
    })(dispatch);

export const locationList =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.locationList}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const filter =
  (param: FilterType) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(
        `${API_END_POINTS.searchFilterProjectList}?projectStatusId=${param.projectStatusId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}&searchTerm=${param.searchTerm}&projectTypeId=${param.projectTypeId}&location=${param.location}&exRate=${param.exRate}&startDate=${param.startDate}&endDate=${param.endDate}`,
        {
          method: REQUEST_METHODS.GET,
        },
      ),
      suffix: AUTH_API,
    })(dispatch);
export const callGetProjectTypeDetails =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.projectTypeDetails}?projectId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const getBlogCategory =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.getBlogCategory}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: BLOG_CATEGORY_API,
    })(dispatch);

export const getBlogPostList =
  (param: BlogPostListType) =>
  (dispatch: Dispatch): Promise<any> => {
    let str = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(param)) {
      str += `${str}${key}=${value}&`;
    }
    return createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.blogPostList}?${str}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: BLOG_LIST_API,
    })(dispatch);
  };
export const callGetCreateComplaintPopup =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.createComplaintPopup}?projectId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const blogDetail =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.blogDetail}?blogPostId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: BLOG_DETAILS_API,
    })(dispatch);

export const callCreateComplaint =
  (param: ISaveComplaintsType) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.createComplaint, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const getAllComplaints =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.allComplaints}?projectId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callGetBidsList =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.bidsList}?projectId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: GET_BID_LIST_API,
    })(dispatch);
export const callGetComplaintDetails =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.complaintDetails}?complaintId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callComplaintConversation =
  (param: IComplaintConversation) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.complaintConversation}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callComplaintChatAPI =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.complaintChat}?complaintId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callResolveComplaintAPI =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.resolveComplaint}?complaintId=${param}`, {
        method: REQUEST_METHODS.POST,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callGetUserProfileAPI = () => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(API_END_POINTS.userProfileDetail, {
      method: REQUEST_METHODS.GET,
    }),
    suffix: USER_PROFILE_DETAILS_API,
  })(dispatch);
export const callEditDetailAPI =
  (param: IHomeOwnerEditDetailPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.userProfileUpdateDetail, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callChangePasswordAPI =
  (param: IHomeOwnerChangePasswordPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.changePassword, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: CHANGE_PASSWORD_API,
    })(dispatch);
export const callGetBidsDetail =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.bidsDetail}?bidId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: GET_BID_DETAIL_API,
    })(dispatch);

export const callMarkComplete =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.markProjectComplete}?projectId=${param}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callBidsProfessionalDetail =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.BidsProfessionalDetail}?bidId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callProfessionalDetailById =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.getProfessionalDetail}?professionalId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callUpdateBidStatus =
  (param: IUpdateStatusConversation) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.UpdateBidStatus}?bidId=${param.bidId}&bidStatusId=${param.bidStatusId}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callGetAdsProfessionalDetail =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.getAdsProfessional}?adsId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callAdsLead =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.adsLead}?adsId=${param}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const notificationList =
  (param: notificationListType) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.notificationList}?pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);
export const callArchiveAPI =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.MarkArchiveProject}?projectId=${param}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callGetProjectUsersAPI =
  (param: number) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.GetProjectUsers}?projectId=${param}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: AUTH_API,
    })(dispatch);

export const callGetConfigurationKeyAPI =
  () =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.GetConfigurationKey}`, {
        method: REQUEST_METHODS.GET,
      }),
      suffix: GET_QB_CONFIG_API,
    })(dispatch);

export const ScreenChange = (screenName: string) => (dispatch: Dispatch) => {
  dispatch({type: ScreenChange, payload: screenName});
};
export const callUpdateMessageAPI = (param: IUpdateMessageParam) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(`${API_END_POINTS.UpdateMessageStatusAPI}`, {
      method: REQUEST_METHODS.POST,
      params: param,
    }),
    suffix: UPDATE_MESSAGE_STATUS_API,
  })(dispatch);

export const callRemoveAccountAPI = (id: number, status: boolean) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(`${API_END_POINTS.removeAccount}?customerId=${id}&deleteStatus=${status}`, {
      method: REQUEST_METHODS.POST,
    }),
    suffix: REMOVE_ACCOUNT_API,
  })(dispatch);

export const callEmailExitsAPI = (param: IEmailRequest) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(`${API_END_POINTS.emailCheck}`, {
      method: REQUEST_METHODS.POST,
      params: param,
    }),
    suffix: EMAIL_CHECK_API,
  })(dispatch);

export const callProLoginAPI =
  (param: ILoginPayload) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(API_END_POINTS.proLogin, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: PRO_LOGIN_API,
    })(dispatch);

export const callProUserDetails =
  (param: IEmailRequest) =>
  (dispatch: Dispatch): Promise<any> =>
    createCRUDActionCreator({
      apiCall: api(`${API_END_POINTS.signUpUserDetails}`, {
        method: REQUEST_METHODS.POST,
        params: param,
      }),
      suffix: PRO_DETAILS_API,
    })(dispatch);
