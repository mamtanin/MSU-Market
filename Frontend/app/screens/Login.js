import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Dynamic logo size
  const screenWidth = Dimensions.get("window").width;
  const logoSize = screenWidth * 0.4;

  const validateInput = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;

    setIsLoading(true);

    try {
      const endpoint = isSignUp ? "signup" : "login";
      const response = await fetch(`http://127.0.0.1:5001/${endpoint}`, {
        // Replace with your IP
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignUp) {
          Alert.alert(
            "Success",
            "Account created successfully! Please log in."
          );
          setIsSignUp(false);
        } else {
          navigation.navigate("Welcome");
        }
      } else {
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (err) {
      Alert.alert(
        "Error",
        "Unable to connect to the server. Please check your internet connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#18453B", "#115740", "#0C2340"]}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={[styles.logo, { width: logoSize, height: logoSize }]}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            {isSignUp ? "Create Account" : "Spartan Login"}
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#ffffff90"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#ffffff90"
          />
        </View>

        {/* Forgot Password - Only show on login */}
        {!isSignUp && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading
              ? isSignUp
                ? "Creating Account..."
                : "Logging in..."
              : isSignUp
              ? "Create Account"
              : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Toggle Sign Up/Login */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
          </Text>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.signUpLink}>
              {isSignUp ? "Log In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  loginButtonDisabled: {
    opacity: 0.7,
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

export default Login;
