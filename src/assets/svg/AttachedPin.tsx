import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function AttachedPinIcon() {
  return (
    <Svg width={21} height={21} fill="none">
      <G clipPath="url(#prefix__clip0_80_25)">
        <Path
          d="M18.806 10.271l-8.026 8.026a5.243 5.243 0 01-7.415-7.415l8.026-8.026A3.495 3.495 0 1116.334 7.8L8.3 15.825a1.747 1.747 0 11-2.472-2.471l7.415-7.406"
          stroke="#00193D"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_80_25">
          <Path fill="#fff" transform="translate(.162 .823)" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default AttachedPinIcon;
