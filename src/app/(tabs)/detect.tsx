import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import * as FileSystem from "expo-file-system";
import Loading from "@/components/Loading";
import * as Haptics from "expo-haptics";

export default function Detect() {
  const [image, setImage] = useState<string | null>(null);
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const API_FLASK_URL = process.env.API_FLASK_URL;

  const pickImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Alert.alert(
      "Choisir une image",
      "Choisissez la source de l'image",
      [
        { text: "Caméra", onPress: handleCameraPick },
        { text: "Galerie", onPress: handleGalleryPick },
      ],
      { cancelable: true }
    );
  };

  const handleCameraPick = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission refusée",
        "Vous devez autoriser l'accès à la caméra pour utiliser cette fonctionnalité."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPredictedClass(null);
    }
  };

  const handleGalleryPick = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission refusée",
        "Vous devez autoriser l'accès à la galerie pour utiliser cette fonctionnalité."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPredictedClass(null);
    }
  };

  const resetHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setImage(null);
    setPredictedClass(null);
  };

  const predictImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (!image) {
      Alert.alert("Erreur", "Veuillez sélectionner une image d'abord.");
      return;
    }

    setLoading(true);

    try {
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const res = await fetch(`http://10.0.2.2:5000/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: `data:image/jpeg;base64,${base64}` }),
      });

      const result = await res.json();

      if (res.ok) {
        setPredictedClass(result.predicted_class);
      } else {
        Alert.alert("Erreur", result.error);
      }

      setLoading(false);
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la prédiction.");
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
        <Text style={styles.predictionText}>
          Classe prédite : {predictedClass}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetHandler}>
          <Text style={styles.buttonText}>Nettoyer l'image</Text>
        </TouchableOpacity>
      </View>
      {image && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={predictImage}>
            <Text style={styles.buttonText}>Prédire la maladie</Text>
          </TouchableOpacity>
        </View>
      )}
      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: Colors.primary,
    marginBottom: 20,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "100%",
    height: 280,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  predictionText: {
    backgroundColor: "#eee",
    fontSize: 18,
    color: "green",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
});
