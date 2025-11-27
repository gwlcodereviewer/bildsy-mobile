import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import colors from '../../../style/colors';

interface Props {
  isSelected: boolean;
}
const DrawerHelpIcon = (props: Props) => {
  const background = props.isSelected ? colors.darkBlack : colors.primaryBlue;

  return (
    <Svg width={30} height={30} fill="none">
      <Path
        d="M15.125 27.992c6.904 0 12.5-5.596 12.5-12.5 0-6.903-5.596-12.5-12.5-12.5s-12.5 5.597-12.5 12.5c0 6.904 5.596 12.5 12.5 12.5Z"
        stroke={background}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.488 11.74a3.75 3.75 0 0 1 7.288 1.25c0 2.5-3.75 3.75-3.75 3.75M15.125 21.742h.012"
        stroke={background}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DrawerHelpIcon;
