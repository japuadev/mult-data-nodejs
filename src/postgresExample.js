const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heros',
    'postgres',
    'datateste',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false
    }
)

async function main() {
    const Heros = driver.define('heros', {
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

    await Heros.sync()
    await Heros.create({
        name: 'Lanterna Verde',
        power: 'Ring'
    })
    
    const result = await Heros.findAll({raw: true})
    console.log('Data: ', result)
}

main()