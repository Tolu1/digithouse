import {Text as OriginalText, StyleSheet, TextProps} from 'react-native';
import React from 'react';

export function Text(props: TextProps) {
  return <OriginalText {...props} style={[styles.font, props.style]} />;
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Roboto-Regular',
  },
});
