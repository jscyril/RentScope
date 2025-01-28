import os
import joblib

# Paths to the saved model and preprocessor
MODEL_PATH = os.path.join("models", "rentscope_xgboost_model.pkl")
PREPROCESSOR_PATH = os.path.join("models", "preprocessor.pkl")

# Load the model
def load_model():
    return joblib.load(MODEL_PATH)

# Load the preprocessor
def load_preprocessor():
    return joblib.load(PREPROCESSOR_PATH)

xgb_model = load_model()
preprocessor = load_preprocessor()
