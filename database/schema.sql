-- SmartSales Analytics - Database Schema
-- Optimized for Analytical Queries (Star Schema)

-- 1. Dimensions
CREATE TABLE IF NOT EXISTS dim_products (
    product_id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    base_price DECIMAL(12, 2) NOT NULL,
    cost_price DECIMAL(12, 2) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dim_customers (
    customer_id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    segment VARCHAR(50), -- B2B, B2C, Enterprise
    region VARCHAR(100),
    country VARCHAR(100),
    acquisition_date DATE DEFAULT CURRENT_DATE,
    loyalty_tier VARCHAR(20) DEFAULT 'Bronze'
);

CREATE TABLE IF NOT EXISTS dim_employees (
    employee_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(100),
    department VARCHAR(100),
    work_office VARCHAR(100),
    salary_annual DECIMAL(12, 2),
    hire_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Active', -- Active, Inactive, On Leave
    manager_id INT REFERENCES dim_employees(employee_id)
);

CREATE TABLE IF NOT EXISTS dim_offices (
    office_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    region VARCHAR(100),
    avg_operating_cost DECIMAL(12, 2)
);

-- 2. Facts
CREATE TABLE IF NOT EXISTS fact_sales (
    sale_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES dim_products(product_id),
    customer_id INT REFERENCES dim_customers(customer_id),
    employee_id INT REFERENCES dim_employees(employee_id),
    office_id INT REFERENCES dim_offices(office_id),
    sale_date TIMESTAMP WITH TIME ZONE NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    discount_amount DECIMAL(12, 2) DEFAULT 0,
    total_revenue DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * unit_price - discount_amount) STORED,
    tax_amount DECIMAL(12, 2) NOT NULL,
    net_profit DECIMAL(12, 2)
);

CREATE TABLE IF NOT EXISTS fact_hr_metrics (
    metric_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES dim_employees(employee_id),
    date_id DATE NOT NULL,
    performance_score DECIMAL(3, 2), -- 0.0 to 5.0
    absenteeism_hours INT DEFAULT 0,
    training_hours DECIMAL(4, 1) DEFAULT 0,
    overtime_hours DECIMAL(4, 1) DEFAULT 0,
    projects_completed INT DEFAULT 0
);

-- Indexes for performance
CREATE INDEX idx_sales_date ON fact_sales(sale_date);
CREATE INDEX idx_sales_product ON fact_sales(product_id);
CREATE INDEX idx_sales_customer ON fact_sales(customer_id);
CREATE INDEX idx_hr_employee ON fact_hr_metrics(employee_id);
CREATE INDEX idx_hr_date ON fact_hr_metrics(date_id);
