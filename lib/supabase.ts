import { createClient } from "@supabase/supabase-js"

// Inicializar o cliente Supabase com variáveis de ambiente
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

// Definição de tipos para o banco de dados
export interface Usuario {
  id: string
  nome_usuario: string
  nome_completo: string
  email: string
  perfil: "Administrador" | "Técnico"
  ativo: boolean
  created_at: string
}

export interface Emenda {
  id: string
  numero_emenda: string
  autor: string
  valor: number
  objeto: string
  status: string
  tecnico_responsavel_id?: string
  data_liberacao?: string
  conferencista?: string
  data_recebimento_demanda?: string
  data_liberacao_assinatura?: string
  falta_assinatura?: boolean
  data_assinatura?: string
  data_publicacao?: string
  data_vigencia?: string
  data_encaminhado?: string
  data_concluida?: string
  area?: string
  estagio_situacao_demanda?: string
  situacao_analise_demanda?: string
  data_analise_demanda?: string
  motivo_retorno_diligencia?: string
  data_retorno_diligencia?: string
  data_retorno?: string
  observacao_motivo_retorno?: string
  data_liberacao_assinatura_conferencista?: string
  created_at: string
  updated_at: string
}

export interface Tecnico {
  id: string
  usuario_id: string
  nome: string
  email: string
  especialidade: string
  departamento: string
  cargo: string
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface HistoricoEmenda {
  id: string
  emenda_id: string
  usuario_id: string
  campo_alterado: string
  valor_anterior: string
  valor_novo: string
  data_alteracao: string
}
