import React from 'react';
import {SocialLoginContainer, IconContainer} from './styled';
import GoogleIcon from '../../assets/svg/GoogleIcon';
import FaceBookIcon from '../../assets/svg/FaceBookIcon';

const SocialServices: React.FC = () => (
  <SocialLoginContainer>
    <GoogleIcon />
    <IconContainer>
      <FaceBookIcon />
    </IconContainer>
  </SocialLoginContainer>
);
export default SocialServices;
