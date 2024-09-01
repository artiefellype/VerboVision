import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Navbar from "../components/Nav";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ReadImage({ route, navigation }: any) {
  const { imgUri, img } = route.params;
  const [textRecognized, setTextRecognized] = useState("");
  const [loading, setLoading] = useState(true);
  const googleApiKey =
    Constants.manifest?.extra?.googleApiKey ||
    Constants.expoConfig?.extra?.googleApiKey;

  const textRecognition = async (img: string) => {
    const body = JSON.stringify({
      requests: [
        {
          image: {
            content: img, // Passando a imagem como Base64
          },
          features: [
            {
              type: "TEXT_DETECTION",
            },
          ],
        },
      ],
    });

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${googleApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    if (!response.ok) {
      setLoading(false);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const detections = result.responses[0].textAnnotations;

    if (detections?.length > 0) {
      return detections[0].description;
    } else {
      console.log("Nenhum texto detectado na imagem");
      return null;
    }
  };

  useEffect(() => {
    textRecognition(imgUri).then((data) => {
      setTextRecognized(data || "Nenhum texto encontrado");
      setLoading(false);
      console.log("TEXTINHO: ", data);
    });
  }, [textRecognized]);

  return (
    <View style={styles.container}>
      <Navbar
        title="VerboVision"
        onBackPress={() => navigation.navigate("Home")}
        onMenuPress={() => navigation.navigate("History")}
      />
      <View style={styles.contentContainer}>
        <Image source={{ uri: img }} style={styles.photo} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200EE" />
            <Text style={styles.loadingText}>Processando imagem...</Text>
          </View>
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.text}>{textRecognized}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.text}><Icon name="arrow-left" size={30} color="#fafafa" /></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
  },
  photo: {
    width: 250,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "left"
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 100,
    height: 100,
    borderRadius: 55,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  loadingText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 10,
  },
});
