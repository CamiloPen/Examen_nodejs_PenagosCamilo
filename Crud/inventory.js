import { Crud } from "./basicCrud.js";

export class Inventory extends Crud {
    #collection

    constructor(db) {
        super(db, "inventory")

        this.#collection = db.collection("inventory")
    }

    async inventoryList(date1, date2) {
        return await this.#collection.aggregate([
            {
                $match: {
                    date: { $gte: new Date(date1), $lte: new Date(date2) }
                }
            },
            {
                $lookup: {
                    from: "articles",
                    localField: "article",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project:
                            {
                                _id: 0,
                                dscription: 0,
                                "category.active": 0,
                                active: 0
                            }
                        }
                    ],
                    as: "article"
                }
            },
            { $unwind: "$article" },
            {
                $project:
                {
                    _id: 0,
                    warehouse: 0,
                    description: 0
                }
            }
        ]).toArray()
    }

    async articlesList() {
        return await this.#collection.aggregate([
            {
                $lookup: {
                    from: "articles",
                    localField: "article",
                    foreignField: "_id",
                    as: "article",
                },
            },
            {
                $unwind: {
                    path: "$article",
                },
            },
            {
                $lookup: {
                    from: "warehouses",
                    localField: "warehouse",
                    foreignField: "_id",
                    as: "warehouse",
                },
            },
            {
                $unwind: {
                    path: "$warehouse",
                },
            },
            {
                $group: {
                    _id: "$warehouse",
                    articles: {
                        $push: "$article",
                    },
                },
            },
        ]).toArray()
    }
}