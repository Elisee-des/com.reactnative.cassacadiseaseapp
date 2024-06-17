import { Stack, withLayoutContext } from 'expo-router';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="[id]" options={{ headerShown:false, title: "Detail" }} />
    </Stack>
  );
}
