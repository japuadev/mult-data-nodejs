const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/herosSchema')
const HeroRoutes = require('./routes/heroRoutes')
const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    app.route([
        ...mapRoutes
    ])

    await app.start()
    console.log('Server running on port ', app.info.port)
    return app
}

module.exports = main()