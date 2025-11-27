import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function EditIcon() {
  return (
    <Svg width={24} height={24}>
      <G stroke="#FFF" strokeWidth={2} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M11 4.121H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <Path d="M18.5 2.621a2.121 2.121 0 013 3l-9.5 9.5-4 1 1-4 9.5-9.5z" />
      </G>
    </Svg>
  );
}

export default EditIcon;
