# SmartSales Analytics Platform 🚀

**A Unified Full-Stack Data & Sales Intelligence Platform**

SmartSales is a high-performance analytics platform designed for modern enterprises. It bridges the gap between raw transactional data and executive decision-making by integrating an automated ETL pipeline, a star-schema data warehouse, and a premium interactive dashboard.

---

## 🏗️ Architecture & Engineering Stack

- **Frontend**: Next.js 14+ (React) with Dark Glassmorphism Design System.
- **Backend API**: Python (FastAPI) with Pydantic for high-performance data serving.
- **Data Engineering**: Python (Pandas) ETL pipeline for extraction, cleaning, and market data enrichment.
- **Database**: PostgreSQL (Star Schema) optimized with analytical indexing (B-Tree).
- **Machine Learning**: Scikit-learn Linear Regression for 30-day revenue forecasting.
- **Visuals**: Recharts for interactive analytics and dynamic KPI tracking.

---

## 📂 Project Structure

```bash
├── /frontend           # Next.js Application (Clean Architecture)
│   ├── /app            # Pages and Routing
│   ├── /components     # Reusable UI (KPIs, Charts, Sidebar)
│   └── globals.css     # Design Tokens & Styles
├── /backend            # FastAPI Server
│   ├── main.py         # API Entrypoint
│   ├── analytics.py    # SQL Analytical Engine
│   └── forecast.py     # ML Forecasting Logic
├── /data_pipeline      # ETL & Data Engineering
│   └── etl_main.py     # Data Pipeline (Extract, Transform, Load)
├── /database           # Data Warehouse Layer
│   ├── schema.sql      # Star Schema Definition
│   └── seed_data.py    # Realistic Synthetic Data Generator
└── /reports            # Automated Business Insights
```

---

## 📈 Key Functional Highlights

### 1. Unified Dashboards
- **Sales Executive Hub**: Real-time tracking of Revenue, Customer Acquisition, and Conversion rates.
- **HR Talent Pulse**: Specialized metrics for employee performance, retention, and training ROI.

### 2. Automated Data Pipeline
- Simulated ingestion from **Open Data APIs** (Market Indices).
- Normalization and enrichment: Merging internal sales with external market trends to find business correlations.

### 3. Predictive Intelligence
- Built-in **ML Forecaster** that provides data-driven revenue predictions for strategic planning.

### 4. Data Storytelling
- A dedicated narrative engine that explains the "Why" behind the "What", providing actionable recommendations for stakeholders.

---

## 🚀 How to Run the Platform

### 1. Database & Seed Data
```bash
# Install dependencies
pip install -r backend/requirements.txt

# Generate the Star Schema and seed thousands of records
python database/seed_data.py
```

### 2. Run ETL Pipeline
```bash
# Manually trigger the data enrichment pipeline
python data_pipeline/etl_main.py
```

### 3. Start Backend API
```bash
# Move to backend folder and start server
cd backend
uvicorn main:app --reload --port 8000
```

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 💡 Case Study: Impact Realization
**Scenario**: A mid-sized company wants to reduce sales churn and improve employee retention.
**SmartSales Solution**: 
- **Identify**: HR dashboard detects a correlation between low training hours and high churn.
- **Act**: Reports module recommends immediate mandatory training for 'Hardware' sales teams.
- **Result**: Predictive analysis forecasts a 15% increase in revenue once retention stabilizes.

---

**Developed as a Complete Engineering Team:**
*Senior Full Stack | Data Engineer | BI Specialist | ML Engineer | Product Manager*
