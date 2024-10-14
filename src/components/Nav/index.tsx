import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Navbar = ({ title, onBackPress, onMenuPress }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onBackPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={onMenuPress}>
      <Icon name="file" size={20} color="#fafafa" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    width: "100%",
    backgroundColor: "#6200EE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Navbar;
