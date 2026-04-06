import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import sqlite3
import os
import hashlib

def get_password_hash(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_saas_data(num_sales=1000, num_employees=50):
    np.random.seed(42)
    
    # 1. Sales Data
    products = ['Cloud Analytics', 'Data Flow PRO', 'AI Modeler', 'Business Core']
    sales_data = []
    start_date = datetime.now() - timedelta(days=365)
    
    for i in range(num_sales):
        date = start_date + timedelta(days=np.random.randint(0, 365))
        product = np.random.choice(products)
        amount = np.random.randint(100, 2000)
        if date > datetime.now() - timedelta(days=90):
            amount *= 1.2
            
        sales_data.append({
            'product': product,
            'amount': amount,
            'date': date.strftime('%Y-%m-%d')
        })
        
    df_sales = pd.DataFrame(sales_data)
    
    # 2. Employee Data (for Churn/Retention)
    employee_data = []
    for i in range(num_employees):
        years = np.random.randint(1, 15)
        salary = np.random.randint(40000, 120000)
        churn_risk = 1 if (years > 5 and salary < 70000) else 0
        if np.random.random() < 0.1: churn_risk = 1 
        
        employee_data.append({
            'years': years,
            'salary': salary,
            'churn': churn_risk
        })
    df_employees = pd.DataFrame(employee_data)
    
    # 3. User Data
    admin_password = get_password_hash("admin123")
    user_data = [
        {'email': 'admin@aibi.com', 'password': admin_password}
    ]
    df_users = pd.DataFrame(user_data)
    
    return df_sales, df_employees, df_users

def seed_database():
    print("🚀 Generating SaaS synthetic data...")
    df_sales, df_employees, df_users = generate_saas_data()
    
    # Relative to CWD
    db_path = "aibi_platform.db"
    
    conn = sqlite3.connect(db_path)
    
    print(f"💾 Saving to database at {db_path}...")
    df_sales.to_sql('sales', conn, if_exists='replace', index=False)
    df_employees.to_sql('employees', conn, if_exists='replace', index=False)
    df_users.to_sql('users', conn, if_exists='replace', index=False)
    
    conn.close()
    print(f"✅ Data injection successful!")

if __name__ == "__main__":
    seed_database()
