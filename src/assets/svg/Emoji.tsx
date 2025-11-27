import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function EmojiIcon() {
  return (
    <Svg width={21} height={21} fill="none">
      <G clipPath="url(#prefix__clip0_77_22)" stroke="#00193D" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M10.452 19a9 9 0 100-18 9 9 0 000 18z" strokeWidth={1.5} />
        <Path d="M6.852 11.8s1.35 1.8 3.6 1.8 3.6-1.8 3.6-1.8" strokeWidth={1.5} />
        <Path d="M7.752 7.3h.01M13.152 7.3h.01" strokeWidth={2} />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_77_22">
          <Path fill="#fff" transform="translate(.452 .04)" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default EmojiIcon;
