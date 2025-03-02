import React from "react";
import {
  Alert,
  Image,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/hoodie.png")}
    >
      {" "}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/hoodie.png")} />
        <Text> Sell what you dont need </Text>
        <Button
          color="blue"
          title="Click me"
          onPress={() =>
            Alert.alert("title", "description", [
              { text: "yes", onPress: () => console.log("yes") },
              { text: "no", onPress: () => console.log("no") },
            ])
          }
        />
      </View>
      <View style={styles.loginButton}></View>
      <View style={styles.registerButton}></View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#fc5c65",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#4ecdc4",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});
export default WelcomeScreen;
