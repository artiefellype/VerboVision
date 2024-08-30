import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Button,
  Image
} from "react-native";
import { CameraView, CameraType, useCameraPermissions, CameraPictureOptions,  } from "expo-camera";
import Navbar from "../components/Nav";

export default function Home() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraBlocked, setCameraBlocked] = useState(true)
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [capturedImg, setCapturedImg] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          O VerboVision precisa da sua permissão para usar a câmera.
        </Text>
        <Button onPress={requestPermission} title="Dar permissão" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true }; 
        const data = await cameraRef.current.takePictureAsync()
        // Handle the captured image data here (data.uri or data.base64)
        console.log(data); 
        setCapturedImg(data.uri)
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while taking the picture.');
      }
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Navbar title="VerboVision" onBackPress={() => alert("Voltar")} />

      <CameraView style={styles.camera} facing={facing} onCameraReady={() => {
        setCameraBlocked(false)
      }} ref={cameraRef}>
        <View></View>
      </CameraView>

      {capturedImg && (
        <Image
          source={{ uri: capturedImg }}
          style={styles.photo}
        />
      )}


      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={takePicture} disabled={cameraBlocked} >
          <Text style={styles.buttonText}>📷</Text>
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
    justifyContent: "space-between",
  },
  photo: {
    flex: 3,
    width: "100%",
    resizeMode: "cover",
    marginVertical: 10,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  camera: {
    flex: 10,
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});
