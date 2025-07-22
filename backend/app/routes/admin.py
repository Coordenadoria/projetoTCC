from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import crud, schemas, models
from app.auth import require_admin
from app.utils import import_excel, export_excel
import io

router = APIRouter()

@router.get("/emendas", response_model=List[schemas.Emenda])
async def get_all_emendas(
    skip: int = 0, 
    limit: int = 100,
    current_user: models.Usuario = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Listar todas as emendas (apenas admin)"""
    return crud.get_emendas(db, skip=skip, limit=limit)

@router.put("/emendas/{emenda_id}", response_model=schemas.Emenda)
async def update_emenda(
    emenda_id: int,
    emenda_update: schemas.EmendaUpdate,
    current_user: models.Usuario = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Atualizar emenda (apenas admin)"""
    emenda = crud.update_emenda(db, emenda_id, emenda_update)
    if not emenda:
        raise HTTPException(status_code=404, detail="Emenda não encontrada")
    return emenda

@router.post("/emendas/{emenda_id}/atribuir")
async def atribuir_emenda(
    emenda_id: int,
    tecnico_id: int,
    current_user: models.Usuario = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Atribuir emenda a um técnico"""
    emenda_update = schemas.EmendaUpdate(tecnico_responsavel_id=tecnico_id)
    emenda = crud.update_emenda(db, emenda_id, emenda_update)
    if not emenda:
        raise HTTPException(status_code=404, detail="Emenda não encontrada")
    return {"message": "Emenda atribuída com sucesso"}

@router.get("/tecnicos", response_model=List[schemas.Usuario])
async def get_tecnicos(
    current_user: models.Usuario = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Listar todos os técnicos"""
    return crud.get_tecnicos(db)

@router.post("/upload-excel")
async def upload_excel(
    file: UploadFile = File(...),
    current_user: models.Usuario = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Upload e importação de planilha Excel"""
    if not file.filename.endswith('.xlsx'):
        raise HTTPException(status_code=400, detail="Apenas arquivos .xlsx são aceitos")
    
    contents = await file.read()
    result = import_excel(io.BytesIO(contents), db)
    return result

@router.get("/export-excel")
async def export_excel_report(
    current_user: models.Usuario = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Exportar relatório em Excel"""
    return export_excel(db)
