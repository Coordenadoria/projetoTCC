-- Dados de exemplo para configuração de unidades e avaliações

-- Inserir configuração de unidade exemplo
INSERT INTO public.unit_configuration (
  unit_name, unit_type, cnpj, address, phone, email,
  bed_capacity, specialties, services, operational_hours,
  performance_evaluation_frequency, wellness_evaluation_frequency,
  manager_name, manager_email, manager_phone,
  setup_completed
) VALUES (
  'Hospital das Clínicas - Unidade Central',
  'hospital',
  '12345678000199',
  'Av. Dr. Enéas Carvalho de Aguiar, 255 - Cerqueira César, São Paulo - SP',
  '1126617000',
  'contato@hc.fm.usp.br',
  1200,
  ARRAY['Cardiologia', 'Neurologia', 'Oncologia', 'UTI', 'Emergência', 'Pediatria'],
  ARRAY['Internação', 'Cirurgia', 'Diagnóstico por Imagem', 'Laboratório', 'Fisioterapia'],
  '{"monday": "24h", "tuesday": "24h", "wednesday": "24h", "thursday": "24h", "friday": "24h", "saturday": "24h", "sunday": "24h"}',
  90,
  30,
  'Dr. João Silva Santos',
  'joao.santos@hc.fm.usp.br',
  '11987654321',
  true
);

-- Inserir papéis de usuário
INSERT INTO public.user_roles (user_id, role, unit_id, permissions) VALUES
(
  (SELECT id FROM auth.users WHERE email = 'sessp.css@gmail.com' LIMIT 1),
  'admin',
  (SELECT id FROM public.unit_configuration LIMIT 1),
  '{"manage_users": true, "manage_evaluations": true, "view_reports": true, "system_config": true}'
);

-- Inserir avaliações de performance de exemplo
INSERT INTO public.performance_evaluations (
  professional_id, evaluator_id, evaluation_period_start, evaluation_period_end,
  productivity_score, quality_score, teamwork_score, communication_score,
  punctuality_score, initiative_score, protocol_adherence_score,
  consultations_count, procedures_count, patient_satisfaction_avg,
  strengths, improvement_areas, goals_next_period, general_comments,
  status
) VALUES
(
  (SELECT id FROM public.professionals WHERE full_name = 'Dr. Ana Silva Santos' LIMIT 1),
  (SELECT id FROM auth.users WHERE email = 'sessp.css@gmail.com' LIMIT 1),
  '2024-01-01',
  '2024-03-31',
  9.2, 9.5, 8.8, 9.0, 9.8, 8.5, 9.3,
  120, 45, 4.8,
  'Excelente conhecimento técnico, boa relação com pacientes, pontualidade exemplar',
  'Pode melhorar a comunicação com a equipe multidisciplinar',
  'Participar de curso de liderança, mentorear novos residentes',
  'Profissional dedicado e competente, referência na equipe',
  'approved'
),
(
  (SELECT id FROM public.professionals WHERE full_name = 'Enf. Carlos Roberto Santos' LIMIT 1),
  (SELECT id FROM auth.users WHERE email = 'sessp.css@gmail.com' LIMIT 1),
  '2024-01-01',
  '2024-03-31',
  8.5, 8.8, 9.2, 8.0, 8.5, 7.8, 9.0,
  0, 180, 4.6,
  'Excelente trabalho em equipe, muito dedicado aos pacientes',
  'Precisa melhorar a gestão do tempo e organização',
  'Curso de gestão de tempo, assumir mais responsabilidades administrativas',
  'Enfermeiro comprometido, mas com potencial para crescer',
  'approved'
);

-- Inserir avaliações de bem-estar de exemplo
INSERT INTO public.wellness_evaluations (
  professional_id, evaluation_date,
  stress_level, anxiety_level, depression_indicators, burnout_symptoms,
  energy_level, sleep_quality, physical_activity_frequency,
  job_satisfaction, work_environment_satisfaction, supervisor_relationship, colleague_relationship,
  work_life_balance, family_time_satisfaction, personal_time_satisfaction,
  overtime_hours_week, commute_time_minutes, financial_stress_level,
  main_concerns, suggestions_improvements, support_needed
) VALUES
(
  (SELECT id FROM public.professionals WHERE full_name = 'Dr. Ana Silva Santos' LIMIT 1),
  '2024-01-15',
  3, 2, 1, 2,
  8, 8, 4,
  9, 8, 9, 9,
  8, 7, 8,
  5, 45, 2,
  'Às vezes sinto pressão por resultados, mas no geral estou bem',
  'Mais tempo para pesquisa e desenvolvimento profissional',
  'Apoio para participar de congressos'
),
(
  (SELECT id FROM public.professionals WHERE full_name = 'Enf. Carlos Roberto Santos' LIMIT 1),
  '2024-01-15',
  7, 6, 4, 6,
  5, 5, 2,
  6, 5, 7, 8,
  4, 4, 5,
  12, 90, 7,
  'Muito cansaço, dificuldade para dormir, preocupação financeira',
  'Melhor distribuição de plantões, apoio psicológico',
  'Acompanhamento psicológico, revisão da carga horária'
);

-- Inserir alertas automáticos baseados nas avaliações
INSERT INTO public.system_alerts (
  professional_id, alert_type, severity, title, message,
  threshold_value, current_value, status
) VALUES
(
  (SELECT id FROM public.professionals WHERE full_name = 'Enf. Carlos Roberto Santos' LIMIT 1),
  'wellness_critical',
  'high',
  'Bem-estar Crítico Detectado',
  'O profissional apresenta indicadores de bem-estar abaixo do limite crítico. Recomenda-se intervenção imediata.',
  7.0,
  5.2,
  'active'
),
(
  (SELECT id FROM public.professionals WHERE full_name = 'Enf. Carlos Roberto Santos' LIMIT 1),
  'performance_low',
  'medium',
  'Performance Abaixo da Média',
  'A última avaliação de performance ficou abaixo da média esperada. Considere um plano de desenvolvimento.',
  8.0,
  7.8,
  'active'
);
