import * as React from 'react';
import Svg, {Defs, Path, G, Circle, Use} from 'react-native-svg';

function CloseIcon() {
  return (
    <Svg width={20} height={20}>
      <Defs>
        <Path
          d="M9.9 2.9c.644 0 1.166.531 1.166 1.169v4.663h4.664c.603 0 1.1.452 1.163 1.04l.006.127c0 .645-.531 1.167-1.17 1.167h-4.664l.001 4.664c0 .603-.45 1.1-1.039 1.163l-.128.006a1.173 1.173 0 0 1-1.166-1.17v-4.664l-4.664.001c-.646 0-1.17-.518-1.17-1.167 0-.644.532-1.166 1.17-1.166h4.663V4.068c0-.646.519-1.17 1.167-1.17Z"
          id="a"
        />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Circle stroke="#00193D" fill="#FFF" cx={10} cy={10} r={9} />
        <Use stroke="#FFF" fill="#00193D" transform="rotate(45 9.9 9.9)" xlinkHref="#a" />
      </G>
    </Svg>
  );
}

export default CloseIcon;
