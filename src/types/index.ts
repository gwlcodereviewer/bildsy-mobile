/* eslint-disable camelcase */
import {StyleProp, ViewStyle, TextStyle} from 'react-native';

export interface INavigation {
  [x: string]: any;
  reset: (arg0: {index: number; routes: {name: string; params?: any}[]}) => void;
  getParam: (param1: any, param2: any) => any;
  goBack: () => void;
  dispatch: (param: any) => void;
  push?: (param1: any, param2: any) => void;
  addListener: (a: string, b: () => void) => any;
  navigate: (param1: string, param2?: any) => void;
  setOptions: (param: any) => void;
  route: (key: string, name: string, params: any) => void;
  state: any;
}

export interface ILoginData {
  accessToken: string;
  firstName: string;
  lastName: string;
  userEmail: string;
}

export interface ToastOptions {
  id?: string;
  icon?: JSX.Element;
  type?: 'normal' | 'success' | 'danger' | 'warning' | string;
  duration?: number;
  placement?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  animationDuration?: number;
  animationType?: 'slide-in' | 'zoom-in';
  successIcon?: JSX.Element;
  dangerIcon?: JSX.Element;
  warningIcon?: JSX.Element;
  successColor?: string;
  dangerColor?: string;
  warningColor?: string;
  normalColor?: string;
  onPress?(id: string): void;
  onClose?(): void;
  data?: any;
  swipeEnabled?: boolean;
}

export interface ChatDialog {
  dialogs: DialogRecord[];
  limit: number;
  skip: number;
  total: number;
}

export interface DialogRecord {
  createdAt: string;
  id: string;
  isJoined: boolean;
  lastMessage: string;
  lastMessageDateSent: number;
  lastMessageUserId: number;
  name: string;
  occupantsIds: string[];
  roomJid: string;
  type: number;
  unreadMessagesCount: number;
  updatedAt: string;
  userId: number;
}

export interface IChatUserRoot {
  Data: IChatUserData;
  Success: boolean;
  Message: string;
}

export interface IChatUserData {
  ProjectId: number;
  Professionals: IChatUser[];
  Administrators: IChatUser[];
}

export interface IChatUser {
  CustomerId: number;
  CustomerName: string;
  AvatarUrl: string;
  CustomerType: string;
  Email: string;
  CompanyName?: string;
  QuickBloxUserId: string;
  id: string;
  dialogId: string;
  unreadMessagesCount: number;
  lastMessageDateSent: number;
  fullName: string;
  login: string;
}
export interface IRootUser {
  page: number;
  perPage: number;
  total: number;
  users: IUser[];
}
export interface IUserRoot {
  Data: IUserAdminPro;
  Success: boolean;
  Message: string;
}
export interface IUserAdminPro {
  Professionals: IUser[];
  Administrators: IUser[];
}
export interface IUser {
  fullName: string;
  id: string;
  login: string;
  dialogId: string;
  unreadMessagesCount: number;
  lastMessageDateSent: number;
  CustomerId: number;
  CustomerName: string;
  AvatarUrl: string;
  CustomerType: string;
  Email: string;
  CompanyName: string;
  QuickBloxUserId: string;
}

export interface AreaType {
  Data: [
    {
      Disabled: boolean;
      Group: any;
      Selected: boolean;
      Text: string;
      Value: string;
    },
  ];
  Message: string;
  Success: boolean;
}
export interface ProjectAreaTypeData {
  projectTypeName?: any;
  index?: any;
  Disabled: boolean;
  Group: any;
  Selected: boolean;
  Text: string;
  Value: string;
}
export interface DocumentResponse {
  FileExtension?: string;
  FileName?: string;
  FilePath?: string;
  Id?: number;
  ProjectId?: number;
  fileBase64Path: string;
  fileName: string;
  fileType: string;
}
export interface AttachmentResponse {
  percent: number;
  isDownloading: boolean;
  FileExtension?: string;
  FileName?: string;
  FilePath?: string;
  Id?: number;
  ProjectId?: number;
  fileBase64Path: string;
  fileName: string;
  fileType: string;
}
export interface StateResponse {
  model: [
    {
      id: number;
      name: string;
    },
  ];
}
export interface ComplaintsDetailsResponse {
  Id?: number;
  ProjectId?: number;
  ProjectName?: string;
  ComplaintsStatus?: string;
  ComplaintsStatusId?: number;
  ComplaintsReason?: string;
  Description?: string;
  CreatedOn?: string;
  ResolvedOn?: string;
  CustomerId?: number;
  IsResolveVisible?: boolean;
  RaisedAgainst?: any;
  CreatedBy?: number;
}

export interface ComplaintsCustomerConversation {
  Message: string;
  CreatedOn: string;
  CreatedBy: number;
  CustomerFullName: string;
  ComplaintDocuments: ComplaintDocument[];
  Id: number;
}

