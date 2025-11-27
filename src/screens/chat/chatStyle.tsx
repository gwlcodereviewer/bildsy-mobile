import colors from '../../style/colors';

const chatStyle = {
  textInputStyle: {
    borderWidth: 1,
    borderRadius: 35,
    borderColor: '#00193d',
    paddingLeft: 25,
    paddingTop: 15,
    minHeight: 50,
    color: colors.black,
  },
  textStyle: {
    right: {
      color: '#202020',
    },
    left: {
      color: '#202020',
    },
  },
  wrapperStyle: {
    left: {
      backgroundColor: '#fff',
      borderRadius: 0,
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
      paddingRight: 10,
      marginTop: 5,
    },
    right: {
      backgroundColor: '#EFEFEF',
      borderRadius: 0,
      paddingRight: 10,
      marginTop: 5,
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
  },
  bottomContainerStyle: {
    left: {
      justifyContent: 'flex-end',
    },
    right: {
      justifyContent: 'flex-end',
    },
  },
  timeTextStyle: {
    right: {
      paddingLeft: 50,
      color: '#202020',
      paddingTop: 7,
    },
    left: {
      color: '#202020',
      paddingTop: 7,
      paddingLeft: 10,
      textAlign: 'right',
    },
    bottom: {
      justifyContent: 'flex-end',
    },
  },
  inputContainerStyle: {
    borderTopWidth: 0,
    marginLeft: 5,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
  },
  sendContainer: {
    marginRight: 1,
    marginBottom: 1,
  },
  sendButton: {
    width: 32,
    height: 32,
  },
  link: {
    width: 26,
    height: 26,
  },
  downloadIv: {
    width: 20,
    height: 20,
    margin: 3,
  },
  chatCustomContainer: {padding: 10},
  chatCustomInnerContainer: {flexDirection: 'row'},
  activityIndicator: {opacity: 1, width: 15, height: 15, marginLeft: 5},
  FileName: {color: '#202020', fontSize: 12, paddingRight: 20},
  typing: {color: '#202020', fontSize: 12},
  typingContainer: {flexDirection: 'row', margin: 10, paddingLeft: 10},
  action: {
    marginBottom: 0,
    justifyContent: 'center',
  },
  renderInputToolbarStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendStyle: {justifyContent: 'center', marginBottom: 0},
  chatIv: {
    minHeight: 100,
  },
};

export default chatStyle;
