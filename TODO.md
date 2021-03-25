# Todo

## Verify Account

- [x] Criar função e rota para criar
  - [x] Adicionar testes a função de criar
- [x] Criar função e rota para atualizar
  - [x] Adicionar testes a função de atualizar

## User

- [x] Criar função e rota para criar usuário **local**
  - [x] Adicionar testes a rota de criar usuário local
- [x] Criar função e rota para criar usuário via **discord**
  - [x] Adicionar testes a rota de criar usuário via discord
- [ ] Criar função e rota para criar usuário via **google**
  - [ ] Adicionar testes a rota de criar usuário via google
- [ ] Criar função e rota para criar usuário via **linkedin**
  - [ ] Adicionar testes a rota de criar usuário via linkedin
- [ ] Criar função e rota para criar usuário via **github**
  - [ ] Adicionar testes a rota de criar usuário via github
- [x] Adicionar testes a validação de usuário duplicado
- [x] Criar rota para buscar os dados via id
  - [x] Adicionar testes a rota de buscar dados via id
- [x] Criar função e rota para re-gerar o PIN
  - [x] Adicionar testes para a função de re-gerar o PIN
- [x] Criar função para atualizar o campo "verified" do usuário
  - [x] Adicionar testes para a função de atualizar o campo "verified" do usuário
- [ ] Dividir UserEntity em mais entidades (google, discord, linkedin, github, etc)
  - [ ] Excluir UserToken Service e Mergea-lo a essas novas tabelas

## User Token

- [x] Criar função e rota para criar
  - [x] Adicionar testes a função de criar
- [x] Criar função e rota para atualizar
  - [x] Adicionar testes a função de atualizar

## Etc

- [x] Revisar os testes para conferir se eles seguem um padrão
- [x] Converter o projeto para ser uma REST API normal
- [x] Descomentar bloqueio de coverage de testes
- [ ] Testar as paradas
- [ ] Escrever a documentação do padrão usado para fazer testes

# Migrations

- [x] Escrever migration da tabela users
- [x] Escrever migration da tabela user_tokens
- [x] Escrever migration da tabela verify_accounts

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
