from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# ---- Auth Schemas ----
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# ---- CRUD Schemas ----
class SaleCreate(BaseModel):
    product_name: str
    amount: float

class SaleResponse(SaleCreate):
    id: int
    date: datetime

    class Config:
        from_attributes = True

class CustomerCreate(BaseModel):
    name: str
    annual_spend: float
    loyalty_score: float

class CustomerResponse(CustomerCreate):
    id: int
    churn_risk: Optional[float] = None

    class Config:
        from_attributes = True

# ---- ML Prediction Schemas ----
class ChurnPredictionInput(BaseModel):
    annual_spend: float
    loyalty_score: float

class CustomerSegmentInput(BaseModel):
    annual_spend: float
    loyalty_score: float
