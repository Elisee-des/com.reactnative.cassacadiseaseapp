import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
// Import des images
import backgroundImage from '../../assets/images/background.png';
import cassacaDiseasesImage from '../../assets/images/cassacadiseases.png';
import * as Haptics from "expo-haptics";

const Index = () => {
  const animation = useRef(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
      />

      {/* Lottie Logo */}
      <View>
        <LottieView
          autoPlay
          ref={animation}
          style={styles.lottieView}
          source={require('../../assets/lottie/image.json')}
        />
        {/* <Image
        source={cassacaDiseasesImage}
        style={styles.lottieView}
      /> */}
      </View>

      {/* Title and Subtitle */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Cassava Diseases</Text>
        <Text style={styles.subtitleText}>Detecter les maladies</Text>
      </View>

      <View>
        <Link href="(tabs)" style={styles.link}>
          <Text style={styles.linkText}>Commencer</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: wp(100),
    height: hp(100),
    resizeMode: 'cover',
  },
  lottieView: {
    width: wp(50),
    height: hp(50),
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: hp(2),
  },
  titleText: {
    color: 'white',
    fontWeight: '800',
    letterSpacing: 2,
    fontSize: hp(5),
  },
  subtitleText: {
    color: 'white',
    letterSpacing: 2,
    fontWeight: '500',
    fontSize: hp(2.5),
  },
  link: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    paddingHorizontal: hp(6),
    borderRadius: hp(1.5),
    //ombrage
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linkText: {
    color: Colors.primary,
    fontSize: hp(2.5),
    fontWeight: '500',
  },
});

export default Index;
