/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsForRegex": ["^bar"] }] */
/* eslint no-underscore-dangle: 0 */

import React from 'react';
import {TouchableOpacity, View, Text, Image, Pressable} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import ImageView from 'react-native-image-viewing';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {getPrivateURL} from './QBUtils';
import Attachment from '../../assets/svg/Attachment';
import {attachmentDownload, showToastMessage} from '../../utils';
import chatStyle from './chatStyle';
import {localStrings} from '../../localization/localStrings';
import pngImages from '../../assets/images/pngImages';
import {strings} from '../../constants/strings';

let Url;
export default class CustomView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      privateUrl: '',
      type: '',
      name: '',
      visible: false,
      isDownloading: false,
      isViewing: false,
    };
  }

  lightBoxView = (url: string) => (
    <TouchableOpacity
      onPress={() => {
        this.setState({visible: true});
      }}>
      <Image resizeMode="contain" source={{uri: url}} style={chatStyle.chatIv} />
    </TouchableOpacity>
  );

  componentDidMount() {
    const {attachments} = this.props;
    this.setState({attachments});
    this.setState({type: attachments[0]?.type}, () => {
      if (attachments[0]?.type === 'file' || attachments[0]?.type.includes('application')) {
        this.setState({name: attachments[0]?.name});
        getPrivateURL(attachments[0]?.id, (url: any) => {
          Url = url;
          this.setState({privateUrl: url});
        });
      } else {
        getPrivateURL(attachments[0]?.id, (url: any) => {
          Url = url;
          this.setState({privateUrl: url});
        });
      }
    });
  }

  render() {
    const {type, name, privateUrl, isDownloading, isViewing, visible} = this.state;
    const images = [
      {
        uri: privateUrl,
      },
    ];
    return (
      <View style={chatStyle.chatCustomContainer}>
        {type === 'file' || type.includes('application') ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{flexDirection: 'row'}}>
            <Attachment />
            <Text style={chatStyle.FileName}>{name}</Text>
            {isViewing ? (
              <ActivityIndicator animating={true} style={chatStyle.activityIndicator} color={Colors.black} />
            ) : (
              <Pressable
                onPress={() => {
                  if (type === 'file' || (type.includes('application') && !isDownloading && !isViewing)) {
                    this.setState({isViewing: true}, () => {
                      this.viewFile({FilePath: privateUrl, FileName: name, isView: true});
                    });
                  }
                }}>
                <Image resizeMode="contain" source={pngImages.view_icon} style={chatStyle.downloadIv} />
              </Pressable>
            )}
            {isDownloading ? (
              <ActivityIndicator animating={true} style={chatStyle.activityIndicator} color={Colors.black} />
            ) : (
              <Pressable
                onPress={() => {
                  if (type === 'file' || (type.includes('application') && !isDownloading && !isViewing)) {
                    this.setState({isDownloading: true}, () => {
                      this.downloadFunction({FilePath: privateUrl, FileName: name, isView: false});
                    });
                  }
                }}>
                <Image source={pngImages.download_icon} style={chatStyle.downloadIv} />
              </Pressable>
            )}
          </View>
        ) : (
          this.lightBoxView(privateUrl)
        )}
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => this.setState({visible: false})}
        />
      </View>
    );
  }

  downloadFunction = (res: any) => {
    const {isDownloading, isViewing} = this.state;
    if (isDownloading || isViewing) {
      attachmentDownload(
        res?.FilePath,
        res?.FileName,
        (response: any) => {
          this.setState({isDownloading: false, isViewing: false});
          if (res?.isView) {
            FileViewer.open(response) // absolute-path-to-my-local-file.
              .then(() => {
                // success
              })
              .catch(error => {
                // error
              });
          }
        },
        (percent: number) => {
          this.setState({percent});
        },
      );
    } else {
      showToastMessage(strings.error, localStrings.downloadingIsInProgress);
    }
  };

  getUrlExtension = (url: any) => url.split(/[#?]/)[0].split('.').pop().trim();

  viewFile = (response: any) => {
    const url = response.FilePath;

    const extension = this.getUrlExtension(response.FileName);

    // Feel free to change main path according to your requirements.
    const localFile = `${RNFS.DocumentDirectoryPath}/${response.FileName}.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
        this.setState({isDownloading: false, isViewing: false});
      })
      .catch(error => {
        // error
      });
  };
}
