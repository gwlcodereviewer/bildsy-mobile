import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function NotSelectedRadio() {
  return (
    <Svg width={16} height={16}>
      <Rect
        x={0.25}
        y={0.25}
        width={15.5}
        height={15.5}
        rx={7.75}
        fill="#FFF"
        stroke="#828282"
        strokeWidth={0.5}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default NotSelectedRadio;
