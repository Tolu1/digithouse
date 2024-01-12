import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import Spacing from '../constants/Spacing';
import BackgroundComponent from '../components/BackgroundComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeBackground() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const {colors} = useTheme();
  const backgroundStyle = {
    flex: 1,
    backgroundColor: colors.secondary,
  };

  return (
    <View style={backgroundStyle}>
      <ImageBackground
        source={require('../assets/images/quiet-town.png')}
        resizeMode="contain"
        style={{
          width: windowWidth - Spacing * 0,
          height: windowHeight - Spacing * 0,
        }}>
        <View style={{padding: Spacing * 2}}>
          <ImageBackground
            source={require('../assets/images/birds.png')}
            resizeMode="contain"
            style={{
              width: windowWidth - Spacing * 2,
              height: windowHeight - Spacing * 2,
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

function Home({navigation}: HomeProps) {
  const {colors} = useTheme();

  const backgroundColorStyle = {
    backgroundColor: colors.secondary,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.safeContainer, backgroundColorStyle]}>
      <View style={styles.backgroundContainer}>
        <BackgroundComponent renderBackground={HomeBackground}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                style={{
                  width: 158,
                  height: 165,
                }}
                source={require('../assets/images/urban-design.png')}
              />
              <Image
                style={{
                  width: 138,
                  height: 257,
                  marginLeft: -68,
                }}
                source={require('../assets/images/girl.png')}
              />
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
  },
  backgroundContainer: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: Spacing,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },
});

export default Home;
