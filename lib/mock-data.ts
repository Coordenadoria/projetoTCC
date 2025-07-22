export interface Emenda {
  id: number
  numero_emenda: string
  autor: string
  valor_total: number
  objeto: string
  status: "Pendente" | "Em Análise" | "Aprovada" | "Rejeitada" | "Concluída"
  prioridade: "Baixa" | "Média" | "Alta" | "Urgente"
  categoria: string
  subcategoria?: string
  municipio: string
  fonte_recurso: string
  contrapartida?: number
  beneficiarios_diretos?: number
  beneficiarios_indiretos?: number
  data_recebimento_demanda?: string
  data_liberacao_orcamentaria?: string
  data_analise_demanda?: string
  data_assinatura_convenio?: string
  data_publicacao_doe?: string
  situacao_analise_demanda?: string
  motivo_retorno?: string
  observacoes?: string
  tecnico_responsavel_id?: number
  created_at: string
  updated_at: string
}

export interface Tecnico {
  id: number
  nome_completo: string
  email: string
  ativo: boolean
}

export interface Notificacao {
  id: number
  tecnico_id: number
  titulo: string
  mensagem: string
  tipo: "info" | "warning" | "error" | "success"
  lida: boolean
  created_at: string
}

const MOCK_EMENDAS: Emenda[] = [
  {
    id: 1,
    numero_emenda: "2024/001",
    autor: "Deputado João Silva",
    valor_total: 500000,
    objeto: "Construção de posto de saúde",
    status: "Em Análise",
    prioridade: "Alta",
    categoria: "Saúde",
    subcategoria: "Infraestrutura",
    municipio: "São Paulo",
    fonte_recurso: "Tesouro Nacional",
    contrapartida: 50000,
    beneficiarios_diretos: 5000,
    beneficiarios_indiretos: 15000,
    data_recebimento_demanda: "2024-01-15",
    data_analise_demanda: "2024-01-20",
    situacao_analise_demanda: "Documentação em análise",
    tecnico_responsavel_id: 2,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-20T14:30:00Z",
  },
  {
    id: 2,
    numero_emenda: "2024/002",
    autor: "Deputada Maria Santos",
    valor_total: 300000,
    objeto: "Reforma de escola municipal",
    status: "Pendente",
    prioridade: "Média",
    categoria: "Educação",
    subcategoria: "Infraestrutura",
    municipio: "Campinas",
    fonte_recurso: "FNDE",
    contrapartida: 30000,
    beneficiarios_diretos: 800,
    beneficiarios_indiretos: 2400,
    data_recebimento_demanda: "2024-01-18",
    tecnico_responsavel_id: 3,
    created_at: "2024-01-18T09:15:00Z",
    updated_at: "2024-01-18T09:15:00Z",
  },
  {
    id: 3,
    numero_emenda: "2024/003",
    autor: "Deputado Carlos Lima",
    valor_total: 750000,
    objeto: "Pavimentação de ruas",
    status: "Aprovada",
    prioridade: "Alta",
    categoria: "Infraestrutura",
    subcategoria: "Pavimentação",
    municipio: "Santos",
    fonte_recurso: "Tesouro Nacional",
    contrapartida: 75000,
    beneficiarios_diretos: 3000,
    beneficiarios_indiretos: 12000,
    data_recebimento_demanda: "2024-01-10",
    data_analise_demanda: "2024-01-15",
    data_liberacao_orcamentaria: "2024-01-25",
    situacao_analise_demanda: "Aprovada",
    tecnico_responsavel_id: 2,
    created_at: "2024-01-10T11:20:00Z",
    updated_at: "2024-01-25T16:45:00Z",
  },
  {
    id: 4,
    numero_emenda: "2024/004",
    autor: "Deputada Ana Costa",
    valor_total: 200000,
    objeto: "Equipamentos para hospital",
    status: "Concluída",
    prioridade: "Urgente",
    categoria: "Saúde",
    subcategoria: "Equipamentos",
    municipio: "Ribeirão Preto",
    fonte_recurso: "SUS",
    contrapartida: 20000,
    beneficiarios_diretos: 10000,
    beneficiarios_indiretos: 30000,
    data_recebimento_demanda: "2024-01-05",
    data_analise_demanda: "2024-01-08",
    data_liberacao_orcamentaria: "2024-01-12",
    data_assinatura_convenio: "2024-01-15",
    data_publicacao_doe: "2024-01-18",
    situacao_analise_demanda: "Concluída",
    tecnico_responsavel_id: 3,
    created_at: "2024-01-05T08:30:00Z",
    updated_at: "2024-01-18T12:00:00Z",
  },
  {
    id: 5,
    numero_emenda: "2024/005",
    autor: "Deputado Pedro Oliveira",
    valor_total: 400000,
    objeto: "Centro esportivo comunitário",
    status: "Rejeitada",
    prioridade: "Baixa",
    categoria: "Esporte",
    subcategoria: "Infraestrutura",
    municipio: "Sorocaba",
    fonte_recurso: "Ministério do Esporte",
    data_recebimento_demanda: "2024-01-12",
    data_analise_demanda: "2024-01-20",
    situacao_analise_demanda: "Rejeitada",
    motivo_retorno: "Documentação incompleta",
    observacoes: "Falta certidão de regularidade fiscal",
    tecnico_responsavel_id: 2,
    created_at: "2024-01-12T14:15:00Z",
    updated_at: "2024-01-20T10:30:00Z",
  },
]

