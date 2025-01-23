import React, { useState } from "react";
import { Image, StyleSheet, View, Alert } from "react-native";

function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}></View>
      <View style={styles.deleteIcon}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    flex: 1,
  },
  closeIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
  },

  deleteIcon: {
    width: 50, // Fixed typo here
    height: 50, // Fixed typo here
    backgroundColor: "royalblue",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ViewImageScreen;
