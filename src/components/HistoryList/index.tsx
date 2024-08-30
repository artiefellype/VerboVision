import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

export const HistoryList = () => {
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
  return (
    <View style={styles.containerFlat}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    width: 320,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f9c2ff",
  },
  title: {
    fontSize: 18,
  },
});

