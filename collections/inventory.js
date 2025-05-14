import { Collection } from "./collection.js";

export class Inventory extends Collection {
    constructor(db) {
        const collection = {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["date", "article", "quantity", "price", "movement", "warehouse", "description"],
                    properties: {
                        date: {
                            bsonType: "date"
                        },	
                        article: {
                            bsonType: "objectId"
                        },	
                        quantity: {
                            bsonType: "int"
                        },	
                        price: {
                            bsonType: "double"
                        },	
                        movement: {
                            bsonType: "string"
                        },	
                        warehouse: {
                            bsonType: "objectId"
                        }, 	
                        description: {
                            bsonType: "string"
                        }
                    }
                }
            }
        }
        const indexes = [
            {
                key: {date: 1}, 
                options: { name: "indexDate", wiredTigerIndexConfig: 4096 }
            },
            {
                key: {article: 1}, 
                options: { name: "indexArticle", wiredTigerIndexConfig: 4096 }
            },
            {
                key: {movement: 1}, 
                options: { name: "indexMovement", wiredTigerIndexConfig: 4096 }
            },
            {
                key: {warehouse: 1}, 
                options: { name: "indexWarehouse", wiredTigerIndexConfig: 4096 }
            }
        ]

        super(db, "inventory", collection, indexes)
    }
}