# 🛍️ Laurs

**Laurs** é uma plataforma SaaS de e-commerce desenvolvida para pequenos negócios e empreendedores locais que desejam criar sua própria loja virtual e gerenciar seus produtos, pedidos e vendas em um único ambiente.

O projeto foi desenvolvido com uma arquitetura **Frontend + Backend**, buscando reproduzir o fluxo de uma aplicação de e-commerce real, desde a criação da loja e cadastro de produtos até o carrinho e gerenciamento de pedidos.

## ✨ Funcionalidades

- 🔐 Cadastro e login de usuários
- 🏪 Criação e gerenciamento de lojas
- 📦 Cadastro e gerenciamento de produtos
- 🎨 Produtos com variantes de cor e tamanho
- 🖼️ Upload de imagens dos produtos
- 🔎 Busca e filtros de produtos
- 🛒 Carrinho de compras
- 📋 Gerenciamento e acompanhamento de pedidos
- 📊 Dashboard administrativo
- 📈 Gráficos e indicadores da plataforma
- 👤 Área do usuário
- 🏬 Página pública das lojas
- 📱 Interface responsiva
- 🔒 Rotas protegidas com autenticação JWT

## 🎯 Objetivo do projeto

O objetivo do Laurs é aplicar, em um projeto completo, conceitos de desenvolvimento **Full Stack**, incluindo:

- desenvolvimento de interfaces com React;
- criação e consumo de APIs;
- autenticação com JWT;
- gerenciamento de estado;
- persistência de dados;
- relacionamento entre entidades no banco de dados;
- upload e armazenamento de imagens;
- gerenciamento de produtos e variantes;
- fluxo de carrinho e pedidos;
- criação de dashboards e indicadores.

> O Laurs foi desenvolvido como projeto de portfólio com foco em aprendizado prático e construção de uma aplicação próxima de um cenário real de mercado.

## 🛠️ Tecnologias utilizadas

### Frontend

- **React** — construção da interface da aplicação
- **TypeScript** — tipagem e maior segurança no desenvolvimento
- **Vite** — ambiente de desenvolvimento e build
- **Tailwind CSS** — estilização e criação da interface responsiva
- **Styled Components** — criação de componentes estilizados
- **React Router** — gerenciamento das rotas da aplicação
- **Lucide React** — biblioteca de ícones
- **Recharts** — criação dos gráficos do dashboard
- **Context API** — gerenciamento de estados globais, como autenticação e carrinho

### Backend

- **Node.js** — ambiente de execução do servidor
- **Express** — criação da API REST
- **TypeScript** — tipagem do backend
- **Prisma ORM** — comunicação e modelagem do banco de dados
- **PostgreSQL** — banco de dados
- **Supabase** — hospedagem do banco PostgreSQL
- **JWT (JSON Web Token)** — autenticação e proteção das rotas
- **Multer** — processamento de uploads
- **Cloudinary** — armazenamento das imagens dos produtos

### Deploy e ferramentas

- **Vercel** — hospedagem do frontend
- **Render** — hospedagem do backend
- **Git e GitHub** — versionamento e gerenciamento dos repositórios

## 📁 Estrutura dos projetos

O Laurs é dividido em dois repositórios, mantendo a separação entre frontend e backend.

### 🎨 Laurs Frontend

```text
Laurs-frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── constants/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── main.tsx
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

Responsável pela interface da aplicação, navegação, componentes reutilizáveis, gerenciamento de estado e comunicação com a API.

### ⚙️ Laurs Backend

```text
Laurs-backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── uploads/
├── package.json
└── tsconfig.json
```

Responsável pelas regras de negócio, autenticação, autorização, acesso ao banco de dados, gerenciamento de produtos, lojas e pedidos, além do processamento das imagens.

A separação dos projetos permite manter responsabilidades bem definidas entre a camada de interface e a camada de servidor.
## 🔄 Principais fluxos

### 🔐 Autenticação

1. O usuário realiza o cadastro ou login.
2. O backend valida as informações.
3. Após o login, um token JWT é gerado.
4. O frontend armazena o token e os dados do usuário.
5. As rotas protegidas utilizam esse token para autorizar o acesso.

### 🏪 Criação de loja

1. O usuário autenticado cria sua loja.
2. O backend associa a loja ao usuário responsável.
3. A loja recebe um `slug` para acesso público.
4. A loja pode ser acessada através de uma página pública.

### 📦 Cadastro de produtos

1. O usuário informa os dados do produto.
2. Pode adicionar imagens, categorias e variantes.
3. As imagens são enviadas para o Cloudinary.
4. As informações do produto e suas variantes são armazenadas no PostgreSQL através do Prisma.

### 🛒 Carrinho e pedidos

1. O cliente adiciona produtos ao carrinho.
2. Produtos com diferentes variantes são tratados individualmente.
3. O carrinho mantém os itens selecionados.
4. O cliente realiza o pedido.
5. O pedido é associado à loja e aos produtos comprados.
6. O status do pedido pode acompanhar etapas como pendente, processando, enviado, concluído ou cancelado.

### 📊 Painel administrativo

O administrador possui uma área para acompanhar informações da plataforma, incluindo:

* Usuários cadastrados
* Lojas cadastradas
* Produtos cadastrados
* Indicadores de crescimento
* Gráficos de dados da plataforma

## 🗄️ Banco de dados e modelagem

O Laurs utiliza **PostgreSQL** como banco de dados, com **Prisma ORM** para modelagem e acesso aos dados.

A estrutura foi organizada para representar os principais relacionamentos da plataforma:

* **User** → usuários da plataforma
* **Store** → lojas criadas pelos usuários
* **Product** → produtos cadastrados nas lojas
* **ProductImage** → imagens dos produtos
* **ProductVariant** → variantes de produtos, como cor, tamanho e estoque
* **Order** → pedidos realizados pelos clientes
* **OrderItem** → itens pertencentes a cada pedido

### 🔗 Principais relacionamentos

```text
User
 └── Store
      └── Product
           ├── ProductImage
           └── ProductVariant

