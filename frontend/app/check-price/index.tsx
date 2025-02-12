import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Slider from "@react-native-community/slider";

export default function CheckPriceScreen() {
  const router = useRouter();
  const { city } = useLocalSearchParams();
  const [selectedUserType, setSelectedUserType] = useState("Owner");
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | null>(
    null
  );
  const [furnishing, setFurnishing] = useState<string | null>(null);
  const [propertySize, setPropertySize] = useState<[number, number]>([
    500, 5000,
  ]); // Min-Max range
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleSelection = (
    value: number | string,
    setter: (val: any) => void,
    state: any
  ) => {
    setter(state === value ? null : value);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Check Price {city ? `for ${city}` : ""}</Text>

      {/* User Type Toggle */}
      <View style={styles.toggleContainer}>
        {["Owner", "Tenant"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.toggleButton,
              selectedUserType === type && styles.toggleButtonSelected,
            ]}
            onPress={() => setSelectedUserType(type)}
          >
            <Text
              style={[
                styles.toggleText,
                selectedUserType === type && styles.toggleTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bedrooms Selection */}
      <Text style={styles.sectionTitle}>Bedrooms</Text>
      <View style={styles.selectionContainer}>
        {[1, 2, 3, 4, 5, 6, "7+"].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.selectionButton,
              selectedBedrooms === num && styles.selectionButtonSelected,
            ]}
            onPress={() =>
              toggleSelection(num, setSelectedBedrooms, selectedBedrooms)
            }
          >
            <Text style={styles.selectionText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bathrooms Selection */}
      <Text style={styles.sectionTitle}>Bathroom</Text>
      <View style={styles.selectionContainer}>
        {[1, 2, 3, 4, 5, 6, "7+"].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.selectionButton,
              selectedBathrooms === num && styles.selectionButtonSelected,
            ]}
            onPress={() =>
              toggleSelection(num, setSelectedBathrooms, selectedBathrooms)
            }
          >
            <Text style={styles.selectionText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Furnishing Selection */}
      <Text style={styles.sectionTitle}>Furnishings</Text>
      <View style={styles.toggleContainer}>
        {["Furnished", "Unfurnished"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.toggleButton,
              furnishing === type && styles.toggleButtonSelected,
            ]}
            onPress={() => setFurnishing(type)}
          >
            <Text
              style={[
                styles.toggleText,
                furnishing === type && styles.toggleTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Property Size Slider */}
      <Text style={styles.sectionTitle}>Property Size (sq.ft)</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderValue}>Min.</Text>
        <Slider
          style={styles.slider}
          minimumValue={500}
          maximumValue={5000}
          step={100}
          value={propertySize[0]}
          onValueChange={(value) => setPropertySize([value, propertySize[1]])}
          minimumTrackTintColor="#503591"
          thumbTintColor="#503591"
        />
        <Text style={styles.sliderValue}>Max.</Text>
      </View>

      {/* Amenities Selection */}
      <Text style={styles.sectionTitle}>Amenities</Text>
      <View style={styles.amenitiesContainer}>
        {[
          "Balcony",
          "Central A/C",
          "Maids Room",
          "Private Pool",
          "Pets Allowed",
        ].map((amenity) => (
          <TouchableOpacity
            key={amenity}
            style={[
              styles.amenityButton,
              selectedAmenities.includes(amenity) &&
                styles.amenityButtonSelected,
            ]}
            onPress={() => toggleAmenity(amenity)}
          >
            <Text style={styles.amenityText}>{amenity}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Predict Price Button */}
      <TouchableOpacity style={styles.predictButton}>
        <Text style={styles.buttonText}>Predict Price Range</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#503591",
  },
  toggleButtonSelected: {
    backgroundColor: "#503591",
  },
  toggleText: {
    fontSize: 16,
    color: "#503591",
  },
  toggleTextSelected: {
    color: "#FFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#503591",
    marginBottom: 10,
  },
  selectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selectionButton: {
    width: "22%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#503591",
    marginBottom: 10,
  },
  selectionButtonSelected: {
    backgroundColor: "#503591",
  },
  selectionText: {
    fontSize: 16,
    color: "#503591",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderValue: {
    fontSize: 16,
    color: "#503591",
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  amenityButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#503591",
    marginBottom: 10,
  },
  amenityButtonSelected: {
    backgroundColor: "#503591",
  },
  amenityText: {
    fontSize: 16,
    color: "#503591",
  },
  predictButton: {
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
