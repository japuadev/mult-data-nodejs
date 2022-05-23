const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/herosSchema')
const app = new Hapi.Server({
    port: 5000
})

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    app.route([
        {
            path: '/heroes',
            method: 'GET',
            handler: (request, head) => {
                return context.read()
            }
        }
    ])

    await app.start()
    console.log('Server running on port ', app.info.port)
    return app
}

module.exports = main()