#  Sistema gerenciador de pagamentos

## Rotas Públicas

- [] Realizar o login
- [] Realizar uma compra informando o produto

## 🛣️ Rotas Privadas

- [] Ativar/desativar um gateway
- [] Alterar a prioridade de um gateway
- [] CRUD de usuários com validação por roles
- [] CRUD de produtos com validação por roles
- [] Listar todos os clientes
- [] Detalhe do cliente e todas suas compras
- [] Listar todas as compras
- [] Detalhes de uma compra
- [] Realizar reembolso de uma compra junto ao gateway com validação por roles

## Funcionalidades

- [] realizar uma compra
- [] cobrança junto aos gateways
- [] ordem de prioridade definida
   [] Caso o primeiro gateway dê erro, deve-se fazer a tentativa no segundo gateway. 
   [] se algum der certo, nao informar erro.
- [] facilidade de adicionar novos gateways


## Setup Project 

```
## Typescript
$ npm tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2019 --module commonjs --noImplicitAny true
## Run the project:
$ ts-node ./src/index.ts
## Docker initiate image
$ docker image pull mysql:5.7
## Download image
$ docker-compose up
## Check docker containers
$ docker ps

```


## 📊 Níveis de Implementação

Nível 1
Escolha esse nível se você se considera iniciante ou júnior, por exemplo:
- Valor da compra vem direto pela API
- Gateways sem autenticação

Nível 2
Escolha esse nível se você é júnior experiente ou pleno, por exemplo:
- Valor da compra vem do produto e suas quantidades calculada via back
- Gateways com autenticação

Nível 3
Escolha esse nível se você é um pleno ou sênior, por exemplo:
- Valor da compra vem de múltiplos produtos e suas quantidades selecionadas e calculada via back
- Gateways com autenticação
- Usuários tem roles:
  - ADMIN - faz tudo
  - MANAGER - pode gerenciar produtos e usuários
  - FINANCE - pode gerenciar produtos e realizar reembolso
  - USER - pode o resto que não foi citado
- Uso de TDD
- Docker compose com MySQL, aplicação e mock dos gateways

## Sistema:

<img width="1408" height="887" alt="Image" src="https://github.com/user-attachments/assets/75feaa4e-b650-4d27-bc8f-a55efe4149f6" />
