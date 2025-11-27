import * as React from 'react';
import Svg, {G, Rect} from 'react-native-svg';

function OrangeRadio() {
  return (
    <Svg width={16} height={16}>
      <G fill="none" fillRule="evenodd">
        <Rect fill="#ED772F" width={16} height={16} rx={8} />
        <Rect fill="#FFF" x={4.8} y={4.8} width={6.4} height={6.4} rx={3.2} />
      </G>
    </Svg>
  );
}

export default OrangeRadio;
