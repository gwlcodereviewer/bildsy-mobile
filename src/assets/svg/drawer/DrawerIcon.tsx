import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DrawerIcon() {
  return (
    <Svg width={24} height={24}>
      <Path
        d="M21 17.5a1 1 0 01.117 1.993L21 19.5H3a1 1 0 01-.117-1.993L3 17.5h18zm0-6a1 1 0 01.117 1.993L21 13.5H3a1 1 0 01-.117-1.993L3 11.5h18zm0-6a1 1 0 01.117 1.993L21 7.5H3a1 1 0 01-.117-1.993L3 5.5h18z"
        fill="#FFF"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default DrawerIcon;
