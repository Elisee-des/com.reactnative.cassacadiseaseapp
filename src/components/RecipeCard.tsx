import React, { useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { Meal } from "@/types";
import { Link, useSegments } from "expo-router";

interface RecipeCardProps {
  index: number;
  item: Meal; // Assurez-vous que le type Meal est correct
}

const RecipesCard = ({ index, item }: RecipeCardProps) => {
    const segments = useSegments();
    const isEven = index % 2 === 0;

  return (
    <Link href={`/${segments[0]}/recipe/${item.idMeal}`} asChild>
      <Pressable
        style={{
          width: "100%",
          paddingRight: isEven ? hp(2) : 0,
          marginBottom: hp(3),
        }}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: hp(20),
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        <Text
          style={{
            fontSize: hp(2.2),
            fontWeight: "bold",
            color: "white",
            position: "absolute",
            bottom: hp(1.5),
            left: hp(1),
            maxWidth: "80%",
          }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Link>
  );
};

export default RecipesCard;
