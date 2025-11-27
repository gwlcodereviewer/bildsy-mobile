import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function BlankCheckBox() {
  return (
    <Svg width={20} height={20}>
      <Rect
        x={0.25}
        y={2.25}
        width={19.5}
        height={19.5}
        rx={1.6}
        transform="translate(0 -2)"
        fill="#FFF"
        stroke="#828282"
        strokeWidth={0.5}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default BlankCheckBox;
