# NG Cash Project
Projeto teste no processo seletivo [NG Cash](https://ng.cash/seguranca)

> Este projeto consiste em uma aplicação web para simulação de transferencia entre usuario

## Lista de funcionalidades:
- Registar um usuario na aplicação
- Logar-se com um usuario registrado
- Exibir Lista com todas as transções feitas por este usuario
- Filtrar a lista de transções por Tipo Transações de Cash In (Credito) e Cash Out (Debito) e filtrar também pela data de criação 
- Executar uma transferencia para outro usuario

## Construção:
A construção dessa aplicação envolveu a criação de um 
- Banco de dados em Postgres 
- Um servidor Express
- Um frontend em ReactJs
Cada uma das partes desse sistema esta rodando em containers docker, desta forma a execução desse projeto requer a instalação previa do Docker e do Docker Compose
[Link](https://docs.docker.com/engine/install/)

## Como Executar:
Uma vez instalado o Docker, devera-se entrar na pasta root (contem o arquivo docker-compose.yml), em seguida devera=-se executar o comando
```sh
docker compose up -d
# Em versoes previas do docker compose executar docker-compose up -d
```
Desta forma a apliação estara rodando, para verificar, basta executar verificar no navegador:
- O servidor estara rodando na porta 5433, portanto basta entrar em http://localhost:5433/api-docs e terá acesso a documentação swagger da aplicação
- O frontend estara rodando na porta 3001, portanto basta entrar em http://localhost:3001/ e você acessará a pagina de registro

## Detalhes de Implementação:
### Banco de Dados
O banco de dados segue a estrutura: 
![Database](./assets/Database.png)
### Backend
A aplicação é feita é feita com Express + Sequelize e utiliza typescript.
A aplicação segue uma arquitetura MVC, e possui rotas acessiveis via swagger para testes, mas você também poderá importar automaticamente as requisições para o seu insomnia para realizar os testes:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=NG%20Cash&uri=http%3A%2F%2Fexample.json)

### Frontend
A aplicação é feita em ReactJs e Hooks e utiliza typescript, nela podemos navegar por 3 paginas diferentes:
- Registro: pagina onde pode-se registrar um usuario e então ser direcionado para tela principal ou clicar-se no botão para Sign In ir para tela de login caso 
- Login: Pagina onde pode-se executar a autenticação do usuario, e então ser direcionado para tela principal, ou clicar no botão de Registro para ser direcionado para tela de Cadastro
- Home: Tela onde pode-se acompanhar o balanço atual da conta, efetuar o logout, executar transferencias e ver a lista de tranações realizadas além de poder aplicar os filtros na listagem de transação.
