import * as React from 'react';
import Svg, {Defs, Path, G, Use} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

function AddFloatingBtn() {
  return (
    <Svg width={83} height={83}>
      <Defs>
        <Path
          d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30z"
          id="prefix__b"
        />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <G transform="translate(11.016 9.963)">
          <Use fill="#000" xlinkHref="#prefix__b" />
          <Use fill="#00193D" xlinkHref="#prefix__b" />
        </G>
        <Path fill="#FFF" d="M39.704 48.75v-7.125h-7.125v-3.023h7.125v-7.125h3.023v7.125h7.125v3.023h-7.125v7.125z" />
      </G>
    </Svg>
  );
}

export default AddFloatingBtn;