const MOCK_TECNICOS: Tecnico[] = [
  {
    id: 2,
    nome_completo: "João Silva Santos",
    email: "joao.silva@sistema.gov.br",
    ativo: true,
  },
  {
    id: 3,
    nome_completo: "Maria Oliveira Costa",
    email: "maria.oliveira@sistema.gov.br",
    ativo: true,
  },
]

export function getMockEmendas(): Emenda[] {
  return [...MOCK_EMENDAS]
}

export function getMockTecnicos(): Tecnico[] {
  return [...MOCK_TECNICOS]
}

export function updateEmenda(id: number, updateData: Partial<Emenda>): Emenda | null {
  const index = MOCK_EMENDAS.findIndex((e) => e.id === id)
  if (index !== -1) {
    MOCK_EMENDAS[index] = {
      ...MOCK_EMENDAS[index],
      ...updateData,
      updated_at: new Date().toISOString(),
    }
    return MOCK_EMENDAS[index]
  }
  return null
}

export function atribuirEmenda(emendaId: number, tecnicoId: number): Emenda | null {
  return updateEmenda(emendaId, { tecnico_responsavel_id: tecnicoId })
}

export function buscarEmendas(filtros: any): Emenda[] {
  let filtered = [...MOCK_EMENDAS]

  if (filtros.texto) {
    const texto = filtros.texto.toLowerCase()
    filtered = filtered.filter(
      (e) =>
        e.numero_emenda.toLowerCase().includes(texto) ||
        e.autor.toLowerCase().includes(texto) ||
        e.objeto.toLowerCase().includes(texto) ||
        e.municipio.toLowerCase().includes(texto),
    )
  }

  if (filtros.status && filtros.status !== "todos") {
    filtered = filtered.filter((e) => e.status === filtros.status)
  }

  if (filtros.prioridade && filtros.prioridade !== "todos") {
    filtered = filtered.filter((e) => e.prioridade === filtros.prioridade)
  }

  if (filtros.categoria && filtros.categoria !== "todos") {
    filtered = filtered.filter((e) => e.categoria === filtros.categoria)
  }

  if (filtros.tecnico && filtros.tecnico !== "todos") {
    filtered = filtered.filter((e) => e.tecnico_responsavel_id === Number(filtros.tecnico))
  }

  if (filtros.dataInicio) {
    filtered = filtered.filter((e) => {
      if (!e.data_recebimento_demanda) return false
      return new Date(e.data_recebimento_demanda) >= new Date(filtros.dataInicio)
    })
  }

  if (filtros.dataFim) {
    filtered = filtered.filter((e) => {
      if (!e.data_recebimento_demanda) return false
      return new Date(e.data_recebimento_demanda) <= new Date(filtros.dataFim)
    })
  }

  return filtered
}

