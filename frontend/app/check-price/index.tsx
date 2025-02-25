import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function CheckPriceScreen() {
  const router = useRouter();

  // Grab both city and locality from the query params
  const { city, locality } = useLocalSearchParams<{
    city?: string;
    locality?: string;
  }>();

  const [selectedUserType, setSelectedUserType] = useState("Owner");
  const [selectedBedrooms, setSelectedBedrooms] = useState<
    number | string | null
  >(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<
    number | string | null
  >(null);
  const [furnishing, setFurnishing] = useState<string | null>(null);
  const [propertySize, setPropertySize] = useState("");

  const toggleSelection = (
    value: number | string,
    setter: (val: any) => void,
    currentValue: any
  ) => {
    setter(currentValue === value ? null : value);
  };

  const handlePredictPrice = () => {
    // Navigate to the price prediction screen and pass data as query params
    router.push({
      pathname: "/(price-prediction)",
      params: {
        // Convert numbers to strings for query params
        propertySize,
        bedrooms: selectedBedrooms?.toString() ?? "",
        bathrooms: selectedBathrooms?.toString() ?? "",
        furnishing: furnishing ?? "",
        location: locality ?? "",
        city: city ?? "",
        userType: selectedUserType,
      },
    });

    // For debugging
    console.log({
      city,
      locality,
      selectedUserType,
      selectedBedrooms,
      selectedBathrooms,
      furnishing,
      propertySize,
    });
  };

  // Decide what to show in the screen title
  const screenTitle =
    locality && city
      ? `Check Price for ${locality}, ${city}`
      : city
      ? `Check Price for ${city}`
      : "Check Price";

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Text style={styles.screenTitle}>{screenTitle}</Text>

      {/* Owner / Tenant Toggle */}
      <View style={styles.toggleWrapper}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedUserType === "Owner" && styles.toggleButtonSelected,
          ]}
          onPress={() => setSelectedUserType("Owner")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              selectedUserType === "Owner" && styles.toggleButtonTextSelected,
            ]}
          >
            Owner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedUserType === "Tenant" && styles.toggleButtonSelected,
          ]}
          onPress={() => setSelectedUserType("Tenant")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              selectedUserType === "Tenant" && styles.toggleButtonTextSelected,
            ]}
          >
            Tenant
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bedrooms */}
      <Text style={styles.sectionLabel}>Bedrooms</Text>
      <View style={styles.optionsRow}>
        {[1, 2, 3, 4].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.optionButton,
              selectedBedrooms === num && styles.optionButtonSelected,
            ]}
            onPress={() =>
              toggleSelection(num, setSelectedBedrooms, selectedBedrooms)
            }
          >
            <Text
              style={[
                styles.optionButtonText,
                selectedBedrooms === num && styles.optionButtonTextSelected,
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator} />

      {/* Bathrooms */}
      <Text style={styles.sectionLabel}>Bathroom</Text>
      <View style={styles.optionsRow}>
        {[1, 2, 3].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.optionButton,
              selectedBathrooms === num && styles.optionButtonSelected,
            ]}
            onPress={() =>
              toggleSelection(num, setSelectedBathrooms, selectedBathrooms)
            }
          >
            <Text
              style={[
                styles.optionButtonText,
                selectedBathrooms === num && styles.optionButtonTextSelected,
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator} />

      {/* Furnishings */}
      <Text style={styles.sectionLabel}>Furnishings</Text>
      <View style={styles.optionsRow}>
        {["Furnished", "Semifurnished", "Unfurnished"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.optionButton,
              furnishing === type && styles.optionButtonSelected,
            ]}
            onPress={() => setFurnishing(type)}
          >
            <Text
              style={[
                styles.optionButtonText,
                furnishing === type && styles.optionButtonTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator} />

      {/* Property Size */}
      <Text style={styles.sectionLabel}>Property Size (sq.ft):</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter property size"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={propertySize}
        onChangeText={setPropertySize}
      />

      {/* Predict Price Button */}
      <TouchableOpacity
        style={styles.predictButton}
        onPress={handlePredictPrice}
      >
        <Text style={styles.predictButtonText}>Predict Price Range</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const PRIMARY_COLOR = "#503691";
const BORDER_COLOR = "#D9D9D9";
const BACKGROUND_COLOR = "#F9F6FF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  toggleWrapper: {
    flexDirection: "row",
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: "center",
    overflow: "hidden",
    marginBottom: 30,
  },
  toggleButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: BACKGROUND_COLOR,
  },
  toggleButtonSelected: {
    backgroundColor: PRIMARY_COLOR,
  },
  toggleButtonText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
  },
  toggleButtonTextSelected: {
    color: "#FFF",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  optionButtonText: {
    fontSize: 14,
    color: "#000",
  },
  optionButtonTextSelected: {
    color: "#FFF",
  },
  separator: {
    height: 1,
    backgroundColor: BORDER_COLOR,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000",
  },
  predictButton: {
    marginTop: 20,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 30,
  },
  predictButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
