from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    nome_usuario = Column(String, unique=True, index=True)
    senha_hash = Column(String)
    perfil = Column(String)  # "Administrador" ou "Técnico"
    nome_completo = Column(String)
    ativo = Column(Boolean, default=True)
    criado_em = Column(DateTime, default=datetime.utcnow)

class Emenda(Base):
    __tablename__ = "emendas"
    
    id = Column(Integer, primary_key=True, index=True)
    numero_emenda = Column(String, unique=True, index=True)
    
    # Campos do Administrador
    tecnico_responsavel_id = Column(Integer, ForeignKey("usuarios.id"))
    data_liberacao = Column(DateTime)
    conferencista = Column(String)
    data_recebimento_demanda = Column(DateTime)
    data_liberacao_assinatura = Column(DateTime)
    falta_assinatura = Column(Boolean, default=False)
    assinatura = Column(DateTime)
    publicacao = Column(DateTime)
    vigencia = Column(DateTime)
    encaminhado_em = Column(DateTime)
    concluida_em = Column(DateTime)
    
    # Campos do Técnico
    area = Column(String)
    estagio_situacao_demanda = Column(String)
    situacao = Column(String)
    analise_demanda = Column(String)
    data_analise_demanda = Column(DateTime)
    motivo_retorno_diligencia = Column(Text)
    data_retorno_diligencia = Column(DateTime)
    data_retorno = Column(DateTime)
    observacao_motivo_retorno = Column(Text)
    data_liberacao_assinatura_conferencista = Column(DateTime)
    
    # Campos gerais
    status = Column(String, default="Pendente")
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    tecnico_responsavel = relationship("Usuario", foreign_keys=[tecnico_responsavel_id])
