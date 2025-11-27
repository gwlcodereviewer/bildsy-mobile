/* eslint-disable no-useless-escape */
import {localStrings} from '../../localization/localStrings';
import {strings} from '../strings';

const {
  camera,
  document,
  cancel,
  bidPending,
  completed,
  projectAwarded,
  inProgress,
  draft,
  bidding,
  unfulfilled,
  archived,
  project,
  complaintEntity,
  bildsy,
  gallery,
  archive,
  projects,
  dashboard,
  blogs,
  notification,
  homeOwner,
  town,
  area,
  help,
  nearestRoad,
  nameCity,
  streetNumber,
  complaint,
  addComplaint,
  imagePng,
  imageApng,
  imageSvgXml,
  imageWebp,
  imageBmp,
  imageGif,
  imageJpeg,
  imageJpg,
  imageJpe,
  imageJfif,
  Jpg,
  Jpeg,
  Png,
  Webp,
  Gif,
  Jpe,
  Bmp,
  Jfif,
  Avif,
  Apng,
  PNG,
  JPG,
  WEBP,
  GIF,
  BMP,
  JPE,
  JFIF,
  JPEG,
} = localStrings;

const {fileTripleSlash, fileSingleSlash, name, email, subject, descriptionEntity, status, priority} = strings;

export const complaintEntityName = complaintEntity;
export const projectEntityName = project;
export const categoryBildsy = bildsy;
export const statusCompleted = completed;
export const statusArchived = archived;
export const statusProjectAwarded = projectAwarded;
export const actionSheetOptions = [camera, gallery, document, cancel];
export const imagePickerOptions = [camera, gallery, cancel];
export const projectPickerOptions = [archive, cancel];
export const complaintRedirectOption = [complaint, cancel];
export const complaintPickerOptions = [addComplaint, cancel];
export const userTypeHO = homeOwner;
export const countryId = 237;
export const townConst = town;
export const areaConst = area;
export const nearestRoadConst = nearestRoad;
export const nameCityConst = nameCity;
export const streetNumberConst = streetNumber;
export const ImageExtension = [
  imagePng,
  imageApng,
  imageSvgXml,
  imageWebp,
  imageBmp,
  imageGif,
  imageJpeg,
  imageJpg,
  imageJpe,
  imageJfif,
  Jpg,
  Jpeg,
  Png,
  Webp,
  Gif,
  Jpe,
  Bmp,
  Jfif,
  Avif,
  Apng,
  PNG,
  JPG,
  WEBP,
  GIF,
  BMP,
  JPE,
  JFIF,
  JPEG,
];
export const bidStatus = [
  {
    Status: 10,
    statusValue: completed,
  },
  {
    Status: 20,
    statusValue: projectAwarded,
  },
  {
    Status: 30,
    statusValue: bidPending,
  },
  {
    Status: 40,
    statusValue: inProgress,
  },
  {
    Status: 50,
    statusValue: draft,
  },
  {
    Status: 60,
    statusValue: bidding,
  },
  {
    Status: 70,
    statusValue: unfulfilled,
  },
  {
    Status: 80,
    statusValue: archived,
  },
];
export const navProjects = projects;
export const navDashboard = dashboard;
export const navBlogs = blogs;
export const navHelp = help;
export const navNotification = notification;
export const entityName = project;
export const FORM_DATA = {
  name,
  email,
  subject,
  descriptionEntity,
  status,
  priority,
};
export const PUSH_TYPE_PROJECT_INVITED = 10;
export const PUSH_TYPE_HO_RAISED_COMPLAINTS_AGAINST_PRO = 20;
export const PUSH_TYPE_PAYMENT_SETTING = 60;
export const PUSH_TYPE_BID_PLACED = 50;
export const PUSH_TYPE_BID_DECLINED = 40;
export const PUSH_TYPE_BID_REJECTED = 10;
export const PUSH_TYPE_PROJECT_REVIEW = 160;

