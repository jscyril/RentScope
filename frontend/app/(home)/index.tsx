import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const navigateToCheckPrice = (city: string) => {
    router.push(`/check-price?city=${encodeURIComponent(city)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rentscope</Text>

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

      <View style={styles.cityContainer}>
        <TouchableOpacity
          style={styles.cityBox}
          onPress={() => navigateToCheckPrice("Bangalore")}
        >
          <Image
            source={require("@/assets/images/bangalore.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>Bangalore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cityBox}
          onPress={() => navigateToCheckPrice("Kolkata")}
        >
          <Image
            source={require("@/assets/images/kolkata.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>Kolkata</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cityBox}
          onPress={() => navigateToCheckPrice("New Delhi")}
        >
          <Image
            source={require("@/assets/images/delhi.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>New Delhi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cityBox}
          onPress={() => navigateToCheckPrice("Mumbai")}
        >
          <Image
            source={require("@/assets/images/mumbai.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>Mumbai</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.addressInput}
        placeholder="Address"
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={styles.checkPriceButton}
        // onPress={() => navigateToCheckPrice(null)}
      >
        <Text style={styles.buttonText}>Check Price</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#503591",
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
    color: "#503591",
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
    backgroundColor: "#503591",
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
