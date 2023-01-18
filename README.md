# Delivery App

Neste projeto meu grupo foi responsável por criar e integrar tanto o back-end quanto o front-end, criando uma plataforma de delivery de cerveja.

Foi o projeto mais completo desenvolvido na Trybe com diversos desafios técnicos e comportamentais. Inicialmente nosso grupo utiliza o [**Trello**](https://trello.com/) para organizar o desenvolvimento dos requisitos, fizemos **Daily meeting** diárias para acompanhar o progresso individual e coletivo.

Durante o desenvolvimento encontramos varias **divergências de opiniões** construtivas sobre questões técnicas, das quais debatíamos o que seria melhor para o projeto como, por exemplo, se a aplicação ficaria mais rápida e se seria de fácil manutenção.

- #### O Projeto

  - Ter acesso via login: tanto clientes como pessoas vendedoras, assim como o próprio dono do estabelecimento, que administra o sistema, devem ter acesso ao aplicativo via login, porém para funções diferentes: (1) A pessoa cliente, que compra da lista de produtos; (2) A pessoa vendedora, que aprova, prepara e entrega; (3) A pessoa administradora, que gerencia quem usa o aplicativo;

  - Fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos;

  - Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos após a atualização da página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido quando sua página for atualizada, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega;

- #### Diagrama de ER

![diagrama_banco](/front-end/src/images/diagrama_banco.png)
A ideia da já pressupõe alguma escalabilidade, dado que foram estabelecidas algumas entidades genéricas no banco de dados e componentização no front-end, para que, caso o sistema cresça, não seja muito difícil mudar e ampliar essa estrutura.

- #### Video da aplicacao funcionando

    [**Youtube**](https://youtu.be/Agai8tJdYOU)

----

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