export const BID_STATUS_BID_DECLINED = 50;
export const BID_STATUS_BID_PLACED = 10;
export const BID_STATUS_BID_REJECTED = 20;
export const BID_STATUS_BID_AWARDED = 30;
export const BID_STATUS_BID_PENDING = 40;
export const BID_STATUS_PROJECT_UNFILLED = 70;
export const BID_STATUS_BID_LOST = 80;
export const ADS_APPROVED = 3;
export const ADS_DRAFT = 6;
export const ADS_IN_REVIEW = 1;
export const ADS_REJECTED = 2;
export const ADS_EXPIRED = 4;
export const ADS_IN_ACTIVE = 5;
export const PUSH_TYPE_BLOG_PUBLISHED = 30;
export const PUSH_TYPE_DRAFT = 150;
export const COMPLAINT_RESOLVED = 30;
export const MINIMUM_BUDGET_RANGE = 0;
export const MAX_BUDGET_RANGE = 500000;
export const PROJECT_STATUS_COMPLETED = 10;
export const PROJECT_STATUS_AWARDED = 20;
export const PROJECT_STATUS_DRAFT = 50;
export const PROJECT_STATUS_BIDDING = 60;
export const PROJECT_STATUS_UN_FULL_FILLED = 70;
export const PROJECT_STATUS_ARCHIVED = 80;
export const FORM_DATA_STATUS_VALUE = '2';
// TODO: VALUE TO BE CHANGED IN CASE OF ACCOUNT CREDENTIAL CHANGE OF FRESH_DESK
export const HELP_DESK_AUTHORIZATION = 'Basic OExFVWVlNVdPbkZJRkJVcUtGUTk6WA==';
export const FRESH_DESK_ATTACHMENT_KEY = 'attachments[]';
export const DIGIT_5 = 5;
export const DIGIT_0 = 0;
export const FORM_DATA_NAME = 'name';
export const FORM_DATA_EMAIL = 'email';
export const FORM_DATA_SUBJECT = 'subject';
export const FORM_DATA_DESCRIPTION = 'description';
export const FORM_DATA_STATUS = 'status';
export const FORM_DATA_PRIORITY = 'priority';
export const FRESH_DESK_UPLOAD_20MB_LIMIT = 20000000;
export const FORM_DATA_PRIORITY_VALUE = '4';
export const FILE_TRIPLE_HASH_STRING = fileTripleSlash;
export const FILE_SINGLE_HASH_STRING = fileSingleSlash;
// TODO: VALUE TO BE CHANGED IN CASE OF ACCOUNT CREDENTIAL CHANGE OF FRESH_DESK
export const FRESH_DESK_USERNAME = '8LEUee5WOnFIFBUqKFQ9';
export const FRESH_DESK_PASSWORD = 'X';
export const MULTI_PART_FORM_DATA = 'multipart/form-data';
export const APPLICATION_JSON = 'application/json';
export const PHONE_NUMBER_REGEX = /[a-zA-Z- #*;(),.<>''{''}''[\]\\''/]/gi;
export const VALID_PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';
export const VALID_PASSWORD_WITHOUT_SPECIAL_CHARACTER_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';
export const VALID_EMAIL_CHECK_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const VALID_SPACE_CHECK_REGEX = /\s/g;
export const MINIMUM_EIGHT_CHARACTER_REGEX = /[A-Za-z\d@$#!%*?&]{8,}$/;
export const NUMBER_CASE_REGEX = /(?=.*\d)/;
export const UPPER_CASE_REGEX = /(?=.*[A-Z])/;
export const LOWER_CASE_REGEX = /(?=.*[a-z])/;
export const SPECIAL_CHARACTER_REGEX = /(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
export const ALPHABET_CASE_REGEX = /[a-z\W+/]/i;
export const TEXT_CHECK_REGEX = /[^a-zA-Z0-9 ]/g;
export const CHECK_PHONE_PATTERN_REGEX = /^(1|)?(\d{3})(\d{3})(\d{4})$/;
export const CHECK_PHONE_REGEX = /\D/g;
export const CHECK_NUMBER_REGEX = /^[0-9]+$/;
export const VALID_PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\/0-9]*$/g;
export const SOCIAL_AUTH_VALIDATION = -10;
export const DELETE_REGEX = /DELETE/;
export const DESCRIPTION_LIMIT = 200;
export const TODAY = 'Today';
export const YESTERDAY = 'Yesterday';
export const FACEBOOK_ACCOUNT = 1;
export const GOOGLE_ACCOUNT = 2;
export const APPLE_ACCOUNT = 3;
export const HOMEOWNER = 'HomeOwner';
export const PROFESSIONAL = 'Professional';
