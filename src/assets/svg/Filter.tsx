import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Filter() {
  return (
    <Svg width={24} height={24}>
      <Path
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 3H2l8 9.46V19l4 2v-8.54z"
        fill="none"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default Filter;
