import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
from datetime import datetime, timedelta
from sqlalchemy import create_engine
import os

DB_URL = os.getenv("DATABASE_URL", "sqlite:///./smartsales.db")
engine = create_engine(DB_URL)

class MLForecaster:
    @staticmethod
    def forecast_sales(days=30):
        # 1. Fetch historical sales data
        query = "SELECT sale_date, total_revenue FROM fact_sales"
        df = pd.read_sql(query, engine)
        df['sale_date'] = pd.to_datetime(df['sale_date'])
        
        # 2. Resample by day
        daily_sales = df.resample('D', on='sale_date')['total_revenue'].sum().reset_index()
        daily_sales['day_num'] = (daily_sales['sale_date'] - daily_sales['sale_date'].min()).dt.days
        
        # 3. Fit Linear Regression
        X = daily_sales[['day_num']]
        y = daily_sales['total_revenue']
        
        model = LinearRegression()
        model.fit(X, y)
        
        # 4. Predict future
        last_day = daily_sales['day_num'].max()
        future_days = np.array([[last_day + i] for i in range(1, days + 1)])
        predictions = model.predict(future_days)
        
        # 5. Build response
        forecast_dates = [daily_sales['sale_date'].max() + timedelta(days=i) for i in range(1, days + 1)]
        return [
            {"date": str(d.date()), "predicted_revenue": round(float(p), 2)}
            for d, p in zip(forecast_dates, predictions)
        ]
