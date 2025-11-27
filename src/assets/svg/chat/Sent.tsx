import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect, Polyline} from 'react-native-svg';

function Sent() {
  return (
    <Svg width={24} height={24}>
      <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <G>
          <Rect x="0" y="0" width={24} height={24} />
          <G
            id="Group-15-Copy"
            transform="translate(4.000000, 6.490496)"
            stroke="#A5A5A5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2">
            <Polyline points="16 0 5 10.9839169 0 5.9912274" />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Sent;
