# Delivery App

<!-- TEXTO EM CONSTRUCAO -->

## 📋 Pré-requisitos

- A aplicação necessita do `Docker` instalado localmente, execute o comando no terminal para verificar a instalação.

```
docker -v
```

- A aplicação necessita que as portas estejam disponiveis:
`Fron-End - 3000`
`Back-End - 3001`
`MySql - 3306`
- Verifique a disponibilidade de portas no terminal executando o seguinte comando:

```
docker ps -a
```

---

### 🔧 Instalação

Rodando a aplicacão.

Clone o repositorio:

```
git clone git@github.com:Maarceloo/delivery-app.git
```

Acesse `delivery-app`

```
cd delivery-app
```

Instale as dependencias:

```
npm run begin
```

Suba os containers

```
docker-compose up --build
```

Clique aqui para visualizar a aplicação:

- [Delivery-App](http://localhost:3000/login)

---

## ⚙️ Executando

Pagina de login:

- Customer
Email: `zebirita@email.com`
Senha: `$#zebirita#$`
<br/>

- Seller
Email: `fulana@deliveryapp.com`
Senha: `fulana@123`
<br/>

- Administrator
Email: `adm@deliveryapp.com`
Senha: `--adm2@21!!--`

---

## 🛠️ Tecnologias

- [Node.Js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MySql](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Dcker](https://www.docker.com/)
- [JWT(Autenticação)](https://jwt.io/)
- [Sequelize(ORM)](https://sequelize.org/)
- [Axios](https://axios-http.com/ptbr/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jest](https://jestjs.io/)
- [React](https://pt-br.reactjs.org/)
- [md5](https://www.md5hashgenerator.com/)
- [nodemom](https://www.npmjs.com/package/nodemon)

---

## ✒️ Autores

Colegas de turma que ajudaram no desenvolvimento:

- [**Marcelo Lima**](https://github.com/Maarceloo)
- [**Gustavo Sant'Ana**](https://github.com/GustavoAnatnas)
- [**Matheus Santos**](https://github.com/MatheusKRC)
- [**Bruno Kian**](https://github.com/brunokian)
- [**Alex Horman**](https://github.com/Alex-Horman-de-Medeiros-Correia)

---
