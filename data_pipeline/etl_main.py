import pandas as pd
import numpy as np
from sqlalchemy import create_engine
import os
import requests

# Mock DB Connection
DB_URL = os.getenv("DATABASE_URL", "sqlite:///./smartsales.db")
engine = create_engine(DB_URL)

def run_etl():
    print("🚀 Starting ETL Pipeline...")
    
    # 1. Extraction (Simulated Open Data & DB)
    print("Extracting Sales data from DB...")
    df_sales = pd.read_sql("SELECT * FROM fact_sales", engine)
    
    # Simulate Open Data API fetch for Market Trends
    print("Fetching Market Trends (External Data)...")
    market_data = {
        "date": pd.date_range(start='2025-01-01', periods=12, freq='ME'),
        "market_index": np.random.uniform(100, 150, 12),
        "competitor_avg_price": np.random.uniform(500, 1000, 12)
    }
    df_market = pd.DataFrame(market_data)
    
    # 2. Transformation
    print("Transforming and Enriching data...")
    # Convert dates for merging
    df_sales['sale_month'] = pd.to_datetime(df_sales['sale_date']).dt.to_period('M')
    df_market['month'] = df_market['date'].dt.to_period('M')
    
    # Aggregate sales by month
    monthly_sales = df_sales.groupby('sale_month')['total_revenue'].sum().reset_index()
    monthly_sales.columns = ['month', 'revenue']
    
    # Merge with Market Data to find correlation
    enriched_data = pd.merge(monthly_sales, df_market, on='month')
    
    # Calculate Correlation (Insight)
    correlation = enriched_data['revenue'].corr(enriched_data['market_index'])
    print(f"✅ Data enriched. Market Correlation: {correlation:.2f}")

    # 3. Load
    print("Loading enriched insights back to database...")
    enriched_data['month'] = enriched_data['month'].astype(str)
    enriched_data.to_sql('fact_market_insights', engine, if_exists='replace', index=False)
    
    print("🏁 ETL Pipeline completed successfully.")

if __name__ == "__main__":
    run_etl()
