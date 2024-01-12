import {Text} from '../components/StyledText';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Spacing from '../constants/Spacing';
import BackgroundComponent from '../components/BackgroundComponent';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginBackground() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const {colors} = useTheme();
  const backgroundStyle = {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: Spacing * 2,
  };
  return (
    <View style={backgroundStyle}>
      <ImageBackground
        source={require('../assets/images/birds-transparent.png')}
        resizeMode="contain"
        style={{
          width: windowWidth - Spacing * 0,
          height: windowHeight - Spacing * 0,
        }}
      />
    </View>
  );
}

function Login({navigation}: LoginProps) {
  const {colors} = useTheme();
  const [form, setForm] = useState({username: '', password: ''});
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.backgroundContainer}>
        <BackgroundComponent renderBackground={LoginBackground}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                style={{
                  width: 244,
                  height: 114,
                }}
                source={require('../assets/images/buy-house.png')}
              />
            </View>
            <Text>Login to your Account</Text>
            <View style={styles.formContainer}>
              <TextInput
                outlineStyle={styles.input}
                label="Username"
                mode="outlined"
                left={
                  <TextInput.Icon
                    icon={'account-multiple-outline'}
                    color={colors.primary}
                  />
                }
                value={form.username}
                onChangeText={username =>
                  setForm({...form, username: username})
                }
              />
              <TextInput
                outlineStyle={styles.input}
                label="Password"
                secureTextEntry
                mode="outlined"
                left={<TextInput.Icon icon="key" color={colors.primary} />}
                value={form.password}
                onChangeText={password =>
                  setForm({...form, password: password})
                }
              />
              <Button
                style={[styles.button, {backgroundColor: colors.primary}]}
                mode="contained"
                onPress={() => navigation.replace('Wallet')}>
                <Text style={{color: colors.onPrimary}}>Login</Text>
              </Button>
            </View>
            <View style={styles.bottomContainer}>
              <Text>Don't have an account?</Text>
              <Text style={{color: colors.primary}}>Sign up</Text>
            </View>
          </View>
        </BackgroundComponent>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#e5f4f3',
  },
  backgroundContainer: {flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2.5,
    paddingTop: Spacing * 4,
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    padding: Spacing * 4,
  },
  formContainer: {
    paddingVertical: Spacing,
    gap: Spacing,
  },
  button: {
    borderRadius: 7,
    padding: Spacing / 1.5,
    marginTop: Spacing,
  },
  input: {
    borderRadius: 7,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: Spacing / 2,
    padding: Spacing * 2,
  },
});

export default Login;
