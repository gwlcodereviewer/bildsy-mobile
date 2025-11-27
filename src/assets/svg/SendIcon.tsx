import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function SendIcon() {
  return (
    <Svg width={21} height={21} fill="none">
      <G
        clipPath="url(#prefix__clip0_79_21)"
        stroke="#00193D"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M19.647 1.173l-9.706 9.706M20 1.173l-6.3 18-3.6-8.1-8.1-3.6 18-6.3z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_79_21">
          <Path fill="#fff" transform="translate(.99 .163)" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SendIcon;
