from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import crud, schemas, models
from app.auth import require_tecnico

router = APIRouter()

@router.get("/emendas", response_model=List[schemas.Emenda])
async def get_minhas_emendas(
    current_user: models.Usuario = Depends(require_tecnico),
    db: Session = Depends(get_db)
):
    """Listar emendas do técnico logado"""
    return crud.get_emendas_by_tecnico(db, current_user.id)

@router.put("/emendas/{emenda_id}", response_model=schemas.Emenda)
async def update_minha_emenda(
    emenda_id: int,
    emenda_update: schemas.EmendaUpdate,
    current_user: models.Usuario = Depends(require_tecnico),
    db: Session = Depends(get_db)
):
    """Atualizar emenda do técnico logado"""
    # Verificar se a emenda pertence ao técnico
    emenda = crud.get_emenda(db, emenda_id)
    if not emenda or emenda.tecnico_responsavel_id != current_user.id:
        raise HTTPException(status_code=404, detail="Emenda não encontrada ou não autorizada")
    
    return crud.update_emenda(db, emenda_id, emenda_update)
