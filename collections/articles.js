import { Collection } from "./collection.js";

export class Article extends Collection {
    constructor(db) {
        const collection = {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["code", "name", "category", "active"],
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
                        category: {
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
            },
            {
                key: {"category.code": 1}, 
                options: { name: "indexCateCode", wiredTigerIndexConfig: 4096 }
            },{
                key: {"category.name": 1}, 
                options: { name: "indexCateName", wiredTigerIndexConfig: 4096 }
            }
        ]

        super(db, "articles", collection, indexes)
    }
}