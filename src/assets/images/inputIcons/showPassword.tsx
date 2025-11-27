import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: title */

function ShowPassword() {
  return (
    <Svg width={18} height={14} viewBox="0 0 18 14">
      <G fill="none" fillRule="evenodd">
        <Path d="M-3-5h24v24H-3z" />
        <Path d="M0-2h18v18H0z" />
        <G transform="translate(.75 1)" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
          <Path d="M0 6s3-6 8.25-6 8.25 6 8.25 6-3 6-8.25 6S0 6 0 6z" />
          <Circle cx={8.25} cy={6} r={2.25} />
        </G>
      </G>
    </Svg>
  );
}

export default ShowPassword;
