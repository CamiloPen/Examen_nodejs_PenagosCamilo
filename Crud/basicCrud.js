export class Crud {

    #collection
     
    constructor(db, colectionName) {
        this.#collection = this.#collection = db.collection(colectionName)
    }

    async insertData(data) {
        await this.#collection.insertMany(data)
    }

    async findId(value) {
        const result = await this.#collection.findOne({code: value}, { projection: {_id: 1}})
        return result._id
    }

    async basicFind(field, value) {
        const find = { [field]: value };
        const result = await this.#collection.find(find, { projection: {_id: 0, active: 0}}).toArray()
        return result
    }

    async basicUpdate(field, value, update) {
        const find = { [field]: value };
        await this.#collection.updateMany(find, { $set: update})
        return `${field} = ${value} updated`
    }

    async basicDelete(field, value) {
        const find = { [field]: value };
        await this.#collection.deleteMany(find)
        return `${field} = ${value} deleted`
    }
}

export class Article extends Crud {
    constructor(db) {
        super(db, "articles")
    }
}

export class Warehouse extends Crud {
    constructor(db) {
        super(db, "warehouses")
    }
}