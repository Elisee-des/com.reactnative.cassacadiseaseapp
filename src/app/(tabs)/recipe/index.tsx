import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from "axios";
import Categories from "@/components/Categories";
import { Category } from "@/types";
import Recipes from "@/components/Recipes";
import Colors from "@/constants/Colors";


export default function TabOneScreen() {
  const [activeCategory, setActiveCategory] = useState<string>("Beef");
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category: string) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/categories`
        // "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response?.data) {
        setCategories(response?.data?.classes);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Une erreur inconnue s'est produite");
      }
    }
  };

  const getRecipes = async (name = "Healthy") => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/categories/${name}/images`
        // `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response?.data) {
        setMeals(response?.data?.images);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Une erreur inconnue s'est produite");
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop:30 }}>
      <StatusBar style="dark" />

      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingTop: 14 * hp(0.1),
          }}
        >
          {/* <View
            style={{
              marginHorizontal: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AdjustmentsHorizontalIcon size={hp(4)} color={"gray"} />
            <Image
              source={require("@assets/images/my-img-profil.jpg")}
              style={{
                width: hp(5),
                height: hp(5),
                resizeMode: "cover",
                borderRadius: hp(2.5),
              }}
            />
          </View> */}

          <View style={{ marginHorizontal: 16, marginBottom: 8, paddingTop:10, paddingBottom:20 }}>
            <Text
              style={{
                fontSize: hp(5),
                fontWeight: 'bold',
                color: '#2d3748',
              }}
            >
              Cassava <Text style={{ color: Colors.primary }}>Diseases</Text>
            </Text>
          </View>

          {/* Search Bar */}
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              padding: 10,
            }}
          >
           <View style={{ backgroundColor: 'white', borderRadius: hp(2.5), padding: 4, }}>
            <MagnifyingGlassIcon
              size={hp(2.5)}
              color={"gray"}
              strokeWidth={3}
            />
          </View>
              <TextInput
                placeholder="Rechercher une maladie"
                placeholderTextColor={"gray"}
                style={{
                  fontSize: hp(1.7),
                  flex: 1,
                  marginBottom: 1,
                  paddingLeft: 5
                }}
              />
          </View>

          {/* Categories */}
          <View style={{ paddingTop:20 }}>
            {categories.length > 0 && (
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
              />
            )}
          </View>

           {/* Recipes Meal */}
           <View>
            <Recipes meals={meals} categories={categories} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}