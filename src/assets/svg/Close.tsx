import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Close() {
  return (
    <Svg width={14} height={14}>
      <Path
        d="M8.15 7l5.177-5.192a.865.865 0 000-1.221.858.858 0 00-1.218 0L6.933 5.779 1.757.587a.858.858 0 00-1.218 0 .865.865 0 000 1.221L5.715 7 .54 12.192a.865.865 0 00.61 1.474c.22 0 .44-.084.608-.253l5.176-5.192 5.176 5.192a.857.857 0 001.218 0 .865.865 0 000-1.221L8.15 7z"
        fill="#8A8A8A"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default Close;
