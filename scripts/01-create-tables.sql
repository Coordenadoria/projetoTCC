-- Criação das tabelas do sistema de emendas parlamentares

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS public.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_usuario VARCHAR(50) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  nome_completo VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('Administrador', 'Técnico')),
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de técnicos (estende usuários)
CREATE TABLE IF NOT EXISTS public.tecnicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  especialidade VARCHAR(100),
  departamento VARCHAR(100),
  cargo VARCHAR(100),
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de emendas parlamentares
CREATE TABLE IF NOT EXISTS public.emendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_emenda VARCHAR(50) UNIQUE NOT NULL,
  autor VARCHAR(100) NOT NULL,
  valor DECIMAL(15, 2) NOT NULL,
  objeto TEXT NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Pendente', 'Em Análise', 'Aprovada', 'Rejeitada', 'Concluída')),
  tecnico_responsavel_id UUID REFERENCES public.tecnicos(id),
  
  -- Campos administrativos
  data_liberacao DATE,
  conferencista VARCHAR(100),
  data_recebimento_demanda DATE,
  data_liberacao_assinatura DATE,
  falta_assinatura BOOLEAN DEFAULT FALSE,
  data_assinatura DATE,
  data_publicacao DATE,
  data_vigencia DATE,
  data_encaminhado DATE,
  data_concluida DATE,
  
  -- Campos técnicos
  area VARCHAR(100),
  estagio_situacao_demanda VARCHAR(100),
  situacao_analise_demanda VARCHAR(100),
  data_analise_demanda DATE,
  motivo_retorno_diligencia TEXT,
  data_retorno_diligencia DATE,
  data_retorno DATE,
  observacao_motivo_retorno TEXT,
  data_liberacao_assinatura_conferencista DATE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de histórico de alterações
CREATE TABLE IF NOT EXISTS public.historico_emendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emenda_id UUID NOT NULL REFERENCES public.emendas(id),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  campo_alterado VARCHAR(100) NOT NULL,
  valor_anterior TEXT,
  valor_novo TEXT,
  data_alteracao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar o campo updated_at
CREATE TRIGGER update_usuarios_updated_at
BEFORE UPDATE ON public.usuarios
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tecnicos_updated_at
BEFORE UPDATE ON public.tecnicos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emendas_updated_at
BEFORE UPDATE ON public.emendas
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para registrar alterações nas emendas
CREATE OR REPLACE FUNCTION log_emenda_changes()
RETURNS TRIGGER AS $$
DECLARE
    col text;
    old_val text;
    new_val text;
    usuario_id uuid;
BEGIN
    -- Obter o ID do usuário atual (em um sistema real, isso viria do contexto de autenticação)
    SELECT id INTO usuario_id FROM public.usuarios WHERE nome_usuario = current_setting('app.current_user', true);
    
    -- Se não encontrar usuário, usar um ID padrão para o sistema
    IF usuario_id IS NULL THEN
        SELECT id INTO usuario_id FROM public.usuarios WHERE nome_usuario = 'sistema' LIMIT 1;
    END IF;
    
    -- Para cada coluna alterada, inserir um registro no histórico
    FOR col IN SELECT column_name FROM information_schema.columns WHERE table_name = 'emendas' AND table_schema = 'public'
    LOOP
        EXECUTE format('SELECT $1.%I::text, $2.%I::text', col, col)
        INTO old_val, new_val
        USING OLD, NEW;
        
        IF old_val IS DISTINCT FROM new_val THEN
            INSERT INTO public.historico_emendas (emenda_id, usuario_id, campo_alterado, valor_anterior, valor_novo)
            VALUES (NEW.id, usuario_id, col, old_val, new_val);
        END IF;
    END LOOP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER emendas_audit_trigger
AFTER UPDATE ON public.emendas
FOR EACH ROW EXECUTE FUNCTION log_emenda_changes();
