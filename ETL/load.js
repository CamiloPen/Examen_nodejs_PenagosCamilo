import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { leerCSV } from './ext-trans.js';
import { client, main } from "../helpers/db.js";
import { Warehouse, Article, Inventory } from "../Crud/index.js";

const db = await main();
const session = db.client.startSession();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const warehouse = new Warehouse(db)
const article = new Article(db)
const inventory = new Inventory(db)

try {
    const config = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    }

    await session.withTransaction(async () => {

        const warehousesData = await leerCSV("warehouses", path.join(__dirname, '../raw_data/warehouses.csv'))
        const articlesData = await leerCSV("articles", path.join(__dirname, '../raw_data/articles.csv'))
        const inventoryData = await leerCSV("inventory", path.join(__dirname, '../raw_data/inventory.csv'))

        await warehouse.insertData(warehousesData)
        await article.insertData(articlesData)

        for (let i in inventoryData) {
            let article_id = await article.findId(inventoryData[i].article)
            inventoryData[i].article = article_id
            let warehouse_id = await warehouse.findId(inventoryData[i].warehouse)
            inventoryData[i].warehouse = warehouse_id
        }

        await inventory.insertData(inventoryData)

        console.log(`Se insertaron ${warehousesData.length} registros en la colección "warehouses"`)
        console.log(`Se insertaron ${articlesData.length} registros en la colección "articles"`)
        console.log(`Se insertaron ${inventoryData.length} registros en la colección "inventory"`)
    }, config);

} catch (error) {
    console.log(error)
} finally {
    if (session.transaction.isActive) await session.abortTransaction();
    await session.endSession();
    await client.close()
}