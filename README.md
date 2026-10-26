# Teste de Servidores

Repositório criado para estudar o funcionamento de servidores HTTP e APIs com Node.js. O projeto será utilizado como um ambiente de testes para aprender autenticação, criação de rotas e outros conceitos que serão adicionados ao longo do tempo.

## Objetivos atuais

- Criar e testar rotas com Express.
- Entender middlewares.
- Registrar usuários temporariamente.
- Armazenar senhas usando hash com bcrypt.
- Autenticar usuários com tokens JWT.
- Proteger rotas que exigem autenticação.

## Tecnologias

- Node.js
- Express
- bcrypt
- JSON Web Token (JWT)

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
node src/app.js
```

O servidor ficará disponível em:

```text
http://localhost:3001
```

## Rotas atuais

| Método | Rota | Descrição | Autenticação |
| --- | --- | --- | --- |
| GET | `/` | Verifica se a API está funcionando | Não |
| GET | `/inicio` | Retorna uma mensagem inicial | Não |
| POST | `/registrar` | Registra um usuário com a senha em hash | Não |
| POST | `/login` | Valida o usuário e gera um token JWT | Não |
| GET | `/perfil` | Rota protegida para testar o token | Sim |

## Fluxo de autenticação

1. Envie um `POST` para `/registrar` com `email` e `senha`.
2. Envie um `POST` para `/login` com as mesmas credenciais.
3. Copie o token retornado pelo login.
4. Envie o token no cabeçalho `Authorization` ao acessar `/perfil`.

Exemplo de registro:

```bash
curl -X POST http://localhost:3001/registrar \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"123456"}'
```

Exemplo de login:

```bash
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"123456"}'
```

Exemplo de acesso à rota protegida:

```bash
curl http://localhost:3001/perfil \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## Observações

Este é um projeto de estudo e ainda não está preparado para produção.

- Os usuários são armazenados apenas em uma lista na memória.
- Os dados são perdidos quando o servidor é reiniciado.
- O segredo usado para assinar o JWT está diretamente no código.
- Ainda não há banco de dados, validações completas ou testes automatizados.
- O script `npm test` ainda é apenas o script padrão criado pelo npm.

## Próximos aprendizados

Entre os próximos passos estão separar melhor as responsabilidades do projeto, usar variáveis de ambiente, adicionar um banco de dados, melhorar as validações, criar testes automatizados e estudar boas práticas de segurança para autenticação.
