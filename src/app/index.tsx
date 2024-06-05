import { View, Text, Image, Platform, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { Link, Redirect } from 'expo-router';


const index = () => {
    const animation = useRef(null);
    const navigation = useNavigation();

  return (
    <View className="bg-[#052c65] flex-1 justify-center items-center space-y-10 relative">
      <Image
        source={require("../../assets/images/background.png")}
        style={{
          position: "absolute",
          width: wp(100),
          height: hp(100),
          resizeMode: "cover",
        }}
      />

      {/* Lottie Logo */}
      <View>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: wp(40),
            height: hp(40),
          }}
          source={require("../../assets/lottie/images.json")}
        />
      </View>

      {/* Title and Subtitle */}
      <View className="flex items-center space-y-2">
        <Text
          className="text-white font-extrabold tracking-widest"
          style={{
            fontSize: hp(5),
          }}
        >
          Cassacas's diseases
        </Text>

        <Text
          className="text-white tracking-widest font-medium"
          style={{
            fontSize: hp(2.5),
          }}
        >
          Detecter les maladies
        </Text>
      </View>

      <View>
        <Link href="(tabs)"
          style={{
              backgroundColor: "#fff",
              paddingVertical: hp(2),
              paddingHorizontal: hp(6),
              borderRadius: hp(1.5),
            }}
            >
          <Text
            style={{
              color: "#052c65",
              fontSize: hp(2.5),
              fontWeight: "medium",
            }}
          >
            Commencer
          </Text>
        </Link>
      </View>

    </View>
  )
}

export default index