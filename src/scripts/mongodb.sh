docker ps
docker exec -it b4e1ea5ada47 mongo mongodb:27017 -u japuamelo -p minhasenhasecreta --authenticationDatabase heros

comamdos:
- show dbs / para mostrar os clusters
- use nomedb / para usar um database
- show collections / mostra as collections

//create
db.heros.insert({
    name: 'Flash',
    power: 'Speed',
    birth: '2009-02-02'
})

//read
db.heros.find().pretty()

//update
db.heros.update({ _id: ObjectId('624b87149cb0ecf228b8c558')}, {name: 'Wonder Woman', birth: '1984-07-10', power: 'strength'})
/\ Dessa forma, se alguns dos documentos 'name, birth or power' não fossem atualizados, eles seriam apagados.
O ideal é usar o $set para mudar o valor de apenas um documento específico, como mostrado abaixo: \/

- Quando queremos alterar apenas um documento da coleção, é necessário informar com o $set. Caso contrario
serão pagados os outros arquivos que não forem passados novos valores.\/s
ex:
db.heros.update({ _id: ObjectId('624b87149cb0ecf228b8c558')}, $set: {name: 'Wonder Woman'})

//delete
db.heros.remove({é necessário passar algum valor ou condição para deletar.})
db.heros.remove({} - remove todos os dados do banco de dados)

db.heros.find().pretty()
db.heros.count()
db.heros.findOne()
