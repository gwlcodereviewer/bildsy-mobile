import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

function InfoIcon() {
  return (
    <Svg width={24} height={24}>
      <G fill="#2196F3" fill-rule="nonzero">
        <Path d="M12 0C5.367 0 0 5.368 0 12c0 6.633 5.368 12 12 12 6.633 0 12-5.368 12-12 0-6.633-5.368-12-12-12zm0 22.125A10.12 10.12 0 0 1 1.875 12 10.12 10.12 0 0 1 12 1.875 10.12 10.12 0 0 1 22.125 12 10.12 10.12 0 0 1 12 22.125z" />
        <Path d="M12 10.047a.937.937 0 0 0-.938.937v6.037a.937.937 0 1 0 1.876 0v-6.037a.937.937 0 0 0-.938-.937z" />
        <Circle cx="12" cy="7.633" r="1.266" />
      </G>
    </Svg>
  );
}

export default InfoIcon;
