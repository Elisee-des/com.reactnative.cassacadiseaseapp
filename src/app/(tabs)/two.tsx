import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors';
import * as FileSystem from 'expo-file-system';
import Loading from '@/components/Loading';

export default function Detect() {
  const [image, setImage] = useState<string | null>(null);
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPredictedClass(null); // Réinitialiser la prédiction
    }
  };

  const resetHandler = () => {
    setImage(null);
    setPredictedClass(null); // Réinitialiser la prédiction
  };

  const predictImage = async () => {
    if (!image) {
      Alert.alert('Erreur', 'Veuillez sélectionner une image d\'abord.');
      return;
    }

    setLoading(true);

    try {
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });
      

      const res = await fetch('http://10.0.2.2:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: `data:image/jpeg;base64,${base64}` }),
      });

      const result = await res.json();

      if (res.ok) {
        setPredictedClass(result.predicted_class);
      } else {
        Alert.alert('Erreur', result.error);
      }

      setLoading(false);
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la prédiction.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Image de la caméra ou de la Galerie</Text>
      <View style={styles.placeholder}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <Text>Aucune image choisie.</Text>
        )}
      </View>
      {predictedClass && (
        <Text style={styles.predictionText}>Classe prédite : {predictedClass}</Text>
      )}
      <View style={styles.button}>
        <Button title="Choisir une image" onPress={pickImage} />
        <Button title="Nettoyer" onPress={resetHandler} />
      </View>
      {image && (
        <View style={styles.button}>
          <Button title="Prédire" onPress={predictImage} />
        </View>
      )}
      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: 20,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '100%',
    height: 280,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  predictionText: {
    backgroundColor: '#eee',
    fontSize: 18,
    color: 'green',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
