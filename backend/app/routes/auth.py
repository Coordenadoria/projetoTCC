from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas
from app.auth import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token

router = APIRouter()

@router.post("/login", response_model=schemas.Token)
async def login(login_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_usuario_by_nome(db, nome_usuario=login_data.nome_usuario)
    if not user or not crud.verify_password(login_data.senha, user.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.nome_usuario}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "usuario": user
    }

@router.post("/register", response_model=schemas.Usuario)
async def register(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_user = crud.get_usuario_by_nome(db, nome_usuario=usuario.nome_usuario)
    if db_user:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    return crud.create_usuario(db=db, usuario=usuario)
