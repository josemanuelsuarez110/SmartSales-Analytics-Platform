# AI Business Intelligence Platform 🚀

Plataforma de Inteligencia de Negocios empresarial (SaaS) impulsada por Machine Learning. Proveé visualización en tiempo real con Recharts, autenticación JWT unificada, y predicciones de ganancias impulsadas por Scikit-Learn.

## 🌟 Arquitectura del Proyecto

Este sistema es Full Stack y está dividido en dos micro-arquitecturas interconectadas.

1. **Frontend (`/frontend`)**: Desarrollado en **Next.js 14** (App Router) usando TailwindCSS. Interfaz Dark-Mode Glassmorphism para presentación a nivel C-Level Executives.
2. **Backend (`/backend`)**: API de alto rendimiento en **FastAPI (Python)** conectada a **PostgreSQL** mediante SQLAlchemy.

## 🧠 Modelos de Machine Learning
La carpeta `backend/ml_models` se genera automáticamente y aloja modelos en caché:
- `sales_model.pkl` (Regresión Lineal): Pronósticos temporales de ingresos futuros.
- `churn_model.pkl` (Regresión Logística): Modelado de desgaste de clientes y riesgos.
- `kmeans_model.pkl` (Clustering): Segmentación automatizada VIP vs Regular basada en densidad de comportamiento.

## 🚀 Despliegue en la Nube
El proyecto está **Cloud-Ready**:

### Frontend (Vercel)
Simplemente conecta la carpeta `/frontend` a tu proyecto en Vercel. 
Variables de entorno requeridas:
* `NEXT_PUBLIC_API_URL` = La dirección URL pública de tu API desplegada (ej: `https://aibi-backend.onrender.com`).

### Backend (Render / AWS)
Utiliza el `render.yaml` o conecta directamente el repositorio a Render seleccionando la carpeta `/backend`.
Variables de Entorno requeridas:
* `DATABASE_URL` = La URI real de tu base de datos cloud (ej: Postgres de Neon, Supabase, AWS RDS). 
* `SECRET_KEY` = String alfanumérico para el hash JWT.

## ⚙️ Correr el Proyecto Localmente

**1. Levantar el Servidor Python**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python ml_pipeline.py # (Obligatorio para entrenar la IA)
python main.py
```
> La API estará en `http://localhost:8000/docs`

**2. Iniciar el Frontend**
```bash
cd frontend
pnpm install
pnpm dev
```
> El cliente iniciará en `http://localhost:3000`

---
*Desarrollado con estándares de grado de Producción aplicados a JWT, Tailwind CSS Avanzado y ML Inference.*
