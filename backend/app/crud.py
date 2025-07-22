from sqlalchemy.orm import Session
from sqlalchemy import or_
from app import models, schemas
from passlib.context import CryptContext
from typing import Optional, List

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# CRUD Usuários
def get_usuario_by_nome(db: Session, nome_usuario: str):
    return db.query(models.Usuario).filter(models.Usuario.nome_usuario == nome_usuario).first()

def create_usuario(db: Session, usuario: schemas.UsuarioCreate):
    hashed_password = get_password_hash(usuario.senha)
    db_usuario = models.Usuario(
        nome_usuario=usuario.nome_usuario,
        senha_hash=hashed_password,
        perfil=usuario.perfil,
        nome_completo=usuario.nome_completo
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def get_tecnicos(db: Session):
    return db.query(models.Usuario).filter(models.Usuario.perfil == "Técnico").all()

# CRUD Emendas
def create_emenda(db: Session, emenda: schemas.EmendaCreate):
    db_emenda = models.Emenda(**emenda.dict())
    db.add(db_emenda)
    db.commit()
    db.refresh(db_emenda)
    return db_emenda

def get_emendas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Emenda).offset(skip).limit(limit).all()

def get_emendas_by_tecnico(db: Session, tecnico_id: int):
    return db.query(models.Emenda).filter(models.Emenda.tecnico_responsavel_id == tecnico_id).all()

def get_emenda(db: Session, emenda_id: int):
    return db.query(models.Emenda).filter(models.Emenda.id == emenda_id).first()

def update_emenda(db: Session, emenda_id: int, emenda_update: schemas.EmendaUpdate):
    db_emenda = db.query(models.Emenda).filter(models.Emenda.id == emenda_id).first()
    if db_emenda:
        update_data = emenda_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_emenda, field, value)
        db.commit()
        db.refresh(db_emenda)
    return db_emenda

def delete_emenda(db: Session, emenda_id: int):
    db_emenda = db.query(models.Emenda).filter(models.Emenda.id == emenda_id).first()
    if db_emenda:
        db.delete(db_emenda)
        db.commit()
    return db_emenda

def get_emenda_by_numero(db: Session, numero_emenda: str):
    return db.query(models.Emenda).filter(models.Emenda.numero_emenda == numero_emenda).first()
