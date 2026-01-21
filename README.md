# Projeto – Lista de Tarefas (Fullstack)

Aplicação fullstack desenvolvida com:

- Next.js (App Router)
- TypeScript
- Shadcn UI
- Prisma ORM
- PostgreSQL

Arquitetura baseada em:

- `app/page.tsx` como orquestrador de estado e UI
- `actions/` como camada de servidor (Server Actions)
- `components/` para componentes reutilizáveis
- Prisma centralizado em `lib/prisma.ts`

Vídeo-aula base:  
“Projeto Fullstack com Next.js para Iniciantes”  
https://www.youtube.com/watch?v=oEVZk16__mU

Este arquivo serve como **roteiro para recriar o projeto do zero**.

---

## 1 – Criar o projeto Next.js

No terminal, dentro da pasta desejada:

npx create-next-app@latest .

Ativar:

- TypeScript
- App Router
- ESLint

---

## 2 – Criar repositório Git

git init  
git add .  
git commit -m "Initial commit"  
git branch -m main  
git remote add origin <link-do-repositorio>  
git push -u origin main  

---

## 3 – Instalar Shadcn UI

npx shadcn@latest init

Adicionar componentes conforme necessário:

npx shadcn@latest add button  
npx shadcn@latest add card  
npx shadcn@latest add input  
npx shadcn@latest add badge  
npx shadcn@latest add dialog  
npx shadcn@latest add alert-dialog  

Ícones:  
https://lucide.dev

---

## 4 – Estrutura base do projeto

/actions  
  create-task.ts  
  get-tasks.ts  
  delete-task.ts  
  delete-tasks-completed.ts  
  toggle-task.ts  
  update-task.ts  

/app  
  layout.tsx  
  page.tsx  
  globals.css  

/components  
  edit-task.tsx  
  filter.tsx  
  /ui (gerado pelo shadcn)  

/lib  
  prisma.ts  

/prisma  
  schema.prisma  
  migrations/  

---

## 5 – Configurar Prisma + PostgreSQL

### 5.1 Instalar

npm install prisma --save-dev  
npm install @prisma/client  

### 5.2 Inicializar

npx prisma init

### 5.3 Configurar .env

DATABASE_URL="postgresql://postgres:1234@localhost:5432/tarefas?schema=public"

### 5.4 Definir model

model Task {  
  id        Int      @id @default(autoincrement())  
  title     String  
  completed Boolean  @default(false)  
  createdAt DateTime @default(now())  
  updatedAt DateTime @updatedAt  
}

### 5.5 Criar banco

npx prisma migrate dev --name init

---

## 6 – Prisma Client centralizado

Criar lib/prisma.ts:

- Um único PrismaClient
- Exportado globalmente
- Usado apenas via:

import { prisma } from "@/lib/prisma"

---

## 7 – Server Actions

Criar pasta:

/actions

Cada arquivo:

- Usa "use server"
- Importa prisma
- Executa apenas lógica de banco

Exemplos:

- get-tasks.ts → listar tarefas
- create-task.ts → criar
- toggle-task.ts → alternar status
- delete-task.ts → excluir individual
- delete-tasks-completed.ts → exclusão em massa

O front **nunca acessa o Prisma diretamente**.

---

## 8 – page.tsx (orquestrador)

Responsabilidades do page.tsx:

- Manter estado:
  - taskList
  - currentFilter
  - loading
- Derivar:
  - taskCompletedCount
  - filteredTasks
- Chamar Server Actions
- Controlar UI e UX
- Coordenar componentes:
  - <Filter />
  - <EditTask />
  - Lista
  - Barra de progresso
  - AlertDialog

Sem duplicar estado derivado.  
Sem useEffect para filtros.

---

## 9 – Componentes

### Filter

Responsável apenas por:

- Exibir filtros
- Chamar setCurrentFilter
- Mostrar "Concluídas" apenas se houver tarefas concluídas

export type FilterValue = "all" | "pending" | "completed"

Recebe:

currentFilter  
setCurrentFilter  
taskCompletedCount  

---

## 10 – Regras de Arquitetura

- page.tsx controla estado
- components/ são puros
- actions/ acessam banco
- Nada de Prisma no client
- Nada de estado duplicado
- Filtros sempre derivados
- UX sempre orientada por estado

---

Este README serve como **manual de criação de qualquer app fullstack nesse padrão**.