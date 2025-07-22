-- Configuração de Unidades e Sistema de Avaliações
-- Executar após os scripts anteriores

-- Tabela de configuração da unidade (dados da instalação)
CREATE TABLE IF NOT EXISTS public.unit_configuration (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  unit_name VARCHAR(255) NOT NULL,
  unit_type VARCHAR(100) NOT NULL, -- hospital, ubs, administrative, specialized
  cnpj VARCHAR(14),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  
  -- Dados específicos por tipo
  bed_capacity INTEGER, -- Para hospitais
  specialties TEXT[], -- Especialidades oferecidas
  services TEXT[], -- Serviços oferecidos
  operational_hours JSONB, -- Horários de funcionamento
  
  -- Configurações do sistema
  performance_evaluation_frequency INTEGER DEFAULT 90, -- dias
  wellness_evaluation_frequency INTEGER DEFAULT 30, -- dias
  
  -- Responsável pela unidade
  manager_name VARCHAR(255),
  manager_email VARCHAR(255),
  manager_phone VARCHAR(20),
  
  -- Status da configuração
  setup_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de tipos de usuário expandida
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  role VARCHAR(50) NOT NULL, -- admin, manager, professional, hr
  unit_id UUID REFERENCES public.unit_configuration(id),
  permissions JSONB, -- Permissões específicas
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de avaliações de performance (feitas pelos gestores)
CREATE TABLE IF NOT EXISTS public.performance_evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  evaluator_id UUID REFERENCES auth.users(id), -- Gestor que fez a avaliação
  evaluation_period_start DATE NOT NULL,
  evaluation_period_end DATE NOT NULL,
  
  -- Critérios de avaliação (0-10)
  productivity_score DECIMAL(3,1), -- Produtividade
  quality_score DECIMAL(3,1), -- Qualidade do trabalho
  teamwork_score DECIMAL(3,1), -- Trabalho em equipe
  communication_score DECIMAL(3,1), -- Comunicação
  punctuality_score DECIMAL(3,1), -- Pontualidade
  initiative_score DECIMAL(3,1), -- Iniciativa
  protocol_adherence_score DECIMAL(3,1), -- Aderência a protocolos
  
  -- Métricas quantitativas
  consultations_count INTEGER DEFAULT 0,
  procedures_count INTEGER DEFAULT 0,
  patient_satisfaction_avg DECIMAL(3,2),
  
  -- Comentários e observações
  strengths TEXT,
  improvement_areas TEXT,
  goals_next_period TEXT,
  general_comments TEXT,
  
  -- Score final calculado
  final_score DECIMAL(3,1),
  
  status VARCHAR(20) DEFAULT 'draft', -- draft, submitted, approved
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de autoavaliações de bem-estar (feitas pelos profissionais)
CREATE TABLE IF NOT EXISTS public.wellness_evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  evaluation_date DATE NOT NULL,
  
  -- Saúde Mental (1-10)
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  anxiety_level INTEGER CHECK (anxiety_level >= 1 AND anxiety_level <= 10),
  depression_indicators INTEGER CHECK (depression_indicators >= 1 AND depression_indicators <= 10),
  burnout_symptoms INTEGER CHECK (burnout_symptoms >= 1 AND burnout_symptoms <= 10),
  
  -- Saúde Física (1-10)
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  physical_activity_frequency INTEGER, -- vezes por semana
  health_problems TEXT[],
  
  -- Satisfação no Trabalho (1-10)
  job_satisfaction INTEGER CHECK (job_satisfaction >= 1 AND job_satisfaction <= 10),
  work_environment_satisfaction INTEGER CHECK (work_environment_satisfaction >= 1 AND work_environment_satisfaction <= 10),
  supervisor_relationship INTEGER CHECK (supervisor_relationship >= 1 AND supervisor_relationship <= 10),
  colleague_relationship INTEGER CHECK (colleague_relationship >= 1 AND colleague_relationship <= 10),
  
  -- Equilíbrio Vida-Trabalho (1-10)
  work_life_balance INTEGER CHECK (work_life_balance >= 1 AND work_life_balance <= 10),
  family_time_satisfaction INTEGER CHECK (family_time_satisfaction >= 1 AND family_time_satisfaction <= 10),
  personal_time_satisfaction INTEGER CHECK (personal_time_satisfaction >= 1 AND personal_time_satisfaction <= 10),
  
  -- Dados adicionais
  overtime_hours_week INTEGER DEFAULT 0,
  commute_time_minutes INTEGER,
  financial_stress_level INTEGER CHECK (financial_stress_level >= 1 AND financial_stress_level <= 10),
  
  -- Comentários livres
  main_concerns TEXT,
  suggestions_improvements TEXT,
  support_needed TEXT,
  
  -- Score final calculado
  final_wellness_score DECIMAL(3,1),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de planos de desenvolvimento (baseados nas avaliações)
CREATE TABLE IF NOT EXISTS public.development_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  performance_evaluation_id UUID REFERENCES public.performance_evaluations(id),
  created_by UUID REFERENCES auth.users(id),
  
  -- Objetivos e metas
  objectives TEXT[],
  training_needs TEXT[],
  timeline_months INTEGER,
  
  -- Ações específicas
  actions JSONB, -- Array de ações com prazos
  resources_needed TEXT[],
  
  status VARCHAR(20) DEFAULT 'active', -- active, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de alertas automáticos
CREATE TABLE IF NOT EXISTS public.system_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL, -- performance_low, wellness_critical, evaluation_due
  severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Dados contextuais
  related_evaluation_id UUID,
  threshold_value DECIMAL(3,1),
  current_value DECIMAL(3,1),
  
  status VARCHAR(20) DEFAULT 'active', -- active, acknowledged, resolved
  acknowledged_by UUID REFERENCES auth.users(id),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para calcular score de performance
CREATE OR REPLACE FUNCTION calculate_performance_score(eval_id UUID)
RETURNS DECIMAL(3,1) AS $$
DECLARE
  eval_record RECORD;
  calculated_score DECIMAL(3,1);
BEGIN
  SELECT * INTO eval_record FROM public.performance_evaluations WHERE id = eval_id;
  
  -- Cálculo baseado na média ponderada dos critérios
  calculated_score := (
    COALESCE(eval_record.productivity_score, 0) * 0.20 +
    COALESCE(eval_record.quality_score, 0) * 0.20 +
    COALESCE(eval_record.teamwork_score, 0) * 0.15 +
    COALESCE(eval_record.communication_score, 0) * 0.15 +
    COALESCE(eval_record.punctuality_score, 0) * 0.10 +
    COALESCE(eval_record.initiative_score, 0) * 0.10 +
    COALESCE(eval_record.protocol_adherence_score, 0) * 0.10
  );
  
  -- Atualizar o registro
  UPDATE public.performance_evaluations 
  SET final_score = calculated_score 
  WHERE id = eval_id;
  
  RETURN calculated_score;
END;
$$ LANGUAGE plpgsql;

-- Função para calcular score de bem-estar
CREATE OR REPLACE FUNCTION calculate_wellness_score(eval_id UUID)
RETURNS DECIMAL(3,1) AS $$
DECLARE
  eval_record RECORD;
  calculated_score DECIMAL(3,1);
  mental_health_score DECIMAL(3,1);
  physical_health_score DECIMAL(3,1);
  job_satisfaction_score DECIMAL(3,1);
  work_life_balance_score DECIMAL(3,1);
BEGIN
  SELECT * INTO eval_record FROM public.wellness_evaluations WHERE id = eval_id;
  
  -- Calcular componentes (invertendo scores negativos)
  mental_health_score := (
    (11 - COALESCE(eval_record.stress_level, 5)) +
    (11 - COALESCE(eval_record.anxiety_level, 5)) +
    (11 - COALESCE(eval_record.depression_indicators, 5)) +
    (11 - COALESCE(eval_record.burnout_symptoms, 5))
  ) / 4.0;
  
  physical_health_score := (
    COALESCE(eval_record.energy_level, 5) +
    COALESCE(eval_record.sleep_quality, 5) +
    LEAST(COALESCE(eval_record.physical_activity_frequency, 0) * 2, 10)
  ) / 3.0;
  
  job_satisfaction_score := (
    COALESCE(eval_record.job_satisfaction, 5) +
    COALESCE(eval_record.work_environment_satisfaction, 5) +
    COALESCE(eval_record.supervisor_relationship, 5) +
    COALESCE(eval_record.colleague_relationship, 5)
  ) / 4.0;
  
  work_life_balance_score := (
    COALESCE(eval_record.work_life_balance, 5) +
    COALESCE(eval_record.family_time_satisfaction, 5) +
    COALESCE(eval_record.personal_time_satisfaction, 5) +
    (11 - COALESCE(eval_record.financial_stress_level, 5))
  ) / 4.0;
  
  -- Score final ponderado
  calculated_score := (
    mental_health_score * 0.30 +
    physical_health_score * 0.25 +
    job_satisfaction_score * 0.25 +
    work_life_balance_score * 0.20
  );
  
  -- Atualizar o registro
  UPDATE public.wellness_evaluations 
  SET final_wellness_score = calculated_score 
  WHERE id = eval_id;
  
  RETURN calculated_score;
END;
$$ LANGUAGE plpgsql;

-- Trigger para calcular scores automaticamente
CREATE OR REPLACE FUNCTION trigger_calculate_performance_score()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_performance_score(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_calculate_wellness_score()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_wellness_score(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar triggers
DROP TRIGGER IF EXISTS performance_score_trigger ON public.performance_evaluations;
CREATE TRIGGER performance_score_trigger
  AFTER INSERT OR UPDATE ON public.performance_evaluations
  FOR EACH ROW EXECUTE FUNCTION trigger_calculate_performance_score();

DROP TRIGGER IF EXISTS wellness_score_trigger ON public.wellness_evaluations;
CREATE TRIGGER wellness_score_trigger
  AFTER INSERT OR UPDATE ON public.wellness_evaluations
  FOR EACH ROW EXECUTE FUNCTION trigger_calculate_wellness_score();
