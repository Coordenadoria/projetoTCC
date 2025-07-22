-- Políticas de segurança RLS (Row Level Security) para LGPD

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_alerts ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para professionals
CREATE POLICY "Admins can view all professionals" ON public.professionals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'rh_manager')
    )
  );

CREATE POLICY "Users can view own professional data" ON public.professionals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert professionals" ON public.professionals
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'rh_manager')
    )
  );

CREATE POLICY "Admins can update professionals" ON public.professionals
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'rh_manager')
    )
  );

-- Políticas para dados sensíveis de bem-estar (LGPD)
CREATE POLICY "Restricted wellness data access" ON public.wellness_data
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.professionals WHERE id = professional_id)
    OR EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'rh_manager')
    )
  );

-- Políticas para health_units (todos podem ver)
CREATE POLICY "Anyone can view health units" ON public.health_units
  FOR SELECT USING (true);

-- Políticas para training_modules (todos podem ver)
CREATE POLICY "Anyone can view training modules" ON public.training_modules
  FOR SELECT USING (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON public.professionals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
