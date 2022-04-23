const sequelize = require('sequelize')

const HerosSchema = {
    name: 'Heroes',
    schema: {
        id: {
            type: sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true, 
        },
        name: {
            type: sequelize.STRING,
            required: true
        },
        power: {
            type: sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_HEROS',
        freezeTableName: false,
        timestamps: false 
    }
}

module.exports = HerosSchema; 