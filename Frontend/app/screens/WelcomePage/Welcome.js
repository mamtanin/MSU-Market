import React from "react";
import {
  Alert,
  Image,
  Button,
  ImageBackground,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from './WelcomeStyles';

function WelcomeScreen(props) {
  return (
    <LinearGradient
      style={styles.background}
      colors={["#18453B", "#115740", "#0C2340"]}
    //   source={require("../../assets/hoodie.png")}
    >
      {" "}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} />
        <Text>jnjn</Text>
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
    </LinearGradient>
  );
}
export default WelcomeScreen;