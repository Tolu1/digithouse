import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from 'react-native-paper';

const NotificationIcon = () => {
  const {colors} = useTheme();
  return (
    <View
      style={{backgroundColor: colors.secondary, padding: 12, borderRadius: 7}}>
      <Image
        style={{
          width: 20,
          height: 20,
        }}
        source={require('../assets/icons/notification.png')}
      />
    </View>
  );
};

export default NotificationIcon;