Store
 └── Order
      └── OrderItem
           └── Product
```

O Prisma foi utilizado para facilitar a criação das relações, consultas e operações no banco de dados, mantendo a tipagem integrada ao TypeScript.

O banco de dados PostgreSQL é hospedado utilizando o **Supabase**.

## 🔐 Segurança e autenticação

O Laurs utiliza **JWT (JSON Web Token)** para autenticação e controle de acesso às áreas protegidas da aplicação.

O fluxo de autenticação funciona da seguinte forma:

```text
Login
  ↓
Backend valida as credenciais
  ↓
JWT é gerado
  ↓
Frontend armazena o token
  ↓
Requisições protegidas enviam o token
  ↓
Backend valida o token
  ↓
Acesso permitido
```

Além da autenticação, o backend também realiza verificações de autorização para garantir que determinadas operações sejam realizadas apenas por usuários com permissão.

Entre os recursos protegidos estão:

* Acesso ao dashboard
* Gerenciamento de lojas
* Cadastro e gerenciamento de produtos
* Gerenciamento de pedidos
* Área administrativa

A autenticação é integrada ao frontend através do **Context API**, permitindo que o estado do usuário e o token sejam utilizados pelas diferentes partes da aplicação.

## 🚀 Instalação e execução

O Laurs é dividido em dois projetos: **frontend** e **backend**.

### 📥 1. Clonar os repositórios

```bash
git clone <URL_DO_LAURS-FRONTEND>
git clone <URL_DO_LAURS-BACKEND>
```

### ⚙️ 2. Configurar o Backend

Entre na pasta do backend:

```bash
cd Laurs-backend
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Execute o projeto:

```bash
npm run dev
```

O backend será executado na porta `3333`.

### 🎨 3. Configurar o Frontend

Em outro terminal, entre na pasta do frontend:

```bash
cd Laurs-frontend
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente necessárias e execute:

```bash
npm run dev
```

O Vite disponibilizará o frontend localmente.

### 🗃️ 4. Banco de dados

O projeto utiliza PostgreSQL hospedado no Supabase e Prisma para gerenciamento da estrutura e acesso aos dados.

Após configurar as variáveis de ambiente do banco, as operações relacionadas ao Prisma podem ser executadas através dos scripts e comandos definidos no backend.


## 🧠 Aprendizados e desafios

Durante o desenvolvimento do Laurs, foram praticados conceitos de desenvolvimento **full-stack**, desde a construção da interface até a criação da API e integração com o banco de dados.

Entre os principais aprendizados estão:

* Desenvolvimento de aplicações com React e TypeScript
* Criação de componentes reutilizáveis
* Gerenciamento de estado com Context API
* Implementação de autenticação utilizando JWT
* Proteção de rotas e controle de acesso
* Desenvolvimento de APIs REST com Node.js e Express
* Modelagem de banco de dados utilizando Prisma
* Relacionamentos entre entidades no PostgreSQL
* Upload e gerenciamento de imagens com Cloudinary
* Criação de variantes de produtos e controle de estoque
* Desenvolvimento de carrinho e fluxo de pedidos
* Criação de dashboards com indicadores e gráficos
* Integração entre frontend, backend e banco de dados
* Organização de um projeto full-stack em diferentes repositórios

Um dos principais desafios foi integrar todas essas partes de forma consistente, garantindo que as informações fossem corretamente compartilhadas entre frontend, backend e banco de dados.

## 🌐 Links do projeto

### 💻 Repositórios (em produção )

* **Frontend:** [Laurs Frontend](https://github.com/DaniLaurs/Laurs-frontend)
* **Backend:** [Laurs Backend](https://github.com/DaniLaurs/Laurs-backend)

### 🚀 Aplicação

* **Frontend em produção:** [Laurs](URL_DO_FRONTEND_DEPLOY)
* **API em produção:** [Laurs API](URL_DA_API)

> Os links serão atualizados com as URLs dos projetos após a publicação das versões finais.


