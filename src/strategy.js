class NotImplementedExeception extends Error {
    constructor() {
        super('Not Implemented Exeception')
    }
}

class ICrud {
    create(item) {
        throw new NotImplementedExeception()
    }
    read(item) {
        throw new NotImplementedExeception()
    }
    update(id, item) {
        throw new NotImplementedExeception()
    }
    delete(id) {
        throw new NotImplementedExeception()
    }
}

class MongoDB extends ICrud {
    constructor() {
        super()
    }
    create(item) {
        console.log('O item foi salvo no banco de dados MongoDB.')
    }
}

class Postgres extends ICrud {
    constructor() {
        super()
    }
    create(item) {
        console.log('O item foi salvo no banco de dados Postgres.')
    }
}

class ContextStrategy {
    constructor(strategy){
        this._database = strategy
    }
    create(item) {
        return this._database.create(item)
    }
    read(item) {
        return this._database.read(item)
    }
    update(id, item) {
        return this._database.update(id, item)
    }
    delete(id) {
        return this._database.delete(id)
    }
}

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()
contextPostgres.read()
