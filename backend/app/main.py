from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import uvicorn
from app.database import engine, get_db
from app import models
from app.routes import auth, admin, tecnico

# Criar tabelas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Emendas Parlamentares", version="1.0.0")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rotas
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(tecnico.router, prefix="/tecnico", tags=["tecnico"])

@app.get("/")
async def root():
    return {"message": "Sistema de Emendas Parlamentares API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
