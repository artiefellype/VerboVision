import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Button,
  Image,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import Navbar from "../components/Nav";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Home({ navigation }: any) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [capturedImg, setCapturedImg] = useState(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

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
        const data = await cameraRef.current.takePictureAsync(options);
        console.log(data);
        setCapturedImg(data.uri);
        navigation.navigate("ReadImage", {
          imgUri: data.base64,
          img: data.uri,
        });
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while taking the picture.");
      }
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Navbar
        title="VerboVision"
        onBackPress={() => {}}
        onMenuPress={() => navigation.navigate("History")}
      />

      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View></View>
        </CameraView>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={takePicture}>
          <Text style={styles.buttonText}>
            <Icon name="camera" size={30} color="#fafafa" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={toggleCameraFacing}
        >
          <Text style={styles.buttonText}>
            <Icon name="repeat" size={30} color="#fafafa" />
          </Text>
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
    flex: 8,
    width: 340,
    borderRadius: 30, // Bordas arredondadas
    overflow: "hidden",
  },
  cameraContainer: {
    flex: 8,
    marginTop: 20,
    borderRadius: 30, // Bordas arredondadas
    padding: 20,// Bordas arredondadas
    backgroundColor: "#F4EEEE",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 30,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
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
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});
