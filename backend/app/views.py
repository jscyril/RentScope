from django.http import JsonResponse
from .helpers.model_loader import xgb_model, preprocessor
import pandas as pd
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from .models import Prediction
from django.core.serializers import serialize


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
            data = json.loads(request.body.decode("utf-8"))

            required_fields = ["locality", "area", "bedroom", "furnish_type", "seller_type", "layout_type", "property_type", "bathroom"]
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return JsonResponse({"error": f"Missing required fields: {missing_fields}"}, status=400)

            data["area"] = float(data["area"])
            data["bedroom"] = int(data["bedroom"])
            data["bathroom"] = int(data["bathroom"])

            data = infer_missing_fields(data)
            df = pd.DataFrame([data])

            for col in expected_columns:
                if col not in df.columns:
                    df[col] = None 

            df_preprocessed = preprocessor.transform(df)
            prediction = xgb_model.predict(df_preprocessed)
            predicted_rent = float(prediction[0])  

            # Save to database
            Prediction.objects.create(
                locality=data["locality"],
                area=data["area"],
                bedroom=data["bedroom"],
                bathroom=data["bathroom"],
                furnish_type=data["furnish_type"],
                seller_type=data["seller_type"],
                layout_type=data["layout_type"],
                property_type=data["property_type"],
                predicted_rent=predicted_rent
            )

            return JsonResponse({"predicted_rent": predicted_rent}, status=200)
        except Exception as e:
            return JsonResponse({"error": f"Failed to process input: {str(e)}"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


def get_predictions(request):
    if request.method == "GET":
        predictions = Prediction.objects.all().order_by("-created_at")[:10]  # Get last 10 predictions
        data = [
            {
                "id": pred.id,
                "locality": pred.locality,
                "area": pred.area,
                "bedroom": pred.bedroom,
                "bathroom": pred.bathroom,
                "furnish_type": pred.furnish_type,
                "seller_type": pred.seller_type,
                "layout_type": pred.layout_type,
                "property_type": pred.property_type,
                "predicted_rent": pred.predicted_rent,
                "created_at": pred.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for pred in predictions
        ]
        return JsonResponse({"predictions": data}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"message": "CSRF cookie set!"})
