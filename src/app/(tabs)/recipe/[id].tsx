import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { Text, View, useWindowDimensions, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const FirstRoute = () => (
  <ScrollView style={styles.container}>
  <Text style={styles.title}>Description</Text>
  <Text style={styles.content}>This is the description of the item.</Text>

  <Text style={styles.title}>Causes</Text>
  <Text style={styles.content}>This is the causes of the item.</Text>

</ScrollView>
);

const SecondRoute = () => (
  <ScrollView style={styles.container}>
  <Text style={styles.title}>Symptoms</Text>
  <Text style={styles.content}>These are the symptoms of the item.</Text>

  <Text style={styles.title}>Treatments</Text>
  <Text style={styles.content}>These are the treatments of the item.</Text>
</ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const { id: idString } = useLocalSearchParams();


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderTabBar = (props : any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#f64e32' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: '#f64e32' }}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: `Order #${idString}` }} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
});