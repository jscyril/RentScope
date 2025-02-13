import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  // Track which city is selected (if any)
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  // Track the user-entered locality
  const [locality, setLocality] = useState("");

  const handleCitySelection = (cityName: string) => {
    // If the same city is tapped again, deselect it. Otherwise, select the new city.
    setSelectedCity((prev) => (prev === cityName ? null : cityName));
  };

  const handleCheckPrice = () => {
    if (!selectedCity) {
      // You could show an alert or simply navigate without a city
      Alert.alert("Please select a city before checking price.");
      return;
    }

    // Optionally pass the locality name as well if you want
    // e.g. ?city=Bangalore&locality=Whitefield
    router.push(
      `/check-price?city=${encodeURIComponent(
        selectedCity
      )}&locality=${encodeURIComponent(locality)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rentscope</Text>

      {/* Search bar (currently non-functional) */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search City"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* City Selection */}
      <View style={styles.cityContainer}>
        <TouchableOpacity
          style={[
            styles.cityBox,
            selectedCity === "Bangalore" && styles.cityBoxSelected,
          ]}
          onPress={() => handleCitySelection("Bangalore")}
        >
          <Image
            source={require("@/assets/images/bangalore.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>Bangalore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.cityBox,
            selectedCity === "Kolkata" && styles.cityBoxSelected,
          ]}
          onPress={() => handleCitySelection("Kolkata")}
        >
          <Image
            source={require("@/assets/images/kolkata.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>Kolkata</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.cityBox,
            selectedCity === "New Delhi" && styles.cityBoxSelected,
          ]}
          onPress={() => handleCitySelection("New Delhi")}
        >
          <Image
            source={require("@/assets/images/delhi.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>New Delhi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.cityBox,
            selectedCity === "Mumbai" && styles.cityBoxSelected,
          ]}
          onPress={() => handleCitySelection("Mumbai")}
        >
          <Image
            source={require("@/assets/images/mumbai.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>Mumbai</Text>
        </TouchableOpacity>
      </View>

      {/* Locality Name Input */}
      <TextInput
        style={styles.addressInput}
        placeholder="Locality Name"
        placeholderTextColor="#888"
        value={locality}
        onChangeText={setLocality}
      />

      {/* Check Price Button */}
      <TouchableOpacity
        style={styles.checkPriceButton}
        onPress={handleCheckPrice}
      >
        <Text style={styles.buttonText}>Check Price</Text>
      </TouchableOpacity>
    </View>
  );
}

const PRIMARY_COLOR = "#503591";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    textAlign: "center",
    marginBottom: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  searchIcon: {
    padding: 10,
  },
  searchIconText: {
    fontSize: 18,
    color: "#888",
  },
  cityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cityBox: {
    alignItems: "center",
    marginBottom: 20,
    width: "45%",
    padding: 10,
    borderRadius: 8,
    // No border by default
    borderWidth: 1,
    borderColor: "transparent",
  },
  cityBoxSelected: {
    // Highlight with a visible stroke when selected
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
  },
  cityIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  cityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    textAlign: "center",
  },
  addressInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    backgroundColor: "#FFF",
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  checkPriceButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
