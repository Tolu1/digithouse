import React from 'react';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import Colors from './constants/Colors';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Wallet from './screens/Wallet';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    primaryContainer: Colors.light.white,
    secondary: Colors.light.tint,
    onPrimary: Colors.light.white,
    onPrimaryContainer: Colors.light.black,
    onSecondary: Colors.light.gray,
    surface: Colors.light.gray,
  },
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Wallet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
