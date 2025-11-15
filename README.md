<h1 align="center">💳 Sistema Gerenciador de Pagamentos</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

<p align="center">
  Sistema robusto para gerenciamento de pagamentos com múltiplos gateways, autenticação de usuários e níveis de acesso.  
  Focado em escalabilidade, modularidade e boas práticas de desenvolvimento. 🚀
</p>

---

## ⚙️ Funcionalidades

- ✅ Realizar uma compra
- ⌛ Cobrança junto aos gateways  
- 🔄 Ordem de prioridade definida  
  - Caso o primeiro gateway falhe, o sistema tenta o próximo automaticamente  
  - Se algum gateway processar com sucesso, o erro **não é informado**
- 🧩 Facilidade para adicionar novos gateways  

---

## 🌐 Rotas Públicas

- ✅ Realizar login  
- ✅ Realizar uma compra informando o produto  

---

## 🔒 Rotas Privadas

- ✅ Ativar/desativar um gateway  
- ✅ Alterar prioridade de um gateway  
- ✅ CRUD de usuários 
  - [ ] validação por *roles*  
- ✅ CRUD de produtos com validação por *roles*  
  - [ ]com validação por *roles*  
- [ ] Listar todos os clientes  
- [ ] Detalhar cliente e todas suas compras  
- ✅ Listar todas as compras  
- ✅ Detalhar uma compra  
- [ ] Realizar reembolso
  - [ ]com validação por *roles*    

---

## 🧱 Estrutura de Roles

| Role | Permissão |
|------|------------|
| 🛠️ **ADMIN** | Acesso total ao sistema |
| 👨‍💼 **MANAGER** | Gerenciar produtos e usuários |
| 💰 **FINANCE** | Gerenciar produtos e realizar reembolsos |
| 🙋‍♂️ **USER** | Acesso básico às operações permitidas |

---

## 🧩 Setup do Projeto

```bash
# Instale as dependências
$ npm install

# Rode o projeto
$ npm run dev

# Rode os testes
$ npm run test

# Baixe a imagem do MySQL
$ docker image pull mysql:5.8

# Suba os containers
$ docker-compose up

# Verifique os containers ativos
$ docker ps
```
## 🧠 Níveis de Implementação

### 🥉 Nível 1 — Iniciante / Júnior
- Valor da compra vem direto pela API  
- Gateways sem autenticação  

### 🥈 Nível 2 — Júnior Experiente / Pleno
- Valor da compra calculado via backend  
- Gateways com autenticação  

### 🥇 Nível 3 — Pleno / Sênior
- Valor vem de múltiplos produtos e quantidades  
- Gateways autenticados  
- Usuários com roles avançadas  
- Uso de **TDD**  
- Docker Compose com **MySQL**, aplicação e mock dos gateways  

---

## 🖼️ Sistema em Execução

<p align="center">
  <img width="80%" src="https://github.com/user-attachments/assets/75feaa4e-b650-4d27-bc8f-a55efe4149f6" alt="Preview do sistema"/>
</p>

<p align="center">
  Feito com ❤️ para estudo e aprimoramento de boas práticas no desenvolvimento backend.
</p>
