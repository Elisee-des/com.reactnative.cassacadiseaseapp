import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import { ImageProps, ImageSourcePropType } from "react-native";

// Définition des types pour les props
interface CachedImageProps extends ImageProps {
  uri: string;
}

export const CachedImage: React.FC<CachedImageProps> = (props) => {
  const [cachedSource, setCachedSource] = useState<ImageSourcePropType | null>(null);
  const { uri, ...rest } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
          });
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.error("Error caching image:", error);
        setCachedSource({ uri });
      }
    };

    getCachedImage();
  }, [uri]);

  if (!cachedSource) {
    return null; // ou une autre vue de remplacement pendant le chargement
  }

  return <Animated.Image source={cachedSource} {...rest} />;
};