export function criarEmenda(emendaData: Partial<Emenda>): Emenda {
  const novaEmenda: Emenda = {
    id: Math.max(...MOCK_EMENDAS.map((e) => e.id)) + 1,
    numero_emenda: emendaData.numero_emenda || `2024/${String(MOCK_EMENDAS.length + 1).padStart(3, "0")}`,
    autor: emendaData.autor || "",
    valor_total: emendaData.valor_total || 0,
    objeto: emendaData.objeto || "",
    status: emendaData.status || "Pendente",
    prioridade: emendaData.prioridade || "Média",
    categoria: emendaData.categoria || "",
    municipio: emendaData.municipio || "",
    fonte_recurso: emendaData.fonte_recurso || "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...emendaData,
  }

  MOCK_EMENDAS.push(novaEmenda)
  return novaEmenda
}

export function getEstatisticas() {
  const total = MOCK_EMENDAS.length
  const pendentes = MOCK_EMENDAS.filter((e) => e.status === "Pendente").length
  const emAnalise = MOCK_EMENDAS.filter((e) => e.status === "Em Análise").length
  const aprovadas = MOCK_EMENDAS.filter((e) => e.status === "Aprovada").length
  const concluidas = MOCK_EMENDAS.filter((e) => e.status === "Concluída").length
  const rejeitadas = MOCK_EMENDAS.filter((e) => e.status === "Rejeitada").length

  const valorTotal = MOCK_EMENDAS.reduce((acc, e) => acc + e.valor_total, 0)
  const valorAprovado = MOCK_EMENDAS.filter((e) => e.status === "Aprovada" || e.status === "Concluída").reduce(
    (acc, e) => acc + e.valor_total,
    0,
  )

  return {
    total,
    pendentes,
    emAnalise,
    aprovadas,
    concluidas,
    rejeitadas,
    valorTotal,
    valorAprovado,
    porStatus: {
      Pendente: pendentes,
      "Em Análise": emAnalise,
      Aprovada: aprovadas,
      Concluída: concluidas,
      Rejeitada: rejeitadas,
    },
    porCategoria: MOCK_EMENDAS.reduce(
      (acc, e) => {
        acc[e.categoria] = (acc[e.categoria] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
    porPrioridade: MOCK_EMENDAS.reduce(
      (acc, e) => {
        acc[e.prioridade] = (acc[e.prioridade] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  }
}

export function getMockNotificacoes(tecnicoId: number): Notificacao[] {
  return [
    {
      id: 1,
      tecnico_id: tecnicoId,
      titulo: "Nova emenda atribuída",
      mensagem: "Você recebeu uma nova emenda para análise: 2024/001",
      tipo: "info",
      lida: false,
      created_at: "2024-01-20T10:00:00Z",
    },
    {
      id: 2,
      tecnico_id: tecnicoId,
      titulo: "Prazo próximo do vencimento",
      mensagem: "A emenda 2024/002 tem prazo de análise próximo do vencimento",
      tipo: "warning",
      lida: false,
      created_at: "2024-01-19T15:30:00Z",
    },
    {
      id: 3,
      tecnico_id: tecnicoId,
      titulo: "Emenda aprovada",
      mensagem: "A emenda 2024/003 foi aprovada com sucesso",
      tipo: "success",
      lida: true,
      created_at: "2024-01-18T09:15:00Z",
    },
  ]
}
