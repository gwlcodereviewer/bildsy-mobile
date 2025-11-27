import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect, Polyline} from 'react-native-svg';

function Delivered() {
  return (
    <Svg width={26} height={25} viewBox="0 0 26 25">
      <G stroke-width="1" fill="none" fill-rule="evenodd">
        <G transform="translate(1.000000, 0.953213)">
          <Rect x="0" y="0" width="24.0351418" height="24" />
          <G
            transform="translate(0.929075, 6.067750)"
            stroke="#A5A5A5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2">
            <Polyline points="16 0 5 10.9839169 0 5.9912274" />
            <Polyline points="22.14185 0.845493614 11.14185 11.8294105 9.42977477 10.3316037" />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Delivered;
