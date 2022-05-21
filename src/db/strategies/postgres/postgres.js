const ICrud = require('../interface/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection 
        this._schema = schema
    }
    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
                        
        } catch (error) {
            console.log('This connection failed.', error)
            return false; 
        }
    }

    async create(item) {
        const {dataValues} = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}) {
        return this._schema.findAll({where: item, raw:true })
    }

    async update(id, item) {
        const r = await this._schema.update(item, {where: {id : id}})
        return r
    }

    async delete(id) {
        const query = id ? {id} : {}
        return this._schema.destroy({where:query})
        //Esse método é perigoso pq não tá passando nenhuma condição.
        //Utilizando apenas como método de teste.
    }

    static async defineModel(connection, schema) {    
        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        )
        await model.sync()
        return model
    }
    static async connect() {
        const connection = new Sequelize(
            'heros',
            'postgres',
            'datateste',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                logging: false
            }
        )
        return connection
    }
}

module.exports = Postgres;