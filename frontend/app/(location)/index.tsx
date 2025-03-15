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
import { signOut } from "firebase/auth";
import { auth } from "@/constants/firebase";
import localitiesData from "@/constants/localities.json";

type Locality = string;

export default function LocationScreen() {
  const router = useRouter();
  const localities: Locality[] = localitiesData.localities_list;

  const [locality, setLocality] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setLocality(text);
    if (text.length >= 2) {
      const filtered = localities
        .filter((loc) => loc.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleCheckPrice = () => {
    if (!locality) {
      Alert.alert("Please select a locality before checking price.");
      return;
    }
    router.push(
      `/(check-price)?city=Bangalore&locality=${encodeURIComponent(locality)}`
    );
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace("/(login)");
          } catch (error: any) {
            Alert.alert("Logout Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Rentscope</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Image
            source={require("@/assets/images/log_out.png")}
            style={styles.logoutIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar + Suggestions */}
      <View style={styles.searchBarContainer}>
        {/* The search bar itself */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search Locality"
            placeholderTextColor="#888"
            value={locality}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Text style={styles.searchIconText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown suggestions (conditionally rendered) */}
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => {
                  setLocality(item);
                  setSuggestions([]);
                }}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* City Container */}
      <View style={styles.cityContainer}>
        <TouchableOpacity style={styles.cityBox}>
          <Image
            source={require("@/assets/images/bangalore.png")}
            style={styles.cityIcon}
          />
          <Text style={styles.cityName}>Bangalore</Text>
        </TouchableOpacity>
      </View>

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

  /* Header */
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    textAlign: "center",
  },
  logoutButton: {
    padding: 8,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    tintColor: PRIMARY_COLOR,
  },

  /* Search Bar */
  // 1) A parent container with position: "relative" so we can absolutely position suggestions
  searchBarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  // 2) The actual search bar row
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    // If you want the search bar to have a fixed height, you can set it here
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  searchIcon: {
    paddingHorizontal: 8,
  },
  searchIconText: {
    fontSize: 18,
    color: "#888",
  },

  /* Suggestions Dropdown */
  // 3) Absolutely position suggestions below the bar
  suggestionsContainer: {
    position: "absolute",
    top: "100%", // This places it directly under the search bar
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderTopWidth: 0, // Avoid a double border
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
    overflow: "hidden",
    zIndex: 9999, // So it appears above other elements
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  suggestionText: {
    fontSize: 16,
    color: "#000",
  },

  /* City Container */
  cityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  cityBox: {
    alignItems: "center",
    marginBottom: 20,
    width: "45%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cityIcon: {
    width: 250,
    height: 250,
    marginBottom: 10,
    resizeMode: "contain",
  },
  cityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    textAlign: "center",
  },

  /* Check Price Button */
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
