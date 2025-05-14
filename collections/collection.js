export class Collection {
    #validator;
    #indexes;
    #collectionName;
    #collection
    #db

    constructor(db, collectionName, validator, indexes = []) {
        this.#db = db;
        this.#collectionName = collectionName;
        this.#collection = this.#db.collection(collectionName)
        this.#validator = validator;
        this.#indexes = indexes;
    }

    async #create() {
        await this.#db.createCollection(this.#collectionName, this.#validator);
    }

    async #generateIndexes() {
        const col = this.#collection
        for (const index of this.#indexes) {
            await col.createIndex(index.key, index.options || {});
        }
    }

    async generateCollection() {
        await this.#create()
        await this.#generateIndexes()
    }
}