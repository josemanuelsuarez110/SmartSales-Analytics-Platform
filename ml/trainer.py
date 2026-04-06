import pandas as pd
import numpy as np
import sqlite3
import joblib
import os
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score

def train_models():
    print("🧠 Starting ML Training Hub...")
    db_path = "aibi_platform.db"
    if not os.path.exists(db_path):
        print(f"❌ Database {db_path} not found. Run scripts/seed_data.py first.")
        return

    conn = sqlite3.connect(db_path)
    
    # 1. Sales Prediction (Regression)
    print("📈 Training Sales Forecast Model...")
    df_sales = pd.read_sql("SELECT amount, date FROM sales", conn)
    df_sales['date_numeric'] = pd.to_datetime(df_sales['date']).map(pd.Timestamp.toordinal)
    
    X = df_sales[['date_numeric']]
    y = df_sales['amount']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    sales_model = LinearRegression()
    sales_model.fit(X_train, y_train)
    
    rmse = np.sqrt(mean_squared_error(y_test, sales_model.predict(X_test)))
    print(f"✅ Sales RMSE: {rmse:.2f}")
    joblib.dump(sales_model, "backend/models/sales_model.pkl")

    # 2. Churn Prediction (Logistic Regression)
    print("👥 Training Retention/Churn Classifier...")
    df_churn = pd.read_sql("SELECT years, salary, churn FROM employees", conn)
    
    X_c = df_churn[['years', 'salary']]
    y_c = df_churn['churn']
    
    Xc_train, Xc_test, yc_train, yc_test = train_test_split(X_c, y_c, test_size=0.2, random_state=42)
    churn_model = LogisticRegression()
    churn_model.fit(Xc_train, yc_train)
    
    acc = accuracy_score(yc_test, churn_model.predict(Xc_test))
    print(f"✅ Churn Accuracy: {acc*100:.2f}%")
    joblib.dump(churn_model, "backend/models/churn_model.pkl")

    # 3. Customer Segmentation (Clustering)
    print("🧩 Generating Customer Segments...")
    # Using sales frequency and amount as segmentation features
    df_seg = pd.read_sql("SELECT amount FROM sales", conn)
    # Simulate a second feature (e.g. visit frequency)
    df_seg['freq'] = np.random.randint(1, 40, size=len(df_seg))
    
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    kmeans.fit(df_seg)
    
    print(f"✅ Generated {kmeans.n_clusters} clusters.")
    joblib.dump(kmeans, "backend/models/segmentation_model.pkl")

    conn.close()
    print("🏁 All models persisted successfully in backend/models/")

if __name__ == "__main__":
    train_models()
