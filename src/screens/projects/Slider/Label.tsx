import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import {RangeLabel} from '../styled';

interface Props {
  text: string;
}
const Label = ({text, ...restProps}: Props) => (
  <RangeLabel {...restProps}>
    <Text style={styles.text}>{text}</Text>
  </RangeLabel>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default memo(Label);
