<h1 align="center" font-family="pattaya">Costumer Contacts</h1><br>

<h2 font-family="pattaya">Tecnologias utilizadas</h2>
<div style="display: inline_block"><br>
<img align="center" alt="Alexandra-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
   <img align="center" alt="Alexandra-Node" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
  <img align="center" alt="Alexandra-postgreSQL" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg">  
</div><br>

<h2 font-family="pattaya">Descrição</h2><br>
<p font-family="robotto" font-size="16px" line-height="34px" align="justify">
A API é referente a uma aplicação de agenda digital, onde um cliente pode criar um perfil, cadastrar, atualizar ou deletar os seus contatos.
</p><br>

<h2 font-family="pattaya">Libs utilizadas</h2><br>
<ul style="display: inline_block">
<li font-family="robotto" font-size="16px">bcryptjs: "^2.4.3",</li>
<li font-family="robotto" font-size="16px">cors: "^2.8.5",</li>
<li font-family="robotto" font-size="16px">dotenv: "^16.0.3"</li>
<li font-family="robotto" font-size="16px">express: "^4.18.2"</li>
<li font-family="robotto" font-size="16px">express-async-errors: "^3.1.1"</li>
<li font-family="robotto" font-size="16px">jsonwebtoken: "^9.0.0"</li>
<li font-family="robotto" font-size="16px">pdfkit: "^0.13.0"</li>
<li font-family="robotto" font-size="16px">pg: "^8.11.0"</li>
<li font-family="robotto" font-size="16px">pg-format: "^1.0.4"</li>
<li font-family="robotto" font-size="16px">reflect-metadata: "^0.1.13">
<li font-family="robotto" font-size="16px">typeorm: "0.3.15"</li>
<li font-family="robotto" font-size="16px">zod: "^3.21.4"</li>
</ul><br>


# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://yarnpkg.com/package/zod)

A URL base da aplicação:
http://localhost:3000

---

## 2. Diagrama de Entidade de Relacionamentos (DER)
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama DER da API definindo tabelas utilizadas e  seus relacionamentos no banco de dados.

![DER](costumers_contact.png)

---
## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do PostgresSQL e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:generate src/migrations/create<nome-da-class> -d src/data-source.ts
yarn typeorm migration:run -d src/data-source.ts
```

## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Na aplicação foi usada a biblioteca [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para criação de token e autenticação do cliente.

---
## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

## **clients**

A tabela clients é definida como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | number | Identificador único do cliente                  |
| name       | string | O nome do cliente.                              |
| email      | string | O e-mail do cliente.                            |
| password   | string | A senha de acesso do cliente                   |
| phone     | string | O telefone do cliente   |
| image    | text | A imagem do cliente    |
| gender    | string  | enum com as opções: "male", "female", "no binary", "I prefer not to say"   |
| registerDate    | timestamp | O registro do cadastro do cliente, contendo data e hora    |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /clients     | Criação de um cliente.                  |
| GET      | /clients     | Lista todos os clientes.                 |
| GET      | /clients/:id | Lista um cliente, usando seu ID como parâmetro|
| PATCH    | /clients/:id | Atualiza um cliente, usando seu ID como parâmetro|
| DELETE   | /clients/:id | Deleta um cliente, usando seu ID como parâmetro| 

---

### 1.1. **Criar Cliente**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
POST /clients
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Alexandra",
	"email": "alexandra@mail.com",
	"password": "1234",
	"phone": "2198215-2935",
	"gender": "female"
}
```
### Resposta da Requisição:
```json
{
	"name": "Alexandra",
	"email": "alexandra@mail.com",
	"phone": "2198215-2935",
	"image": null,
	"gender": "female",
	"id": 3,
	"registerDate": "2023-05-25T20:18:18.418Z"
}

OBS: Não há retorno da senha na resposta da requisição.
```
### 1.2. **Listar todos Clientes**
```
GET /clients
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente para acesso
Content-type: application/json
```

