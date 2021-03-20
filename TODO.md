# Todo

## Verify Account

- [x] Criar função para criar
- [x] Criar função para atualizar
- [x] Criar rota para atualizar
- [x] Adicionar testes a função de criar verify account
- [x] Adicionar testes a função de verificar account

## User

- [x] Criar função e rota para criar usuário local
  - [x] Adicionar testes a rota de criar usuário local
- [x] Criar função e rota para criar usuário via discord
  - [x] Adicionar testes a rota de criar usuário via discord
- [x] Adicionar testes a validação de usuário duplicado
- [x] Criar rota para buscar os dados via id
  - [x] Adicionar testes a rota de buscar dados via id
- [x] Criar função e rota para re-gerar o PIN
  - [x] Adicionar testes para a função de re-gerar o PIN
- [x] Criar função para atualizar o campo "verified" do usuário
  - [ ] Adicionar testes para a função de atualizar o campo "verified" do usuário

## User Token

- [x] Criar função para criar
- [x] Criar função para atualizar
- [x] Criar rota para atualizar
- [x] Adicionar validações a função de criar
- [x] Adicionar validações a função de atualizar
- [x] Adicionar testes a função de criar
- [x] Adicionar testes a função de atualizar

## Etc

- [x] Revisar os testes para conferir se eles seguem um padrão
- [x] Converter o projeto para ser uma REST API normal
- [x] Descomentar bloqueio de coverage de testes
- [ ] Testar as paradas
- [ ] Escrever a documentação do padrão usado para fazer testes

# Migrations

- [ ] Escrever migration da tabela users
- [ ] Escrever migration da tabela user_tokens
- [ ] Escrever migration da tabela verify_accounts

# Todo Upgrades

## User

- [ ] Criar função e rota para alterar username
  - [ ] Adicionar testes para a função alterar username
  - Um membro da staff Tech não pode alterar o username
- [ ] Criar função e rota para alterar email
  - [ ] Adicionar testes para a função alterar email
- [ ] Criar função e rota para alterar senha
  - [ ] Pensar no fluxo de alteração de senha
    - Ele deve ter 2 etapas, uma do envio de email com um token para alteração de senha e outra que realmente altera a senha baseado naquele token
  - [ ] Adicionar testes para a função alterar senha
