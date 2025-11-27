/* eslint-disable no-shadow */
import React, {useState, useEffect, useRef} from 'react';
import {LogBox} from 'react-native';
import {INavigation} from '../../../../types';
import {ProjectContainer} from '../../../projects/styled';
import pngImages from '../../../../assets/images/pngImages';
import ComplaintsDetails from '../index';
import {dummyComplaintDetails} from '../../../../../jest/dummyData';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  id?: number;
}

const ComplaintsDetail: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const [complaintId, setComplaintId] = useState<number>(0);

  /**
   * Called for getting complaint details.
   */
  useEffect(() => {
    const {route} = props;
    setComplaintId(route?.params.id);
  }, []);
  /**
   * For ignoring warning.
   */
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      {complaintId && complaintId !== 0 ? (
        <ComplaintsDetails
          isComplaintResolvedValue={false}
          complaintDetailsResponseData={dummyComplaintDetails}
          fileDataProps={[]}
          fromNotification={true}
          complaintId={complaintId}
          hideComplaintDetails={() => {
            navigation?.goBack();
          }}
          {...props}
        />
      ) : null}
    </ProjectContainer>
  );
};

export default ComplaintsDetail;
