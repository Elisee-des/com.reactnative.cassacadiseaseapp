import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";

export default function Detail2() {
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>Symptoms</Text>
    <Text style={styles.content}>These are the symptoms of the item.</Text>

    <Text style={styles.title}>Treatments</Text>
    <Text style={styles.content}>These are the treatments of the item.</Text>
  </ScrollView>
  )
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
      fontSize: 24,
      fontWeight: 'bold',
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
  });