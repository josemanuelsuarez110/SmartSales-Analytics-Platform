from sqlalchemy import create_engine, text
import pandas as pd
import os

DB_URL = os.getenv("DATABASE_URL", "sqlite:///./smartsales.db")
engine = create_engine(DB_URL)

class AnalyticsEngine:
    @staticmethod
    def get_sales_kpis():
        query = """
        SELECT 
            SUM(total_revenue) as total_revenue,
            AVG(total_revenue) as avg_order_value,
            COUNT(sale_id) as total_orders,
            COUNT(DISTINCT customer_id) as unique_customers
        FROM fact_sales
        """
        with engine.connect() as conn:
            result = conn.execute(text(query)).fetchone()
            return dict(result._mapping)

    @staticmethod
    def get_revenue_by_month():
        query = """
        SELECT 
            strftime('%Y-%m', sale_date) as month,
            SUM(total_revenue) as revenue
        FROM fact_sales
        GROUP BY month
        ORDER BY month ASC
        """
        # Note: strftime is SQLite. For Postgres: TO_CHAR(sale_date, 'YYYY-MM')
        # We'll use a wrapper or generic SQL if possible
        df = pd.read_sql(query, engine)
        return df.to_dict(orient='records')

    @staticmethod
    def get_hr_metrics():
        query = """
        SELECT 
            AVG(performance_score) as avg_performance,
            SUM(training_hours) as total_training_hours,
            COUNT(DISTINCT employee_id) as total_headcount
        FROM fact_hr_metrics
        """
        with engine.connect() as conn:
            result = conn.execute(text(query)).fetchone()
            return dict(result._mapping)

    @staticmethod
    def get_top_products():
        query = """
        SELECT 
            p.name,
            p.category,
            SUM(s.quantity) as total_sold,
            SUM(s.total_revenue) as revenue
        FROM fact_sales s
        JOIN dim_products p ON s.product_id = p.product_id
        GROUP BY p.name, p.category
        ORDER BY revenue DESC
        LIMIT 5
        """
        df = pd.read_sql(query, engine)
        return df.to_dict(orient='records')
