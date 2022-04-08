class NotImplementedExeception extends Error {
    constructor() {
        super('Not Implemented Exeception')
    }
}

class ICrud {
    create(item) {
        throw new NotImplementedExeception()
    }
    read(query) {
        throw new NotImplementedExeception()
    }
    update(id, item) {
        throw new NotImplementedExeception()
    }
    delete(id) {
        throw new NotImplementedExeception()
    }
    isConnected() {
        throw new NotImplementedExeception()
    }
    connect() {
        throw new NotImplementedExeception()
    }
}

module.exports = ICrud; 