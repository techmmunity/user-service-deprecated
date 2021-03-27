# Todo

## Trilha do que deve ser feito (NESSA EXATA ORDEM!!!!)

- [x] Testar se com o cascade na entidade, ela deixa criar as relations
  - FUNCIONA!!!!!!!!!!
- [x] Criar a função e rota de criar um contato no serviço de Contact
  - [x] Adicionar testes
- [x] Trocar o nome de todos os arquivos "validation" para "validate"
- [x] Revisar função de criar usuário local, para criar também os contacts
  - [x] Adicionar testes
- [x] Criar a função e rota de verificar um usuário no serviço de User
  - Fluxo:
    - Recebe o userID e PIN (verificationCode)
    - Seta p validatedAt
    - Regera o PIN
    - Retorna um 204
  - [x] Adicionar testes
- [x] Adicionar testes a função de re-gen PIN no User Service
- [ ] Criar rota de login local
  - [ ] Adicionar testes
- [ ] Criar função de criar um usuário via discord no serviço de User
  - [ ] Adicionar testes
- [ ] Criar rota de login discord
  - [ ] Adicionar testes
- [ ] Checar se a UI do Swagger da rota de criar um contato funciona, caso não funcione, passar uma função: `type: () => Contact`
- [ ] Gerar migrations
- [ ] Estudar a respeito de Kubernetes e começar a integração

## Todo Upgrades

- [ ] Criar uma função para alterar o contato primario do usuário.
  - [ ] Adicionar testes
- [ ] Criar função e rota para alterar username
  - [ ] Adicionar testes para a função alterar username
  - Um membro da staff Tech não pode alterar o username
- [ ] Criar função e rota para alterar email
  - [ ] Adicionar testes para a função alterar email
- [ ] Criar função e rota para alterar senha
  - [ ] Pensar no fluxo de alteração de senha
    - Ele deve ter 2 etapas, uma do envio de email com um token para alteração de senha e outra que realmente altera a senha baseado naquele token
  - [ ] Adicionar testes para a função alterar senha
