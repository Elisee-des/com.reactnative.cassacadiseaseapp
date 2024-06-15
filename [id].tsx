import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Loading from "@/components/Loading";
import { CachedImage } from "../../../../utils/index";
import axios from "axios";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import TabScreen from "@/components/TabScreen";

export default function RecipeDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const [meal, setMeal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    console.log(idString);
    getMealData(idString as string);
  }, [idString]);
  
  const getMealData = async (id : string) => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/image/${id}`
      );

      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Une erreur inconnue s'est produite");
      }
    }
  };

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

  console.log("Meal", meal);

  // if (isLoading) {
  //   return <Loading />;
  // }

  // return (
  //   <ScrollView
  //     style={styles.container}
  //     showsVerticalScrollIndicator={false}
  //     contentContainerStyle={styles.scrollViewContent}
  //   >
  //     <StatusBar style="light" />
  //     <Stack.Screen options={{ headerShown: false }} />

  //     {/* Recipe Image */}
  //     <View style={styles.imageContainer}>
  //       <CachedImage
  //         uri={meal.strMealThumb}
  //         sharedTransitionTag={meal.strMeal}
  //         style={styles.image}
  //       />
  //     </View>

  //     {/* Back Button and Favorite Icon */}
  //     <View style={styles.headerIconsContainer}>
  //       <View style={styles.iconWrapper}>
  //         <Link href={'/(tabs)'}>
  //           <ChevronLeftIcon
  //             size={hp(3.5)}
  //             color={"#f64e32"}
  //             strokeWidth={4.5}
  //           />
  //         </Link>
  //       </View>

  //       <View style={styles.iconWrapper}>
  //         <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
  //           <HeartIcon
  //             size={hp(3.5)}
  //             color={isFavourite ? "#f64e32" : "gray"}
  //             strokeWidth={4.5}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </View>

  //     {/* Meal Description */}
  //     {isLoading ? (
  //       <Loading size="large" style={styles.loadingIndicator} />
  //     ) : (
  //       <View style={styles.mealDescriptionContainer}>
  //         {/* Meal Name */}
  //         <Animated.View
  //           style={styles.mealNameContainer}
  //           entering={FadeInDown.delay(200)
  //             .duration(700)
  //             .springify()
  //             .damping(12)}
  //         >
  //           <Text style={styles.mealNameText}>
  //             {meal?.strMeal}
  //           </Text>

  //           <Text style={styles.mealAreaText}>
  //             {meal?.strArea}
  //           </Text>
  //         </Animated.View>

  //         {/* Ingredients */}
  //         <Animated.View
  //           style={styles.ingredientsContainer}
  //           entering={FadeInDown.delay(300)
  //             .duration(700)
  //             .springify()
  //             .damping(12)}
  //         >
  //           <Text style={styles.ingredientsTitle}>
  //             Ingredients
  //           </Text>

  //           <View style={styles.ingredientsList}>
  //           {ingredientsIndexes(meal).map((i) => (
  //             <View style={styles.ingredientItem} key={i}>
  //               <View style={styles.ingredientBullet} />
  //               <View style={styles.ingredientTextContainer}>
  //                 <Text style={styles.ingredientText}>
  //                   {meal[`strIngredient${i}`]}
  //                 </Text>
  //                 <Text style={styles.ingredientMeasureText}>
  //                   {meal[`strMeasure${i}`]}
  //                 </Text>
  //               </View>
  //             </View>
  //           ))}
  //         </View>
  //         </Animated.View>

  //         {/* Instructions */}
  //         <Animated.View
  //           style={styles.instructionsContainer}
  //           entering={FadeInDown.delay(400)
  //             .duration(700)
  //             .springify()
  //             .damping(12)}
  //         >
  //           <Text style={styles.instructionsTitle}>
  //             Instructions
  //           </Text>

  //           <Text style={styles.instructionsText}>
  //             {meal?.strInstructions}
  //           </Text>
  //         </Animated.View>
  //       </View>
  //     )}
  //   </ScrollView>
  // );

  return (
    <SafeAreaView>
      <TabScreen />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: wp(100),
    height: hp(45),
  },
  headerIconsContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(2.5),
  },
  iconWrapper: {
    padding: hp(1),
    borderRadius: hp(2),
    backgroundColor: 'white',
    marginHorizontal: wp(2),
  },
  loadingIndicator: {
    marginTop: hp(16),
  },
  mealDescriptionContainer: {
    paddingHorizontal: wp(4),
    backgroundColor: 'white',
    marginTop: -hp(4.6),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: hp(3),
  },
  mealNameContainer: {
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealNameText: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: 'black',
  },
  mealAreaText: {
    fontSize: hp(2),
    color: 'gray',
  },
  ingredientsContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  ingredientsTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: 'black',
  },
  ingredientsList: {
    marginTop: hp(1),
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  ingredientBullet: {
    height: hp(1.5),
    width: hp(1.5),
    borderRadius: hp(0.75),
    backgroundColor: '#f64e32',
  },
  ingredientTextContainer: {
    flexDirection: 'row',
    marginLeft: wp(2),
  },
  ingredientText: {
    fontSize: hp(1.7),
    fontWeight: '500',
    color: 'black',
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
  instructionsText: {
    fontSize: hp(1.7),
    color: 'black',
  },
});
