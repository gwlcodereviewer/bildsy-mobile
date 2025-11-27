import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: title */

function FaceBookIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32">
      <G fill="none" fillRule="evenodd">
        <Circle fill="#4B70BE" cx={15.787} cy={15.787} r={15.787} />
        <Path
          d="M18.089 9.636h1.681V6.708c-.29-.04-1.287-.13-2.45-.13-2.424 0-4.084 1.525-4.084 4.328v2.579H10.56v3.274h2.676v8.237h3.28V16.76h2.567l.407-3.273h-2.975V11.23c0-.946.255-1.594 1.574-1.594z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default FaceBookIcon;
