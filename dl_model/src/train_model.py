import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import os
import numpy as np

# Load the dataset
data_path = os.path.join("..", "data", "Bangalore_rent.csv")
data = pd.read_csv(data_path)

# Preprocessing
data['price'] = data['price'].str.replace(',', '').astype(float)
data['bathroom'] = data['bathroom'].str.extract('(\d+)').astype(float)
data['bathroom'] = data['bathroom'].fillna(data['bathroom'].median())

X = data.drop(columns=['price'])
y = data['price']

# Identify categorical and numerical columns
categorical_columns = ['seller_type', 'layout_type', 'property_type', 'locality', 'furnish_type']
numerical_columns = ['bedroom', 'area', 'bathroom']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_columns),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_columns)
    ]
)

X_preprocessed = preprocessor.fit_transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_preprocessed, y, test_size=0.2, random_state=42)

# Build the model
model = Sequential([
    Dense(128, activation='relu', input_dim=X_train.shape[1]),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(32, activation='relu'),
    Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train the model
model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=20, batch_size=32)

# Evaluate the model
test_loss, test_mae = model.evaluate(X_test, y_test)
print(f"Test Loss (MSE): {test_loss}")
print(f"Test MAE: {test_mae}")

# Calculate additional metrics
predictions = model.predict(X_test)
rmse = np.sqrt(np.mean((predictions - y_test.values.reshape(-1, 1)) ** 2))
ss_total = np.sum((y_test - np.mean(y_test)) ** 2)
ss_residual = np.sum((y_test.values.reshape(-1, 1) - predictions) ** 2)
r_squared = 1 - (ss_residual / ss_total)

print(f"RMSE: {rmse}")
print(f"R-squared: {r_squared}")

# Save the model
model_save_path = os.path.join("..", "models", "rentscope_model.h5")
model.save(model_save_path)
print(f"Model saved to {model_save_path}")
