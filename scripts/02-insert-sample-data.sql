-- Inserção de dados de exemplo para o sistema de emendas parlamentares

-- Inserir usuários
INSERT INTO public.usuarios (nome_usuario, senha_hash, nome_completo, email, perfil)
VALUES
  ('admin', '$2a$10$rJJzx.rKVhTf/z7vx9Ib8eRPm.5nAOBQHEjN0y5.YGoDGZgX5fKxe', 'Administrador do Sistema', 'admin@sistema.gov.br', 'Administrador'),
  ('tecnico1', '$2a$10$rJJzx.rKVhTf/z7vx9Ib8eRPm.5nAOBQHEjN0y5.YGoDGZgX5fKxe', 'João Silva Santos', 'joao.silva@sistema.gov.br', 'Técnico'),
  ('tecnico2', '$2a$10$rJJzx.rKVhTf/z7vx9Ib8eRPm.5nAOBQHEjN0y5.YGoDGZgX5fKxe', 'Maria Oliveira Costa', 'maria.oliveira@sistema.gov.br', 'Técnico'),
  ('tecnico3', '$2a$10$rJJzx.rKVhTf/z7vx9Ib8eRPm.5nAOBQHEjN0y5.YGoDGZgX5fKxe', 'Carlos Eduardo Lima', 'carlos.lima@sistema.gov.br', 'Técnico'),
  ('sistema', '$2a$10$rJJzx.rKVhTf/z7vx9Ib8eRPm.5nAOBQHEjN0y5.YGoDGZgX5fKxe', 'Sistema Automatizado', 'sistema@sistema.gov.br', 'Administrador');

-- Inserir técnicos
INSERT INTO public.tecnicos (usuario_id, especialidade, departamento, cargo)
VALUES
  ((SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico1'), 'Saúde', 'Departamento de Saúde', 'Analista Técnico'),
  ((SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico2'), 'Educação', 'Departamento de Educação', 'Analista Técnico'),
  ((SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico3'), 'Infraestrutura', 'Departamento de Infraestrutura', 'Analista Técnico');

-- Inserir emendas parlamentares
INSERT INTO public.emendas (
  numero_emenda, autor, valor, objeto, status, 
  tecnico_responsavel_id, data_liberacao, conferencista, 
  data_recebimento_demanda, area, estagio_situacao_demanda
)
VALUES
  (
    '2023/0001', 
    'Dep. João Silva', 
    500000, 
    'Construção de unidade básica de saúde no município de São Paulo', 
    'Pendente',
    (SELECT id FROM public.tecnicos WHERE usuario_id = (SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico1')),
    NULL,
    NULL,
    '2023-10-15',
    'Saúde',
    'Análise Técnica'
  ),
  (
    '2023/0002', 
    'Dep. Maria Oliveira', 
    750000, 
    'Reforma de escola estadual no município de Campinas', 
    'Em Análise',
    (SELECT id FROM public.tecnicos WHERE usuario_id = (SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico2')),
    '2023-09-25',
    'Ana Paula Souza',
    '2023-09-20',
    'Educação',
    'Análise Orçamentária'
  ),
  (
    '2023/0003', 
    'Dep. Carlos Eduardo', 
    1200000, 
    'Pavimentação de estradas rurais no município de Ribeirão Preto', 
    'Aprovada',
    (SELECT id FROM public.tecnicos WHERE usuario_id = (SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico3')),
    '2023-08-15',
    'Roberto Almeida',
    '2023-08-10',
    'Infraestrutura',
    'Aprovado'
  ),
  (
    '2023/0004', 
    'Dep. Ana Luiza', 
    350000, 
    'Aquisição de equipamentos para hospital municipal de Sorocaba', 
    'Concluída',
    (SELECT id FROM public.tecnicos WHERE usuario_id = (SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico1')),
    '2023-07-10',
    'Marcos Pereira',
    '2023-07-05',
    'Saúde',
    'Concluído'
  ),
  (
    '2023/0005', 
    'Dep. Roberto Santos', 
    800000, 
    'Construção de centro esportivo no município de Santos', 
    'Pendente',
    NULL,
    NULL,
    NULL,
    '2023-11-01',
    NULL,
    NULL
  );

-- Atualizar campos adicionais para algumas emendas
UPDATE public.emendas 
SET 
  data_analise_demanda = '2023-10-05',
  situacao_analise_demanda = 'Em andamento'
WHERE numero_emenda = '2023/0002';

UPDATE public.emendas 
SET 
  data_liberacao_assinatura = '2023-09-01',
  data_assinatura = '2023-09-05',
  data_publicacao = '2023-09-10',
  situacao_analise_demanda = 'Concluída',
  data_analise_demanda = '2023-08-25'
WHERE numero_emenda = '2023/0003';

UPDATE public.emendas 
SET 
  data_liberacao_assinatura = '2023-07-20',
  data_assinatura = '2023-07-25',
  data_publicacao = '2023-08-01',
  data_vigencia = '2024-08-01',
  data_encaminhado = '2023-08-05',
  data_concluida = '2023-08-30',
  situacao_analise_demanda = 'Finalizada',
  data_analise_demanda = '2023-07-15'
WHERE numero_emenda = '2023/0004';

-- Adicionar mais emendas
INSERT INTO public.emendas (
  numero_emenda, autor, valor, objeto, status, 
  tecnico_responsavel_id, data_recebimento_demanda, falta_assinatura
)
VALUES
  (
    '2023/0006', 
    'Dep. Fernanda Lima', 
    450000, 
    'Aquisição de viaturas para a polícia militar de Bauru', 
    'Rejeitada',
    (SELECT id FROM public.tecnicos WHERE usuario_id = (SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico2')),
    '2023-10-05',
    false
  ),
  (
    '2023/0007', 
    'Dep. Paulo Mendes', 
    600000, 
    'Reforma de praça pública no centro de São José dos Campos', 
    'Em Análise',
    (SELECT id FROM public.tecnicos WHERE usuario_id = (SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico3')),
    '2023-10-25',
    false
  ),
  (
    '2023/0008', 
    'Dep. Luciana Ferreira', 
    900000, 
    'Construção de creche municipal em Guarulhos', 
    'Pendente',
    (SELECT id FROM public.tecnicos WHERE usuario_id = (SELECT id FROM public.usuarios WHERE nome_usuario = 'tecnico2')),
    '2023-11-10',
    true
  );

-- Atualizar campos adicionais para as novas emendas
UPDATE public.emendas 
SET 
  data_liberacao = '2023-10-10',
  conferencista = 'Juliana Costa',
  area = 'Segurança',
  estagio_situacao_demanda = 'Análise Técnica',
  situacao_analise_demanda = 'Pendente',
  motivo_retorno_diligencia = 'Documentação incompleta',
  data_retorno_diligencia = '2023-10-20',
  observacao_motivo_retorno = 'Faltam documentos comprobatórios de regularidade fiscal'
WHERE numero_emenda = '2023/0006';

UPDATE public.emendas 
SET 
  data_liberacao = '2023-10-30',
  conferencista = 'Carla Rodrigues',
  area = 'Urbanismo',
  estagio_situacao_demanda = 'Análise Ambiental',
  situacao_analise_demanda = 'Em andamento',
  data_analise_demanda = '2023-11-05'
WHERE numero_emenda = '2023/0007';

UPDATE public.emendas 
SET 
  area = 'Educação',
  estagio_situacao_demanda = 'Aguardando Documentação'
WHERE numero_emenda = '2023/0008';
