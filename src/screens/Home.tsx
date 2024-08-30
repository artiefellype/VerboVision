import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Navbar from "../components/Nav";
import { Camera, useCameraDevices } from "react-native-vision-camera";

export default function Home() {
    const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.find((device) => device.position === "back");

  // Função para abrir a câmera
  const openCamera = () => {
    // Aqui você pode adicionar a lógica para abrir a câmera
    console.log("Câmera aberta!");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navbar title="VerboVision" onBackPress={() => alert("Voltar")} />
      {device != null ? (
        <Camera style={styles.camera} device={device} isActive={true} />
      ) : (
        <Text>Carregando a câmera...</Text>
      )}

      <TouchableOpacity style={styles.circleButton} onPress={openCamera}>
        <Text style={styles.buttonText}>📷</Text>
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
  camera: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  circleButton: {
    width: 70, // Largura do botão
    height: 70, // Altura do botão
    borderRadius: 35, // Metade da largura/altura para torná-lo circular
    backgroundColor: "#6200EE", // Cor de fundo do botão
    justifyContent: "center", // Centraliza o conteúdo dentro do botão
    alignItems: "center", // Centraliza horizontalmente
    position: "absolute", // Para posicionar o botão onde desejar
    bottom: 30, // Distância do fundo da tela
  },
  buttonText: {
    fontSize: 24, // Tamanho do ícone ou texto no botão
    color: "#FFFFFF", // Cor do texto
  },
});
