import {Text} from '../components/StyledText';
import {View, StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Spacing from '../constants/Spacing';
import {
  Avatar,
  Button,
  Card,
  RadioButton,
  Divider,
  TextInput,
  useTheme,
} from 'react-native-paper';
import NotificationIcon from '../components/NotificationIcon';
import BottomSheet, {
  BottomSheetBackdrop,
  // BottomSheetTextInput,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';

type WithdrawProps = NativeStackScreenProps<RootStackParamList, 'Withdraw'>;

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

function AccountBalance() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
      }}>
      <Text style={{paddingTop: 5}}>N</Text>
      <Text style={{fontFamily: 'PTMono-Regular', fontSize: 32}}>120,000</Text>
    </View>
  );
}

type AccountInfoProps = {
  id: string;
  name: string;
  number: string;
  bank: string;
};

function Account({
  accountInfo,
  selected,
  setSelected,
}: {
  accountInfo: AccountInfoProps;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {colors} = useTheme();
  const backgroundColor =
    selected === accountInfo.id ? colors.secondaryContainer : '#f2f2f2';
  return (
    <Card
      mode="contained"
      style={{
        backgroundColor: backgroundColor,
        paddingVertical: Spacing,
      }}
      onPress={() => setSelected(accountInfo.id)}>
      <Card.Content style={styles.row}>
        <View
          style={{
            flexDirection: 'row',
            gap: Spacing / 2,
            backgroundColor: backgroundColor,
          }}>
          <RadioButton.Android
            value={accountInfo.id}
            status={selected === accountInfo.id ? 'checked' : 'unchecked'}
            color={colors.primary}
            uncheckedColor={colors.surfaceVariant}
            onPress={() => setSelected(accountInfo.id)}
          />
          <View>
            <Text style={{backgroundColor: backgroundColor, fontSize: 18}}>
              {accountInfo.name}
            </Text>
            <Text
              style={{
                backgroundColor: backgroundColor,
                fontSize: 12,
                fontFamily: 'PTMono',
                opacity: 0.8,
              }}>
              {accountInfo.number}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{backgroundColor: backgroundColor, fontSize: 12}}>
            Bank
          </Text>
          <Text
            style={{
              backgroundColor: backgroundColor,
              fontSize: 12,
              opacity: 0.8,
            }}>
            {accountInfo.bank}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function AddBank({close}: {close: () => void}) {
  const {colors} = useTheme();
  const [form, setForm] = useState({accountNumber: '', bankName: ''});
  const handleClose = () => {
    close();
    Keyboard.dismiss();
  };
  return (
    <View style={[styles.bottomSheetContainer, styles.bottomSheetBgColor]}>
      <View style={[styles.bottomSheetHeading, styles.bottomSheetBgColor]}>
        <Text style={styles.bottomSheetTitle}>Add New Bank</Text>
      </View>
      <View style={[styles.inputGroup, styles.bottomSheetBgColor]}>
        {/* TODO: Fix Keyboard and Bottom Sheet issues */}
        {/* <BottomSheetTextInput value="Awesome 🎉" style={styles.input} />
        <BottomSheetTextInput value="Awesome 🎉" style={styles.input} /> */}
        <TextInput
          theme={{colors}}
          outlineStyle={styles.input}
          label="Account Number"
          mode="outlined"
          value={form.accountNumber}
          onChangeText={accountNumber =>
            setForm({...form, accountNumber: accountNumber})
          }
        />
        <TextInput
          theme={{colors}}
          outlineStyle={styles.input}
          label="Bank Name"
          mode="outlined"
          right={
            <TextInput.Icon
              style={{transform: [{rotate: '90deg'}], opacity: 0.6}}
              icon="play"
            />
          }
          value={form.bankName}
          onChangeText={bankName => setForm({...form, bankName: bankName})}
        />
      </View>
      <View style={[styles.bottomButtonContainer, styles.bottomSheetBgColor]}>
        <Button
          style={[
            styles.button,
            {backgroundColor: colors.primary, borderColor: colors.primary},
          ]}
          mode="contained"
          onPress={handleClose}>
          <Text style={{color: colors.onPrimary}}>Add Bank</Text>
        </Button>
        <Button style={[styles.button]} mode="text" onPress={close}>
          <Text style={{color: colors.onPrimary}}>Cancel</Text>
        </Button>
      </View>
    </View>
  );
}

function TransactionSummary({
  open,
  close,
}: {
  open: () => void;
  close: () => void;
}) {
  const {colors} = useTheme();
  const handleContinue = () => {
    close();
    open();
  };
  return (
    <View style={[styles.bottomSheetContainer, styles.bottomSheetBgColor]}>
      <View style={[styles.bottomSheetHeading, styles.bottomSheetBgColor]}>
        <Text style={[styles.bottomSheetTitle]}>Transaction Summary</Text>
        <Text style={styles.bottomSheetSubtitle}>
          Please review the details of your transaction
        </Text>
      </View>
      <View style={[styles.row, styles.bottomSheetBgColor]}>
        <View style={styles.bottomSheetBgColor}>
          <Text>Transaction Type</Text>
        </View>
        <View style={styles.bottomSheetBgColor}>
          <Text>Wallet Withdrawal</Text>
        </View>
      </View>
      <Divider />
      <View style={[styles.row, styles.bottomSheetBgColor]}>
        <View style={styles.bottomSheetBgColor}>
          <Text>Amount</Text>
        </View>
        <View style={styles.bottomSheetBgColor}>
          <Text>50,000</Text>
        </View>
      </View>
      <Divider />
      <View style={[styles.row, styles.bottomSheetBgColor]}>
        <View style={styles.bottomSheetBgColor}>
          <Text>Fee</Text>
        </View>
        <View style={styles.bottomSheetBgColor}>
          <Text>25</Text>
        </View>
      </View>
      <Divider />
      <Text style={{textAlign: 'right', paddingTop: Spacing}}>50,025</Text>
      <View style={[styles.bottomButtonContainer, styles.bottomSheetBgColor]}>
        <Button
          style={[styles.button, {backgroundColor: colors.primary}]}
          mode="contained"
          onPress={handleContinue}>
          <Text style={{color: colors.onPrimary}}>Continue</Text>
        </Button>
        <Button
          style={[styles.button, {backgroundColor: colors.surfaceVariant}]}
          mode="contained"
          onPress={close}>
          <Text style={{color: colors.onPrimary}}>Cancel</Text>
        </Button>
      </View>
    </View>
  );
}

function EnterPin({bottomSheetIndex}: {bottomSheetIndex: number}) {
  const {colors} = useTheme();
  const [pin, setPin] = useState({one: '', two: '', three: '', four: ''});

  const {close} = useBottomSheet();
  const navigation = useNavigation();

  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);
  const refThree = useRef<any>(null);
  const refFour = useRef<any>(null);

  const [spinner, setSpinner] = useState(false);

  const widthraw = () => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      close();
      navigation.goBack();
    }, 2000);
  };

  const handleTextChange = (text: string, index: string) => {
    const newPin = {...pin, [index]: text};
    setPin(newPin);

    // Automatically focus next input
    if (text.length === 1) {
      if (index === 'one') refTwo.current?.focus();
      else if (index === 'two') refThree.current?.focus();
      else if (index === 'three') refFour.current?.focus();
      else if (index === 'four') {
        widthraw();
      }
    }

    // Optionally handle backspace to previous input
    if (text.length === 0) {
      if (index === 'two') refOne.current?.focus();
      else if (index === 'three') refTwo.current?.focus();
      else if (index === 'four') refThree.current?.focus();
    }
  };

  useEffect(() => {
    if (bottomSheetIndex === -1) {
      setPin({one: '', two: '', three: '', four: ''});
      refFour.current?.blur();
    }
  }, [bottomSheetIndex]);

  return (
    <View style={[styles.bottomSheetContainer, styles.bottomSheetBgColor]}>
      <View style={[styles.bottomSheetHeading, styles.bottomSheetBgColor]}>
        <Spinner
          visible={spinner}
          textContent={'Transaction in progress...'}
          overlayColor={colors.primaryContainer}
          color={colors.primary}
          textStyle={{
            color: colors.primary,
            fontWeight: 'normal',
            fontSize: 16,
          }}
          animation="fade"
        />
        <Text style={[styles.bottomSheetTitle]}>Enter 4 Digit Pin</Text>
        <Text style={styles.bottomSheetSubtitle}>
          Enter your 4 Digit PIN to authorize this transaction
        </Text>
      </View>
      <View
        style={[
          styles.row,
          styles.bottomSheetBgColor,
          {justifyContent: 'space-evenly'},
        ]}>
        <TextInput
          ref={refOne}
          theme={{colors}}
          outlineStyle={styles.pinInput}
          keyboardType="numeric"
          mode="outlined"
          secureTextEntry
          value={pin.one}
          onChangeText={text => handleTextChange(text, 'one')}
        />
        <TextInput
          ref={refTwo}
          theme={{colors}}
          outlineStyle={styles.pinInput}
          keyboardType="numeric"
          mode="outlined"
          secureTextEntry
          value={pin.two}
          onChangeText={text => handleTextChange(text, 'two')}
        />
        <TextInput
          ref={refThree}
          theme={{colors}}
          outlineStyle={styles.pinInput}
          keyboardType="numeric"
          mode="outlined"
          secureTextEntry
          value={pin.three}
          onChangeText={text => handleTextChange(text, 'three')}
        />
        <TextInput
          ref={refFour}
          theme={{colors}}
          outlineStyle={styles.pinInput}
          keyboardType="numeric"
          mode="outlined"
          secureTextEntry
          value={pin.four}
          onChangeText={text => handleTextChange(text, 'four')}
        />
      </View>
    </View>
  );
}

