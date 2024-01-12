import React from 'react';
import {View, StyleSheet, Dimensions, StyleProp, ViewStyle} from 'react-native';

type BackgroundComponentProps = {
  renderBackground: React.ComponentType;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const BackgroundComponent = ({
  renderBackground,
  children,
  style,
}: BackgroundComponentProps) => {
  const Background = renderBackground;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.background}>
        <Background />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default BackgroundComponent;
