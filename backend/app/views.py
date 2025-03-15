from django.http import JsonResponse
from .helpers.model_loader import xgb_model, preprocessor
import pandas as pd
import numpy as np
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from .models import Prediction
import logging

logger = logging.getLogger(__name__)

# Expected columns (same as used during training)
categorical_columns = ['seller_type', 'layout_type', 'property_type', 'furnish_type']
numerical_columns = [
    'bedroom', 'area', 'bathroom', 'MinPrice', 'MaxPrice', 'AvgRent',
    'price_per_sqft', 'log_price_per_sqft', 'locality_encoded', 'bedroom_area_interaction'
]
expected_columns = numerical_columns + categorical_columns

def infer_missing_fields(data):
    """
    Compute additional fields required for the model.
    Adjust these computations to match your training pipeline.
    """
    try:
        area = float(data.get("area", 0))
        bedroom = int(data.get("bedroom", 0))
    except Exception as e:
        raise ValueError(f"Error in type conversion in infer_missing_fields: {e}")
    
    # Example calculations
    data["MinPrice"] = area * 15  
    data["MaxPrice"] = area * 25  
    data["AvgRent"] = (data["MinPrice"] + data["MaxPrice"]) / 2  
    data["price_per_sqft"] = data["AvgRent"] / area if area else 0  
    # Compute log_price_per_sqft using a small constant to avoid log(0)
    data["log_price_per_sqft"] = np.log(data["price_per_sqft"] + 1)
    # Use AvgRent as a simple encoding for locality (example logic)
    data["locality_encoded"] = data["AvgRent"]  
    data["bedroom_area_interaction"] = bedroom * area  
    return data

def predict_rent(request):
    if request.method == 'POST':
        try:
            # Decode and parse JSON input
            body_unicode = request.body.decode("utf-8")
            data = json.loads(body_unicode)
            logger.debug(f"Received data: {data}")
            
            # Check required fields
            required_fields = [
                "locality", "area", "bedroom", "furnish_type",
                "seller_type", "layout_type", "property_type", "bathroom"
            ]
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return JsonResponse({"error": f"Missing required fields: {missing_fields}"}, status=400)

            # Convert numeric fields
            try:
                data["area"] = float(data["area"])
                data["bedroom"] = int(data["bedroom"])
                data["bathroom"] = int(data["bathroom"])
            except Exception as conv_err:
                return JsonResponse({"error": f"Conversion error: {str(conv_err)}"}, status=400)
            
            # Compute additional features
            data = infer_missing_fields(data)
            
            # Create DataFrame from the input dictionary
            df = pd.DataFrame([data])
            # Ensure all expected columns exist (fill with 0 if missing)
            for col in expected_columns:
                if col not in df.columns:
                    df[col] = 0
            
            # Drop extra columns so that only expected_columns remain
            df = df[expected_columns]
            logger.debug(f"DataFrame before preprocessing:\n{df.head()}\n{df.dtypes}")
            
            # Apply the preprocessor
            try:
                df_preprocessed = preprocessor.transform(df)
            except Exception as e:
                error_msg = (
                    f"Preprocessing error: {str(e)}. "
                    f"DataFrame columns: {list(df.columns)}, "
                    f"dtypes: {df.dtypes.to_dict()}"
                )
                logger.error(error_msg)
                return JsonResponse({"error": error_msg}, status=400)
            
            # Predict using the XGBoost model
            prediction = xgb_model.predict(df_preprocessed)
            predicted_rent = float(prediction[0])
            
            # Save prediction to the database
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
            logger.exception("Error processing request")
            return JsonResponse({"error": f"Failed to process input: {str(e)}"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

def get_predictions(request):
    if request.method == "GET":
        predictions = Prediction.objects.all().order_by("-created_at")[:10]
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

from django.views.decorators.csrf import ensure_csrf_cookie
@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"message": "CSRF cookie set!"})
