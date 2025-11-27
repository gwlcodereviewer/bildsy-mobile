import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import pngImages from '../../assets/images/pngImages';
import {localStrings} from '../../localization/localStrings';
import chatStyle from './chatStyle';

export default class CustomActions extends React.Component<any, any> {
  onActionsPress = () => {
    const options = [localStrings.camera, localStrings.gallery, localStrings.document, localStrings.cancel];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex: any) => {
        const {onSend} = this.props;
        this.props.pickFile(buttonIndex);
      },
    );
  };

  renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon();
    }
    return (
      <View style={chatStyle.sendContainer}>
        <Image style={chatStyle.link} source={pngImages.link} resizeMode={'contain'} />
      </View>
    );
  };

  static contextTypes: {actionSheet: PropTypes.Requireable<(...args: any[]) => any>};

  static defaultProps: {
    onSend: () => void;
    options: any;
    renderIcon: any;
    containerStyle: any;
    wrapperStyle: any;
    iconTextStyle: any;
  };

  static propTypes: any;

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.onActionsPress}>
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 26,
    marginLeft: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
};
