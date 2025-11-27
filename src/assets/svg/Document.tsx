import * as React from 'react';
import Svg, {Defs, Circle, G, Mask, Use, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Document() {
  return (
    <Svg width={35} height={35}>
      <Defs>
        <Circle id="a" cx={15} cy={15} r={15} />
      </Defs>
      <G transform="translate(1 1)" fill="none" fillRule="evenodd">
        <Mask id="b" fill="#c9bfbf">
          <Use xlinkHref="#a" />
        </Mask>
        <Circle stroke="#c7c4c4" strokeWidth={0.5} cx={15} cy={15} r={15.25} />
        <G mask="url(#b)" stroke="#00193D">
          <Path
            d="M11.191 7.88h6.303l3.262 3.07.087 9.883c0 .355-.147.677-.385.91-.203.2-.473.334-.773.368l-.153.009h-8.34a1.32 1.32 0 0 1-.927-.376 1.274 1.274 0 0 1-.376-.76l-.009-.15V9.166c0-.355.147-.677.385-.91.204-.2.473-.334.774-.368l.152-.009Zm5.838.835-6.308.561.584 12.013 8.703-.568V11.62H18.34l-.152-.009c-.3-.034-.57-.168-.774-.367a1.27 1.27 0 0 1-.385-.91v-1.62Zm.97.699.43 1.383h.983L18 9.414Z"
            strokeWidth={0.24}
            fill="#00193D"
          />
          <Path strokeWidth={0.8} fill="#00193D" d="M12.787 14.064h2.75" />
          <Path strokeWidth={0.8} d="M12.787 16.149h4" />
          <Path strokeWidth={0.8} fill="#00193D" d="M12.787 18.532h6" />
        </G>
      </G>
    </Svg>
  );
}
export default Document;
