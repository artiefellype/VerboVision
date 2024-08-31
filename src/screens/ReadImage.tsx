import React from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import Navbar from "../components/Nav";

export default function ReadImage({ route, navigation }: any) {
  const { imgUri } = route.params;

  return (
    <View style={styles.container}>
      <Navbar
        title="VerboVision"
        onBackPress={() => navigation.navigate("Home")}
        onMenuPress={() => navigation.navigate("History")}
      />
      <View style={styles.contentContainer}>
        <Image source={{ uri: imgUri }} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Se o picapau tivesse comunicado a policia a gente nao estaria fazendo esse trabalho</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>HOME</Text>
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
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
  },
  photo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  button: {
    position: 'absolute',
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
  }
});
