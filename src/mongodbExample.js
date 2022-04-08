const mongoose = require('mongoose')

mongoose.connect('mongodb://japuamelo:minhasenhasecreta@localhost:27017/heros', {
    useNewUrlParser:true }, function (error) {
        if(!error) return; 
        console.log('Falha na conexão com Banco de Dados.', error)
    }
)

const connection = mongoose.connection
connection.once('open', () => console.log('Database connected'))

// setTimeout(() => {
//     const state = connection.readyState
//     console.log('State', state);
// }, 1000)

const heroSchema = new mongoose.Schema({
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

const model = mongoose.model('hero', heroSchema)

async function main() {
    const resultRegister = await model.create({
        name: 'Batman',
        power: 'Money'
    })

    console.log('Register', resultRegister);

    const readItens = await model.find()
    console.log('List', readItens)
}

main()

