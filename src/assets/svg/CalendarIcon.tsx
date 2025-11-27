import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function CalenderIcon(props: any) {
  return (
    <Svg width={24} height={24} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFF" d="M0 0h24v24H0z" />
        <Path
          d="M6 4.778h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2v-12a2 2 0 012-2zM15.556 3v3.556M8.444 3v3.556M4 10.11h16"
          stroke="#333"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

export default CalenderIcon;
