import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    content: {
      paddingHorizontal: 24,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    logo: {
      borderRadius: 9999,
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#ffffff",
      textAlign: "center",
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      color: "#ffffff",
      marginBottom: 8,
    },
    input: {
      backgroundColor: "#ffffff20",
      color: "#ffffff",
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
    },
    forgotPassword: {
      alignSelf: "flex-end",
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: "#ffffff90",
      fontSize: 14,
    },
    loginButton: {
      backgroundColor: "#FFD700",
      paddingVertical: 14,
      borderRadius: 8,
      marginBottom: 16,
    },
    loginButtonText: {
      color: "#115740",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
    },
    signUpContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 16,
    },
    signUpText: {
      color: "#ffffff",
      fontSize: 14,
    },
    signUpLink: {
      color: "#FFD700",
      fontWeight: "bold",
      fontSize: 14,
    },
  });