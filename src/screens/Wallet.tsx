import {Text} from '../components/StyledText';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {Avatar, Button, List, useTheme} from 'react-native-paper';
import NotificationIcon from '../components/NotificationIcon';
import WalletCard from '../components/WalletCard';
import Spacing from '../constants/Spacing';
import 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type WalletProps = NativeStackScreenProps<RootStackParamList, 'Wallet'>;

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <Avatar.Image
          size={40}
          source={require('../assets/images/avatar.png')}
        />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Ajalla Ugo</Text>
      </View>
      <NotificationIcon />
    </View>
  );
}

function Transactions() {
  const transactions = [
    {
      id: 1,
      title: 'Account Top Up',
      description: '24 Oct. 2020, 8:45pm',
      amount: 50000,
    },
    {
      id: 2,
      title: 'Rent Payment',
      description: '24 Oct. 2020, 8:45pm',
      amount: -50000,
    },
    {
      id: 3,
      title: 'Rent Payment',
      description: '24 Oct. 2020, 8:45pm',
      amount: 50000,
    },
    {
      id: 4,
      title: 'Grocery Shopping',
      description: '25 Oct. 2020, 10:00am',
      amount: -15000,
    },
    {
      id: 5,
      title: 'Salary Credit',
      description: '30 Oct. 2020, 1:00pm',
      amount: 80000,
    },
    {
      id: 6,
      title: 'Gym Membership',
      description: '1 Nov. 2020, 7:30am',
      amount: -12000,
    },
    {
      id: 7,
      title: 'Electricity Bill',
      description: '2 Nov. 2020, 6:45pm',
      amount: -8000,
    },
    {
      id: 8,
      title: 'Internet Bill',
      description: '3 Nov. 2020, 8:00am',
      amount: -4500,
    },
  ];

  return (
    <View>
      {transactions.map(transaction => (
        <List.Item
          key={transaction.id}
          title={transaction.title}
          description={transaction.description}
          descriptionStyle={{opacity: 0.8, fontSize: 12}}
          // style={{backgroundColor: '#f2f200'}}
          left={props => (
            <List.Icon
              {...props}
              icon={
                transaction.amount > 0
                  ? 'arrow-down-circle-outline'
                  : 'arrow-up-circle-outline'
              }
              color={transaction.amount > 0 ? 'green' : 'red'}
            />
          )}
          right={() => <Text>{transaction.amount}</Text>}
        />
      ))}
    </View>
  );
}

function Wallet({navigation}: WalletProps) {
  const {colors} = useTheme();

  const backgroundColorStyle = {
    backgroundColor: colors.background,
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <SafeAreaView style={[styles.safeContainer, backgroundColorStyle]}>
      <Header />
      <View style={styles.container}>
        <WalletCard />
        <View style={styles.row}>
          <Button
            style={styles.button}
            labelStyle={{color: colors.primary}}
            icon="plus-circle-outline"
            mode="contained-tonal"
            onPress={() => console.log('Pressed')}
            compact>
            <Text style={{color: colors.onSecondary}}>Top Up Wallet</Text>
          </Button>
          <Button
            style={styles.button}
            labelStyle={{color: colors.primary}}
            icon="cash-multiple"
            mode="contained-tonal"
            onPress={() => navigation.push('Withdraw')}
            compact>
            <Text style={{color: colors.onSecondary}}>Withdraw Funds</Text>
          </Button>
        </View>
      </View>
      <BottomSheet
        backgroundStyle={{backgroundColor: colors.surface, borderRadius: 26}}
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View
          style={
            (styles.transactionsContainer, {backgroundColor: colors.surface})
          }>
          <View style={styles.transactionHeader}>
            <Text>
              <List.Subheader>Last Transactions</List.Subheader>
            </Text>
            <Text>
              <List.Subheader
                style={{color: colors.primary}}
                onPress={() => bottomSheetRef.current?.expand()}>
                See All
              </List.Subheader>
            </Text>
          </View>
          <Transactions />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing,
  },
  button: {
    borderRadius: 10,
    padding: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing,
  },
  transactionsContainer: {
    paddingVertical: Spacing,
  },
});

export default Wallet;
