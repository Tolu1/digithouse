import React from 'react';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import Colors from './constants/Colors';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './screens/Home';
import Login from './screens/Login';
import Wallet from './screens/Wallet';
import Withdraw from './screens/Withdraw';

const theme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    primaryContainer: Colors.light.white,
    secondary: Colors.light.tint,
    secondaryContainer: Colors.light.tint,
    surface: Colors.light.lightGray,
    surfaceVariant: Colors.light.gray,
    background: Colors.light.white,
    onPrimary: Colors.light.white,
    onPrimaryContainer: Colors.light.black,
    onSecondary: Colors.light.darkerGray,
    onSecondaryContainer: Colors.light.darkerGray,
    onBackground: Colors.light.darkerGray,
  },
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Wallet: undefined;
  Withdraw: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerTitle: 'Trending Product'}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerTitle: 'Login'}}
            />
            <Stack.Screen
              name="Wallet"
              component={Wallet}
              options={{headerTitle: 'Wallet'}}
            />
            <Stack.Screen
              name="Withdraw"
              component={Withdraw}
              options={{headerTitle: 'Withdraw'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

export default App;
