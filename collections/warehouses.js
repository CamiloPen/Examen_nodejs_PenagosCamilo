import { Collection } from "./collection.js";

export class Warehouse extends Collection {
    constructor(db) {
        const collection = {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["code", "name", "active"],
                    properties: {
                        code: {
                            bsonType: "string"
                        },
                        name: {
                            bsonType: "string"
                        },
                        description: {
                            bsonType: "string"
                        },
                        active: {
                            bsonType: "bool"
                        }
                    }
                }
            }
        }
        const indexes = [
            {
                key: {code: 1}, 
                options: { name: "indexCode", unique: true, wiredTigerIndexConfig: 4096 }
            },
            {
                key: {name: 1}, 
                options: { name: "indexName", wiredTigerIndexConfig: 4096 }
            }
        ]

        super(db, "warehouses", collection, indexes)
    }
}