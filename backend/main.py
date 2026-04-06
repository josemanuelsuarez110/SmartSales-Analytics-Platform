import sys
import traceback
import os
import joblib
import numpy as np
from datetime import datetime

print("🔄 Iniciando el arranque de Uvicorn y cargando módulos...")

try:
    from backend import models, schemas, auth
    from backend.database import engine, get_db

    # Inicialización Robusta de DB
    models.Base.metadata.create_all(bind=engine)
    print("✅ Base de datos PostgreSQL conectada e inicializada correctamente.")

    # Inicializamos la App
    from fastapi import FastAPI, Depends, HTTPException, status
    from fastapi.middleware.cors import CORSMiddleware
    from sqlalchemy.orm import Session
    
    app = FastAPI(title="AI Business Intelligence API - Debug Mode")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    def home():
        return {"status": "ok", "message": "AI Business Intelligence API is Live"}

    # Rutas Dinámicas de ML
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODELS_DIR = os.path.join(BASE_DIR, "ml_models")
    print(f"🔍 Buscando modelos en: {MODELS_DIR}")

    sales_model = joblib.load(os.path.join(MODELS_DIR, "sales_model.pkl"))
    churn_model = joblib.load(os.path.join(MODELS_DIR, "churn_model.pkl"))
    kmeans_model = joblib.load(os.path.join(MODELS_DIR, "kmeans_model.pkl"))
    print("🤖 Modelos ML cargados exitosamente.")

except Exception as e:
    print("❌================ ERROR CRITICO DE INICIO ================❌")
    print(traceback.format_exc())
    print("❌=======================================================❌")
    sys.exit(1)

@app.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    hashed_pwd = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.Token)
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    access_token = auth.create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/sales", response_model=schemas.SaleResponse)
def create_sale(sale: schemas.SaleCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_sale = models.Sale(**sale.dict())
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

@app.get("/sales", response_model=list[schemas.SaleResponse])
def read_sales(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Sale).offset(skip).limit(limit).all()

@app.post("/customers", response_model=schemas.CustomerResponse)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_customer = models.Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@app.get("/predict-sales")
def predict_sales_endpoint(date_str: str, current_user: models.User = Depends(auth.get_current_user)):
    try:
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        ordinal_val = date_obj.toordinal()
        prediction = sales_model.predict([[ordinal_val]])[0]
        return {"date": date_str, "predicted_sales_amount": round(prediction, 2)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict-churn")
def predict_churn_endpoint(data: schemas.ChurnPredictionInput, current_user: models.User = Depends(auth.get_current_user)):
    try:
        proba = churn_model.predict_proba([[data.annual_spend, data.loyalty_score]])[0][1]
        risk = "ALTO" if proba > 0.5 else "BAJO"
        return {"churn_probability": round(proba, 4), "risk_profile": risk}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error en el modelo de Churn")

@app.post("/segment-customer")
def segment_customer_endpoint(data: schemas.CustomerSegmentInput, current_user: models.User = Depends(auth.get_current_user)):
    try:
        cluster_id = kmeans_model.predict([[data.annual_spend, data.loyalty_score]])[0]
        segment_map = {0: "VIP", 1: "Regular", 2: "Riesgo"}
        return {"cluster_id": int(cluster_id), "segment_name": segment_map.get(cluster_id, "Desconocido")}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error en Segmentación")

@app.get("/health")
def health_check():
    return {"status": "up", "database": "postgresql-ready", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
