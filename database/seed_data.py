import random
import datetime
from sqlalchemy import create_engine, text
import pandas as pd
import os

# Configuration - Default to SQLite for local development if no DB_URL
DB_URL = os.getenv("DATABASE_URL", "sqlite:///./smartsales.db")
engine = create_engine(DB_URL)

def seed_database():
    print(f"Connecting to {DB_URL}...")
    
    # 1. Seed Dimensions
    products = [
        {"sku": f"PROD-{i:03}", "name": f"Enterprise Solution {chr(65+i)}", "category": "Software", "base_price": random.uniform(500, 5000), "cost_price": random.uniform(200, 1500)}
        for i in range(10)
    ] + [
        {"sku": f"HW-{i:03}", "name": f"Smart Hardware v{i}", "category": "Hardware", "base_price": random.uniform(100, 800), "cost_price": random.uniform(50, 400)}
        for i in range(10)
    ]
    
    customers = [
        {"full_name": f"Client {i}", "email": f"client{i}@example.com", "segment": random.choice(["B2B", "B2C", "Enterprise"]), "region": random.choice(["North", "South", "East", "West"]), "country": "USA"}
        for i in range(50)
    ]
    
    offices = [
        {"name": "HQ New York", "city": "New York", "region": "East", "avg_operating_cost": 50000},
        {"name": "SF Branch", "city": "San Francisco", "region": "West", "avg_operating_cost": 45000},
        {"name": "London Hub", "city": "London", "region": "EMEA", "avg_operating_cost": 48000}
    ]
    
    employees = [
        {"full_name": f"Employee {i}", "email": f"emp{i}@smartsales.ai", "role": random.choice(["Account Manager", "Sales Exec", "Engineer", "HR Specialist"]), "department": random.choice(["Sales", "Engineering", "HR"]), "hire_date": datetime.date(2023, 1, 1), "salary_annual": random.randint(50000, 120000)}
        for i in range(20)
    ]

    # Save Dimensions to DB
    pd.DataFrame(products).to_sql('dim_products', engine, if_exists='replace', index=False)
    pd.DataFrame(customers).to_sql('dim_customers', engine, if_exists='replace', index=False)
    pd.DataFrame(offices).to_sql('dim_offices', engine, if_exists='replace', index=False)
    pd.DataFrame(employees).to_sql('dim_employees', engine, if_exists='replace', index=False)
    
    # 2. Seed Facts (Sales)
    print("Generating 1000 sales records...")
    sales = []
    start_date = datetime.datetime(2025, 1, 1)
    for i in range(1000):
        sale_date = start_date + datetime.timedelta(days=random.randint(0, 365), hours=random.randint(0, 23))
        qty = random.randint(1, 5)
        u_price = random.uniform(100, 2000)
        disc_amt = u_price * 0.1 if random.random() > 0.8 else 0
        sales.append({
            "product_id": random.randint(1, 20),
            "customer_id": random.randint(1, 50),
            "employee_id": random.randint(1, 20),
            "office_id": random.randint(1, 3),
            "sale_date": sale_date,
            "quantity": qty,
            "unit_price": u_price,
            "discount_amount": disc_amt,
            "total_revenue": (qty * u_price) - disc_amt,
            "tax_amount": (qty * u_price) * 0.08,
            "net_profit": (qty * u_price) * 0.3
        })
    pd.DataFrame(sales).to_sql('fact_sales', engine, if_exists='replace', index=False)

    # 3. Seed Facts (HR Metrics)
    print("Generating HR metrics...")
    hr_metrics = []
    for emp_id in range(1, 21):
        for month in range(1, 13):
            hr_metrics.append({
                "employee_id": emp_id,
                "date_id": datetime.date(2025, month, 1),
                "performance_score": round(random.uniform(3.0, 5.0), 2),
                "absenteeism_hours": random.randint(0, 16),
                "training_hours": random.uniform(2, 10),
                "projects_completed": random.randint(1, 5)
            })
    pd.DataFrame(hr_metrics).to_sql('fact_hr_metrics', engine, if_exists='replace', index=False)
    
    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
