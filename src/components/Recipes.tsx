import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import RecipesCard from "@/components/RecipeCard";
import { Meal } from "@/types";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

interface RecipesProps {
    meals: Meal[];
    categories: any[];
}

const Recipes = ({ meals, categories } : RecipesProps) => {
  
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  return (
    <Animated.View
      style={{
        marginHorizontal: hp(2),
        marginTop: hp(4),
        marginBottom: hp(4),
      }}
      entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
    >
      <Text
        style={{
          fontSize: hp(2),
          fontWeight: "bold",
        marginHorizontal: hp(1),
          color: Colors.primary, 
          marginBottom: hp(2),
        }}
      >
        {meals.length} Images associées
      </Text>

      <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}>
        {categories.length === 0 || meals.length === 0 ? (
          <ActivityIndicator size="large" style={{ marginTop: hp(20) }} />
        ) : (
          <MasonryList
          data={meals as Meal[]}
          keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipesCard item={item as Meal} index={i} />}
            onEndReachedThreshold={0.5}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default Recipes;