function Withdraw({navigation}: WithdrawProps) {
  const {colors} = useTheme();
  const backgroundColorStyle = {
    backgroundColor: colors.background,
  };

  const [selected, setSelected] = React.useState('first');

  const bankAccounts = [
    {
      id: 'first',
      name: 'Ajalla Ugo',
      number: '9102356712',
      bank: 'Access Bank',
    },
    {
      id: 'second',
      name: 'Ajalla Ugo',
      number: '9102356712',
      bank: 'Access Bank',
    },
  ];

  const addBankBottomSheetRef = useRef<BottomSheet>(null);
  const transactionSummaryBottomSheetRef = useRef<BottomSheet>(null);
  const enterPinBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    setBottomSheetIndex(index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={[styles.safeContainer, backgroundColorStyle]}>
      <View style={styles.container}>
        <Header />
        <View style={styles.row}>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Your Balance</Text>
          </View>
          <AccountBalance />
        </View>
        <Text style={[styles.title, {color: colors.primary}]}>Withdraw</Text>
        <Text>Amount</Text>
        <Button
          style={[
            styles.button,
            {
              backgroundColor: colors.secondaryContainer,
              borderColor: colors.primary,
            },
          ]}
          mode="outlined"
          onPress={() => console.log('Pressed')}>
          <Text style={[styles.moneyText, {fontSize: 18}]}>20,000</Text>
        </Button>
        <View style={styles.row}>
          <View>
            <Text>Select Bank</Text>
          </View>
          <View>
            <Button
              style={[styles.button]}
              icon="plus-circle-outline"
              labelStyle={{color: colors.primary}}
              mode="text"
              onPress={() => addBankBottomSheetRef.current?.expand()}
              compact>
              <Text>Add New Back</Text>
            </Button>
          </View>
        </View>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.accountsContainer}>
            {bankAccounts.map(account => (
              <Account
                key={account.id}
                selected={selected}
                setSelected={setSelected}
                accountInfo={account}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            style={[
              styles.button,
              {backgroundColor: colors.primary, borderColor: colors.primary},
            ]}
            mode="contained"
            onPress={() => transactionSummaryBottomSheetRef.current?.expand()}>
            <Text style={{color: colors.onPrimary}}>Withdraw</Text>
          </Button>
          <Button
            style={[styles.button, {backgroundColor: colors.surfaceVariant}]}
            mode="contained"
            onPress={() => navigation.goBack()}>
            <Text style={{color: colors.onPrimary}}>Cancel</Text>
          </Button>
        </View>
      </View>
      <BottomSheet
        backgroundStyle={styles.bottomSheetBgColor}
        ref={addBankBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        // keyboardBehavior="interactive"
      >
        <AddBank close={() => addBankBottomSheetRef.current?.close()} />
      </BottomSheet>
      <BottomSheet
        backgroundStyle={styles.bottomSheetBgColor}
        ref={transactionSummaryBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        enablePanDownToClose>
        <TransactionSummary
          open={() => enterPinBottomSheetRef.current?.expand()}
          close={() => transactionSummaryBottomSheetRef.current?.close()}
        />
      </BottomSheet>
      <BottomSheet
        backgroundStyle={styles.bottomSheetBgColor}
        ref={enterPinBottomSheetRef}
        index={-1}
        snapPoints={['40', '80']}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        keyboardBehavior="fillParent"
        enablePanDownToClose>
        <EnterPin bottomSheetIndex={bottomSheetIndex} />
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
    paddingVertical: Spacing,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  moneyText: {
    fontFamily: 'PTMono-Regular',
  },
  button: {
    borderRadius: 7,
    padding: Spacing / 1.5,
    marginTop: Spacing,
  },
  accountsContainer: {
    gap: Spacing * 2,
    paddingVertical: Spacing,
  },
  bottomButtonContainer: {
    flex: 1,
    paddingVertical: Spacing * 2,
    // justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    flex: 1,
    padding: Spacing,
    paddingHorizontal: Spacing * 2.5,
    backgroundColor: '#f2f2f2',
  },
  bottomSheetBgColor: {
    backgroundColor: '#f2f2f2',
    borderRadius: 26, // refactor styles
  },
  bottomSheetHeading: {
    alignItems: 'center',
    paddingBottom: Spacing * 2,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: Spacing,
  },
  bottomSheetSubtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  inputGroup: {
    gap: Spacing * 2,
  },
  input: {
    borderRadius: 7,
  },
  pinInput: {
    borderRadius: 7,
    width: 60,
  },
});

export default Withdraw;
