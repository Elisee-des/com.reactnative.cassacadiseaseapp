import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Category } from "@/types";

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
          const isActive = category.strCategory === activeCategory;
          const buttonStyle = isActive ? styles.activeButton : styles.inactiveButton;

          return (
            <TouchableOpacity
              key={index}
              style={{ marginRight: 10 }}
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View style={buttonStyle}>
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={{ width: hp(8), height: hp(8), borderRadius: hp(3) }}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  fontSize: hp(2),
                  color: isActive ? "#f64e32" : "black",
                }}
              >
                {category.strCategory}
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
    backgroundColor: "#f64e32",
  },
  inactiveButton: {
    borderRadius: 10,
    padding: 6,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
