import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import Navbar from "../components/Nav";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function ReadImage({ route, navigation }: any) {
  const { imgUri, img } = route.params;
  const [textRecognized, setTextRecognized] = useState("");
  const [loading, setLoading] = useState(true);
  const [audioContent, setAudioContent] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const googleApiKey =
    Constants.manifest?.extra?.googleApiKey ||
    Constants.expoConfig?.extra?.googleApiKey;

  const gerarAudio = async (text: string) => {
    const requestBody = {
      input: {
        text: text,
      },
      voice: {
        languageCode: "pt-BR",
        ssmlGender: "MALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    };

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();
    const audioBase64 = data.audioContent;

    const fileUri = `${FileSystem.documentDirectory}audio.mp3`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, audioBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(`Áudio salvo em: ${fileUri}`);
      return fileUri;
    } catch (error) {
      console.error("Erro ao salvar o arquivo de áudio:", error);
    }
  };

  async function playSound() {
    try {
      if (audioContent) {
        console.log("Carregando o som");
        const { sound } = await Audio.Sound.createAsync({ uri: audioContent });
        setSound(sound);

        console.log("Reproduzindo o som");
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Erro ao reproduzir o som:", error);
    }
  }

  async function stopSound() {
    try {
      if (sound) {
        console.log("Parando o som");
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("Erro ao parar o som:", error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Descarregando o som");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const textRecognition = async (img: string) => {
    const body = JSON.stringify({
      requests: [
        {
          image: {
            content: img,
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
    const processImage = async () => {
      if (imgUri) {
        const recognizedText = await textRecognition(imgUri);
        setTextRecognized(recognizedText || "Nenhum texto encontrado");
        setLoading(false);

        if (recognizedText) {
          const audioUri = await gerarAudio(recognizedText);
          setAudioContent(audioUri || null);
        }
      } else {
        setTextRecognized("Nenhuma imagem fornecida");
        setLoading(false);
      }
    };

    processImage();
  }, [imgUri]);

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
          <ScrollView style={styles.textContainer}>
            <Text style={styles.text}>{textRecognized}</Text>
          </ScrollView>
        )}
      </View>

      <View style={styles.audioButtonsContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={playSound}
          disabled={isPlaying}
        >
          <Icon name="play" size={45} color="#fafafa" style={styles.audioButtonText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stopButton}
          onPress={stopSound}
          disabled={!isPlaying}
        >
          <Icon name="stop" size={45} color="#fafafa" style={styles.audioButtonText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
            <Icon name="arrow-left" size={45} color="#fafafa"  style={styles.audioButtonText}/>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    alignContent: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor:"#F4EEEE",
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    borderRadius:5,
  },
  photo: {
    width: 350,
    height: 400,
    resizeMode: "cover",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 18,
    color: "#5B5151",
    fontWeight: "bold",
    textAlign: "left",
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  playButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: "#208324",
    justifyContent: "center",
    alignItems: "center",
  },
  stopButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: "#A71F1F",
    justifyContent: "center",
    alignItems: "center",
  },
  audioButtonText: {
    fontSize: 40,
    color: "#fafafa",
    textAlign: "center",
  },
  audioButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap:25,
    marginTop: 20,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    margin: "auto"
  },
  loadingText: {
    fontSize: 18,
    color: "#5B5151",
    marginTop: 10,
  },
});
