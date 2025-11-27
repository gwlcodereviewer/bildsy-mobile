import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: title */

function BackIcon(props: any) {
  return (
    <Svg width={props.width ? props.width : 20} height={props.height ? props.height : 16} viewBox="0 0 14 14">
      <Path
        d="M7.53.47a.75.75 0 01.067.984l-.067.076L2.81 6.25H13a.75.75 0 01.094 1.494L13 7.75H2.811l4.72 4.72a.75.75 0 01.066.984l-.067.076a.75.75 0 01-.984.067l-.076-.067-6-6-.064-.072a.752.752 0 01-.004-.005l.068.077A.754.754 0 01.25 7v-.03l.004-.044L.25 7a.754.754 0 01.153-.454L.47 6.47l6-6a.75.75 0 011.06 0z"
        fill={props.color ? props.color : '#FFF'}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default BackIcon;
