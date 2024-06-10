import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync } from 'expo-image-picker';
import Colors from '@/constants/Colors';

export default function Detect() {
const [pickedImage, setPickedImage] = useState({ uri: null } as { uri: string | null | undefined });


  const pickImageHandler = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Ajouter cette ligne pour obtenir l'image en base64
    });

    if (!result.canceled) {
      setPickedImage({ uri: result.assets[0].uri });
    }
  };

  const resetHandler = () => {
    setPickedImage({ uri: null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Image de la camera ou de la Gallerie</Text>
      <View style={styles.placeholder}>
        {pickedImage.uri ? (
          <Image source={{ uri: pickedImage.uri }} style={styles.previewImage} />
        ) : (
          <Text>Aucune image choisie.</Text>
        )}
      </View>
      <View style={styles.button}>
        <Button title="Choisir une image" onPress={pickImageHandler} />
        <Button title="Nettoyer" onPress={resetHandler} />
      </View>
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
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
