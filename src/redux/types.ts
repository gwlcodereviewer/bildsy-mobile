import {compose} from 'redux';
import {
  IBidDetailRoot,
  IBidListRoot,
  IGetConfiguration,
  IBlogCategoryAPIResponse,
  IAdsAPIResponse,
  ILoginAPIResponse,
  IResetPasswordSendEmailResponse,
  ISelectedProfessionalResponse,
  IUserDetailAPIResponse,
  ISignUpAPIResponse,
} from '../types';

export interface IAuthStateType {
  isApiInProgress: boolean;
  isApiDone: boolean;
  isLogin: boolean;
  message: string;
  payload: any;
  status: string;
  isSignUp: boolean;
}
export interface ISignUpAuthStateType {
  isSignUpApiInProgress: boolean;
  isApiDone: boolean;
  isLogin: boolean;
  message: string;
  payload: any;
  status: string;
  isSignUp: boolean;
}
export interface IProjectAndProfessionalType {
  isProjectAndProfessionalsAPIInProgress: boolean;
  isApiDone: boolean;
  isLogin: boolean;
  message: string;
  payload: any;
  status: string;
  isSignUp: boolean;
}
export interface iCountry {
  countryIndex: number;
  countryName: string;
}
export interface iState {
  stateIndex: number;
  stateName: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
  deviceToken: string;
  userType?: string;
}
export interface ISendEmailPayload {
  email: string;
}
export interface IHomeOwnerSignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  city: string;
  address: string;
  countryId: number;
  stateId: number;
  zipCode: string;
  longitude: number;
  latitude: number;
  id: number;
  suite: string;
}

export interface IHomeOwnerSignUpAddressPayload {
  city: string;
  address: string;
  countryId: number;
  stateId: number;
  zipCode: string;
  longitude: number;
  latitude: number;
  id: number;
  suite: string;
}

export interface ISignUpPayload {
  place: string;
}
export interface ICountryIdPayload {
  id: number;
}

export interface IStore {
  auth: IAuthStateType;
  qbConfigKey: IAuthStateType;
  signUpAuth: ISignUpAuthStateType;
  projectAndProfessionalAPI: IProjectAndProfessionalType;
  addProReview: IAuthStateType;
  getProReview: IAuthStateType;
  addReviewComment: IAuthStateType;
  proUserDetails: IAuthStateType;
}
export interface IStoreBidList {
  bids: IAuthStateType;
}
export interface IStoreBidDetail {
  bidDetail: IAuthStateType;
}

export interface IStoreBlogDetails {
  blogDetail: IAuthStateType;
}

export interface IStoreAdsDetails {
  adsDetail: IAuthStateType;
}

export interface IStoreUserProfileDetails {
  userProfile: IAuthStateType;
  auth: IAuthStateType;
  qbConfigKey: IAuthStateType;
  removeAccount: IAuthStateType;
}

export interface IStoreResetPassword {
  resetPassword: IAuthStateType;
}
export interface IStoreProjectDetails {
  projectDetails: IAuthStateType;
  selectedProfessionalDetails: IAuthStateType;
}
export interface AuthApiWithPayload {
  type: string;
  payload:
    | ILoginAPIResponse
    | IGetConfiguration
    | IBidListRoot
    | IBidDetailRoot
    | IResetPasswordSendEmailResponse
    | ISignUpAPIResponse
    | undefined;
  message: string;
}

export interface BlogApiWithPayload {
  type: string;
  payload: IBlogCategoryAPIResponse | undefined;
  message: string;
}

export interface AdsApiWithPayload {
  type: string;
  payload: IAdsAPIResponse | undefined;
  message: string;
}
export interface UserDetailApiWithPayload {
  type: string;
  payload: IUserDetailAPIResponse | undefined;
  message: string;
}
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export interface ISocialMediaPayload {
  email: string;
  loginType: number;
  deviceToken: string;
  socialMediaToken: string;
  name: string;
  externalIdentifier: string;
  userType: string;
  firstName?: string;
  lastName?: string;
}
export interface IVerificationPayload {
  email: string;
  otp: string;
}

export interface IChangePasswordPayload {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

export interface IAddProjectPayload {
  id: number;
  name: string;
  expectedStartDateUTC: string;
  expectedCompleteDateUTC: string;
  description: string;
  customerName: string;
  projectTypeId: number;
  areaSqFeetId: number;
  budget: number;
  budgetCurrencyId: number;
  completedStep: number;
  isConfirmed: boolean;
  address: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    countryId: number;
    stateProvinceId: number;
    city: string;
    address1: string;
    zipPostalCode: string;
    phoneNumber: string;
    longitude: number;
    latitude: number;
    suite: string;
    addressProjectPost: string;
  };
}

export interface IProjectProfessionals {
  searchTerm?: string;
  location?: string;
  projectTypeId?: number;
  projectId?: number;
}

export interface IUpdateProjectProfessionals {
  projectInvitationTypeId?: number;
  projectId?: number;
  Ids?: number[];
}
export interface IProjectType {
  projectTypeIndex: number;
  projectTypeName: string;
}

