const mongoose = require('mongoose')
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

module.exports = mongoose.model('heros', herosSchema)