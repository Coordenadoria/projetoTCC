from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UsuarioBase(BaseModel):
    nome_usuario: str
    perfil: str
    nome_completo: str

class UsuarioCreate(UsuarioBase):
    senha: str

class Usuario(UsuarioBase):
    id: int
    ativo: bool
    criado_em: datetime
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    nome_usuario: str
    senha: str

class Token(BaseModel):
    access_token: str
    token_type: str
    usuario: Usuario

class EmendaBase(BaseModel):
    numero_emenda: str
    
class EmendaCreate(EmendaBase):
    pass

class EmendaUpdate(BaseModel):
    tecnico_responsavel_id: Optional[int] = None
    data_liberacao: Optional[datetime] = None
    conferencista: Optional[str] = None
    data_recebimento_demanda: Optional[datetime] = None
    data_liberacao_assinatura: Optional[datetime] = None
    falta_assinatura: Optional[bool] = None
    assinatura: Optional[datetime] = None
    publicacao: Optional[datetime] = None
    vigencia: Optional[datetime] = None
    encaminhado_em: Optional[datetime] = None
    concluida_em: Optional[datetime] = None
    area: Optional[str] = None
    estagio_situacao_demanda: Optional[str] = None
    situacao: Optional[str] = None
    analise_demanda: Optional[str] = None
    data_analise_demanda: Optional[datetime] = None
    motivo_retorno_diligencia: Optional[str] = None
    data_retorno_diligencia: Optional[datetime] = None
    data_retorno: Optional[datetime] = None
    observacao_motivo_retorno: Optional[str] = None
    data_liberacao_assinatura_conferencista: Optional[datetime] = None
    status: Optional[str] = None

class Emenda(EmendaBase):
    id: int
    tecnico_responsavel_id: Optional[int]
    data_liberacao: Optional[datetime]
    conferencista: Optional[str]
    data_recebimento_demanda: Optional[datetime]
    data_liberacao_assinatura: Optional[datetime]
    falta_assinatura: bool
    assinatura: Optional[datetime]
    publicacao: Optional[datetime]
    vigencia: Optional[datetime]
    encaminhado_em: Optional[datetime]
    concluida_em: Optional[datetime]
    area: Optional[str]
    estagio_situacao_demanda: Optional[str]
    situacao: Optional[str]
    analise_demanda: Optional[str]
    data_analise_demanda: Optional[datetime]
    motivo_retorno_diligencia: Optional[str]
    data_retorno_diligencia: Optional[datetime]
    data_retorno: Optional[datetime]
    observacao_motivo_retorno: Optional[str]
    data_liberacao_assinatura_conferencista: Optional[datetime]
    status: str
    criado_em: datetime
    atualizado_em: datetime
    tecnico_responsavel: Optional[Usuario]
    
    class Config:
        from_attributes = True
