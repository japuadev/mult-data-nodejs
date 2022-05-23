## Desenvolvendo API com multi-bancos (MongoDB, Postgres)

<h3>COMANDOS PARA EXECUTAR DOCKER</h3>
É necessário fazer o download do docker para criar essa a
<h3>POSTGRES</h3>
    docker run / para inicializar o docker
    --name postgres / 
    -e POSTGRES_USER=usuario / nome do usuário  
    -e POSTGRES_PASSWORD=senha / passando outra váriavel de ambiente, a senha
    -e POSTGRES_DB=nom_banco / dando nome para o db
    -p 5432:5432 / criando a porta para o db de onde ela será exposta
    -d postgres

Todos os comandos acima são rodados juntos, e ao lado do outros, sem a barra e os devidos comentários. 

    docker ps / para visualizar as informações do container 
    docker exec -it postgres /bin/bash / para trabalhar dentro do root do postgres 

<h5>Configurações de user para o postgres </h5>
    docker run 
    --name adminer / imagem que será o painel administrativo, uma interface
    -p 8080:8080 / onde roda a porta
    --link postgres:postgres / o adminer vai ter permissão para acessar nossa imagem
    -d adminer / comando para rodar em segundo plano e o nome será adminer 

Todos os comandos acima são rodados juntos, e ao lado do outros, sem a barra e os devidos comentários. 
(exemplo: docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer).

##

<h3>MONGODB</h3>
docker run 
--name mongodb 
-p 27017:27017 
-e MONGO_INITDB_ROOT_USERNAME=usuario 
-e MONGO_INITDB_ROOT_PASSWORD=senha_usuario 
-d mongo:versaao

Todos os comandos acima no mesmo esquema, rodados em uma única linha. 
(docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4).

<h5>Configurações de user para o MongoDB </h5>
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient 

Depois de abrir o localhost informado e feito o login, criamos um usuário para poder manipular os dados 
no db do mongo. 

Segue os comandos no terminal para criar usuário e dar role de readWrite:
    docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('db_nome').createUser({user: 'novo_usuario_nome', pwd: 'nova_senha_usuario', roles:[{role:'readWrite', db: 'db_nome'}]})"