### Corpo da Requisição:
```
Não possui body.
```
### Resposta da Requisição:
```json
[
	{
		"name": "Nathalia",
		"email": "nath@mail.com",
		"phone": "2198996-2345",
		"image": null,
		"gender": "female",
		"id": 1,
		"registerDate": "2023-05-25T15:48:28.349Z"
	},
	{
		"name": "alexandra miranda",
		"email": "alexandra@mail.com",
		"phone": "21989524732",
		"image": "https://media.licdn.com/dms/image/D4D35AQEVMxuoL3lcZQ/profile-framedphoto-shrink_200_200/0/1674832023995?e=1685797200&v=beta&t=i0NK_gXPxyzEMhvXsva448x31LWDz9LSGctSTTLT9bo",
		"gender": "female",
		"id": 6,
		"registerDate": "2023-05-27T13:07:56.267Z"
	},
	{
		"name": "Juliana Airana",
		"email": "julis@mail.com",
		"phone": "21989524732",
		"image": "https://media.licdn.com/dms/image/D4D35AQHDH8qFcKr5Lg/profile-framedphoto-shrink_200_200/0/1674830745435?e=1685804400&v=beta&t=49POXym0IkqK7mprhTMLjVbQ7xIN7PIPcJfBcPKrdR4",
		"gender": "female",
		"id": 7,
		"registerDate": "2023-05-27T14:49:18.597Z"
	}
]
```
### 1.3. **Listar Cliente por id**
### Exemplo de Request:
```
GET /clients/:id
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente para acesso
Content-type: application/json
```

### Corpo da Requisição:
```
Não possui body.
```
### Resposta da Requisição:
```json
{
	"client": {
		"name": "alexandra miranda",
		"email": "alexandra@mail.com",
		"phone": "21989524732",
		"image": "https://media.licdn.com/dms/image/D4D35AQEVMxuoL3lcZQ/profile-framedphoto-shrink_200_200/0/1674832023995?e=1685797200&v=beta&t=i0NK_gXPxyzEMhvXsva448x31LWDz9LSGctSTTLT9bo",
		"gender": "female",
		"id": 6,
		"registerDate": "2023-05-27T13:07:56.267Z"
	},
	"contacts": [
		{
			"id": 5,
			"fullName": "Junior",
			"email": "junior@mail.com",
			"phone": "21982150583",
			"registerDate": "2023-05-29T01:15:59.044Z",
			"gender": "male"
		},
		{
			"id": 4,
			"fullName": "Paulo Santos",
			"email": "paulo@mail.com",
			"phone": "21989964562",
			"registerDate": "2023-05-28T23:19:37.833Z",
			"gender": "male"
		},
		{
			"id": 8,
			"fullName": "Juliana Airana",
			"email": "julis@mail.com",
			"phone": "21989524733",
			"registerDate": "2023-05-29T19:16:41.081Z",
			"gender": "female"
		}
	]
}

OBS: Nesta rota há o array de contacts na resposta da requisição.
```
### 1.4. **Atualizar Cliente por id**

### Exemplo de Request:
```
PATCH /clients/:id
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente para acesso
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "alexandra86@mail.com"
}
```
### Resposta da Requisição:
```json
{
	"name": "Alexandra",
	"email": "alexandra86@mail.com",
	"phone": "2198215-2935",
	"image": null,
	"gender": "female",
	"id": 3,
	"registerDate": "2023-05-25T20:18:18.418Z"
}
```

### 1.5. **Deletar Cliente por id**

### Exemplo de Request:
```
DELETE /clients/:id
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente para acesso
Content-type: application/json
```

### Corpo da Requisição:
```
Não possui body
```
### Resposta da Requisição:
```
Retorna apenas o status 204.
```


### 2.1. **Login**

