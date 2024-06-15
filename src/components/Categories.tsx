import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Category } from "@/types";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

interface CategoriesProps {
  categories: Category[];
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}: CategoriesProps) {

  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category, index) => {
          const isActive = category.has_name === activeCategory;
          const buttonStyle = isActive ? styles.activeButton : styles.inactiveButton;
          const truncatedName = category?.sigle?.substring(0, 7); // Tronquer à 7 caractères

          return (
            <TouchableOpacity
              key={index}
              style={{ marginRight: 10 }}
              onPress={() => handleChangeCategory(category.has_name)}
            >
              <View style={buttonStyle}>
                <Image
                    source={{ uri: `http://10.0.2.2:8000/storage/${category.path}` }}
                    style={{ width: hp(9), height: hp(9), borderRadius: hp(4) }}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  fontSize: hp(2),
                  color: isActive ? Colors.primary : "black",
                }}
              >
                {truncatedName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  activeButton: {
    borderRadius: 10,
    padding: 6,
    backgroundColor: Colors.primary,
  },
  inactiveButton: {
    borderRadius: 10,
    padding: 6,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
