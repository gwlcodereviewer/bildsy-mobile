import {Platform, StyleSheet} from 'react-native';
import colors from './colors';
import {rh, rpx, rw, FontFamily} from './Dimen';
import {isIOS} from '../utils';

const tabIconBottomPadding = isIOS() ? 20 : 10;
const styles = StyleSheet.create({
  checkBox: {
    width: rw(16),
    height: rh(16),
  },
  dropDownStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Oxygen-Regular',
  },
  dropDownText: {
    fontFamily: 'Oxygen-Regular',
    fontSize: rpx(16),
    height: '100%',
    width: '85%',
    paddingBottom: rh(5),
    color: colors.black,
  },
  dropDownModal: {
    width: '47%',
    marginTop: Platform.OS === 'android' ? -35 : 0,
  },
  fullWidthDropDownModal: {
    width: '75%',
    marginTop: Platform.OS === 'android' ? -35 : 0,
  },
  dropDownModalText: {
    fontFamily: 'Oxygen-Regular',
    fontSize: rpx(16),
    paddingBottom: rh(5),
  },
  disableButton: {
    opacity: 1,
  },
  enableButton: {
    opacity: 1,
  },
  keyBoardView: {
    flex: 1,
  },
  contentZIndex: {
    zIndex: 0,
  },
  verificationCode: {
    borderWidth: rpx(0.5),
    height: isIOS() ? rh(44) : rh(50),
    width: rw(60),
    borderRadius: rpx(4),
    fontSize: rpx(20),
    textAlign: 'center',
    borderColor: colors.skipColor,
    color: colors.black,
  },
  verificationCodeContainer: {
    width: '85%',
  },
  timerTimeColor: {
    color: colors.green,
  },
  whiteBackground: {
    backgroundColor: colors.white,
  },
  pagerDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: colors.tangoOrange,
  },
  tabBarLabel: {
    fontFamily: FontFamily.oxygenRegular,
    fontSize: rpx(14),
    paddingBottom: tabIconBottomPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: rh(20),
  },
  fullWidthDropDownStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Oxygen-Regular',
    paddingHorizontal: rw(14),
  },
  fullWidthDropDownText: {
    fontFamily: 'Oxygen-Regular',
    fontSize: rpx(16),
    height: '100%',
    width: '95%',
    paddingBottom: rh(5),
    color: colors.black,
  },
  companyLogo: {
    width: rw(40),
    height: rh(40),
    borderRadius: 50,
  },
  customerRole: {
    flex: 1,
    textAlign: 'right',
  },
  searchBarContainer: {
    width: '100%',
    padding: 0,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: colors.white,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 20,
  },
  searchBarInputContainer: {
    height: 40,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 25,
    flex: 1,
    borderBottomWidth: 1,
    color: colors.black,
  },
  filterModal: {
    top: '20%',
    backgroundColor: colors.white,
    padding: 20,
    height: '65%',
  },
  addIcon: {
    alignItems: 'flex-start',
    height: rh(63),
    width: rw(63),
  },
  scrollMenu: {
    borderTopLeftRadius: rpx(33),
    borderTopRightRadius: rpx(33),
  },
  projectCard: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: rh(14),
    marginBottom: rh(6),
    elevation: 8,
    width: rw(327),
    height: 'auto',
    borderRadius: 4,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,

    paddingTop: rh(20),
  },
  textArea: {
    marginTop: rh(30),
    height: rh(100),
    width: '100%',
    textAlignVertical: 'top',
    fontSize: rpx(16),
    paddingHorizontal: rw(14),
    paddingVertical: rh(14),
    fontFamily: FontFamily.oxygenRegular,
    paddingLeft: rw(14),
    paddingRight: rw(14),
  },
  dateFonts: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: rpx(16),
    lineHeight: rpx(20),
    color: colors.grey,
  },
  myProjectList: {
    backgroundColor: colors.transparent,
    paddingBottom: rh(5),
  },
  notificationList: {
    backgroundColor: colors.transparent,
  },
  safeAreaOfMyProject: {
    marginTop: rh(2),
    display: 'flex',
    flexGrow: 1,
    backgroundColor: colors.transparent,
    flex: 1,
  },
  activityIndicator: {
    backgroundColor: colors.transparent,
  },
  datePicker: {
    justifyContent: 'flex-end',
    width: 300,
  },
  datePicker2: {
    justifyContent: 'flex-end',
  },
  addProjectScrollView: {
    flex: 1,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  fullFlex: {
    flex: 1,
  },
  modalView: {
    shadowColor: colors.darkBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: rpx(4),
    elevation: 5,
  },
  AddComplaintIcon: {
    bottom: 50,
    right: 10,
  },
  hireMeActivityIndicator: {
    paddingHorizontal: rw(18),
    paddingVertical: rh(2),
  },
  datePickerStyle: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },
  percentageStyle: {
    fontSize: rpx(7),
  },
  blogsList: {
    backgroundColor: colors.transparent,
    paddingHorizontal: rw(20),
  },
  smallDateContainer: {
    width: '49%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 40,
  },
  containerProject: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 4,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetInfoIcon: {
    fontSize: 20,
    color: colors.grey,
    marginRight: 5,
  },
  helpBtn: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  blogTitle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 20,
  },
  errorInfoIcon: {
    fontSize: 18,
    color: colors.redDark,
    marginRight: 5,
    marginTop: 5,
  },
  noProfessionalFoundView: {
    paddingHorizontal: 16,
  },
});

export default styles;