export interface ComplaintDocument {
  fileType: string;
  fileName: string;
  fileBase64Path: string;
  percent: number;
  isDownloading: boolean;
  EntityId: number;
  FileName: string;
  FilePath: string;
  Id: number;
}

export interface BidsListResponseType {
  AvailableBid: AvailableBid[];
  ProjectId: number;
  Attachments: any[];
  InvitedProfessionals: InvitedProfessional[];
}

export interface AvailableBid {
  ProposalDescription: string;
  CustomerName: string;
  CustomerType: string;
  BidPrice: string;
  ProposalDescripton: string;
  ProjectId: number;
  AwardedProject: boolean;
  BidTimeInDays: string;
  BidId: number;
  StatusValue: string;
  Status: number;
  IsBildsyAssured: boolean;
  CustomerId: number;
  CompanyName: string;
  CompanyLogo: string;
  ProjectStartOnUTC: string;
  ProjectDeliveredOnUTC: string;
  Attachments: any[];
  ProfessionalId: number;
  ProfessionalName: string;
  ProfessionalEmail: string;
  ProfessionalType: string;
  IsLoggedInUser: boolean;
  InvitedDate: string;
  AvatarUrl: string;
  QuickBloxUserId: string;
  Id: number;
  Phone: string;
  ExpectedCompleteDateUTC: string;
}

export interface InvitedProfessional {
  NoAvailableBidStatus: any;
  CustomerName: string;
  CustomerType: string;
  BidPrice: string;
  ProposalDescripton: string;
  ProjectId: number;
  AwardedProject: boolean;
  BidTimeInDays: string;
  BidId: number;
  StatusValue: string;
  Status: number;
  IsBildsyAssured: boolean;
  CustomerId: number;
  CompanyName: string;
  CompanyLogo: string;
  ProjectStartOnUTC: string;
  ProjectDeliveredOnUTC: string;
  Attachments: any[];
  ProfessionalId: number;
  ProfessionalName: string;
  ProfessionalEmail: string;
  ProfessionalType: string;
  IsLoggedInUser: boolean;
  InvitedDate: string;
  AvatarUrl: string;
  QuickBloxUserId: string;
  Id: number;
  Phone: string;
  ExpectedCompleteDateUTC: string;
}

export interface BidsProfessionalsResponseType {
  AboutMe: string;
  Address1: string;
  City: string;
  CompanyLogo: string;
  CompanyName: string;
  Country: any;
  CountryId: number;
  CustomerSince: string;
  Latitude: number;
  Longitude: number;
  Phone: string;
  ProfessionalId: number;
  ProfessionalName: string;
  StateProvinceId: number;
  StateProvinceName: string;
  StreetAddress: string;
  Suite: string;
  TwoLetterIsoCode: string;
  ZipPostalCode: string;
  Id: number;
}

export type ComplaintListDataType = ComplaintsDetailsResponse[];

export interface IProjectDetailsResponseType {
  Data: ProjectDetailsResponseDataType;
  Success: boolean;
  Message: any;
  Address: Address;
  Attachments: AttachmentsDataType;
}

export interface ProjectDetailsResponseDataType {
  Name: string;
  ProjectStatus: string;
  ProjectStatusId: number;
  ExpectedStartDateUTC: string;
  ExpectedCompleteDateUTC: string;
  Description: string;
  CustomerId: number;
  CustomerName: string;
  Address: Address;
  ProjectTypeId: number;
  ProjectType: string;
  AreaSqFeet: string;
  Budget: string;
  BudgetAmount: number;
  BidStatus: any;
  IsEditable: boolean;
  IsArchived: boolean;
  IsActiveArchived: boolean;
  IsComplaintVisible: boolean;
  IsArchivedByProfessional: boolean;
  Attachments: any[];
  BidAttachments: any[];
  Bids: any;
  ProjectInvitations: any[];
  InvitedProfessionals: any[];
  ProjectAwardedDateTimeUTC: string;
  Complaints: Complaint[];
  ProjectUniqueId: string;
  IsBidPlaced: boolean;
  BidCount: number;
  CreatedOnDateUTC: string;
  AreaSqFeetId: number;
  ProjectId: number;
  IsProfessionalBidStatus: boolean;
  ShareEstimateToHo: any;
  Id: number;
  ProjectIsDeleted: boolean;
}

