-- Script para criar usuários iniciais
INSERT INTO usuarios (nome_usuario, senha_hash, perfil, nome_completo, ativo) VALUES
('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXzgVjHUG2Em', 'Administrador', 'Administrador do Sistema', true),
('tecnico1', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXzgVjHUG2Em', 'Técnico', 'João Silva', true),
('tecnico2', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXzgVjHUG2Em', 'Técnico', 'Maria Santos', true);

-- Senha padrão para todos: "123456"

-- Inserir algumas emendas de exemplo
INSERT INTO emendas (numero_emenda, status) VALUES
('EMD-2024-001', 'Pendente'),
('EMD-2024-002', 'Em Andamento'),
('EMD-2024-003', 'Concluída');
