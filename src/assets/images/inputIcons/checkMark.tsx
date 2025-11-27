import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function CheckMark() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={12} fill="#34C7AC" />
      <Path
        d="M8 11.961l2.539 2.539 5.5-5.5"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CheckMark;
