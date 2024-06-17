import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Loading from "./Loading";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Meal } from "@/types";

export default function Detail1(meal : any) {
  const [isLoading, setIsLoading] = useState(true);

  const ingredientsIndexes = (meal: any) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Meal Description */}
      {isLoading ? (
        <Loading size="large" style={styles.loadingIndicator} />
      ) : (
        <View style={styles.mealDescriptionContainer}>
          {/* Meal Name */}
          <Animated.View
            style={styles.mealNameContainer}
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
          >
            <Text style={styles.mealNameText}>{meal?.classe?.nom}</Text>

            <Text style={styles.mealAreaText}>{meal?.nom}</Text>
          </Animated.View>

          {/* Ingredients */}
          <Animated.View
            style={styles.ingredientsContainer}
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
          >
            <Text style={styles.ingredientsTitle}>Ingredients</Text>

            <View style={styles.ingredientsList}>
              {ingredientsIndexes(meal).map((i) => (
                <View style={styles.ingredientItem} key={i}>
                  <View style={styles.ingredientBullet} />
                  <View style={styles.ingredientTextContainer}>
                    <Text style={styles.ingredientText}>
                      {meal[`strIngredient${i}`]}
                    </Text>
                    <Text style={styles.ingredientMeasureText}>
                      {meal[`strMeasure${i}`]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View
            style={styles.instructionsContainer}
            entering={FadeInDown.delay(400)
              .duration(700)
              .springify()
              .damping(12)}
          >
            <Text style={styles.instructionsTitle}>Instructions</Text>

            <Text style={styles.instructionsText}>{meal?.strInstructions}</Text>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  tabView: {
    flex: 1,
  },
  ingredientMeasureText: {
    fontSize: hp(1.7),
    fontWeight: '800',
    color: 'black',
    marginLeft: wp(1),
  },
  instructionsContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  instructionsTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  instructionsText: {
    fontSize: hp(1.7),
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: wp(100),
    height: hp(45),
  },
  headerIconsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(5),
  },
  iconWrapper: {
    padding: hp(1),
    borderRadius: hp(2),
    backgroundColor: "white",
    marginHorizontal: wp(2),
  },
  loadingIndicator: {
    marginTop: hp(16),
  },
  mealDescriptionContainer: {
    paddingHorizontal: wp(4),
    backgroundColor: "white",
    // marginTop: -hp(4.6),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: hp(3),
  },
  mealNameContainer: {
    paddingHorizontal: wp(4),
    justifyContent: "center",
    alignItems: "center",
  },
  mealNameText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "black",
  },
  mealAreaText: {
    fontSize: hp(2),
    color: "gray",
  },
  ingredientsContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  ingredientsTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "black",
  },
  ingredientsList: {
    marginTop: hp(1),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  ingredientBullet: {
    height: hp(1.5),
    width: hp(1.5),
    borderRadius: hp(0.75),
    backgroundColor: "#f64e32",
  },
  ingredientTextContainer: {
    marginLeft: wp(2),
  },
  ingredientText: {
    fontSize: hp(2),
    color: "black",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(4),
    marginTop: hp(2),
  },
  tabItem: {
    marginRight: wp(4),
  },
  tabText: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "black",
  },
});