export interface Address {
  FirstName: string;
  LastName: string;
  Email: string;
  CompanyEnabled: boolean;
  CompanyRequired: boolean;
  Company: string;
  CountryEnabled: boolean;
  CountryId: number;
  CountryName: string;
  StateProvinceEnabled: boolean;
  StateProvinceId: number;
  StateProvinceName: string;
  CountyEnabled: boolean;
  CountyRequired: boolean;
  County: any;
  CityEnabled: boolean;
  CityRequired: boolean;
  City: string;
  StreetAddressEnabled: boolean;
  StreetAddressRequired: boolean;
  Address1: string;
  StreetAddress2Enabled: boolean;
  StreetAddress2Required: boolean;
  Address2: any;
  ZipPostalCodeEnabled: boolean;
  ZipPostalCodeRequired: boolean;
  ZipPostalCode: string;
  PhoneEnabled: boolean;
  PhoneRequired: boolean;
  PhoneNumber: string;
  FaxEnabled: boolean;
  FaxRequired: boolean;
  FaxNumber: any;
  AvailableCountries: AvailableCountry[];
  AvailableStates: AvailableState[];
  FormattedCustomAddressAttributes: string;
  CustomAddressAttributes: any[];
  GoogleApiKey: any;
  Longitude: number;
  Latitude: number;
  Suite: string;
  Id: number;
}

