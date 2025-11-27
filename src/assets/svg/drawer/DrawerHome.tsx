import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import colors from '../../../style/colors';

interface Props {
  isSelected: boolean;
}

function DrawerHome(props: Props) {
  const background = props.isSelected ? colors.darkBlack : colors.primaryThemeColor;
  return (
    <Svg width={30} height={30} viewBox="0 0 26 28" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M-2-1h30v30H-2z" />
        <Path
          d="M23.75 18c.966 0 1.75.784 1.75 1.75v6a1.75 1.75 0 01-1.75 1.75h-8A1.75 1.75 0 0114 25.75v-6c0-.966.784-1.75 1.75-1.75zm-14-6c.966 0 1.75.784 1.75 1.75v12a1.75 1.75 0 01-1.75 1.75h-8A1.75 1.75 0 010 25.75v-12C0 12.784.784 12 1.75 12zm14 7.5h-8a.25.25 0 00-.25.25v6c0 .138.112.25.25.25h8a.25.25 0 00.25-.25v-6a.25.25 0 00-.25-.25zm-14-6h-8a.25.25 0 00-.25.25v12c0 .138.112.25.25.25h8a.25.25 0 00.25-.25v-12a.25.25 0 00-.25-.25zm14-13.5c.966 0 1.75.784 1.75 1.75v12a1.75 1.75 0 01-1.75 1.75h-8A1.75 1.75 0 0114 13.75v-12C14 .784 14.784 0 15.75 0zm0 1.5h-8a.25.25 0 00-.25.25v12c0 .138.112.25.25.25h8a.25.25 0 00.25-.25v-12a.25.25 0 00-.25-.25zm-14-1.502c.966 0 1.75.784 1.75 1.75v6a1.75 1.75 0 01-1.75 1.75h-8A1.75 1.75 0 010 7.748v-6c0-.966.784-1.75 1.75-1.75zm0 1.5h-8a.25.25 0 00-.25.25v6c0 .139.112.25.25.25h8a.25.25 0 00.25-.25v-6a.25.25 0 00-.25-.25z"
          fill={background}
        />
      </G>
    </Svg>
  );
}

export default DrawerHome;
