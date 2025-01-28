from django.http import JsonResponse
from .helpers.model_loader import xgb_model, preprocessor
from django.views.decorators.csrf import ensure_csrf_cookie
import pandas as pd


categorical_columns = ['seller_type', 'layout_type', 'property_type', 'furnish_type']
numerical_columns = ['bedroom', 'area', 'bathroom', 'MinPrice', 'MaxPrice', 'AvgRent', 'price_per_sqft', 'locality_encoded', 'bedroom_area_interaction']

expected_columns = numerical_columns + categorical_columns

def predict_rent(request):
    if request.method == 'POST':
        # Parse the input JSON data
        data = request.POST.dict()  # Or use `request.body` for raw JSON
        try:
            df = pd.DataFrame([data])

            # Ensure all expected columns are present
            for col in expected_columns:
                if col not in df.columns:
                    df[col] = None  # Add missing columns with default values

            # Transform the input data
            df_preprocessed = preprocessor.transform(df)

            # Make predictions
            prediction = xgb_model.predict(df_preprocessed)
            predicted_rent = float(prediction[0])  # Convert to Python float
            return JsonResponse({'predicted_rent': predicted_rent}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Failed to process input: {str(e)}'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"message": "CSRF cookie set!"})
