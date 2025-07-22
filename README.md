# Sistema de Gerenciamento de Emendas Parlamentares

Sistema completo para gerenciamento de emendas parlamentares com backend FastAPI e frontend React.

## 🚀 Funcionalidades

### 🔐 Autenticação
- Login com nome de usuário e senha
- Dois perfis: "Administrador" e "Técnico"
- Proteção de rotas por perfil
- JWT para autenticação

### 📊 Dashboard do Administrador
- Visualização de todas as emendas
- Atribuição de emendas a técnicos
- Edição de campos administrativos
- Importação de planilhas Excel
- Exportação de relatórios

### 📋 Dashboard do Técnico
- Visualização apenas das emendas atribuídas
- Edição de campos técnicos
- Controle de status e análises

### 📦 Importação/Exportação
- Upload de planilhas .xlsx
- Exportação de relatórios em Excel
- Atualização incremental de dados

## 🛠️ Tecnologias

### Backend
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para Python
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **Pandas** - Manipulação de planilhas
- **Uvicorn** - Servidor ASGI

### Frontend
- **React** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento

## 📁 Estrutura do Projeto

\`\`\`
sistema-emendas/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── utils.py
│   │   └── routes/
│   │       ├── auth.py
│   │       ├── admin.py
│   │       └── tecnico.py
│   ├── scripts/
│   │   └── create_initial_users.sql
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   └── App.tsx
    ├── package.json
    └── tailwind.config.js
\`\`\`

## 🚀 Como Executar

### Backend

1. Instalar dependências:
\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

2. Executar o servidor:
\`\`\`bash
uvicorn app.main:app --reload
\`\`\`

O backend estará disponível em `http://localhost:8000`

### Frontend

1. Instalar dependências:
\`\`\`bash
cd frontend
npm install
\`\`\`

2. Executar o desenvolvimento:
\`\`\`bash
npm start
\`\`\`

O frontend estará disponível em `http://localhost:3000`

## 👥 Usuários Padrão

- **Administrador**: `admin` / `123456`
- **Técnico 1**: `tecnico1` / `123456`
- **Técnico 2**: `tecnico2` / `123456`

## 📋 Funcionalidades Detalhadas

### Administrador
- ✅ Visualizar todas as emendas
- ✅ Atribuir emendas a técnicos
- ✅ Editar campos administrativos
- ✅ Importar planilhas Excel
- ✅ Exportar relatórios
- ✅ Gerenciar status das emendas

### Técnico
- ✅ Visualizar emendas atribuídas
- ✅ Editar campos técnicos
- ✅ Atualizar análises e observações
- ✅ Controlar datas e status

## 🔧 API Endpoints

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro

### Administrador
- `GET /admin/emendas` - Listar emendas
- `PUT /admin/emendas/{id}` - Atualizar emenda
- `POST /admin/emendas/{id}/atribuir` - Atribuir emenda
- `GET /admin/tecnicos` - Listar técnicos
- `POST /admin/upload-excel` - Upload planilha
- `GET /admin/export-excel` - Exportar relatório

### Técnico
- `GET /tecnico/emendas` - Listar minhas emendas
- `PUT /tecnico/emendas/{id}` - Atualizar minha emenda

## 📊 Campos das Emendas

### Campos Administrativos
- Técnico Responsável
- Data da Liberação
- Conferencista
- Data Recebimento Demanda
- Data de Liberação da Assinatura
- Falta Assinatura
- Assinatura
- Publicação
- Vigência
- Encaminhado em
- Concluída em

### Campos Técnicos
- Área
- Estágio Situação da Demanda
- Situação
- Análise Demanda
- Data Análise Demanda
- Motivo do Retorno da Diligência
- Data do Retorno da Diligência
- Data do Retorno
- Observação Motivo do Retorno
- Data Liberação da Assinatura - Conferencista

## 🔒 Segurança

- Autenticação JWT
- Proteção de rotas por perfil
- Validação de dados com Pydantic
- Hash de senhas com bcrypt
- CORS configurado

## 📈 Próximas Funcionalidades

- [ ] Notificações em tempo real
- [ ] Relatórios avançados com gráficos
- [ ] Histórico de alterações
- [ ] Filtros avançados
- [ ] Busca por texto
- [ ] Backup automático
- [ ] API de integração

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
