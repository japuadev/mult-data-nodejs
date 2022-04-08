const ICrud = require('./interface/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null 
        this._heros = null
    }
    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
                        
        } catch (error) {
            console.log('This connection failed.', error)
            return false; 
        }
    }

    async create(item) {
        const {dataValues} = await this._heros.create(item)
        return dataValues
    }

    async read(item = {}) {
        return this._heros.findAll({where: item, raw:true })
    }

    async update(id, item) {
        const r = await this._heros.update(item, {where: {id : id}})
        return r
    }

    async delete(id) {
        const query = id ? {id} : {}
        return this._heros.destroy({where:query})
        //Esse método é perigoso pq não tá passando nenhuma condição.
        //Utilizando apenas como método de teste.
    }

    async defineModel() {    
        this._heros = this._driver.define('heros', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true, 
            },
            name: {
                type: Sequelize.STRING,
                required: true
            },
            power: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROS',
            freezeTableName: false,
            timestamps: false 
        })
    
        await this._heros.sync()
    }
    async connect() {
        this._driver = new Sequelize(
            'heros',
            'postgres',
            'datateste',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false
            }
        )
        await this.defineModel()
    }
}

module.exports = Postgres;