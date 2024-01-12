import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../components/StyledText';
import Spacing from '../constants/Spacing';
import {Card, Icon, useTheme} from 'react-native-paper';

function AccountBalance() {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}>
      <Text style={{paddingTop: 5, color: colors.onPrimary}}>N</Text>
      <Text
        style={{
          fontFamily: 'PTMono-Regular',
          fontSize: 32,
          color: colors.onPrimary,
        }}>
        120,000
      </Text>
    </View>
  );
}

function WalletCard() {
  const {colors} = useTheme();
  const backgroundColor = colors.primary;
  return (
    <Card
      mode="contained"
      style={[styles.card, {backgroundColor: backgroundColor}]}
      onPress={() => console.log('yes')}>
      <Card.Content>
        <View style={styles.row}>
          <View>
            <AccountBalance />
            <Text
              style={{
                color: colors.onPrimary,
                paddingLeft: Spacing,
                fontSize: 12,
              }}>
              Balance
            </Text>
          </View>
          <Icon source="wallet" color={colors.onPrimary} size={35} />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={{color: colors.onPrimary, fontSize: 10}}>
              Account Number
            </Text>
            <Text
              style={{
                color: colors.onPrimary,
                fontFamily: 'PTMono-Regular',
                fontSize: 14,
              }}>
              9102356712
            </Text>
          </View>
          <View style={{paddingVertical: Spacing * 2}}></View>
          <View>
            <Text style={{color: colors.onPrimary, fontSize: 10}}>Bank</Text>
            <Text style={{color: colors.onPrimary, fontSize: 14}}>
              Access Bank
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

export default WalletCard;
