# Todo

## Verify Account

- [x] Criar função para criar
- [x] Criar função para atualizar
- [x] Criar rota para atualizar
- [x] Adicionar testes a função de criar verify account
- [x] Adicionar testes a função de verificar account

## Tutorial

- [x] Criar função para criar
- [x] Criar função para completar tutorial
- [x] Criar rota para completar tutorial
- [x] Adicionar testes a função de criar tutorial
- [x] Adicionar testes a função de completar tutorial

# Settings

- [x] Criar função para criar
- [x] Criar função para atualizar
- [x] Criar rota para atualizar
- [x] Adicionar testes a função de criar
- [x] Adicionar testes a função de atualizar

## User

- [x] Criar função e rota para criar usuário local
  - [x] Adicionar testes a rota de criar usuário local
- [x] Criar função e rota para criar usuário via discord
  - [x] Adicionar testes a rota de criar usuário via discord
- [x] Adicionar testes a validação de usuário duplicado
- [x] Criar rota para buscar os dados via id
  - [ ] Adicionar testes a rota de buscar dados via id
- [x] Criar função e rota para re-gerar o PIN
  - [x] Adicionar testes para a função de re-gerar o PIN
- [x] Criar função para atualizar o campo "verified" do usuário
  - [ ] Adicionar testes para a função de atualizar o campo "verified" do usuário
- [ ] Criar função e rota para alterar username
  - [ ] Adicionar testes para a função alterar username
  - Um membro da staff Tech não pode alterar o username
- [ ] Criar função e rota para alterar email
  - [ ] Adicionar testes para a função alterar email
- [ ] Criar função e rota para alterar senha
  - [ ] Pensar no fluxo de alteração de senha
    - Ele deve ter 2 etapas, uma do envio de email com um token para alteração de senha e outra que realmente altera a senha baseado naquele token
  - [ ] Adicionar testes para a função alterar senha

## User Token

- [x] Criar função para criar
- [x] Criar função para atualizar
- [x] Criar rota para atualizar
- [x] Adicionar validações a função de criar
- [x] Adicionar validações a função de atualizar
- [x] Adicionar testes a função de criar
- [x] Adicionar testes a função de atualizar

## Terms And Policies

- [x] Criar entidade de Terms And Policies
- [x] Criar função e rota para aceitar termos de uso
  - Só criar o registro no banco quando ele aceitar
  - Recebe como parametro o userId e a versão
- [x] Criar rota para verificar se o usuário aceitou os termos de uso
  - Recebe como parametro o userId e a versão

# Migrations

- [ ] Escrever migration da tabela settings
- [ ] Escrever migration da tabela terms_and_policies
- [ ] Escrever migration da tabela tutorials
- [ ] Escrever migration da tabela users
- [ ] Escrever migration da tabela user_tokens
- [ ] Escrever migration da tabela verify_accounts

## Etc

- [x] Revisar os testes para conferir se eles seguem um padrão
- [x] Converter o projeto para ser uma REST API normal
- [ ] Testar as paradas
- [ ] Criar funções no util de errors para retornar as mensagens de erros
  - required field
  - wrong type
  - invalid enum value
- [ ] Descomentar bloqueio de coverage de testes
- [ ] Escrever a documentação do padrão usado para fazer testes
