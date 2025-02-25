import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface PricePredictionScreenParams {
  propertySize?: string;
  bedrooms?: string;
  bathrooms?: string;
  furnishing?: string;
  location?: string;
  city?: string;
  userType?: string;
  layoutType?: string;
  propertyType?: string;
}

const PricePredictionScreen: React.FC = () => {
  const rawParams = useLocalSearchParams();
  const {
    propertySize = "N/A",
    bedrooms = "N/A",
    bathrooms = "N/A",
    furnishing = "N/A",
    location = "N/A",
    city = "N/A",
    userType = "N/A",
    layoutType = "default_layout",
    propertyType = "default_type",
  } = rawParams as PricePredictionScreenParams;

  const [predictedRent, setPredictedRent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const NGROK_URL = "https://prompt-friendly-longhorn.ngrok-free.app";

        const response = await fetch(`${NGROK_URL}/api/predict_rent/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locality: location,
            area: propertySize,
            bedroom: bedrooms,
            bathroom: bathrooms,
            furnish_type: furnishing,
            seller_type: userType,
            layout_type: "default_layout",
            property_type: "default_type",
          }),
        });


        const data = await response.json();
        if (response.ok && data.predicted_rent !== undefined) {
          setPredictedRent(`₹ ${data.predicted_rent.toFixed(2)}`);
        } else {
          setError(data.error || "Failed to fetch prediction.");
        }
      } catch (error) {
        setError("Network Error: Unable to connect to server.");
      }
      setLoading(false);
    };

    fetchPrediction();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Price Predictor</Text>

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
        {loading ? (
          <ActivityIndicator size="large" color="#503691" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.estimatedPrice}>{predictedRent}</Text>
        )}
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
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
});
