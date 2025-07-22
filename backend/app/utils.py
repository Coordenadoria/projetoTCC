import pandas as pd
from sqlalchemy.orm import Session
from app import crud, schemas
from fastapi import HTTPException
from fastapi.responses import StreamingResponse
import io
from datetime import datetime

def import_excel(file_content: io.BytesIO, db: Session):
    """Importar dados de planilha Excel"""
    try:
        df = pd.read_excel(file_content)
        
        imported_count = 0
        updated_count = 0
        errors = []
        
        for index, row in df.iterrows():
            try:
                numero_emenda = str(row.get('numero_emenda', ''))
                if not numero_emenda:
                    continue
                
                # Verificar se emenda já existe
                existing_emenda = crud.get_emenda_by_numero(db, numero_emenda)
                
                if existing_emenda:
                    # Atualizar apenas campos vazios
                    update_data = {}
                    for column in df.columns:
                        if pd.notna(row[column]) and hasattr(existing_emenda, column):
                            current_value = getattr(existing_emenda, column)
                            if current_value is None:
                                update_data[column] = row[column]
                    
                    if update_data:
                        emenda_update = schemas.EmendaUpdate(**update_data)
                        crud.update_emenda(db, existing_emenda.id, emenda_update)
                        updated_count += 1
                else:
                    # Criar nova emenda
                    emenda_data = schemas.EmendaCreate(numero_emenda=numero_emenda)
                    crud.create_emenda(db, emenda_data)
                    imported_count += 1
                    
            except Exception as e:
                errors.append(f"Linha {index + 1}: {str(e)}")
        
        return {
            "message": "Importação concluída",
            "imported": imported_count,
            "updated": updated_count,
            "errors": errors
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao processar planilha: {str(e)}")

def export_excel(db: Session):
    """Exportar dados para Excel"""
    try:
        emendas = crud.get_emendas(db, limit=10000)
        
        # Converter para DataFrame
        data = []
        for emenda in emendas:
            data.append({
                'ID': emenda.id,
                'Número Emenda': emenda.numero_emenda,
                'Técnico Responsável': emenda.tecnico_responsavel.nome_completo if emenda.tecnico_responsavel else '',
                'Data Liberação': emenda.data_liberacao,
                'Conferencista': emenda.conferencista,
                'Data Recebimento Demanda': emenda.data_recebimento_demanda,
                'Data Liberação Assinatura': emenda.data_liberacao_assinatura,
                'Falta Assinatura': emenda.falta_assinatura,
                'Assinatura': emenda.assinatura,
                'Publicação': emenda.publicacao,
                'Vigência': emenda.vigencia,
                'Encaminhado em': emenda.encaminhado_em,
                'Concluída em': emenda.concluida_em,
                'Área': emenda.area,
                'Estágio Situação Demanda': emenda.estagio_situacao_demanda,
                'Situação': emenda.situacao,
                'Análise Demanda': emenda.analise_demanda,
                'Data Análise Demanda': emenda.data_analise_demanda,
                'Motivo Retorno Diligência': emenda.motivo_retorno_diligencia,
                'Data Retorno Diligência': emenda.data_retorno_diligencia,
                'Data Retorno': emenda.data_retorno,
                'Observação Motivo Retorno': emenda.observacao_motivo_retorno,
                'Status': emenda.status,
                'Criado em': emenda.criado_em,
                'Atualizado em': emenda.atualizado_em
            })
        
        df = pd.DataFrame(data)
        
        # Criar arquivo Excel em memória
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Emendas')
        
        output.seek(0)
        
        return StreamingResponse(
            io.BytesIO(output.read()),
            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            headers={"Content-Disposition": f"attachment; filename=emendas_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao exportar: {str(e)}")
