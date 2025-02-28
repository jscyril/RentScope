import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, usePathname, useSegments } from "expo-router";
import { auth } from "@/constants/firebase";
import { onAuthStateChanged } from "firebase/auth";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const WelcomeScreen = () => {
  const pathname = usePathname();
  const segments = useSegments();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("Current Route:", pathname, "\nCurrent Segment:", segments);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/(home)");
      } else {
        router.replace("/(login)");
      }
      setLoading(false);
      SplashScreen.hideAsync();
    });

    return () => unsubscribe();
  }, []);

  return loading ? null : (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to RentScope</Text>
      <Text style={styles.descriptionText}>
        Find the best rental properties in your city with accurate price
        predictions and hassle-free searches.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(signup)")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.push("/(login)")}
        >
          <Text style={styles.buttonOutlineText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F6FF",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#503591",
    marginBottom: 10,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    color: "#503591",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#503591",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    width: "80%",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#503591",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonOutlineText: {
    color: "#503591",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default WelcomeScreen;