export interface AvailableCountry {
  Disabled: boolean;
  Group: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface AvailableState {
  Disabled: boolean;
  Group: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface Complaint {
  ProjectId: number;
  ProjectName: string;
  CreatedBy: number;
  RaisedAgainst: string;
  Budget: string;
  ComplaintsStatus: string;
  ComplaintsStatusId: number;
  ComplaintsReasonsId: number;
  ComplaintsReason: string;
  AvailableReasons: any[];
  Description: string;
  CreatedOn: string;
  ResolvedOn?: string;
  ComplaintsCustomerConversations: ComplaintsCustomerConversation[];
  ComplaintDocuments: any[];
  ProjectUniqueId: string;
  CustomerId: number;
  EntityId: number;
  Id: number;
}

export type ProjectProfessionalsResponseType = ProjectProfessionalsDataResponse[];

export interface ProjectProfessionalsDataResponse {
  UsernamesEnabled: boolean;
  Username: any;
  Email: string;
  Password: any;
  VendorId: number;
  AvailableVendors: any[];
  GenderEnabled: boolean;
  Gender: any;
  FirstNameEnabled: boolean;
  FirstName: any;
  LastNameEnabled: boolean;
  LastName: any;
  FullName: string;
  DateOfBirthEnabled: boolean;
  DateOfBirth: any;
  CompanyEnabled: boolean;
  Company: string;
  CompanyLogo: string;
  StreetAddressEnabled: boolean;
  StreetAddress: string;
  StreetAddress2Enabled: boolean;
  StreetAddress2: any;
  ZipPostalCodeEnabled: boolean;
  ZipPostalCode: any;
  CityEnabled: boolean;
  City: any;
  CountyEnabled: boolean;
  County: any;
  CountryEnabled: boolean;
  CountryId: number;
  AvailableCountries: AvailableCountry[];
  StateProvinceEnabled: boolean;
  StateProvinceId: number;
  AvailableStates: AvailableState[];
  PhoneEnabled: boolean;
  Phone: any;
  FaxEnabled: boolean;
  Fax: any;
  LicenseNumber: any;
  AboutMe: any;
  LocalAddressId: number;
  CustomerAttributes: any[];
  RegisteredInStore: any;
  AdminComment: any;
  IsTaxExempt: boolean;
  Active: boolean;
  AffiliateId: number;
  AffiliateName: any;
  TimeZoneId: any;
  AllowCustomersToSetTimeZone: boolean;
  AvailableTimeZones: any[];
  VatNumber: any;
  VatNumberStatusNote: any;
  DisplayVatNumber: boolean;
  DisplayRegisteredInStore: boolean;
  StateName: any;
  CountryName: any;
  TwoLetterIsoCode: any;
  CreatedOn: string;
  LastActivityDate: string;
  LastIpAddress: any;
  LastVisitedPage: any;
  CustomerRoleNames: string;
  AvailableCustomerRoles: any[];
  SelectedCustomerRoleIds: any[];
  AvailableNewsletterSubscriptionStores: any[];
  SelectedNewsletterSubscriptionStoreIds: any[];
  ProjectTypeId: any;
  DisplayRewardPointsHistory: boolean;
  AddRewardPoints: AddRewardPoints;
  CustomerRewardPointsSearchModel: CustomerRewardPointsSearchModel;
  AllowSendingOfPrivateMessage: boolean;
  AllowSendingOfWelcomeMessage: boolean;
  AllowReSendingOfActivationMessage: boolean;
  GdprEnabled: boolean;
  AvatarUrl: string;
  CustomerAddressSearchModel: CustomerAddressSearchModel;
  CustomerOrderSearchModel: CustomerOrderSearchModel;
  CustomerShoppingCartSearchModel: any;
  CustomerActivityLogSearchModel: any;
  CustomerBackInStockSubscriptionSearchModel: any;
  CustomerAssociatedExternalAuthRecordsSearchModel: any;
  WorkRadius: any;
  WorkRadiusUnit: any;
  IsBildsyAssured: boolean;
  Id: number;
}

export interface AddRewardPoints {
  CustomerId: number;
  Points: number;
  Message: any;
  StoreId: number;
  AvailableStores: any[];
  ActivatePointsImmediately: boolean;
  ActivationDelay: number;
  ActivationDelayPeriodId: number;
  PointsValidity: any;
}

export interface CustomerRewardPointsSearchModel {
  CustomerId: number;
  Page: number;
  PageSize: number;
  AvailablePageSizes: any;
  Draw: any;
  Start: number;
  Length: number;
}

export interface CustomerAddressSearchModel {
  CustomerId: number;
  Page: number;
  PageSize: number;
  AvailablePageSizes: any;
  Draw: any;
  Start: number;
  Length: number;
}

export interface CustomerOrderSearchModel {
  CustomerId: number;
  Page: number;
  PageSize: number;
  AvailablePageSizes: any;
  Draw: any;
  Start: number;
  Length: number;
}

export type AttachmentsResponseType = AttachmentsDataType[];

export interface AttachmentsDataType {
  percent: number;
  isDownloading: boolean;
  ProjectId: number;
  FileName: string;
  FileExtension: string;
  FilePath: string;
  Id: number;
}

export interface AdsProfessionals {
  AdsId: number;
  ProfessionalId: number;
  ProfessionalName: string;
  AboutMe: any;
  CompanyLogo: string;
  CompanyName: string;
  CustomerSince: string;
  Phone: string;
  StreetAddress: string;
  Address1: string;
  Suite: string;
  CountryId: number;
  Country: string;
  StateProvinceId: number;
  StateProvinceName: string;
  TwoLetterIsoCode: string;
  City: string;
  Longitude: number;
  Latitude: number;
  ZipPostalCode: string;
}

export type DashboardProjectListType = DashboardProjectListDataType[];

export interface DashboardProjectListDataType {
  Name: string;
  ProjectId: number;
  ProjectType: string;
  ProjectLocation: string;
  Status: number;
  ProjectStatus: string;
  AwardedDateTimeUtc: any;
  Info: Info[];
  BidStatusId: any;
  BidStatus: any;
}

export interface Info {
  Name: string;
  DateTime: string;
}

export interface FbUserDataType {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  name: string;
  picture: Picture;
}

export interface Picture {
  data: Data;
}

export interface Data {
  ProfessionalModel: any[];
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}

export interface LocationType {
  Disabled: boolean;
  Group: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface LocationResponseType {
  Data: LocationDataType[];
  Success: boolean;
  Message: any;
}

export interface LocationDataType {
  Disabled: boolean;
  Group: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface ProjectLicenseList {
  Disabled: boolean;
  Group?: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface AvailableCountry2 {
  Disabled: boolean;
  Group?: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface AvailableState2 {
  Disabled: boolean;
  Group?: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface LocalAddress {
  CountryId: number;
  CountryName: string;
  StateProvinceId: number;
  StateProvinceName: string;
  Abbreviation: string;
  City: string;
  Address1: string;
  ZipPostalCode: string;
  AvailableCountries: AvailableCountry2[];
  AvailableStates: AvailableState2[];
  GoogleApiKey?: any;
  Longitude: number;
  Latitude: number;
  Suite: string;
  Id: number;
}
export interface UserData {
  IsAddressCapture: any;
  Email: string;
  EmailToRevalidate?: any;
  CheckUsernameAvailabilityEnabled: boolean;
  AllowUsersToChangeUsernames: boolean;
  UsernamesEnabled: boolean;
  Username: string;
  GenderEnabled: boolean;
  Gender?: any;
  CustomerId?: number;
  FirstNameEnabled: boolean;
  FirstName: string;
  FirstNameRequired: boolean;
  LastNameEnabled: boolean;
  LastName: string;
  LastNameRequired: boolean;
  DateOfBirthEnabled: boolean;
  DateOfBirthDay?: any;
  DateOfBirthMonth?: any;
  DateOfBirthYear?: any;
  DateOfBirthRequired: boolean;
  CompanyLogo: string;
  CompanyEnabled: boolean;
  CompanyRequired: boolean;
  Company?: any;
  StreetAddressEnabled: boolean;
  StreetAddressRequired: boolean;
  StreetAddress?: any;
  StreetAddress2Enabled: boolean;
  StreetAddress2Required: boolean;
  StreetAddress2?: any;
  ZipPostalCodeEnabled: boolean;
  ZipPostalCodeRequired: boolean;
  ZipPostalCode: string;
  CityEnabled: boolean;
  CityRequired: boolean;
  City: string;
  CountyEnabled: boolean;
  CountyRequired: boolean;
  County?: any;
  CountryEnabled: boolean;
  CountryRequired: boolean;
  CountryId: number;
  AvailableCountries: AvailableCountry[];
  StateProvinceEnabled: boolean;
  StateProvinceRequired: boolean;
  StateProvinceId: number;
  AvailableStates: AvailableState[];
  PhoneEnabled: boolean;
  PhoneRequired: boolean;
  Phone?: any;
  FaxEnabled: boolean;
  FaxRequired: boolean;
  Fax?: any;
  NewsletterEnabled: boolean;
  Newsletter: boolean;
  SignatureEnabled: boolean;
  Signature?: any;
  TimeZoneId?: any;
  AllowCustomersToSetTimeZone: boolean;
  AvailableTimeZones: any[];
  VatNumber?: any;
  VatNumberStatusNote: string;
  DisplayVatNumber: boolean;
  AssociatedExternalAuthRecords: any[];
  NumberOfExternalAuthenticationProviders: number;
  AllowCustomersToRemoveAssociations: boolean;
  CustomerAttributes: any[];
  GdprConsents: any[];
  ProjectLicenseList: ProjectLicenseList[];
  State?: any;
  PhoneNumber?: any;
  LicenseNumber?: any;
  AboutMe?: any;
  LocalAddressId: number;
  WorkRadius?: any;
  WorkRadiusUnit?: any;
  AvatarUrl: string;
  CreatedOnUTC: Date;
  LocallAddress: string;
  FullName: string;
  LocalAddress: LocalAddress;
  SiteAddress1?: any;
  SiteAddress2?: any;
  Skills: any[];
  Addresses: any[];
  IsBildsyAssured: boolean;
  GoogleApiKey?: any;
  Longitude: number;
  Latitude: number;
  LicenseType?: any;
  IsAccountHold: boolean;
  Suite: string;
  LicenseInfo: any[];
  AvailableState: any[];
  IsInvitedUser: boolean;
  CustomProperties: any;
  QuickBloxLoginName: string;
}

export interface ILoginAPIResponse {
  Success: boolean;
  AccessToken: string;
  Data: UserData;
}
export interface ISignUpAPIResponse {
  Success: boolean;
  AccessToken: string;
  Data: UserData;
}
export interface IDashboardProjectListResponse {
  Data: Data;
  Success: boolean;
  Message: any;
}

export interface IDashboardProjectList {
  AllProjects: AllProject[];
  CustomerType: string;
  Id: number;
}

export interface AllProject {
  Name: string;
  ProjectId: number;
  ProjectType: string;
  ProjectLocation: string;
  Status: number;
  ProjectStatus: string;
  AwardedDateTimeUtc: any;
  Info: Info[];
  BidStatusId: any;
  BidStatus: any;
}

export interface IFbUserResponseType {
  errorData: any;
  accessToken: string;
  userData: FbUserDataType;
}

export interface IGoogleUserResponseType {
  code: number;
  errorData: any;
  idToken: string;
  serverAuthCode: any;
  user: IGoogleUserDataType;
  scopes: string[];
}

export interface IGoogleUserDataType {
  givenName: string;
  email: string;
  id: string;
  familyName: string;
  photo: string;
  name: string;
}
export interface IGetConfiguration {
  Data: GetConfigurationData;
  Success: boolean;
}

export interface GetConfigurationData {
  ApplicationId: string;
  AuthKey: string;
  AuthorizationSecret: string;
  AccountKey: string;
  HelpDeskWiidgetUrl: string;
}

export interface IBidDetailRoot {
  Phone: undefined;
  Data: IBidDetailData;
  Message: any;
  Success: boolean;
}

export interface IBidDetailData {
  ProjectDeliveredOnUTC: string;
  BidAttachments: any[];
  BidId: number;
  BidPlacedOn: string;
  ProjectStartOnUTC: string;
  ExpectedCompleteDateUTC: string;
  BidPrice: string;
  CompanyLogo: string;
  CompanyName: string;
  CustomerSince: string;
  Phone: string;
  ProfessionalId: number;
  ProfessionalName: string;
  ProjectAwarded: boolean;
  ProjectId: number;
  ProjectTitle: string;
  ProposalDescription: string;
  Status: number;
  TimeOut: boolean;
  ProjectIsDeleted: boolean;
}
export interface IBidListRoot {
  Data: IBidListData;
  Success: boolean;
  Message: any;
}

export interface IBidsProfessionalsResponseTypeRoot {
  Data: BidsProfessionalsResponseType;
  Success: boolean;
  Message: any;
}

export interface IBidListData {
  AvailableBid: AvailableBid[];
  ProjectId: number;
  Attachments: any[];
  InvitedProfessionals: any[];
}

export interface Attachment {
  EntityId: number;
  FileName: string;
  FileExtension: string;
  FilePath: string;
}

export interface INotificationRoot {
  Data: Data;
  Success: boolean;
  Message: any;
}

export interface INotificationData {
  PagingFilteringContext: PagingFilteringContext;
  NotificationLogs: NotificationLog[];
}

export interface NotificationLog {
  Id: number;
  NotificationFrom: number;
  CustomerId: number;
  Title: string;
  Message: string;
  PictureUrl: string;
  LinkUrl: string;
  TimeAgo: string;
  CreatedOnUTC: string;
  IsRead: boolean;
  EntityId: number;
  EntityType: number;
  IsProjectActive: boolean;
  ProjectId: number;
}

export interface IBlogCategoryAPIResponse {
  Data: IBlogCategoryData[];
  Success: boolean;
  Message: null;
}

export interface IAdsAPIResponse {
  Data: AdsData[];
  Success: boolean;
  Message: null;
}

export interface AdsData {
  Id: number;
  AdGuid: string;
  Name: string;
  WebPictureId: number;
  Headline: string;
  Description: string;
  WebsiteUrl: string;
  ButtonTypeId: number;
  ButtonType: string;
  ButtonText: string;
  WebTemplateId: number;
  AdsTypeId: number;
  AdsType: string;
  StartDateTimeUTC: null;
  EndDateTimeUTC: null;
  StepType: null;
  AdImageURL: string;
}

export interface IBlogCategoryData {
  Name: string;
  DisplayOrder: number;
  Published: boolean;
  SeName: null;
  MetaTitle: null;
  MetaKeywords: null;
  MetaDescription: null;
  Id: number;
}
export interface IBlogListAPIResponse {
  Data: BlogListData;
  Success: boolean;
  Message: null;
}

export interface BlogListData {
  WorkingLanguageId: number;
  PagingFilteringContext: PagingFilteringContext;
  BlogPosts: BlogPost[];
}

export interface BlogPost {
  MetaKeywords: null;
  MetaDescription: null;
  MetaTitle: null;
  SeName: string;
  RedirectTo: null;
  Title: string;
  Body: string;
  BodyOverview: string;
  AllowComments: boolean;
  NumberOfComments: number;
  CreatedOn: Date;
  Tags: any[];
  Comments: any[];
  AddNewComment: AddNewComment;
  DefaultPictureModel: DefaultPictureModel;
  CreatedBy: number;
  CreatedByName: string;
  BlogCategoryId: number;
  BlogCategoryName: string;
  BlogPostStatusId: number;
  BlogPostStatus: string;
  RejectReason: string;
  CustomerAvatar: string;
  CreatedByValue: null;
  CompanyName: null;
  Id: number;
}

export interface AddNewComment {
  CommentText: null;
  DisplayCaptcha: boolean;
  Id: number;
}

export interface DefaultPictureModel {
  ImageUrl: string;
  ThumbImageUrl: null;
  FullSizeImageUrl: string;
  Title: string;
  AlternateText: string;
}

export interface PagingFilteringContext {
  Month: null;
  Tag: null;
  AllowCustomersToSelectPageSize: boolean;
  PageSizeOptions: any[];
  Q: null;
  Status: null;
  Sid: number;
  PageIndex: number;
  PageNumber: number;
  PageSize: number;
  TotalItems: number;
  TotalPages: number;
  FirstItem: number;
  LastItem: number;
  HasPreviousPage: boolean;
  HasNextPage: boolean;
  CustomProperties: any;
}
export interface IBlogDetailAPIResponse {
  Data: BlogDetailData;
  Success: boolean;
  Message: null;
}

export interface BlogDetailData {
  MetaKeywords: null;
  MetaDescription: null;
  MetaTitle: null;
  SeName: string;
  RedirectTo: null;
  Title: string;
  Body: string;
  BodyOverview: string;
  AllowComments: boolean;
  NumberOfComments: number;
  CreatedOn: Date;
  Tags: any[];
  Comments: any[];
  AddNewComment: AddNewComment;
  DefaultPictureModel: DefaultPictureModel;
  CreatedBy: number;
  CreatedByName: string;
  BlogCategoryId: number;
  BlogCategoryName: string;
  BlogPostStatusId: number;
  BlogPostStatus: string;
  RejectReason: string;
  CustomerAvatar: string;
  CreatedByValue: null;
  CompanyName: null;
  Id: number;
}
export interface IResetPasswordSendEmailResponse {
  Data: ResetPasswordSendEmailData;
  Success: boolean;
  Message: string;
}

export interface ResetPasswordSendEmailData {
  Email: string;
  Token: string;
}

export interface IFileData {
  name: string;
  size: number;
  id: string;
  type: string;
  contentType: string;
  uid: string;
  FilePath: string;
  FileName: string;
  fileName: string;
  fileType: string;
  FileExtension: string;
  uri: string;
}

export interface ICommonResponse {
  Data: any;
  Success: boolean;
  Message: string;
}

export interface BidAttachment {
  EntityId: number;
  FileName: string;
  fileName: string;
  FileExtension: string;
  FilePath: string;
  isDownloading: boolean;
  percent: number;
}

export interface ISelectedProfessionalResponse {
  Data: Data;
  Success: boolean;
  Message: any;
}

export interface ISelectedProfessionalData {
  ProfessionalModel: IProfessionalModel[];
  PagerModel: any;
  Editable: boolean;
  AvailableCities: any;
  Cities: any;
  IsImpersonate: boolean;
  ProjectImpersonateStatus: number;
  IsSearch: boolean;
  Data: any;
  Draw: any;
  RecordsFiltered: number;
  RecordsTotal: number;
}

export interface IProfessionalModel {
  UsernamesEnabled: boolean;
  Username: any;
  Email: string;
  Password: any;
  VendorId: number;
  AvailableVendors: any[];
  GenderEnabled: boolean;
  Gender: any;
  FirstNameEnabled: boolean;
  FirstName: any;
  LastNameEnabled: boolean;
  LastName: any;
  FullName: string;
  DateOfBirthEnabled: boolean;
  DateOfBirth: any;
  CompanyEnabled: boolean;
  Company: string;
  CompanyLogo: string;
  StreetAddressEnabled: boolean;
  StreetAddress: string;
  StreetAddress2Enabled: boolean;
  StreetAddress2: any;
  ZipPostalCodeEnabled: boolean;
  ZipPostalCode: any;
  CityEnabled: boolean;
  City: any;
  CountyEnabled: boolean;
  County: any;
  CountryEnabled: boolean;
  CountryId: number;
  AvailableCountries: AvailableCountry[];
  StateProvinceEnabled: boolean;
  StateProvinceId: number;
  AvailableStates: AvailableState[];
  PhoneEnabled: boolean;
  Phone: any;
  FaxEnabled: boolean;
  Fax: any;
  LicenseNumber: any;
  AboutMe: any;
  LocalAddressId: number;
  CustomerAttributes: any[];
  RegisteredInStore: any;
  AdminComment: any;
  IsTaxExempt: boolean;
  Active: boolean;
  AffiliateId: number;
  AffiliateName: any;
  TimeZoneId: any;
  AllowCustomersToSetTimeZone: boolean;
  AvailableTimeZones: any[];
  VatNumber: any;
  VatNumberStatusNote: any;
  DisplayVatNumber: boolean;
  DisplayRegisteredInStore: boolean;
  StateName: any;
  CountryName: any;
  TwoLetterIsoCode: any;
  CreatedOn: string;
  LastActivityDate: string;
  LastIpAddress: any;
  LastVisitedPage: any;
  CustomerRoleNames: string;
  AvailableCustomerRoles: any[];
  SelectedCustomerRoleIds: any[];
  AvailableNewsletterSubscriptionStores: any[];
  SelectedNewsletterSubscriptionStoreIds: any[];
  ProjectTypeId: any;
  DisplayRewardPointsHistory: boolean;
  AddRewardPoints: AddRewardPoints;
  CustomerRewardPointsSearchModel: CustomerRewardPointsSearchModel;
  AllowSendingOfPrivateMessage: boolean;
  AllowSendingOfWelcomeMessage: boolean;
  AllowReSendingOfActivationMessage: boolean;
  GdprEnabled: boolean;
  AvatarUrl: string;
  CustomerAddressSearchModel: CustomerAddressSearchModel;
  CustomerOrderSearchModel: CustomerOrderSearchModel;
  CustomerShoppingCartSearchModel: any;
  CustomerActivityLogSearchModel: any;
  CustomerBackInStockSubscriptionSearchModel: any;
  CustomerAssociatedExternalAuthRecordsSearchModel: any;
  WorkRadius: any;
  WorkRadiusUnit: any;
  IsBildsyAssured: boolean;
  Id: number;
}

export interface IFileResponse {
  uri: string;
}

export interface IUserDetailAPIResponse {
  Data: UserProfileData;
  Success: boolean;
  Message: null;
}

export interface UserProfileData {
  FirstName: string;
  LastName: string;
  AvatarUrl: string;
  FullName: string;
  CustomerRoleName: string;
  Email: string;
  Phone: string;
  MemberSince: Date;
  StreetAddress: string;
  Address1: string;
  Suite: string;
  StateProvinceId: number;
  StateProvinceName: string;
  City: string;
  Longitude: number;
  Latitude: number;
  ZipPostalCode: string;
  Id?: number;
  ProviderSystemName?: number;
  CustomerId: number;
}

export type IGalleryImageData = IImageData[];

export interface IImageData {
  contentType: string;
  fileBase64Path: string;
  fileName: string;
  fileType: string;
  name: string;
  size: number;
  type: string;
  uri: string;
}

export interface HOComplainDetailResponce {
  Data: HOComplainDetailData;
  Success: boolean;
  Message: any;
}

export interface HOComplainDetailData {
  ProjectId?: number;
  ProjectName?: string;
  CreatedBy?: number;
  RaisedAgainst?: string;
  Budget?: string;
  ComplaintsStatus?: string;
  ComplaintsStatusId?: number;
  ComplaintsReasonsId?: number;
  ComplaintsReason: string;
  AvailableReasons?: any[];
  Description?: string;
  CreatedOn?: string;
  ResolvedOn?: any;
  ComplaintsCustomerConversations?: any[];
  ComplaintDocuments?: ComplaintDocument[];
  ProjectUniqueId?: string;
  CustomerId?: number;
  EntityId?: number;
  IsResolveVisible?: boolean;
  Id?: number;
}

export interface IHoComplaintDetails {
  Data: IHoComplaintDetailsData;
  Success: boolean;
  Message: any;
}

export interface IHoComplaintDetailsData {
  ProjectId?: number;
  ProjectName?: string;
  CreatedBy?: number;
  RaisedAgainst?: string;
  Budget?: string;
  ComplaintsStatus?: string;
  ComplaintsStatusId?: number;
  ComplaintsReasonsId?: number;
  ComplaintsReason?: string;
  AvailableReasons?: any[];
  Description?: string;
  CreatedOn?: string;
  ResolvedOn?: string;
  ProjectUniqueId?: string;
  CustomerId?: number;
  EntityId?: number;
  IsResolveVisible?: boolean;
  Id?: number;
}

export interface IProjectListdata {
  Data: ProjectListData;
  Success: boolean;
  Message: any;
}

export interface ProjectListData {
  Warning: any;
  NoResults: boolean;
  q: any;
  sd: any;
  ed: any;
  PagingFilteringContext: PagingFilteringContext;
  ProjectOverviews: ProjectOverview[];
  ProjectBidOverviews: any;
  CustomProperties: any;
}

export interface ProjectOverview {
  Name: string;
  ProjectStatus: string;
  ProjectStatusId: number;
  ExpectedStartDateUTC: string;
  ExpectedCompleteDateUTC: string;
  Description: string;
  CustomerId: number;
  CustomerName: string;
  Address: Address;
  ProjectTypeId: number;
  ProjectType: string;
  AreaSqFeet: string;
  Budget: string;
  BudgetAmount: number;
  BidStatus?: string;
  IsEditable: boolean;
  IsArchived: boolean;
  IsActiveArchived: boolean;
  IsComplaintVisible: boolean;
  IsArchivedByProfessional: boolean;
  Attachments: Attachment[];
  BidAttachments: BidAttachment[];
  Bids?: Bids;
  ProjectInvitations: any[];
  InvitedProfessionals: InvitedProjectProfessional[];
  ProjectAwardedDateTimeUTC?: string;
  Complaints: ProjectComplaint[];
  ProjectUniqueId: string;
  IsBidPlaced: boolean;
  BidCount: number;
  CreatedOnDateUTC: string;
  AreaSqFeetId: number;
  ProjectId: number;
  IsProfessionalBidStatus: boolean;
  ShareEstimateToHo: boolean;
  ProjectBidStatus: number;
  ProjectActualStatus: number;
  ProfessionalPhone?: string;
  ProfessionalBidPlaced: boolean;
  IsImpersonate: boolean;
  ProjectIsDeleted: boolean;
  Id: number;
  CustomProperties: any;
}

export interface Bids {
  BidGuid: string;
  InvitationId: number;
  ProjectId: number;
  CustomerId: number;
  BidAmount: number;
  CurrencyId: number;
  ProposalDescription: string;
  ProjectStartOnUTC: string;
  ProjectDeliveredOnUTC: string;
  BidStatusId: number;
  CreatedOnUTC: string;
  UpdatedOnUTC: string;
  QueuedEmailId: number;
  IsPushSend?: boolean;
  BidStatus: number;
  Id: number;
}

export interface InvitedProjectProfessional {
  ProfessionalId: number;
  ProfessionalName: string;
  ProfessionalEmail: string;
  ProfessionalType: string;
  IsLoggedInUser: boolean;
  InvitedDate: string;
  IsBildsyAssured: boolean;
  CompanyName: string;
  CompanyLogo: string;
  Phone: string;
  AvatarUrl: string;
  QuickBloxUserId: string;
  NoAvailableBidStatus: any;
  Id: number;
  CustomProperties: any;
}

export interface ProjectComplaint {
  ProjectId: number;
  ProjectName: string;
  CreatedBy: number;
  RaisedAgainst: string;
  Budget: string;
  ComplaintsStatus: string;
  ComplaintsStatusId: number;
  ComplaintsReasonsId: number;
  ComplaintsReason: string;
  AvailableReasons: any[];
  Description: string;
  CreatedOn: string;
  ResolvedOn?: string;
  ComplaintsCustomerConversations: ComplaintsCustomerConversation[];
  ComplaintDocuments: ComplaintprojectDocument[];
  ProjectUniqueId: string;
  CustomerId: number;
  EntityId: number;
  IsResolveVisible: boolean;
  ProjectIsDeleted: boolean;
  Id: number;
  CustomProperties: any;
}
export interface ComplaintprojectDocument {
  EntityId: number;
  FileName: string;
  FilePath: string;
  FileExtension: string;
  Id: number;
  CustomProperties: any;
}

export interface IHeader {
  isCenter?: boolean;
}
export interface IButton {
  selected?: boolean;
  marginTop?: number;
  id?: string;
}
