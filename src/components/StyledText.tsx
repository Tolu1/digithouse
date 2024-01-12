import {Text as OriginalText, TextProps} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';

export function Text(props: TextProps) {
  const {colors} = useTheme();

  const textStyle = {
    color: colors.onBackground,
    fontFamily: 'Roboto-Regular',
  };
  return <OriginalText {...props} style={[textStyle, props.style]} />;
}
