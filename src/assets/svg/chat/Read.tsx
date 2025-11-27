import * as React from 'react';
import Svg, {G, Rect, Polyline} from 'react-native-svg';

function Read() {
  return (
    <Svg width="26px" height="25px" viewBox="0 0 26 25">
      <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <G transform="translate(1.000000, 0.953213)">
          <Rect x="0" y="0" width={24} height={24} />
          <G
            transform="translate(0.929075, 6.067750)"
            stroke="#34B7F1"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2">
            <Polyline id="Path" points="16 0 5 10.9839169 0 5.9912274" />
            <Polyline id="Path" points="22.14185 0.845493614 11.14185 11.8294105 9.42977477 10.3316037" />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Read;
