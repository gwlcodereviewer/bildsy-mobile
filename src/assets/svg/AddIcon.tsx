import * as React from 'react';
import Svg, {Defs, Path, G, Use} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

function AddIcon() {
  return (
    <Svg width={63} height={63}>
      <Defs>
        <Path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20z" id="prefix__b" />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <G transform="translate(11.016 9.963)">
          <Use fill="#000" xlinkHref="#prefix__b" />
          <Use fill="#00193D" xlinkHref="#prefix__b" />
        </G>
        <Path fill="#FFF" d="M30.141 35.821v-4.75h-4.75v-2.015h4.75v-4.75h2.016v4.75h4.75v2.015h-4.75v4.75z" />
      </G>
    </Svg>
  );
}

export default AddIcon;
