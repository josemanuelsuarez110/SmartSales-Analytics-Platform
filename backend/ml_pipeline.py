import os
import joblib
import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.cluster import KMeans

# Directorio absoluto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "ml_models")

os.makedirs(MODELS_DIR, exist_ok=True)

print("Entrenando modelos de Machine Learning...")

# 1. Ventas (Regresión Lineal) 
# Input: día ordinal. Output: valor de venta
X_sales = np.array([[1], [2], [3], [4], [5]])
y_sales = np.array([100, 150, 200, 250, 300])
sales_model = LinearRegression().fit(X_sales, y_sales)
joblib.dump(sales_model, os.path.join(MODELS_DIR, "sales_model.pkl"))

# 2. Churn (Regresión Logística) 
# Input: [Gasto Anual, Puntuación Lealtad] -> Output: 1 (Churn), 0 (Rate)
X_churn = np.array([[5000, 8], [1000, 2], [7000, 9], [500, 1]])
y_churn = np.array([0, 1, 0, 1])
churn_model = LogisticRegression().fit(X_churn, y_churn)
joblib.dump(churn_model, os.path.join(MODELS_DIR, "churn_model.pkl"))

# 3. Segmentación (K-Means)
X_segment = np.array([[8000, 9], [6000, 8], [1000, 2], [1500, 3], [4000, 5]])
kmeans_model = KMeans(n_clusters=3, random_state=42, n_init=10).fit(X_segment)
joblib.dump(kmeans_model, os.path.join(MODELS_DIR, "kmeans_model.pkl"))

print(f"✅ Modelos guardados correctamente en: {MODELS_DIR}")