export interface IFileUpload {
  fileBase64String: string;
  fileName: string;
  fileType: string;
  entityName: string;
  entityId: number;
}
export interface IUpdateProjectDetails {
  projectId?: number;
  name: string;
  startDateUTC: string;
  completeDateUTC: string;
  description: string;
}
export interface IUpdateLocation {
  projectId?: number;
  address?: string;
  countryId?: number;
  stateProvinceId?: number;
  city?: string;
  zipCode?: string;
  phoneNumber?: string;
  suite?: string;
}
export interface IUpdateSpecifications {
  projectId?: number;
  projectTypeId?: number;
  areaSqFeetId?: number;
  budget?: number;
}
export interface IDeleteDocuments {
  entityId?: number;
  entityName?: string;
  documentId?: number;
}

export interface projectListType {
  projectStatusId?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface searchFilterProjectListType {
  projectStatusId?: number;
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  projectTypeId?: number;
  location?: string;
  exRate?: string;
  startDate?: string;
  endDate?: string;
}

export interface FilterType {
  projectStatusId?: number;
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  projectTypeId?: number;
  location?: string;
  exRate?: string;
  startDate?: string;
  endDate?: string;
}

export interface BlogPostListType {
  pageNumber?: number;
  pageSize?: number;
  blogPostStatusId?: number;
  blogCategoryId?: number;
}

export interface SearchBlogPostType {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  blogCategoryId?: number;
}

export interface ISaveComplaintsType {
  projectId?: number;
  complaintsReasonsId?: number;
  availableReasons?: [
    {
      disabled?: boolean;
      group: {
        disabled: true;
        name: string;
      };
      selected: boolean;
      text: string;
      value: string;
    },
  ];
  description: string;
}

export interface IComplaintConversation {
  complaintId?: number;
  message?: string;
  fileBase64String?: string;
  fileName?: string;
  fileType?: string;
}
export interface IHomeOwnerEditDetailPayload {
  fileBase64String: string;
  fileName: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  suite: string;
  stateProvinceId: number;
  city: string;
  longitude: number;
  latitude: number;
  zipPostalCode: string;
}
export interface IHomeOwnerChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUpdateStatusConversation {
  bidId?: number;
  bidStatusId?: number;
}

export interface notificationListType {
  pageNumber?: number;
  pageSize?: number;
}

export interface ScreenChangeType {
  screenChange?: string;
}

export interface QbConfigAPIWithPayload {
  type: string;
  payload: IGetConfiguration | undefined;
  message: string;
}
export const navigation = {
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
export const route = {
  reset: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  setOptions: jest.fn(),
  dispatch: jest.fn(),
  route: jest.fn(),
  state: {},
  params: {showComplaintsTab: true, status: 30, addComplaint: true, customerId: 1557},
};

export interface IUpdateMessageParam {
  projectId: number;
  dialogId: string;
  messageId: string;
  opponentId: string;
}

export interface IRemoveAccount {
  customerId: number;
}

export interface IRemoveAccountResponse {
  Success: boolean;
  Message: string;
}
export interface IPostedFiles {
  FileBase64String?: string;
  fileBase64Path?: string;
  FileName?: string;
  FileType?: string;
  fileUri?: string;
  FilePath?: string;
  fileName?: string;
  fileType?: string;
}
export interface IAddReviewResponse {
  ProjectId: number;
  Rating: number;
  Description: string;
  PostedFiles: IPostedFiles[];
  CreatedDateUtc?: string;
  Id?: number;
  RatingConversations: IRatingConversion[];
}
export interface IReviewResponse {
  Data: IAddReviewResponse;
  Success: boolean;
  Message: string;
}
export interface IReviewPayload {
  type: string;
  payload: IReviewResponse | undefined;
  message: string;
}

export interface IAddReviewPayload {
  projectId: number;
  rating: number;
  description: string;
  postedFiles: IPostedFiles[];
}

export interface ICommentRequest {
  ratingId: number;
  description: string;
  customerId: number;
}

export interface IRatingConversion {
  ConversationId: number;
  CreatedDateUtc: string;
  Description: string;
  Id: number;
  ImageLogo: string;
  IsCanReport: boolean;
  IsProConversation: boolean;
  IsProfessionalConversation: boolean;
  IsReportedComment: boolean;
  RatingId: number;
  ReportComment: string;
  ReportedCommentDescription: string;
  Title: string;
}

export interface ICommentConversation {
  conversationId: number;
  reportedCommentDescription: string;
  isReportedComment: boolean;
}

export interface IEmailRequest {
  email: string;
  usertype: string;
}

export interface IEmailResponse {
  Data: string;
  Success: boolean;
  Message: string;
  StatusKey?: boolean;
}

export interface IUserResponse {
  Data: IDetails;
  Success: boolean;
  Message: string;
}
export interface IDetails {
  GetCustomer: ICustomerDetails;
  UserType: string;
}
export interface ICustomerDetails {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
}
