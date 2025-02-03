from django.http import JsonResponse
from .helpers.model_loader import xgb_model, preprocessor
import pandas as pd
from django.views.decorators.csrf import ensure_csrf_cookie
import json

categorical_columns = ['seller_type', 'layout_type', 'property_type', 'furnish_type']
numerical_columns = ['bedroom', 'area', 'bathroom', 'MinPrice', 'MaxPrice', 'AvgRent', 'price_per_sqft', 'locality_encoded', 'bedroom_area_interaction']
expected_columns = numerical_columns + categorical_columns

def infer_missing_fields(data):
    """Infer additional fields based on user input."""
    data["MinPrice"] = data["area"] * 15  # Example: Estimating min rent based on area
    data["MaxPrice"] = data["area"] * 25  # Example: Estimating max rent based on area
    data["AvgRent"] = (data["MinPrice"] + data["MaxPrice"]) / 2  # Calculate average rent
    data["price_per_sqft"] = data["AvgRent"] / data["area"]  # Price per square foot
    data["locality_encoded"] = data["AvgRent"]  # Using average rent as locality encoding
    data["bedroom_area_interaction"] = data["bedroom"] * data["area"]  # Interaction term
    return data

def predict_rent(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data
            data = json.loads(request.body.decode("utf-8"))

            # Ensure all required user inputs are present
            required_fields = ["locality", "area", "bedroom", "furnish_type", "seller_type", "layout_type", "property_type", "bathroom"]
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return JsonResponse({"error": f"Missing required fields: {missing_fields}"}, status=400)

            # Convert numerical fields to proper types
            data["area"] = float(data["area"])
            data["bedroom"] = int(data["bedroom"])
            data["bathroom"] = int(data["bathroom"])

            # Infer missing fields
            data = infer_missing_fields(data)

            # Create a DataFrame
            df = pd.DataFrame([data])

            # Ensure all expected columns are present
            for col in expected_columns:
                if col not in df.columns:
                    df[col] = None  # Add missing columns with default values

            # Transform input data
            df_preprocessed = preprocessor.transform(df)

            # Make predictions
            prediction = xgb_model.predict(df_preprocessed)
            predicted_rent = float(prediction[0])  # Convert to Python float

            # Return the predicted rent
            return JsonResponse({"predicted_rent": predicted_rent}, status=200)
        except Exception as e:
            return JsonResponse({"error": f"Failed to process input: {str(e)}"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)



@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"message": "CSRF cookie set!"})
