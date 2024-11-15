import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import Navbar from "../components/Nav";
import { HistoryList } from "../components/HistoryList";

export default function History({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Navbar
        title="VerboVision"
        onBackPress={() => navigation.navigate("Home")}
        onMenuPress={() => {}}
      />
      <HistoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerItems: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
