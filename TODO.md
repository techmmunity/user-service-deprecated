# Todo

## Verify Account

- [x] Criar função para criar
  - [x] Adicionar testes a função de criar
- [x] Criar função e rota para atualizar
  - [x] Adicionar testes a função de atualizar

## User

- [x] Criar função e rota para criar usuário **local**
  - [ ] Adicionar testes a rota de criar usuário local
- [ ] Criar função e rota para criar usuário via **discord**
  - [ ] Adicionar testes a rota de criar usuário via discord
- [ ] Criar função e rota para criar usuário via **google**
  - [ ] Adicionar testes a rota de criar usuário via google
- [ ] Criar função e rota para criar usuário via **linkedin**
  - [ ] Adicionar testes a rota de criar usuário via linkedin
- [ ] Criar função e rota para criar usuário via **github**
  - [ ] Adicionar testes a rota de criar usuário via github
- [x] Criar rota para buscar os dados via id
  - [ ] Adicionar testes a rota de buscar dados via id
- [x] Criar função e rota para re-gerar o PIN
  - [ ] Adicionar testes para a função de re-gerar o PIN
- [x] Dividir UserEntity em mais entidades (google, discord, linkedin, github, etc)
  - [x] Excluir UserToken Service e Mergea-lo a essas novas tabelas

## Etc

- [x] Revisar os testes para conferir se eles seguem um padrão
- [x] Converter o projeto para ser uma REST API normal
- [x] Descomentar bloqueio de coverage de testes
- [ ] Testar as paradas
- [ ] Escrever a documentação do padrão usado para fazer testes

# Migrations

- [ ] Gerar migrations

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
