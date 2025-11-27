/* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import {LogBox, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {IStore} from '../../../redux/types';
import {getAllComplaints} from '../../../redux/actions/auth';
import {SpaceBetweenText} from '../bid/bidsStyled';
import {INavigation} from '../../../types';
import {showToastMessage} from '../../../utils';
import {localStrings} from '../../../localization/localStrings';
import Complaints from '../complaints/complaints';
import ComplaintsDetails from '../complaintsDetails';

import {
  ControlContainer,
  TextTitleContainer,
  TextTitle,
  UnderlineText,
  NormalText,
  AddIconContainer,
  InputFieldContainer,
  ScreenNoContentContainer,
} from '../styled';
import {
  CardView,
  CardsViewContainer,
  TitleText,
  NormalDescriptionsText,
  DateContainer,
  DateText,
} from './complaintsListStyles';
import AddFloatingBtn from '../../../assets/svg/AddFloatingBtn';
import styles from '../../../style/style';
import {strings} from '../../../constants/strings';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  getAllComplaints: (param: number) => Promise<any>;
  onChange?: (pager: number, projectId: number, locationId: number) => void;
  id: number;
  status: string;
  addComplaint: boolean;
  complaintListResponse: any;
}
const {addNewComplaint, youHaveNoComplaint, complaints} = localStrings;
const ComplaintsList = (props: Props) => {
  const {getAllComplaints: _getAllComplaints, id, complaintListResponse, addComplaint} = props;
  const [isDataAvailable, setDataAvailable] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any[]>(complaintListResponse);
  const [showCreateComplaint, setShowCreateComplaint] = useState<boolean>(false);
  const [showComplaintDetails, setShowComplaintDetails] = useState<boolean>(false);
  const [complaintId, setComplaintId] = useState<number>(0);
  const [getComplaintAPIInProgress, setGetComplaintAPIInProgress] = useState<boolean>(false);

  useEffect(() => {
    if (addComplaint) {
      setShowCreateComplaint(true);
    } else {
      setShowCreateComplaint(false);
    }
    setGetComplaintAPIInProgress(true);
    getComplaints();
  }, [id, addComplaint]);

  const getComplaints = () => {
    _getAllComplaints(id)
      .then(res => {
        if (res.Success) {
          setGetComplaintAPIInProgress(false);
          setResponseData(res.Data);
          if (res?.Data?.length > 0) {
            setDataAvailable(true);
          } else {
            setDataAvailable(false);
          }
        }
      })
      .catch(error => {
        setGetComplaintAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  return (
    //* ************ List View **************/
    <>
      {showCreateComplaint && id ? (
        <Complaints
          fileDataProps={[]}
          isComplaintResolvedValue={false}
          hideCreateComplaint={() => {
            setShowCreateComplaint(false);
            getComplaints();
          }}
          {...props}
        />
      ) : showComplaintDetails && complaintId ? (
        <ComplaintsDetails
          isComplaintResolvedValue={false}
          complaintDetailsResponseData={undefined}
          fileDataProps={[]}
          complaintId={complaintId}
          fromNotification={false}
          hideComplaintDetails={() => {
            setShowComplaintDetails(false);
          }}
          {...props}
        />
      ) : (
        <>
          <ControlContainer>
            <TextTitleContainer>
              <TextTitle>
                {complaints} ({isDataAvailable ? responseData.length : 0})
              </TextTitle>
            </TextTitleContainer>
            {!isDataAvailable && (
              <>
                <InputFieldContainer>
                  <ScreenNoContentContainer>
                    <TouchableOpacity
                      testID={strings.addNewComplaintButton}
                      onPress={() => {
                        setShowCreateComplaint(true);
                      }}>
                      <UnderlineText>{addNewComplaint}</UnderlineText>
                    </TouchableOpacity>
                    <NormalText>{youHaveNoComplaint}</NormalText>
                  </ScreenNoContentContainer>
                  <SpaceBetweenText />
                </InputFieldContainer>
              </>
            )}
            <>
              <CardsViewContainer>
                {responseData?.map((res: any, idx: number) => (
                  <CardView
                    testID={strings.complaintCardButton}
                    key={idx}
                    onPress={() => {
                      setComplaintId(res.Id);
                      setShowComplaintDetails(true);
                    }}>
                    <TitleText>{res.ComplaintsReason}</TitleText>
                    <NormalDescriptionsText>{res.Description}</NormalDescriptionsText>
                    <DateContainer>
                      <DateText>{moment(res.CreatedOn).format('LL')}</DateText>
                    </DateContainer>
                  </CardView>
                ))}
              </CardsViewContainer>
            </>
          </ControlContainer>
          <AddIconContainer style={styles.AddComplaintIcon}>
            <TouchableOpacity
              testID={strings.addIconBtn}
              onPress={() => {
                setShowCreateComplaint(true);
              }}>
              <AddFloatingBtn />
            </TouchableOpacity>
          </AddIconContainer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  getAllComplaints,
};
export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsList);
