import * as React from 'react';
import Svg, {Text, TSpan} from 'react-native-svg';
import colors from '../../style/colors';

function Dollar() {
  return (
    <Svg width={7} height={14}>
      <Text
        transform="translate(-.5 -4)"
        fill={colors.black}
        fillRule="evenodd"
        fontFamily="SourceSansPro-SemiBold, Source Sans Pro"
        fontSize={16}
        fontWeight={500}>
        <TSpan x={0.396} y={16}>
          {'$'}
        </TSpan>
      </Text>
    </Svg>
  );
}

export default Dollar;
