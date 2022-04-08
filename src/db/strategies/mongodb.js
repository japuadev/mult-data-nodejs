const ICrud = require('./interface/interfaceCrud')
const mongoose = require('mongoose')
const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._heros = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Connected') return state;
        
        if (state !== 'Connecting') return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]

    }
    connect() {
        mongoose.connect('mongodb://japuamelo:minhasenhasecreta@localhost:27017/heros', {
            useNewUrlParser:true }, function (error) {
                if(!error) return; 
                console.log('Falha na conexão com Banco de Dados.', error)
            }
        )
        const connection = mongoose.connection
        this._driver = connection
        this.defineModel()
    }

    defineModel() {
        const herosSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            power: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        
        this._heros = mongoose.model('heros', herosSchema)
    }
    async create(item) {
        return this._heros.create(item)   
    }
    async read(item, skip=0, limit=10) {
        return this._heros.find(item).skip(skip).limit(limit)
    }

}

module.exports = MongoDB;