import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Link, useLocalSearchParams } from "expo-router";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import axios from "axios";
import Animated from "react-native-reanimated";
import Colors from '@/constants/Colors';
import Loading from "@/components/Loading";
import { CachedImage } from "../../../../utils/index";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import moment from "moment";

const Detail1 = ({ meal }: { meal: any }) => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Classe</Text>
    <Text style={styles.content}><Text style={{ fontWeight:"bold" }}>{meal?.classe?.has_name}</Text></Text>

    <Text style={styles.title}>Taille de l'image</Text>
    <Text style={styles.content}><Text style={{ fontWeight:"bold" }}>{meal?.has_img_size} Mo</Text></Text>

    <Text style={styles.title}>Nom de l'image</Text>
    <Text style={styles.content}><Text style={{ fontWeight:"bold" }}>{meal?.nom}</Text></Text>

    <Text style={styles.title}>Date d'annotation</Text>
    <Text style={styles.content}><Text style={{ fontWeight:"bold" }}>{moment(meal?.created_at).format('DD/MM/YYYY HH:mm')}</Text></Text>

    <Text style={styles.title}>Couleurs</Text>
      <View style={styles.couleurContainer}>
        <Text style={styles.content}>Label: <Text style={{ fontWeight:"bold" }}>{meal?.couleur?.label}</Text></Text>
        <Text style={styles.content}>Description: <Text style={{ fontWeight:"bold" }}>{meal?.couleur?.description}</Text></Text>
        <Text style={styles.content}>Teinte Moyenne: <Text style={{ fontWeight:"bold" }}>{meal?.couleur?.has_hue_mean}°</Text></Text>
        <Text style={styles.content}>Écart Type de Teinte: <Text style={{ fontWeight:"bold" }}>{meal?.couleur?.has_hue_std}°</Text></Text>
        <Text style={styles.content}>Saturation Moyenne: <Text style={{ fontWeight:"bold" }}>{meal?.couleur?.has_saturation_mean}%</Text></Text>
        <Text style={styles.content}>Écart Type de Saturation: <Text style={{ fontWeight:"bold" }}>{meal?.couleur?.has_saturation_std}%</Text></Text>
        <Text style={styles.content}>Valeur Moyenne: <Text style={{ fontWeight:"bold" }}>{meal?.couleur.has_value_mean}%</Text></Text>
        <Text style={styles.content}>Écart Type de Valeur: <Text style={{ fontWeight:"bold" }}>{meal?.couleur?.has_value_std}%</Text></Text>
      </View>

    <Text style={styles.title}>Textures</Text>
      <View style={styles.textureContainer}>
        <Text style={styles.content}>Label: <Text style={{ fontWeight:"bold" }}>{meal?.texture?.label}</Text></Text>
        <Text style={styles.content}>Description: <Text style={{ fontWeight:"bold" }}>{meal?.texture?.description}</Text></Text>
        <Text style={styles.content}>Contraste: <Text style={{ fontWeight:"bold" }}>{meal?.texture?.has_contrast}</Text></Text>
        <Text style={styles.content}>Dissimilarité: <Text style={{ fontWeight:"bold" }}>{meal?.texture?.has_dissimilarity}</Text></Text>
        <Text style={styles.content}>Énergie: <Text style={{ fontWeight:"bold" }}>{meal?.texture?.has_energy}</Text></Text>
        <Text style={styles.content}>Homogénéité: <Text style={{ fontWeight:"bold" }}>{meal?.texture?.has_homogeneity}</Text></Text>
        <Text style={styles.content}>Corrélation: <Text style={{ fontWeight:"bold" }}>{meal?.texture?.has_correlation}</Text></Text>
      </View>

    <Text style={styles.title}>Contours</Text>
      <View style={styles.contourContainer}>
        <Text style={styles.content}>Label: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.label}</Text></Text>
        <Text style={styles.content}>Description: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.description}</Text></Text>
        <Text style={styles.content}>Surface: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.has_area} px²</Text></Text>
        <Text style={styles.content}>Périmètre: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.has_perimeter} px</Text></Text>
        <Text style={styles.content}>Largeur: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.has_width} px</Text></Text>
        <Text style={styles.content}>Hauteur: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.has_height} px</Text></Text>
        <Text style={styles.content}>Surface Normalisée: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.has_normalized_area}</Text></Text>
        <Text style={styles.content}>Périmètre Normalisé: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.has_normalized_perimeter}</Text></Text>
        <Text style={styles.content}>Aspect Ratio: <Text style={{ fontWeight:"bold" }}>{meal?.contour?.has_aspect_ratio}</Text></Text>
      </View>
  </ScrollView>
);



const Detail2 = ({ meal }: { meal: any }) => (
  
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Description</Text>
    <Text style={styles.content}>{meal?.classe?.description}</Text>

    <Text style={styles.title}>Causes</Text>
    <Text style={styles.content}>{meal?.classe?.cause}</Text>
    
    <Text style={styles.title}>Symptoms</Text>
    <Text style={styles.content}>{meal?.classe?.symtome}</Text>

    <Text style={styles.title}>Traitements</Text>
    <Text style={styles.content}>{meal?.classe?.traitement}</Text>

  </ScrollView>
);

const renderScene = ({ route }: { route: any }, meal: any) => {
  switch (route.key) {
    case 'first':
      return <Detail1 meal={meal} />;
    case 'second':
      return <Detail2 meal={meal} />;
    default:
      return null;
  }
};

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const { id: idString } = useLocalSearchParams();
  const [meal, setMeal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Caracteristiques' },
    { key: 'second', title: 'Infos General' },
  ]);

  useEffect(() => {
    console.log(idString);
    getMealData(idString as string);
  }, [idString]);

  const getMealData = async (id: string) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/image/detail/${id}`);
      if (response && response.data) {
        setMeal(response.data.image);
        console.log(response.data);
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

  if (isLoading) {
    return <Loading />;
  }

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.primary }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: Colors.primary }}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
    {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.imageContainer}>
          {meal.path ? (
            <CachedImage
              uri={`http://10.0.2.2:8000/storage/${meal.path}`}
              sharedTransitionTag={meal.nom}
              style={styles.image}
            />
          ) : (
            <View style={[styles.imagePlaceholder, styles.image]}>
              <Text style={styles.placeholderText}>400*400</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.headerIconsContainer}>
        <View style={styles.iconWrapper}>
          <Link href={'/(tabs)'}>
            <ChevronLeftIcon
              size={hp(3.5)}
              color={"#f64e32"}
              strokeWidth={4.5}
            />
          </Link>
        </View>

        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon
              size={hp(3.5)}
              color={isFavourite ? "#f64e32" : "gray"}
              strokeWidth={4.5}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={(props) => renderScene(props, meal)}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        style={styles.tabView}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.primary
  },
  content: {
    fontSize: 18,
    marginBottom: 16,
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
  imagePlaceholder: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 20,
    color: "gray",
  },
  headerIconsContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(5),
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
    marginLeft: wp(2),
  },
  ingredientText: {
    fontSize: hp(2),
    color: 'black',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    marginTop: hp(2),
  },
  tabItem: {
    marginRight: wp(4),
  },
  tabText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: 'black',
  },
  couleurContainer: {
    marginBottom: 16,
  },
  textureContainer: {
    marginBottom: 16,
  },
  contourContainer: {
    marginBottom: 16,
  },
});
