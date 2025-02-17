import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface PricePredictionScreenParams {
  propertySize?: string;
  bedrooms?: string;
  bathrooms?: string;
  furnishing?: string;
  location?: string;
  city?: string;
  userType?: string;
}

const PricePredictionScreen: React.FC = () => {
  // Use the hook without a generic...
  const rawParams = useLocalSearchParams();

  // ...then cast to your interface
  const {
    propertySize = "N/A",
    bedrooms = "N/A",
    bathrooms = "N/A",
    furnishing = "N/A",
    location = "N/A",
    city = "N/A",
    userType = "N/A",
  } = rawParams as PricePredictionScreenParams;

  // Mock an estimated price for now
  const estimatedPrice = "₹ 8794";

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Price Predictor</Text>

      {/* Property Details */}
      <View style={styles.propertyDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Property Size:</Text>
          <Text style={styles.detailValue}>{propertySize}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bedrooms:</Text>
          <Text style={styles.detailValue}>{bedrooms}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bathrooms:</Text>
          <Text style={styles.detailValue}>{bathrooms}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Furnishing:</Text>
          <Text style={styles.detailValue}>{furnishing}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>City:</Text>
          <Text style={styles.detailValue}>{city}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>User Type:</Text>
          <Text style={styles.detailValue}>{userType}</Text>
        </View>
      </View>

      {/* Estimated Price */}
      <View style={styles.estimatedPriceContainer}>
        <Text style={styles.estimatedPriceLabel}>Estimated Price:</Text>
        <Text style={styles.estimatedPrice}>{estimatedPrice}</Text>
      </View>
    </View>
  );
};

export default PricePredictionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6FF",
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
  propertyDetails: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  detailValue: {
    fontSize: 16,
    color: "#503691",
  },
  estimatedPriceContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  estimatedPriceLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  estimatedPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#503691",
    marginTop: 10,
  },
});
