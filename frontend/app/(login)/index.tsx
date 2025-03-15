import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/constants/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      router.push("/(location)"); // Redirect to the main app
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  useEffect(() => {
    const backAction = () => {
      router.back(); // Navigate to the Welcome screen
      return true; // Prevent default back button behavior (quitting the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup the event listener
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to Rentscope</Text>

      <TextInput
        style={styles.input}
        placeholder="Email id*"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password*"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
        />

        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.toggleText}>{secureTextEntry ? "👁️" : "🙈"}</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Do not have an account?{" "}
        <Text
          style={styles.signUpLink}
          onPress={() => router.push("/(signup)")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#503591",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  toggleText: {
    fontSize: 16,
    color: "#888",
  },
  errorText: {
    color: "#FF4D4D",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#503591",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "#888",
  },
  signUpLink: {
    color: "#503591",
    fontWeight: "bold",
  },
});