[ Voltar para os Endpoints ](#5-endpoints)

### `/login`

### Exemplo de Request:
```
POST /login
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "alexandra@mail.com",
	"password": "1234",
}
```
### Resposta da Requisição:
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhhbmRyYUBtYWlsLmNvbSIsImlhdCI6MTY4NTQ3NjAwMywiZXhwIjoxNjg1NTYyNDAzLCJzdWIiOiI2In0.xa0amJ3kE3-Pjl8ifzwKhAxaQUN2Ngu1l2boKkD4iLM"
}
```
## **contacts**

A tabela contacts é definida como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | number | Identificador único do contato                  |
| fullName       | string | O nome do contato.                              |
| email      | string | O e-mail do contato.                            |
| phone     | string | O telefone do contato   |
| gender    | string  | enum com as opções: "male", "female", "Not binary", "Not informed"   |
| registerDate    | timestamp | O registro do cadastro do contato, contendo data e hora    |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /contacts     | Criação de um contato.                  |
| GET      | /contacts     | Lista todos os contatos.                 |
| GET      | /contacts/:id | Lista um contato, usando seu ID como parâmetro|
| PATCH    | /contacts/:id | Atualiza um contato, usando seu ID como parâmetro|
| DELETE   | /contacts/:id | Deleta um contato, usando seu ID como parâmetro| 

---

### 3.1. **Criar Contato**

[ Voltar para os Endpoints ](#5-endpoints)

### `/contacts`

### Exemplo de Request:
```
POST /contacts
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"fullName": "Luciano Almeida",
	"phone": "21985164220",
	"gender": "male",
	"email": "luciano@mail.com"
}
```
### Resposta da Requisição:
```json
{
	"fullName": "Luciano Almeida",
	"email": "luciano@mail.com",
	"phone": "21985164220",
	"gender": "male",
	"id": 7,
	"registerDate": "2023-05-29T01:19:05.659Z"
}
```
### 1.2. **Listar todos Contatos**
```
GET /contacts
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente para acesso
Content-type: application/json
```

### Corpo da Requisição:
```
Não possui body.
```
### Resposta da Requisição:
```json
[
	{
		"fullName": "Felipe Santos",
		"email": null,
		"phone": "21989964562",
		"gender": "male",
		"id": 1,
		"registerDate": "2023-05-25T15:49:11.754Z"
	},
	{
		"fullName": "Paulo Santos",
		"email": "paulo@mail.com",
		"phone": "21989964562",
		"gender": "male",
		"id": 3,
		"registerDate": "2023-05-25T19:56:16.157Z"
	}
]
```
### 3.3. **Listar Contato por id**
### Exemplo de Request:
```
GET /contacts/:id
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente  para acesso
Content-type: application/json
```

### Corpo da Requisição:
```
Não possui body.
```
### Resposta da Requisição:
```json
{
	"fullName": "Junior",
	"email": "junior@mail.com",
	"phone": "21982150583",
	"gender": "male",
	"id": 5,
	"registerDate": "2023-05-29T01:15:59.044Z",
	"client": {
		"name": "alexandra miranda",
		"email": "alexandra@mail.com",
		"phone": "21989524732",
		"image": "https://media.licdn.com/dms/image/D4D35AQEVMxuoL3lcZQ/profile-framedphoto-shrink_200_200/0/1674832023995?e=1685797200&v=beta&t=i0NK_gXPxyzEMhvXsva448x31LWDz9LSGctSTTLT9bo",
		"gender": "female",
		"id": 6,
		"registerDate": "2023-05-27T13:07:56.267Z"
	}
}

OBS: Nesta rota há o objeto client na resposta da requisição.
```
### 3.4. **Atualizar Contato por id**

### Exemplo de Request:
```
PATCH /contacts/:id
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente para acesso
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "paulo@mail.com"
}
```
### Resposta da Requisição:
```json
{
	"fullName": "Paulo Santos",
	"email": "paulo@mail.com",
	"phone": "21989964562",
	"gender": "male",
	"id": 3,
	"registerDate": "2023-05-25T19:56:16.157Z"
}
```

### 3.5. **Deletar Contato por id**

### Exemplo de Request:
```
DELETE /contacts/:id
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente para acesso
Content-type: application/json
```

### Corpo da Requisição:
```
Não possui body
```
### Resposta da Requisição:
```
Retorna apenas o status 204.
```

### Exemplo de possíveis erros de request.
### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id     | number     | Identificador único do cliente (Client) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"client": {
		"name": "alexandra miranda",
		"email": "alexandra@mail.com",
		"phone": "21989524732",
		"image": "https://media.licdn.com/dms/image/D4D35AQEVMxuoL3lcZQ/profile-framedphoto-shrink_200_200/0/1674832023995?e=1685797200&v=beta&t=i0NK_gXPxyzEMhvXsva448x31LWDz9LSGctSTTLT9bo",
		"gender": "female",
		"id": 6,
		"registerDate": "2023-05-27T13:07:56.267Z"
	},
	"contacts": [
		{
			"id": 5,
			"fullName": "Junior",
			"email": "junior@mail.com",
			"phone": "21982150583",
			"registerDate": "2023-05-29T01:15:59.044Z",
			"gender": "male"
		},
		{
			"id": 4,
			"fullName": "Paulo Santos",
			"email": "paulo@mail.com",
			"phone": "21989964562",
			"registerDate": "2023-05-28T23:19:37.833Z",
			"gender": "male"
		},
		{
			"id": 8,
			"fullName": "Juliana Airana",
			"email": "julis@mail.com",
			"phone": "21989524733",
			"registerDate": "2023-05-29T19:16:41.081Z",
			"gender": "female"
		}
	]
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | "message": "Client not found!" |

### 4.1. **Listando Relatório de Contatos**

[ Voltar aos Endpoints ](#5-endpoints)

### `/listContacts/`

### Exemplo de Request:
```
GET /listContacts/
Host: http://localhost:3000
Authorization: esta rota necessita do token do cliente  para acesso
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```pdf

```

### Possíveis Erros:

| 401 Unauthorized  | You don`t have permissions or invalid token. |


