from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .analytics_engine import AnalyticsEngine
from .ml_forecaster import MLForecaster
import os

app = FastAPI(title="SmartSales Analytics API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "SmartSales Analytics Platform API is running", "status": "ok"}

@app.get("/api/v1/sales/overview")
def get_sales_overview():
    return AnalyticsEngine.get_sales_kpis()

@app.get("/api/v1/sales/history")
def get_sales_history():
    return AnalyticsEngine.get_revenue_by_month()

@app.get("/api/v1/sales/top-products")
def get_top_products():
    return AnalyticsEngine.get_top_products()

@app.get("/api/v1/hr/overview")
def get_hr_overview():
    return AnalyticsEngine.get_hr_metrics()

@app.get("/api/v1/predict/sales")
def predict_sales(days: int = 30):
    return MLForecaster.forecast_sales(days=days)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
