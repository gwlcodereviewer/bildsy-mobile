import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: title */

function DownArrow() {
  return (
    <Svg width={14} height={8} viewBox="0 0 14 8">
      <G fill="none" fillRule="evenodd">
        <Path d="M-5-8h24v24H-5z" />
        <Path d="M-5-8h24v24H-5z" />
        <Path stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M13 1L7 7 1 1" />
      </G>
    </Svg>
  );
}

export default DownArrow;
